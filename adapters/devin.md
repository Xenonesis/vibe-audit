# Devin Adapter

Devin (Cognition) is an autonomous software engineering agent running in secure cloud sandboxes with structured instruction discovery.

## Locations
Project:
- `AGENTS.md`
- `docs/playbooks/vibe-audit.md`

## Integration
Devin reads root `AGENTS.md` automatically on session start.

## Invocation
- Web Session: prompt Devin with "Audit this repository following the guidelines in AGENTS.md and SKILL.md. Produce a remediation plan without applying code changes."
- API / CLI: dispatch task with `vibe-audit` tag.

## Safety & Invariants
Devin's built-in cloud sandbox executes code safely, but Vibe Audit's static-only rule still applies to unknown repository lifecycle scripts.

Official reference: https://docs.devin.ai/
