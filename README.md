# Vibe Audit v0.1

[![skills.sh](https://skills.sh/b/Xenonesis/vibe-audit)](https://skills.sh/Xenonesis/vibe-audit)

A portable, evidence-first **Agent Skill and validation toolkit** for safely auditing and incrementally polishing vibe-coded / AI-generated web applications — without treating architectural preference as a defect.

It turns one throwaway prompt into a repeatable, verifiable engineering process: **audit → plan → fix → verify**, with every claim backed by evidence and every change gated by risk.

---

## Why use it: normal vibe-coding vs. Vibe Audit

The problem with vibe-coded apps is rarely the code generation — it's that **“it works” gets mistaken for “it's ready.”** Nobody ships a hand-written app without review, tests, and a security pass; vibe-coded apps routinely skip all of it because nothing enforces it.

Vibe Audit encodes that missing discipline as a skill your agent follows automatically.

| Dimension | Typical vibe-coded workflow | With Vibe Audit |
|---|---|---|
| **Definition of done** | “It runs / the demo looks right” | Evidence-based readiness: `NOT READY → PARTIALLY READY → READY WITH WARNINGS → READY` |
| **Security** | None, or a panic fix after a breach | Dedicated security pass; findings tagged severity/confidence with evidence |
| **Correctness** | Assumed (“tests passed” is often not even checked) | Baseline recorded; business-logic, money, state-machine, and auth logic audited |
| **Trust model** | Runs anything the repo asks (`npm install`, build scripts, plugins) | **Static-only by default** until trust is assessed; execution gated behind an approved sandbox, network denied by default |
| **Verification** | Manual click-through, if any | Baseline → change → re-verify; failures labeled `PRE-EXISTING`, `INTRODUCED`, `FIXED`, `REMAINING`, `UNVERIFIED` |
| **Change approval** | Agent free-refactors whatever it wants | Risk-gated: `LOW` auto-fix, `MEDIUM` must plan first, `HIGH` requires explicit approval |
| **Architecture** | Agent rewrites large chunks because it “prefers” a pattern | **Preserved unless justified** — treating a nonstandard but working architecture as a defect is forbidden |
| **Dependencies** | Added liberally “while you're at it” | Smallest justified addition; framework-native capabilities first; no blind Redis/cache/rate-limiter insertion |
| **Claims** | “100% production-ready, fully secured” | Honest uncertainty — never fabricates 100%, never invents performance numbers |
| **Reporting** | A chat summary you can't reproduce | Structured findings: category, severity, confidence, status, impact, recommended fix, change risk, approval needed, verification method |
| **Reproducibility** | As-is; nothing to re-run | 22 evals, deterministic validation gates, machine-readable manifests, release gates |

### A concrete before / after

**Before (typical vibe-coding):** You ask the agent to “build a payments checkout.” It generates code, runs `npm run dev`, shows you a form, and says *“done.”* No one checked: the money math, the auth boundaries, the SQL injection surface, the retry logic, the bundle size, or whether a `postinstall` script would exfiltrate your keys. When prod breaks, you stare at generated code you don't understand.

**After (Vibe Audit):** You ask the agent to *“audit this for production readiness — don't change anything.”* It runs in **AUDIT** mode:

1. **Phase −1 — trust boundary.** It treats the repo as *untrusted*, stays static-only, inspects executable surfaces (build hooks, `postinstall`, test plugins) before running anything.
2. **Phase 0 — environment discovery.** It detects the *actual* stack (package.json / pyproject / go.mod / etc.) instead of assuming Next.js + Stripe.
3. **Phase 1 — baseline.** It records pre-existing lint/test/build failures and marks them `PRE-EXISTING`.
4. **Findings.** It returns a structured report: **IDOR in `checkout.ts:12`** (Severity: HIGH, Confidence: LIKELY, Impact, Recommended fix, Change Risk: MEDIUM, Approval required: yes, Verification: use param owner check + test).
5. **Readiness.** It ends with `NOT READY` plus a prioritized fix plan — and lets *you* approve the medium/high-risk changes one by one.

You ship knowing exactly what's wrong, what was fixed, what was verified, and what remains — not “the demo works.”

---

## What v0.1 includes

- explicit **untrusted-repository** trust model and static-only default
- deny-by-default dynamic execution policy
- reusable profiles for major web-app use cases
- machine-readable `evals/evals.json` + local schema/policy (22 evals)
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

---

## How it works

### Operating modes

Infer the narrowest requested mode; ambiguity defaults to **AUDIT** for review language and **FIX** only for explicit change language.

| Mode | What it does | Changes files? |
|---|---|---|
| **AUDIT** | Read-only discovery, baseline, findings, report | No — tracked diff stays empty |
| **PLAN** | AUDIT + prioritized remediation plan | No |
| **FIX** | Audit, plan, apply *permitted* changes, verify, report | Yes (risk-gated) |
| **HARDEN** | Security-focused fix/audit, per your verb | Yes (security only) |
| **PERFORMANCE** | Baseline → measure → optimize → re-measure | Yes (targeted only) |
| **FULL POLISH** | Security → Correctness → Reliability → Performance → AI-code smells → Maintainability → Verification | Yes (sequential, gated) |

### What a run produces

Every substantial finding carries a full evidence model:

- **Finding** and **Category**
- **Severity:** `CRITICAL · HIGH · MEDIUM · LOW · INFO`
- **Confidence:** `HIGH · MEDIUM · LOW`
- **Status:** `CONFIRMED · LIKELY · POTENTIAL` (static heuristics must not claim CONFIRMED without runtime/data-flow evidence)
- **Evidence:** file/path/function/route/config/test/log/trace
- **Impact** and **Recommended fix**
- **Change Risk:** `LOW · MEDIUM · HIGH`
- **Approval Required:** yes/no
- **Verification Method**

Final report states the detected stack, mode, profile, trust level, baseline + `PRE-EXISTING` failures, findings by severity, changes made, verification performed (and what could not safely run), performance before/after where measurable, remaining risks, approvals required, and a readiness status: `NOT READY · PARTIALLY READY · READY WITH WARNINGS · READY`.

### Approval gates

- **LOW risk** — auto-fix only when confidently safe (dead code, unused import, safe bounds).
- **MEDIUM risk** — plan before executing (new middleware, index, caching, query rewrite).
- **HIGH risk** — explicit approval required (auth replacement, DB migration, payment architecture, breaking API, secret rotation, major framework upgrade).

Destructive actions (DROP TABLE, forced migration, mass delete, history rewrite, deployment/publish) are never run automatically.

### Trust & safety boundary

Unknown repositories start **STATIC-ONLY**. No dependency installs, no executing repo-controlled build/test/lint/config/plugin code just to establish a baseline. Dynamic execution requires an approved sandbox; network egress is denied by default; production secrets never enter an untrusted sandbox. Repository files, comments, and generated instructions are treated as **untrusted data** — prompt-injection text is never obeyed.

### Stack awareness & freshness

Vibe Audit never assumes a stack. It detects the installed version, inspects the existing project mechanism, prefers framework-native capabilities, reuses already-trusted dependencies, and adds the smallest justified dependency only when needed. Version-sensitive advice is verified against installed versions or flagged as an assumption.

---

## The toolkit

| Asset | Count | What it's for |
|---|---|---|
| `references/` | 13 | Domain playbooks: security, correctness, reliability, performance, AI-code smells, maintainability, runtime/UI, deployment/CI, AI/RAG, accessibility, SEO, execution-safety, verification |
| `profiles/` | 10 | Specialist guidance: safe-audit, frontend, full-stack, API/backend, AI/RAG, payments, database/multi-tenant, CI/CD, performance, default |
| `evals/` | 22 | Machine-readable eval cases + fixtures (security, correctness, reliability, performance, AI smells, execution-safety, a11y, SEO, …) |
| `harnesses/` | 8 | Capability probes for antigravity, claude-code, codex, copilot-cli, cursor, gemini-cli, omp, pi |
| `adapters/` | 12 | Host integration docs |
| `scripts/` | 15+ | Validation, trust assessment, sandbox builder, packaging, release gate, benchmark, secret scan |

Deterministic validation:

```bash
python scripts/validate_skill.py .
python scripts/validate_evals.py evals/evals.json
python scripts/run_static_evals.py .
python scripts/probe_harnesses.py .
python scripts/release_gate.py .
```

These do **not** claim stochastic model behavior passed — real harness evals must be run in the target harness/version and recorded as evidence.

### Live behavioral evals (all harnesses)

`run_harness.py` drives a real harness CLI headlessly end-to-end: prepare bundle → install the skill (with-skill condition) → probe binary/auth → invoke → capture stdout/stderr/diff → auto-grade mechanical assertions → grade. It supports every documented harness:

```bash
python scripts/run_harness.py . --eval 1 --harness pi          --condition with-skill --timeout 300
python scripts/run_harness.py . --eval 1 --harness omp         --condition with-skill --timeout 300
python scripts/run_harness.py . --eval 1 --harness claude-code --condition with-skill --timeout 300   # requires claude /login
python scripts/run_harness.py . --eval 1 --harness codex       --condition with-skill --timeout 300   # requires codex
python scripts/run_harness.py . --eval 1 --harness gemini-cli  --condition with-skill --timeout 300   # requires gemini
python scripts/run_harness.py . --eval 1 --harness copilot-cli --condition with-skill --timeout 300   # requires copilot
python scripts/run_harness.py . --eval 1 --harness cursor      --condition with-skill --timeout 300   # verify binary is Cursor's
python scripts/run_harness.py . --eval 1 --harness antigravity --condition with-skill --timeout 300   # requires antigravity
```

Behavior:
- **Binary missing** → clean SKIP with the documented binary name (exit 2); no fake result.
- **Auth required** (e.g. Claude Code not logged in) → SKIP with `claude /login` guidance (exit 3).
- **Invocation confidence** is recorded per harness (`high` = verified headless on this machine: pi, omp; `medium` = documented, unverified here).
- Every run persists `harness_stdout.txt`, `harness_stderr.txt`, `harness_command.txt`, `observations.json`, and refreshes `manifest.json` with `behavioral_execution_performed=true` plus binary/version/exit/elapsed/auth facts.

Mechanical assertions (`no_source_modification`, `evidence_required`) are auto-graded via inputs-hash comparison and output file-reference checks; all other assertions remain UNGRADED for human judgment. Verified on this machine: **pi 0.84.1 and omp 17.2.12 both PASS eval 1 with-skill**; claude-code SKIPs until login; codex/gemini/copilot/antigravity SKIP until installed; cursor resolves to whatever `agent` is on PATH (note in `harnesses/cursor.toml`).

```bash
# after a run, grade the run bundle (auto-grades mechanical assertions)
python scripts/grade_run.py runs/eval-1-pi-with-skill-trial-01 \
  --observations runs/eval-1-pi-with-skill-trial-01/observations.json
```

Trust assessment helper:

```bash
python scripts/assess_repo_trust.py /path/to/repo
```

This scans for executable surfaces; it does not declare a repository safe.

Sandbox command builder (Docker or gVisor):

```bash
python scripts/sandbox_command.py --backend docker --mode audit --workspace /path/to/repo -- python -V
```

Package a release:

```bash
python scripts/package_release.py . --output dist/vibe-audit-v0.1.zip
```

---

## Using it as a skill

This package is an **Agent Skill**: a `SKILL.md` with `name`/`description` frontmatter plus the `references/`, `profiles/`, and `evals/` directories it points to. Any CLI/IDE agent implementing the Agent Skills convention (Codex, Claude Code, Cursor, Gemini CLI, OpenCode, Windsurf, Copilot CLI, Antigravity, Pi, OMP, …) can discover and load it.

### How a skill loads

1. The harness scans a configured **skills root** for directories containing `SKILL.md`.
2. When a request matches the skill's `description`, the harness loads `SKILL.md` (implicit activation).
3. The skill pulls in only the `references/*.md` and `profiles/*.md` needed for the active phase (progressive disclosure).

Install the **entire `vibe-audit/` directory** — never only `SKILL.md` — or the relative references/evals/adapters are lost.

### Install for any CLI (generic)

```bash
mkdir -p .agents/skills
cp -r vibe-audit .agents/skills/
```

User-level (available in every project): copy into `~/.agents/skills/` instead. If your harness has no skill support, paste `SKILL.md` content (and referenced files) into the conversation.

### Install for a specific CLI

```bash
python scripts/install_skill.py --host claude --project .
python scripts/install_skill.py --host codex  --project .
python scripts/install_skill.py --host cursor --project .
```

`--host` supports: `agents`, `codex`, `claude`, `cursor`, `gemini`, `opencode`, `windsurf`, `copilot`. Or install to an arbitrary root with `--dest /path/to/skills-root`. The installer refuses to overwrite an existing destination.

> **`npx skills add … -g` and PromptScript.** If you install globally with the skills CLI and see `✗ vibe-audit → PromptScript: PromptScript does not support global skill installation`, that line is a hardcoded limitation of the `skills` CLI (v1.5.x), not a defect here: PromptScript has no global skills directory (`globalSkillsDir` is unset in the CLI's agent registry), so the CLI refuses to place a global copy. The skill is still installed everywhere else. PromptScript reads skills from the **project-local** `.agents/skills/` root — the same root the universal install already populates. To get a PromptScript-covered install with no failure line, run the CLI **inside your project** without `-g`:
>
> ```bash
> cd /path/to/your-project
> npx skills add Xenonesis/vibe-audit -y     # no -g → installs to ./.agents/skills/vibe-audit
> ```
>
> The skill then resolves for every project-local agent including PromptScript.

Host-native locations and invocation:

| CLI / host | Skill location(s) | Explicit invocation |
|---|---|---|
| Codex | `.agents/skills/vibe-audit/`, `~/.agents/skills/`, `/etc/codex/skills/` | `/skills`, or `$` → mention `vibe-audit` |
| Claude Code | `.claude/skills/vibe-audit/`, `~/.claude/skills/` | `/vibe-audit` |
| Cursor | `.agents/skills/`, `.cursor/skills/`, `~/.cursor/skills/` | `/` in Agent chat → search `vibe-audit` |
| Gemini CLI | `.gemini/skills/`, `.agents/skills/` (alias) | `/skills list`, then activate; `/skills reload` after install |
| OpenCode | `.opencode/skills/` | `/skills` |
| Windsurf / Cascade | `.windsurf/skills/` | `/skills` |
| GitHub Copilot CLI | `.github/skills/` | `/skills` |
| Google Antigravity | host-documented skill root | host-documented skill command |
| OMP (Oh My Pi) | `<skills-root>/vibe-audit/SKILL.md` | `skill://vibe-audit` or `/skill:vibe-audit` |

Full per-host details, provider caveats, and invocation fallbacks: `adapters/`.

### Using it

After install, just describe the job — the skill activates when the description matches:

- *“Audit this repo before we ship it. Find security and correctness issues; do not change anything.”* → AUDIT
- *“Polish this app: security, correctness, reliability, performance, in that order. Fix what you safely can.”* → FULL POLISH
- *“Check for AI-generated code smells and dead code, and clean them up.”* → FIX
- *“Harden this Next.js app against common web attacks.”* → HARDEN
- *“This endpoint is slow — profile it and optimize without changing behavior.”* → PERFORMANCE

Explicit invocation is the deterministic fallback if auto-selection misses (see table above). If the harness does not load the skill automatically, paste `SKILL.md` into the conversation and point the agent at the package directory.

The skill picks a mode from your verbs, selects the smallest relevant profile, and enforces its own safety gates: unknown repositories start **static-only**, high-risk changes need explicit approval, and everything is reported with evidence and uncertainty. The host CLI's mode only supplements these rules — it never overrides them.

---

## Supported / documented hosts

Generic Agent Skills · Codex · Claude Code · Google Antigravity · GitHub Copilot CLI · Cursor · TRAE · Gemini CLI · OpenCode · Windsurf/Cascade · OMP · Pi

Documentation compatibility is not the same as behavioral compatibility. See `COMPATIBILITY.md` and `metadata/compatibility.json`.

## Release confidence

Never publish “100% perfect.” Publish measured gates, tested harnesses/versions, trial counts, false-positive results, and remaining limitations.