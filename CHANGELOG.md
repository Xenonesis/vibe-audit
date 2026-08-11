# Changelog

## 0.1.0 — 2026-08-11

### Added
- Explicit unknown-repository static-only trust boundary.
- `references/execution-safety.md` and `THREAT-MODEL.md`.
- Major-use-case profiles under `profiles/`.
- `evals/evals.json`, local schema, execution policy, accessibility/SEO/execution-safety cases.
- Adversarial execution-safety fixtures.
- `metadata/` compatibility, freshness, deprecation, and release-gate data.
- Machine-readable harness metadata and capability registry.
- Repository-trust assessor, eval validator, harness probe, sandbox command builder, secret scanner, release gate, and package builder.
- Optional Playwright smoke suite.
- Hardened GitHub Actions workflows with least-privilege permissions and full-SHA action pins.
- `LICENSE`, `SECURITY.md`, `SUPPORT.md`, release-gate and source documentation.

### Changed
- Core `SKILL.md` now fails closed when execution trust is unknown.
- Baseline order is static-first; project commands only run after trust/sandbox policy permits.
- Compatibility claims now distinguish documentation confidence from actual behavioral-test confidence.
- Release language requires measurable confidence instead of “100% perfect” claims.

## 1.1.0
- Added runtime/UI, deployment/infra, AI-app-security, accessibility, SEO references and broader host adapters.

## 1.0.0
- Initial six-pillar audit/fix skill with evidence, risk, approval, and verification rules.
