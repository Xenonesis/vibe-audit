# Cursor Adapter

Cursor natively supports Agent Skills and progressive resource loading.

## Locations
Project:
- `.agents/skills/vibe-coding-polisher/`
- `.cursor/skills/vibe-coding-polisher/`

User:
- `~/.agents/skills/vibe-coding-polisher/`
- `~/.cursor/skills/vibe-coding-polisher/`

Cursor also reads Claude/Codex skill directories for compatibility.

## Invocation
- Automatic: Agent may choose the skill based on context/description.
- Manual: type `/` in Agent chat and search for `vibe-coding-polisher`.

## CLI isolation
For destructive-risk evals, Cursor CLI worktrees can provide an additional isolation layer. Worktree isolation does not waive the skill's approval gates.

Official references:
- https://cursor.com/docs/skills
- https://cursor.com/docs/cli/using
