# OpenHands Adapter

OpenHands (formerly OpenDevin) supports autonomous software engineering workflows in isolated sandbox environments with structured instruction discovery.

## Locations
Project:
- `AGENTS.md`
- `.openhands/microagents/`
- `.agents/skills/vibe-audit/`

## Microagent Integration
Create a repository microagent under `.openhands/microagents/vibe-audit.md` or rely on root `AGENTS.md`.

## Invocation
- Headless execution:
  ```bash
  python -m openhands.core.main -t "Run Vibe Audit against workspace in AUDIT mode"
  ```
- Web UI: Select agent and specify `vibe-audit` in task prompt.

## Sandbox Isolation
OpenHands executes tools inside a Docker sandbox by default. Vibe Audit's static-first rule ensures unknown dependencies are not dynamically executed even within the container without prior trust assessment.

Official reference: https://docs.all-hands.dev/
