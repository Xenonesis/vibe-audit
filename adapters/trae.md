# TRAE / TraeCode Adapter

TRAE documents Skills as reusable packages defined and managed through `SKILL.md`, with instructions, scripts, and related resources.

## Installation
Use TRAE's current Skills UI/documented project or personal skill location for the installed version. Because TRAE's paths and product surfaces may evolve, do not hard-code an unverified filesystem location into the portable core skill.

## Invocation and discovery
- Verify that the skill appears in TRAE's Skills management/discovery surface.
- Test both description-driven selection and any explicit/manual skill invocation exposed by the installed version.
- Record version-specific behavior in the eval result instead of changing core audit rules.

## Integration
Keep TRAE custom-agent prompts separate from this skill. A custom agent can invoke/use the skill, but the skill remains the source of truth for audit modes, evidence, approval gates, and verification.

Official references:
- https://docs.trae.ai/ide/skills
- https://docs.trae.ai/ide/best-practice-for-how-to-write-a-good-skill
