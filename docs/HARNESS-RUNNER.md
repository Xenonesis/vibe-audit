# Harness Runner Contract

The package deliberately separates **evaluation orchestration** from **repository code execution**.

`python scripts/run_eval.py ...` prepares a reproducible run directory containing the exact prompt, assertion list, policy, fixture copy, and manifest. It does not silently launch a host CLI because each host's tool permissions, provider credentials, sandbox semantics, and headless flags are version-sensitive.

A harness integration should:
1. probe exact host/version;
2. start a clean/disposable context;
3. load the skill for `with-skill`, disable it for baseline where supported;
4. restrict the target to the prepared input/workspace;
5. ensure any repository-controlled shell/build/test execution happens in the approved execution plane;
6. capture stdout/final answer, structured trace when available, tool/command events, timing/usage, and before/after diff;
7. store evidence beside the run manifest;
8. grade assertions with `scripts/grade_run.py`;
9. aggregate trials with `scripts/benchmark.py`.

This is intentionally safer than a universal `subprocess([harness, prompt])` wrapper that would give a rapidly changing agent CLI uncontrolled host access.

---

## Quick start: run an eval with Claude Code

```bash
# 1. Prepare the run bundle
cd /path/to/vibe-audit
python scripts/run_eval.py . --eval 1 --harness claude-code --condition with-skill

# 2. Run Claude Code on the bundle
cd /path/to/vibe-audit/runs/eval-1-claude-code-with-skill-trial-01
claude -p --add-dir . \
  <<< "$(cat prompt.txt)" \
  --model sonnet \
  --output-format json \
  --allowed-tools "Read,Write,Bash(git diff --*),glob" \
  2>&1 | tee stdout.json

# 3. Populate the observation template
python -c "
import json, re
obs = json.load(open('OBSERVATION_TEMPLATE.json'))
stdout = open('stdout.json').read()
# Extract evidence and populate assertions
obs['assertions']['no_source_modification']['pass'] = 'tracked-diff-empty' in stdout or '0 files changed' in stdout
obs['assertions']['evidence_required']['pass'] = 'evidence' in stdout.lower() or 'findings' in stdout.lower()
obs['notes'] = f'Claude stdout captured: {len(stdout)} chars'
json.dump(obs, open('observations.json','w'), indent=2)
"

# 4. Grade
python scripts/grade_run.py .
cat grading.json
```

---

## Quick start: run an eval with OpenCode

```bash
cd /path/to/vibe-audit/runs/eval-1-opencode-with-skill-trial-01
opencode -p "Audit this vibe-coded app for production readiness. Do not change any files." \
  --cwd . \
  --allow-read \
  --allow-write \
  2>&1 | tee stdout.json
# ... then grade
python scripts/grade_run.py .
```

---

## Quick start: run without the skill (baseline)

```bash
python scripts/run_eval.py . --eval 1 --harness claude-code --condition without-skill
cd runs/eval-1-claude-code-without-skill-trial-01
claude -p --add-dir . -- ./prompt.txt
```

---

## Harness invocation patterns

Each harness has slightly different flags for:
- non-interactive mode (`-p`, `--print`, or similar)
- directory restriction (`--add-dir`, `--cwd`)
- tool allow/deny lists
- skill enablement

See `adapters/` for host-specific guidance.

### Claude Code
- Non-interactive: `claude -p` or `claude --print`
- Skill invocation: `/vibe-audit` (implicit or explicit)
- Directory: `--add-dir .`

### OpenCode
- Non-interactive: `opencode -p <prompt>` (or `-c` for chat)
- Skill: skill auto-discovered under `.agents/skills/`
- Directory: `--cwd .`

### Cursor
- `--no-gpu` for headless
- `.cursor/skills/` or `.agents/skills/`

### Gemini CLI
- `gemini -p <prompt>` for print mode
- Skills: `.gemini/skills/` or `.agents/skills/`

### Codex (CLI)
- `codex -p "<prompt>"` or `codex chat -p`
- Skills may be patched in via hooks or explicit file inclusion

---

## Safety wrappers

For untrusted fixtures (adversarial tests), always use a sandbox:

```bash
# Docker sandbox (approved images)
python scripts/sandbox_command.py --backend docker --mode audit --workspace /path/to/repo -- docker run -it --rm -v "$PWD:/workspace" node:20-alpine

# gVisor sandbox (requires runsc)
python scripts/sandbox_command.py --backend gvisor --mode audit --workspace /path/to/repo -- docker run -it --rm --runtime=runsc ...
```

The `scripts/sandbox_command.py` helper prints a hardened command; add `--execute` only when deliberately intending to run it.

---

## Running all evals

```bash
# List all evals
python scripts/run_eval.py . --list  # (if supported)

# Or iterate manually
for id in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15; do
  echo "=== Eval $id ==="
  python scripts/run_eval.py . --eval $id --harness claude-code --condition with-skill
done
```

---

## Missing a harness driver?

If you need automated harness invocation for a specific CLI, contribute a driver script:

1. Probe the CLI for version and headless flags
2. Identify the safe tool allowlist for the eval fixture
3. Write a thin wrapper in `scripts/run_<harness>_trial.py`
4. Document the usage
5. Open a PR