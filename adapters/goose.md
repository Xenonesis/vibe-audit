# Goose Adapter

Goose (by Block) is an extensible on-machine AI developer agent supporting CLI automation, session context hints, and MCP extension toolkits.

## Locations
Project:
- `.goosehints`
- `.agents/skills/vibe-audit/`

Global:
- `~/.config/goose/config.yaml`

## Configuration
Add Vibe Audit MCP server to Goose configuration:
```yaml
extensions:
  vibe_audit:
    type: stdio
    cmd: vibe-audit
    args: ["mcp"]
```

## Invocation
- CLI Session: `goose run --text "Run Vibe Audit in AUDIT mode and report findings"`
- Interactive: launch `goose session` and invoke `@vibe_audit` tools.

## Safety Rules
Keep Goose in plan/confirm mode when reviewing proposed code modifications.

Official reference: https://block.github.io/goose/
