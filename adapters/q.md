# Amazon Q Developer Adapter

Amazon Q Developer CLI supports workspace context indexing, inline CLI generation, and custom rules via `.amazonq/rules/`.

## Locations
Project:
- `.amazonq/rules/vibe-audit.md`
- `AGENTS.md`

## Setup
Place Vibe Audit rules in `.amazonq/rules/vibe-audit.md` so Amazon Q Developer loads the policy on workspace initialization.

## Invocation
- Terminal: `q chat "Perform Vibe Audit in AUDIT mode against this codebase"`
- Inline: `q "audit auth flow for IDOR and CSRF"`

## Safety Mapping
Amazon Q Developer operates within AWS enterprise security boundaries. All findings must include verifiable evidence paths.

Official reference: https://docs.aws.amazon.com/amazonq/
