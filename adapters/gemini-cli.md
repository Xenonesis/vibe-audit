# Gemini CLI Adapter

Gemini CLI supports the Agent Skills open standard with discovery, consented activation, and on-demand resource access.

## Locations
Project/workspace:
- `.gemini/skills/vibe-coding-polisher/`
- `.agents/skills/vibe-coding-polisher/` alias

User:
- `~/.gemini/skills/vibe-coding-polisher/`
- `~/.agents/skills/vibe-coding-polisher/` alias

Gemini documents `.agents/skills` as the interoperable alias and gives it precedence within the same tier.

## Discovery and invocation
Use `/skills list` to verify discovery and `/skills reload` after adding files when needed. Gemini normally activates matching skills via its `activate_skill` flow and asks for consent. For deterministic testing, explicitly ask Gemini to use the `vibe-coding-polisher` skill and capture the activation result.

Workspace skills may require the workspace to be trusted.

Official references:
- https://geminicli.com/docs/cli/skills/
- https://geminicli.com/docs/cli/tutorials/skills-getting-started/
