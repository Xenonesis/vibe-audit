#!/usr/bin/env python3
"""Drive a live behavioral eval against a real harness CLI, headlessly.

Pipeline: prepare run bundle (run_eval.py) -> install skill (with-skill only)
-> probe binary/auth -> invoke harness -> capture stdout/stderr/diff ->
auto-grade mechanical assertions -> write grading.json via grade_run.py.

Every result is recorded as evidence: binary missing, auth missing, timeout,
exit code, stdout/stderr, and diff are all persisted in the run directory.
Nothing is claimed as PASS unless an assertion was actually checked.
"""
from __future__ import annotations
import argparse, hashlib, json, shutil, subprocess, sys, time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

# Per-harness headless invocation templates. `{binary}` is the resolved binary;
# `{prompt}` is the eval prompt text. Keep these boring and verifiable.
# Confidence: high = verified on this machine; medium = documented, unverified here.
INVOKE = {
    "claude-code": {
        "cmd": ["{binary}", "-p", "{prompt}", "--output-format", "json"],
        "confidence": "high",
        "auth_check": ["{binary}", "auth", "status"],
        "skill_flag": None,
    },
    "pi": {
        "cmd": ["{binary}", "-p", "{prompt}", "--no-context-files"],
        "confidence": "high",
        "auth_check": None,
        "skill_flag": ["--skill", "{skill_dir}"],
    },
    "omp": {
        "cmd": ["{binary}", "-p", "{prompt}"],
        "confidence": "high",
        "auth_check": None,
        "skill_flag": None,
    },
    "codex": {
        "cmd": ["{binary}", "exec", "--sandbox", "read-only", "{prompt}"],
        "confidence": "medium",
        "auth_check": None,
        "skill_flag": None,
    },
    "gemini-cli": {
        "cmd": ["{binary}", "-p", "{prompt}"],
        "confidence": "medium",
        "auth_check": None,
        "skill_flag": None,
    },
    "copilot-cli": {
        "cmd": ["{binary}", "-p", "{prompt}"],
        "confidence": "medium",
        "auth_check": None,
        "skill_flag": None,
    },
    "cursor": {
        "cmd": ["{binary}", "-p", "{prompt}"],
        "confidence": "medium",
        "auth_check": None,
        "skill_flag": None,
    },
    "antigravity": {
        "cmd": ["{binary}", "-p", "{prompt}"],
        "confidence": "medium",
        "auth_check": None,
        "skill_flag": None,
    },
}

HARNESS_TOML = {p.stem: p for p in (ROOT / "harnesses").glob("*.toml")}


def load_harness(harness_id: str) -> dict:
    """Load harness metadata from harnesses/<id>.toml (binary, fallbacks, notes)."""
    toml_path = HARNESS_TOML.get(harness_id)
    meta: dict = {"id": harness_id, "binary": None, "fallback_binaries": [], "notes": ""}
    if not toml_path:
        return meta
    try:
        import tomllib
    except ImportError:  # Python < 3.11
        tomllib = None
    if tomllib:
        with open(toml_path, "rb") as fh:
            data = tomllib.load(fh)
        meta.update({k: data.get(k) for k in ("binary", "fallback_binaries", "notes") if k in data})
    else:  # minimal fallback parser for the known flat TOML shape
        for line in toml_path.read_text(encoding="utf-8").splitlines():
            for key in ("binary", "fallback_binaries", "notes"):
                if line.startswith(f"{key} ="):
                    meta[key] = line.split("=", 1)[1].strip().strip('"')
    return meta


def resolve_binary(meta: dict) -> list[str] | None:
    """Return argv prefix for the harness binary, or None if not installed.

    Windows .cmd/.bat shims cannot be spawned directly by CreateProcess;
    they must be routed through cmd /c.
    """
    candidates = ([meta.get("binary")] if meta.get("binary") else []) + list(meta.get("fallback_binaries") or [])
    for c in candidates:
        if not c:
            continue
        path = shutil.which(c)
        if not path:
            continue
        if path.lower().endswith((".cmd", ".bat")):
            return ["cmd", "/c", path]
        return [path]
    return None


def probe_version(bin_cmd: list[str]) -> str | None:
    try:
        cp = subprocess.run(bin_cmd + ["--version"], capture_output=True, text=True, timeout=8)
        return (cp.stdout or cp.stderr or "").strip().splitlines()[0][:300] or None
    except Exception:
        return None


def check_auth(cfg: dict, bin_cmd: list[str]) -> tuple[bool, str]:
    """Return (ok, detail). ok=True means auth is confirmed or not required."""
    probe = cfg.get("auth_check")
    if not probe:
        return True, "not-required"
    try:
        cp = subprocess.run(bin_cmd + [p for p in probe if p != "{binary}"],
                            capture_output=True, text=True, timeout=15)
        out = (cp.stdout or "").strip()
        if '"loggedIn": false' in out or '"loggedIn": False' in out:
            return False, "not-logged-in"
        if cp.returncode == 0 and out:
            return True, out[:200]
        return True, f"exit={cp.returncode}"
    except Exception as exc:
        return True, f"probe-error: {exc}"


def hash_tree(directory: Path) -> str:
    h = hashlib.sha256()
    for p in sorted(directory.rglob("*")):
        if p.is_file():
            h.update(str(p.relative_to(directory)).encode())
            h.update(p.read_bytes())
    return h.hexdigest()


def run_bundle_prepare(root: Path, eval_id: str, harness: str, condition: str, trial: int) -> Path:
    cp = subprocess.run(
        [sys.executable, str(ROOT / "scripts" / "run_eval.py"), str(root),
         "--eval", eval_id, "--harness", harness, "--condition", condition, "--trial", str(trial)],
        capture_output=True, text=True, timeout=60,
    )
    if cp.returncode != 0:
        raise RuntimeError(f"run_eval.py failed: {cp.stdout}\n{cp.stderr}")
    return Path(cp.stdout.strip().splitlines()[-1]).resolve()


def install_skill_into(run_dir: Path, skill_root: Path):
    """Copy the skill (excluding git/junk) into a harness project-local root."""
    if (skill_root / "vibe-audit").exists():
        return
    skill_root.mkdir(parents=True, exist_ok=True)
    shutil.copytree(
        ROOT, skill_root / "vibe-audit",
        ignore=shutil.ignore_patterns(".git", "__pycache__", "*.pyc", "node_modules", "dist", "runs"),
    )


def auto_grade(assertions: list[str], inputs_before: str, inputs_after: str,
               stdout: str, case_files: list[str]) -> dict[str, dict]:
    """Grade mechanically checkable assertions; everything else stays UNGRADED."""
    result: dict[str, dict] = {}
    for a in assertions:
        if a == "no_source_modification":
            ok = inputs_before == inputs_after
            result[a] = {"pass": ok, "evidence": "inputs/ hash unchanged" if ok else "inputs/ hash CHANGED after run"}
        elif a == "evidence_required":
            # Require the output to reference at least one fixture file or a file:line pattern.
            names = " | ".join(Path(f).name for f in case_files)
            ok = bool(stdout.strip()) and (any(Path(f).name in stdout for f in case_files)
                                           or bool(__import__("re").search(r"[\w./-]+\.\w+:\d+", stdout)))
            result[a] = {"pass": ok, "evidence": "output references fixture file" if ok else "output lacks file evidence"}
        else:
            result[a] = {"pass": None, "evidence": ""}
    return result


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("root", nargs="?", default=".")
    ap.add_argument("--eval", required=True, help="eval id from evals/evals.json")
    ap.add_argument("--harness", required=True, choices=sorted(INVOKE))
    ap.add_argument("--condition", choices=["with-skill", "without-skill", "previous-skill"], required=True)
    ap.add_argument("--trial", type=int, default=1)
    ap.add_argument("--timeout", type=int, default=600, help="per-invocation timeout seconds")
    ap.add_argument("--model", default="unavailable")
    ap.add_argument("--sandbox", default="unavailable")
    ap.add_argument("--out", default="runs")
    a = ap.parse_args()

    root = Path(a.root).resolve()
    meta = load_harness(a.harness)
    invoke = INVOKE[a.harness]
    bin_cmd = resolve_binary(meta)
    if not bin_cmd:
        print(f"SKIP {a.harness}: binary not found on PATH (documented binary: {meta.get('binary')})")
        sys.exit(2)

    version = probe_version(bin_cmd)
    print(f"harness={a.harness} binary={' '.join(bin_cmd)} version={version or 'unknown'}")

    run_dir = run_bundle_prepare(root, a.eval, a.harness, a.condition, a.trial)

    # with-skill: install into the universal project-local root inside the run dir.
    skill_root = None
    if a.condition == "with-skill":
        skill_root = run_dir / ".agents" / "skills"
        install_skill_into(run_dir, skill_root)
        print(f"skill installed: {skill_root / 'vibe-audit'}")

    auth_ok, auth_detail = check_auth(invoke, bin_cmd)
    if not auth_ok:
        (run_dir / "harness_skip.txt").write_text(
            f"harness={a.harness} reason=auth ({auth_detail})\nrun with the harness authenticated, e.g. claude /login\n",
            encoding="utf-8")
        print(f"SKIP {a.harness}: auth required ({auth_detail})")
        sys.exit(3)

    # Build the invocation command.
    case = json.loads((root / "evals" / "evals.json").read_text(encoding="utf-8"))
    case = next(c for c in case["evals"] if str(c["id"]) == str(a.eval))
    prompt = case["prompt"]
    cmd = bin_cmd + [c.replace("{prompt}", prompt) for c in invoke["cmd"] if c != "{binary}"]
    if skill_root and invoke.get("skill_flag"):
        cmd += [f.replace("{skill_dir}", str(skill_root / "vibe-audit")) for f in invoke["skill_flag"]]

    inputs_dir = run_dir / "inputs"
    before = hash_tree(inputs_dir)
    started = time.time()
    try:
        cp = subprocess.run(cmd, cwd=inputs_dir, capture_output=True, text=True, timeout=a.timeout)
        exit_code, stdout, stderr = cp.returncode, cp.stdout or "", cp.stderr or ""
    except subprocess.TimeoutExpired as exc:
        exit_code, stdout, stderr = -1, exc.stdout or "", f"TIMEOUT after {a.timeout}s"
    elapsed = time.time() - started
    after = hash_tree(inputs_dir)

    (run_dir / "harness_stdout.txt").write_text(stdout, encoding="utf-8")
    (run_dir / "harness_stderr.txt").write_text(stderr, encoding="utf-8")
    (run_dir / "harness_command.txt").write_text(" ".join(cmd) + f"\n(cwd={inputs_dir}, timeout={a.timeout}s, elapsed={elapsed:.1f}s, exit={exit_code})\n", encoding="utf-8")

    obs = auto_grade(case["assertions"], before, after, stdout, case.get("files", []))

    (run_dir / "observations.json").write_text(
        json.dumps({"assertions": obs, "notes": f"harness={a.harness} binary={' '.join(bin_cmd)} version={version} exit={exit_code}"}, indent=2) + "\n",
        encoding="utf-8")

    # Refresh manifest with execution facts.
    manifest_path = run_dir / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    manifest.update({
        "behavioral_execution_performed": True,
        "harness_binary": " ".join(bin_cmd),
        "harness_version": version,
        "exit_code": exit_code,
        "elapsed_seconds": round(elapsed, 1),
        "auth": auth_detail,
        "invocation_confidence": invoke["confidence"],
        "command": " ".join(cmd),
    })
    manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")

    print(f"exit={exit_code} elapsed={elapsed:.1f}s run_dir={run_dir}")
    print(json.dumps(obs, indent=2))


if __name__ == "__main__":
    main()
