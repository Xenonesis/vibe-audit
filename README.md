# Vibe-Coding Polisher v0.1

A portable, evidence-first Agent Skill and validation toolkit for safely auditing and incrementally polishing vibe-coded / AI-generated web applications.

## What v0.1 adds

v0.1 keeps the compact core skill and adds the missing execution/proof layer:
- explicit **untrusted-repository** trust model and static-only default
- deny-by-default dynamic execution policy
- reusable profiles for major web-app use cases
- machine-readable `evals/evals.json` + local schema/policy
- adversarial execution-safety fixtures
- deterministic package/release gates
- compatibility/freshness/deprecation metadata
- harness capability probes and normalized runner metadata
- optional Docker/gVisor sandbox command builder
- optional Playwright runtime/browser suite
- hardened GitHub Actions examples with immutable action SHAs

## Core pillars
Security · Correctness · Reliability · Performance · AI-Code Quality · Maintainability

## Optional modules
Runtime/UI · Deployment/Infrastructure · AI/RAG/Agent Security · Accessibility · SEO · Execution Safety

## Important safety boundary

Unknown repositories start **STATIC-ONLY**. Do not install dependencies or execute repository-controlled build/test/lint/config/plugin code merely to establish a baseline. Inspect executable surfaces first. Dynamic execution requires an approved sandbox; network is denied by default; production secrets never enter an untrusted sandbox.

## Profiles
`profiles/` selects relevant guidance without changing mode safety. Included profiles cover safe audit, frontend, full-stack, API/backend, AI/RAG, payments, database/multi-tenant, CI/CD, and performance work.

## Supported/documented hosts
Generic Agent Skills · Codex · Claude Code · Google Antigravity · GitHub Copilot CLI · Cursor · TRAE · Gemini CLI · OpenCode · Windsurf/Cascade · OMP · Pi

Documentation compatibility is not the same as behavioral compatibility. See `COMPATIBILITY.md` and `metadata/compatibility.json`.

## Using it as a skill

This package is an **Agent Skill**: a `SKILL.md` with `name`/`description` frontmatter plus the supporting `references/`, `profiles/`, and `evals/` directories it points to. Any CLI/IDE agent that implements the Agent Skills convention (Codex, Claude Code, Cursor, Gemini CLI, OpenCode, Windsurf, Copilot CLI, Antigravity, Pi, OMP, …) can discover and load it.

### How a skill loads

1. The harness scans a configured **skills root** for directories containing `SKILL.md`.
2. When a user request matches the skill's `description`, the harness loads `SKILL.md` (implicit activation).
3. The skill then pulls in only the `references/*.md` and `profiles/*.md` needed for the active phase (progressive disclosure).

Install the **entire `vibe-coding-polisher/` directory** — never only `SKILL.md` — or the relative references/evals/adapters are lost.

### Install for any CLI (generic)

Copy the whole directory into the harness's documented skills root. The most interoperable project-local root, supported by most hosts:

```bash
mkdir -p .agents/skills
cp -r vibe-coding-polisher .agents/skills/
```

User-level (available in every project): copy into `~/.agents/skills/` instead. If your harness has no skill support, you can still use the skill manually by pasting `SKILL.md` content (and referenced files) into the agent conversation.

### Install for a specific CLI

Use the bundled installer:

```bash
python scripts/install_skill.py --host claude --project .
python scripts/install_skill.py --host codex  --project .
python scripts/install_skill.py --host cursor --project .
```

`--host` supports: `agents` (interoperable `.agents/skills`), `codex`, `claude`, `cursor`, `gemini`, `opencode`, `windsurf`, `copilot`. Or install to an arbitrary root with `--dest /path/to/skills-root`. The installer refuses to overwrite an existing destination.

Host-native locations and invocation:

| CLI / host | Skill location(s) | Explicit invocation |
|---|---|---|
| Codex | `.agents/skills/vibe-coding-polisher/`, `~/.agents/skills/`, `/etc/codex/skills/` | `/skills`, or `$` → mention `vibe-coding-polisher` |
| Claude Code | `.claude/skills/vibe-coding-polisher/`, `~/.claude/skills/` | `/vibe-coding-polisher` |
| Cursor | `.agents/skills/`, `.cursor/skills/`, `~/.cursor/skills/` | `/` in Agent chat → search `vibe-coding-polisher` |
| Gemini CLI | `.gemini/skills/`, `.agents/skills/` (alias) | `/skills list`, then activate; `/skills reload` after install |
| OpenCode | `.opencode/skills/` | `/skills` |
| Windsurf / Cascade | `.windsurf/skills/` | `/skills` |
| GitHub Copilot CLI | `.github/skills/` | `/skills` |
| Google Antigravity | host-documented skill root | host-documented skill command |
| OMP (Oh My Pi) | `<skills-root>/vibe-coding-polisher/SKILL.md` | `skill://vibe-coding-polisher` or `/skill:vibe-coding-polisher` |

Full per-host details, provider caveats, and invocation fallbacks: `adapters/`.

### Using it

After install, just describe the job in your prompt — the skill activates when the description matches:

- *“Audit this repo before we ship it. Find security and correctness issues; do not change anything.”* → AUDIT
- *“Polish this app: security, correctness, reliability, performance, in that order. Fix what you safely can.”* → FULL POLISH
- *“Check for AI-generated code smells and dead code, and clean them up.”* → FIX
- *“Harden this Next.js app against common web attacks.”* → HARDEN
- *“This endpoint is slow — profile it and optimize without changing behavior.”* → PERFORMANCE

Explicit invocation is the deterministic fallback if auto-selection misses (see table above). If the harness does not load the skill automatically, paste `SKILL.md` into the conversation and point the agent at the package directory.

The skill picks a mode from your verbs (AUDIT / PLAN / FIX / HARDEN / PERFORMANCE / FULL POLISH), selects the smallest relevant `profiles/*.md`, and enforces its own safety gates: unknown repositories start **static-only**, high-risk changes need explicit approval, and everything is reported with evidence and uncertainty. The host CLI's mode only supplements these rules — it never overrides them.

## Deterministic validation

```bash
python scripts/validate_skill.py .
python scripts/validate_evals.py evals/evals.json
python scripts/run_static_evals.py .
python scripts/probe_harnesses.py .
python scripts/release_gate.py .
```

These do **not** claim stochastic model behavior passed. Real harness evals must be run in the target harness/version and recorded as evidence.

## Trust assessment helper

```bash
python scripts/assess_repo_trust.py /path/to/repo
```

This scans for executable surfaces; it does not declare a repository safe.

## Sandbox command builder

```bash
python scripts/sandbox_command.py --backend docker --mode audit --workspace /path/to/repo -- python -V
```

Use `--backend gvisor` when Docker is configured with the `runsc` runtime. The helper prints a hardened command by default; add `--execute` only when you deliberately intend to run it.

## Package a release

```bash
python scripts/package_release.py . --output dist/vibe-coding-polisher-v0.1.zip
```

## Release confidence
Never publish “100% perfect.” Publish measured gates, tested harnesses/versions, trial counts, false-positive results, and remaining limitations.
