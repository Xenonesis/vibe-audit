# OpenCode Adapter

OpenCode natively supports Agent Skills loaded on demand through its `skill` tool.

## Locations
Project:
- `.opencode/skills/vibe-audit/`
- `.claude/skills/vibe-audit/`
- `.agents/skills/vibe-audit/`

Global:
- `~/.config/opencode/skills/vibe-audit/`
- `~/.claude/skills/vibe-audit/`
- `~/.agents/skills/vibe-audit/`

For portability across hosts, prefer `.agents/skills/` when practical.

## Discovery
OpenCode walks upward through the project to the git worktree and also loads global skills. The core `name` must match the directory and use lowercase hyphenated format.

## Permissions
Ensure the selected OpenCode agent is allowed to use the `skill` tool. AUDIT/PLAN should not be run through an agent configuration that forcibly mutates files.

Official reference: https://opencode.ai/docs/skills/
