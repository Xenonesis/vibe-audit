# Vibe Audit v0.2 — Feature Design Spec

**Date:** 2026-08-31  
**Status:** Approved  
**Scope:** 9 new features across Go CLI, reference files, and compliance profiles  
**Release target:** v0.2.0  

---

## Problem Statement

Vibe coders face a documented "production gap": 74% of AI-generated code requires significant post-deployment remediation. The core failure modes are:

1. No feedback loop — Prompt → Visual check → Push. Verification skipped.
2. Security blind spots — 45% of AI coding tasks introduce new vulnerabilities.
3. No production-readiness signal — "Works in demo" is mistaken for "deploy safe."
4. Missing observability — No logging, monitoring, or health endpoints.
5. Database risks — In-memory guards that break in distributed production.
6. Dependency blind trust — `npm install` with no CVE or license check.
7. Environment mismatch — Dev assumptions baked into production code.
8. Weak tests — Happy-path-only AI-generated tests with zero boundary coverage.
9. No compliance baseline — GDPR/HIPAA patterns completely absent.

Vibe Audit v0.1 addresses security, correctness, and reliability. v0.2 closes the remaining gaps.

---

## Architecture

9 features across 3 layers. Existing SKILL.md core policy, approval gates, and finding model are unchanged.

```
Layer 1 — Go CLI (new subcommands)
  ├── vibe-audit deps      → Dependency Time-Bomb Scanner
  ├── vibe-audit env       → Environment Parity Checker
  └── vibe-audit score     → Production Readiness Scorecard

Layer 2 — New Reference Files (agent guidance)
  ├── references/observability.md
  ├── references/database-risks.md
  ├── references/test-quality.md
  └── references/deployment-gate.md

Layer 3 — New Profiles (opt-in)
  ├── profiles/gdpr.md
  ├── profiles/hipaa.md
  └── profiles/compliance-lite.md
```

**Audience:** Solo vibe coders (default: plain text output, zero config) and small teams/CI (opt-in: `--report json` flag, consistent schema).

---

## Layer 1 — Go CLI New Subcommands

### 1. `vibe-audit deps [path]` — Dependency Time-Bomb Scanner

Scans manifest files: `package.json`, `go.mod`, `requirements.txt`, `Cargo.toml`, `Gemfile`.

**Checks:**
- Known CVEs via OSV.dev API (free, no API key required; offline fallback: warn and skip)
- Abandoned packages: last release > 2 years old (GitHub API, optional; skip gracefully if unavailable)
- License incompatibility: GPL/AGPL detected in non-GPL project context
- Lockfile integrity: `package-lock.json` or `yarn.lock` missing or out of sync with manifest

**Output (default plain text):**
```
vibe-audit deps .

CRITICAL  lodash@4.17.20       CVE-2021-23337 (prototype pollution)
HIGH      left-pad@1.3.0       Last release: 2019-04-07 (abandoned)
MEDIUM    gpl-lib@2.0.0        License: GPL-3.0 — incompatible with MIT project
INFO      package-lock.json    In sync ✓

3 findings. Run with --report json for CI output.
```

**Output (`--report json`):** Standard findings JSON schema (see Integration section).

**Non-goals:** Does not install dependencies. Does not execute any package code. Static manifest + lockfile read only.

---

### 2. `vibe-audit env [path]` — Environment Parity Checker

Static scan only. Never executes repository code.

**Checks:**
- Hardcoded `localhost` or `127.0.0.1` outside `*.test.*`, `*.spec.*`, `test/`, `__tests__/` directories
- `NODE_ENV === 'development'` or `process.env.NODE_ENV !== 'production'` conditional logic in non-test source files
- `.env.example` vs actual `process.env.KEY` / `os.getenv("KEY")` usage gap (keys used in source but absent from `.env.example`)
- Missing startup env validation: no crash-fast pattern on missing required vars (no `if (!process.env.DATABASE_URL) throw` or equivalent)
- Debug flags left active: `DEBUG=true`, `VERBOSE=1`, `LOG_LEVEL=debug` in committed config files

**Output (default plain text):**
```
vibe-audit env .

HIGH    src/api/client.ts:14    Hardcoded localhost: "http://localhost:3000/api"
MEDIUM  src/config.ts:8         NODE_ENV dev-only branch in production source
MEDIUM  .env.example            Missing keys used in source: DATABASE_URL, REDIS_URL
LOW     config/app.json:3       DEBUG flag set to true

4 findings. Run with --report json for CI output.
```

**Non-goals:** Does not validate env var values. Does not connect to external services.

---

### 3. `vibe-audit score [findings.json]` — Production Readiness Scorecard

Takes JSON findings output from `--report json` audit → emits 0–100 score per dimension and overall.

**Score formula:**

```
dimension_score = 100 - Σ(severity_weight × finding_count)

Severity weights: CRITICAL=25, HIGH=15, MEDIUM=8, LOW=3, INFO=0
Score floor: 0 (never negative)

Overall = weighted average across 6 dimensions:
  Security:      30%
  Correctness:   20%
  Reliability:   15%
  Observability: 15%
  Test Quality:  10%
  Deployment:    10%
```

**Readiness bands:**
- 85–100 → `READY`
- 70–84  → `READY WITH WARNINGS`
- 50–69  → `PARTIALLY READY`
- 0–49   → `NOT READY`

**Output (default plain text):**
```
vibe-audit score findings.json

Overall: 61/100  [PARTIALLY READY]
├── Security:      45/100  🔴
├── Correctness:   70/100  🟡
├── Reliability:   65/100  🟡
├── Observability: 40/100  🔴
├── Test Quality:  75/100  🟢
└── Deployment:    80/100  🟢

Top priority: Fix 2 CRITICAL security findings to reach READY WITH WARNINGS.
```

**Output (`--report json`):** Score object embedded in standard schema (see Integration section).

**Non-goals:** Score is a heuristic signal, not a guarantee. Never claim "READY = production safe."

---

## Layer 2 — New Reference Files

### 4. `references/observability.md` — Observability Gap Audit

**Trigger:** Load during FULL POLISH mode, or when user mentions "monitoring", "logging", "observability", "alerts", "health check".

**Checks:**
- No structured logging: only `console.log`/`fmt.Println`/`print()` detected, no logging library (`winston`, `pino`, `zap`, `slog`, `loguru`)
- No error tracking integration: no Sentry, Datadog, Rollbar, Honeybadger, or equivalent SDK import
- No health check endpoint: no `/health`, `/ping`, `/ready`, `/livez`, `/healthz` route defined
- No request ID or correlation ID propagation across service boundaries
- Silent error swallowing: `catch(e) {}` or `except: pass` empty blocks in non-test code
- No performance metrics collection: no counters, histograms, or timing instrumentation

**Finding format:** Standard finding model (Finding, Category=Observability, Severity, Confidence, Evidence, Impact, Recommended fix, Change Risk, Approval Required, Verification Method).

---

### 5. `references/database-risks.md` — Database Risk Profile

Extracted and expanded from `references/security.md`. That file retains injection-specific DB security; this file covers structural database risks.

**Trigger:** Load when DB or ORM detected in stack (prisma, sequelize, sqlalchemy, gorm, ActiveRecord, etc.), or `database-multitenant` profile active, or FULL POLISH mode.

**Checks:**
- N+1 query patterns: ORM `.find()`, `.where()`, or `.filter()` calls inside loops without `.includes()`/`.joinedLoad()`/`.preload()`
- Missing indexes: foreign key columns without index, columns used in `.where()` / `WHERE` clauses likely unindexed
- Raw SQL string concatenation: template literals or string `+` building SQL fragments (injection risk beyond parameterization)
- Schema migration safety: `DROP COLUMN`, `DROP TABLE`, `ALTER COLUMN` without rollback migration present
- Multi-tenant RLS gap: shared table queries missing `WHERE tenant_id = $current_tenant` or equivalent RLS policy
- Connection pool misconfiguration: no pool size limit set, no connection timeout, no idle timeout

**Relationship to `references/security.md`:** security.md retains SQL injection (parameterization). This file covers performance, correctness, and isolation risks. Both may be loaded simultaneously without duplication.

---

### 6. `references/test-quality.md` — AI Test Generation Evaluator

**Trigger:** Load when `test-quality` explicitly requested, or FULL POLISH mode, or when AI-generated tests are detected (high mock density, template-looking test names).

**Checks:**
- Test-to-source ratio: total test LOC / total source LOC < 0.3 → flag as LOW
- Happy-path-only: no negative assertions, no error case branches, no `expect(...).toThrow()` / `assertRaises` / `assert_eq!(Err(...))` in test files
- Mock-everything anti-pattern: >80% of test dependencies are mocked → zero integration confidence signal
- Missing boundary tests: no empty string, no null/undefined/None, no max-length, no zero/negative number inputs tested
- Test description mismatch: test name describes different behavior from what is actually asserted (AI hallucination tell — heuristic, LOW confidence)
- Missing critical path tests: no tests covering auth flows, payment flows, or data-mutation routes specifically

**Confidence note:** Test quality checks are heuristic. Mark findings POTENTIAL unless evidence is strong. Do not flag as CONFIRMED without clear code evidence.

---

### 7. `references/deployment-gate.md` — Pre-launch Deployment Safety Checklist

**Trigger:** Load when user says "deploy", "launch", "go live", "ship", "production push", or FULL POLISH mode.

**Checklist (binary pass/fail per item):**

| Item | Check method | Severity if missing |
|---|---|---|
| HTTPS enforced | No HTTP-only server config, HSTS header present | HIGH |
| Rate limiting on auth endpoints | Middleware on `/login`, `/signup`, `/reset-password` | HIGH |
| Custom error pages | No framework default stack trace pages in prod config | MEDIUM |
| All secrets in env vars | No string literals matching secret patterns in source | CRITICAL |
| CORS configured restrictively | No `Access-Control-Allow-Origin: *` on authenticated routes | HIGH |
| Health endpoint responds | `/health` or equivalent route defined and returns 200 | LOW |
| `NODE_ENV=production` or equivalent | Production mode flag set in deployment config | MEDIUM |
| Dependency audit clean | `npm audit --audit-level=high` exits 0, or equivalent | HIGH |
| Database backup strategy | Backup config, cron, or managed backup documented/present | MEDIUM |
| Rollback procedure | Rollback documented in README, runbook, or IaC | LOW |

**Non-goals:** Does not run deployments. Does not connect to cloud providers. Static + heuristic only.

---

## Layer 3 — New Compliance Profiles

**Important disclaimer (embed in all 3 profiles):**
> These are technical heuristic checks against common compliance patterns. They are not legal advice and do not constitute a compliance certification. Consult qualified legal and security professionals for regulatory compliance decisions.

---

### 8. `profiles/gdpr.md` — GDPR Compliance Lite

**Trigger:** User mentions "GDPR", "EU users", "data protection", "personal data", or PII fields detected in DB schema.

**Checks:**
- PII columns without encryption markers: `email`, `phone`, `ssn`, `dob`, `address`, `ip_address` columns in schema without `encrypted`, `hashed`, or vault reference
- No consent capture mechanism: no cookie consent component, no terms-of-service acceptance flow in auth
- No data deletion pathway: no `DELETE /users/:id` or account deletion endpoint
- Personal data in plain text logs: `email`, `phone` values interpolated directly into log statements
- No data retention policy: no TTL, no scheduled cleanup job, no soft-delete with purge strategy
- Third-party scripts without consent gate: analytics or ad scripts loaded unconditionally on page load

---

### 9. `profiles/hipaa.md` — HIPAA Compliance Lite

**Trigger:** User mentions "HIPAA", "healthcare", "PHI", "patient data", "medical records".

**Checks:**
- PHI fields without encryption at rest: health-related columns (`diagnosis`, `medication`, `condition`, `patient_id`) without encryption
- Audit logging absent: no record of who accessed PHI data, when, and from where
- No session timeout: authenticated sessions with no idle timeout configuration
- PHI in URL parameters: health data values in query strings (logged by servers and proxies)
- Missing access control on health data routes: no role or permission check before PHI access
- Error messages leaking PHI: stack traces or error responses containing patient data values

---

### `profiles/compliance-lite.md` — SOC2-lite for Solo Devs

**Trigger:** User says "compliance", "SOC2", "enterprise client", "audit", or team context detected without specific regulation named.

Intersection of Security + GDPR + HIPAA patterns, simplified for solo developers:
- Secrets management: no hardcoded credentials
- Access logging: authentication events logged
- Dependency vulnerabilities tracked: audit tool present or run in CI
- Data encrypted in transit: HTTPS enforced
- Authentication on all data mutation endpoints
- Basic audit trail: record of significant data changes exists

---

## Integration — Cross-Cutting Concerns

### SKILL.md Changes

**Progressive disclosure table additions (4 new lines):**
```
- Observability gap audit:    references/observability.md
- Database risk deep-dive:    references/database-risks.md
- Test quality review:        references/test-quality.md
- Deployment gate checklist:  references/deployment-gate.md
```

**Profile table additions (3 new lines):**
```
- Unknown compliance requirement: profiles/compliance-lite.md
- GDPR-regulated data:            profiles/gdpr.md
- HIPAA-regulated data:           profiles/hipaa.md
```

**Phase 0 environment discovery addition (2 new lines):**
```
- Run `vibe-audit deps .` if manifest files present
- Run `vibe-audit env .` before any dynamic execution
```

**Core policy unchanged:** Approval gates, finding model, severity/confidence/status taxonomy, forbidden behaviors, atomic change strategy — all v0.1 values preserved.

---

### `--report json` Schema

Consistent across all CLI subcommands and agent audit output:

```json
{
  "tool": "vibe-audit",
  "version": "0.2.0",
  "subcommand": "deps | env | score | scan",
  "timestamp": "2026-08-31T00:00:00Z",
  "findings": [
    {
      "id": "DEP-001",
      "category": "dependency",
      "severity": "CRITICAL | HIGH | MEDIUM | LOW | INFO",
      "confidence": "HIGH | MEDIUM | LOW",
      "status": "CONFIRMED | LIKELY | POTENTIAL",
      "evidence": "lodash@4.17.20 — CVE-2021-23337",
      "impact": "Prototype pollution exploitable by untrusted input",
      "recommended_fix": "Upgrade to lodash@4.17.21",
      "change_risk": "LOW",
      "approval_required": false
    }
  ],
  "score": {
    "overall": 61,
    "readiness": "PARTIALLY READY",
    "dimensions": {
      "security":      { "score": 45, "signal": "red" },
      "correctness":   { "score": 70, "signal": "yellow" },
      "reliability":   { "score": 65, "signal": "yellow" },
      "observability": { "score": 40, "signal": "red" },
      "test_quality":  { "score": 75, "signal": "green" },
      "deployment":    { "score": 80, "signal": "green" }
    }
  }
}
```

`score` object is `null` when subcommand is `deps`, `env`, or `scan` (score requires a full findings set).

---

## Evals

### New Eval Cases — 18 added (22 → 40 total)

| Category | Count | Trigger condition | Expected behavior |
|---|---|---|------|
| Observability | 3 | Missing logging lib / no health endpoint / silent catch | Agent flags each, recommends fix |
| Database Risks | 3 | N+1 in loop / raw SQL concat / missing RLS | Agent flags with evidence |
| Dependency Scanner | 3 | Known CVE fixture / abandoned package / GPL conflict | CLI exits with findings |
| Env Parity | 2 | Hardcoded localhost / missing env validation | CLI flags file+line |
| Test Quality | 3 | Happy-path-only / 100% mocked / no boundary tests | Agent flags LOW confidence |
| Deployment Gate | 2 | HTTPS missing / secret in source | Agent flags CRITICAL/HIGH |
| GDPR compliance | 1 | PII column unencrypted, no deletion endpoint | Agent flags with disclaimer |
| Scorecard | 1 | Known findings JSON input → expected score ±2 | CLI score matches formula |

### CLI Test Coverage

`cli/main_test.go` — 3 new test functions:
- `TestDepsScanner`: runs against `evals/fixtures/package-with-cve.json` → expects CRITICAL finding for known CVE package
- `TestEnvChecker`: runs against `evals/fixtures/src-with-localhost/` → expects HIGH finding on hardcoded URL
- `TestScoreCalculator`: unit test with known findings input → expected overall score within ±2 of formula result

### Release Gate Updates

`metadata/release-gates.json`:
- Eval pass threshold: 40/40 (was 22/22)
- New gate: `deps_scanner_functional` — `vibe-audit deps evals/fixtures/` exits 0 on clean fixture
- New gate: `env_checker_functional` — `vibe-audit env evals/fixtures/clean-src/` exits 0 on clean fixture
- New gate: `score_calculator_accurate` — score unit test passes

---

## File Manifest — New Files

```
cli/
  main.go                     (modified — 3 new subcommands added)
  main_test.go                (modified — 3 new test functions)

references/
  observability.md            (new)
  database-risks.md           (new)
  test-quality.md             (new)
  deployment-gate.md          (new)

profiles/
  gdpr.md                     (new)
  hipaa.md                    (new)
  compliance-lite.md          (new)

evals/
  evals.json                  (modified — 18 new cases)
  fixtures/
    package-with-cve.json     (new — test fixture)
    src-with-localhost/       (new — test fixture directory)
    clean-src/                (new — clean fixture for gate)

SKILL.md                      (modified — 7 new pointer lines)
metadata/release-gates.json   (modified — new gates + threshold)
VERSION                       (bump 0.1.0 → 0.2.0)
CHANGELOG.md                  (new entry)
```

**Total new files: 11. Modified files: 6.**

---

## Non-Goals

- No breaking changes to existing SKILL.md policy or approval gates
- No new external service dependencies required (OSV.dev API is optional — graceful skip if offline)
- No changes to existing 22 eval cases or their expected behaviors
- Compliance profiles are heuristic only — not legal certification tools
- Score is a signal, not a deployment gate enforcer — the tool never blocks deployments automatically
- No UI changes to the Next.js website in this release (separate task)
