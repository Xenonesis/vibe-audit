# Kilo Code Adapter

Kilo Code is a fast, lightweight terminal agentic coding assistant supporting open standards, BYOK model routing, and `.agents/skills/` discovery.

## Locations
Project:
- `.agents/skills/vibe-audit/`
- `.kilo/skills/`

Global:
- `~/.agents/skills/vibe-audit/`
- `~/.config/kilo/skills/`

## Invocation
- Terminal: `kilo -p "Run Vibe Audit in AUDIT mode on this project"`
- Explicit skill: `kilo --skill vibe-audit`

## Safety
Adheres to open-standard skill boundaries. In AUDIT and PLAN modes, Kilo inspects files statically without modifying code.

Official reference: https://kilocode.ai/docs/
