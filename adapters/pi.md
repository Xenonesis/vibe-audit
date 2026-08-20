# Pi Adapter

Verified against current Pi skill documentation when this package was authored. Recheck current docs if Pi has materially changed.

## Supported locations
Pi currently discovers skills from documented global/project locations including:
- `~/.pi/agent/skills/`
- `~/.agents/skills/`
- project `.pi/skills/`
- project/ancestor `.agents/skills/`
- package/settings/CLI-provided skill paths

Pi recursively discovers directories containing `SKILL.md` in skill locations. Project skill loading depends on project trust.

## Plan Mode
Pi supports the `plan` mode of vibe-audit, which produces a prioritized remediation plan without source changes. Use `/skill:vibe-audit` with plan intent.

## Installation
Copy the entire `vibe-audit/` directory under a supported skills root, or configure/pass the skill path using Pi settings/CLI. Keep the skill directory intact so relative `references/` paths resolve.

## Discovery and invocation
Pi scans names/descriptions at startup and the model may load a matching `SKILL.md`. Automatic model selection is not guaranteed. Use the explicit skill command when deterministic loading is required:

```text
/skill:vibe-audit
```

Arguments/instructions may be supplied with the command according to Pi's current skill-command behavior.

## Testing recommendation
For trigger evals, test automatic selection separately from explicit `/skill:vibe-audit`. An automatic-routing failure must not be conflated with incorrect skill instructions if explicit invocation behaves correctly.
