# Claude Code Adapter

Claude Code supports Agent Skills and loads supporting files on demand.

## Locations
- Project: `.claude/skills/vibe-coding-polisher/SKILL.md`
- Personal: `~/.claude/skills/vibe-coding-polisher/SKILL.md`
- Plugin distribution may place the skill under a plugin's `skills/` directory.

Claude can also discover nested project skills as work moves into subdirectories.

## Invocation
- Implicit: Claude may load the skill when the description matches.
- Explicit: `/vibe-coding-polisher`

## Safety mapping
AUDIT and PLAN should be used with read-only intent even if Claude has write-capable tools. Do not rely on a host mode alone: the skill's mutation boundary remains authoritative.

Claude-specific frontmatter extensions are optional. Keep the core frontmatter portable unless maintaining a separate Claude-only distribution.

Official reference: https://code.claude.com/docs/en/skills
