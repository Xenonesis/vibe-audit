# Google Antigravity Adapter

Google Antigravity supports skills defined by a directory containing `SKILL.md`. Google examples use the interoperable `.agents/skills/<skill-name>/` layout.

## Recommended project install
`.agents/skills/vibe-audit/`

## Invocation
Allow automatic discovery/selection where supported. For deterministic evaluation, explicitly tell the Antigravity agent to use the `vibe-audit` skill and record whether the harness exposes an explicit skill picker/command in the version under test.

## Runtime/UI testing
Antigravity can be paired with browser tooling for UI verification. When browser tools are available, load `references/runtime-ui.md`; do not treat browser access as permission to perform destructive production actions.

Official references:
- https://codelabs.developers.google.com/getting-started-with-antigravity-skills
- https://codelabs.developers.google.com/agentic-ui-automation-with-antigravity
