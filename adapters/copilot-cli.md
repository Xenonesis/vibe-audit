# GitHub Copilot CLI Adapter

GitHub Copilot CLI supports Agent Skills with instructions, scripts, and resources.

## Locations
Project skills may be placed under:
- `.github/skills/vibe-audit/`
- `.claude/skills/vibe-audit/`
- `.agents/skills/vibe-audit/`

Personal skills may be placed under:
- `~/.copilot/skills/vibe-audit/`
- `~/.agents/skills/vibe-audit/`

For maximum cross-agent portability, prefer `.agents/skills/` unless the repository has a deliberate Copilot-specific convention.

## Invocation
Copilot may select a skill based on its description. Use Copilot's skill-management/listing commands to confirm discovery and explicitly select/invoke the skill where the installed CLI supports it.

## Tool approval
Do not add broad `allowed-tools: shell`/`bash` to this portable SKILL.md. GitHub warns that pre-approving shell removes confirmation steps. Let the host request permission unless a separately reviewed Copilot-only distribution is intentionally created.

Official reference: https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills
