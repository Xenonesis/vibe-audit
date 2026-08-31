# Zed AI Adapter

Zed AI provides high-performance agentic editing with inline transformations, slash commands, and custom assistant system prompts.

## Locations
Project:
- `.zed/settings.json`
- `.zed/prompts/`

User:
- `~/.config/zed/settings.json`

## Configuration
Configure assistant system prompt in `.zed/settings.json`:
```json
{
  "assistant": {
    "system_prompt": "Adhere to Vibe Audit rules: static analysis first, evidence-based findings, zero architectural rewrite unless defective or user-approved."
  }
}
```

## Invocation
- Use `/file` slash command to reference `SKILL.md` or `references/security.md` into the assistant panel.
- Inline prompt: highlight code section, press `ctrl-enter` (or `cmd-enter`), and instruct `Audit for security/correctness`.

Official reference: https://zed.dev/docs/assistant
