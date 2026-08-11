# Vibe-Coding Polisher v2.0.0

A portable, evidence-first Agent Skill and validation toolkit for safely auditing and incrementally polishing vibe-coded / AI-generated web applications.

## What v2 adds

v2 keeps the compact core skill and adds the missing execution/proof layer:
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

## Project install
Where supported, prefer:

```text
.agents/skills/vibe-coding-polisher/
```

Host-native locations and explicit invocation fallbacks are documented in `adapters/`.

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
python scripts/package_release.py . --output dist/vibe-coding-polisher-v2.0.0.zip
```

## Release confidence
Never publish “100% perfect.” Publish measured gates, tested harnesses/versions, trial counts, false-positive results, and remaining limitations.
