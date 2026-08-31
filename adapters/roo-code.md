# Roo Code Adapter

Roo Code provides multi-mode autonomous agent workflows with dedicated role definitions, custom system prompts, and MCP tool execution.

## Locations
Project:
- `.roomodes`
- `.clinerules`
- `.agents/skills/vibe-audit/`

## Custom Mode Definition
Define a dedicated `Auditor` mode in `.roomodes`:
```json
{
  "customModes": [
    {
      "slug": "vibe-auditor",
      "name": "Vibe Auditor",
      "roleDefinition": "You are a production-readiness auditor adhering strictly to Vibe Audit invariants.",
      "groups": ["read", ["edit", { "fileRegex": "evals/.*" }]],
      "customInstructions": "Follow .clinerules and SKILL.md. Do not modify production application code without explicit user approval."
    }
  ]
}
```

## Invocation
- Mode switch: select `Vibe Auditor` from the mode dropdown in Roo Code.
- Explicit: prompt `@vibe-audit` in chat.
- MCP Server: add `vibe-audit mcp` to `roo_mcp_settings.json`.

Official reference: https://github.com/RooVetGit/Roo-Code
