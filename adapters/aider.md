# Aider Adapter

Aider integrates Vibe Audit principles through repository convention files and CLI configuration.

## Locations
Project:
- `CONVENTIONS.md` (or `.aider.conventions.md`)
- `.aider.conf.yml`

## Rule Setup
Export native conventions using:
```bash
vibe-audit export .
```
This generates `CONVENTIONS.md` containing core Vibe Audit non-regression and evidence-first rules.

## Invocation
- Terminal: `aider --message "Audit the workspace according to CONVENTIONS.md"`
- Read-only Audit: run Aider in read-only / test mode with `/read-only` or pass `--read CONVENTIONS.md` to prevent accidental source modification during AUDIT / PLAN phases.

## Safety Mapping
- Static-first verification: do not allow Aider to run unverified install hooks.
- High-risk gate: user must explicitly approve schema migrations and auth modifications before git commits.

Official reference: https://aider.chat/docs/
