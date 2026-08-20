# Cursor Adapter

Cursor natively supports Agent Skills and progressive resource loading.

## Locations
Project:
- `.agents/skills/vibe-audit/`
- `.cursor/skills/vibe-audit/`

User:
- `~/.agents/skills/vibe-audit/`
- `~/.cursor/skills/vibe-audit/`

Cursor also reads Claude/Codex skill directories for compatibility.

## Invocation
- Automatic: Agent may choose the skill based on context/description.
- Manual: type `/` in Agent chat and search for `vibe-audit`.

## Plan Mode
Cursor supports the `plan` mode of vibe-audit, which produces a prioritized remediation plan without source changes. Automatic selection works when the description matches plan intent.

## CLI isolation
For destructive-risk evals, Cursor CLI worktrees can provide an additional isolation layer. Worktree isolation does not waive the skill's approval gates.

Official references:
- https://cursor.com/docs/skills
- https://cursor.com/docs/cli/using
