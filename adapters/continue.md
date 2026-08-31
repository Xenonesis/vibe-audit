# Continue Adapter

Continue supports custom slash commands, project-level rules under `.continue/rules/`, and MCP context providers.

## Locations
Project:
- `.continue/rules/vibe-audit.md`
- `.continue/config.json`

User:
- `~/.continue/config.json`

## Rule Export
Run `vibe-audit export .` to create `.continue/rules/vibe-audit.md`.

## Slash Command Setup
Add custom slash command in `.continue/config.json`:
```json
{
  "customCommands": [
    {
      "name": "audit",
      "prompt": "Read .continue/rules/vibe-audit.md and SKILL.md. Perform an evidence-first AUDIT without making source code modifications.",
      "description": "Run Vibe Audit in read-only mode"
    }
  ]
}
```

## Invocation
- In Continue chat sidebar, type `/audit`.
- Configure `vibe-audit mcp` under `mcpServers` in `config.json`.

Official reference: https://docs.continue.dev/
