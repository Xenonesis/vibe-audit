# Windsurf / Cascade Adapter

Windsurf (Cascade) supports skills with `SKILL.md`, automatic description-based invocation, supporting resources, and manual `@skill-name` activation.

## Locations
Workspace:
- `.windsurf/skills/vibe-coding-polisher/`
- `.agents/skills/vibe-coding-polisher/` compatibility location

Global:
- `~/.codeium/windsurf/skills/vibe-coding-polisher/`
- `~/.agents/skills/vibe-coding-polisher/` compatibility location

## Invocation
- Automatic: Cascade may invoke based on the skill description.
- Manual: `@vibe-coding-polisher`

## Rules/workflows distinction
Do not convert this package into an always-on Rule. The workflow is intentionally a progressively disclosed Skill. Use AGENTS.md/Rules for short persistent project constraints and Workflows for one-shot manual runbooks.

Official reference: https://docs.windsurf.com/windsurf/cascade/skills
