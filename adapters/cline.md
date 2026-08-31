# Cline Adapter

Cline natively supports custom rules, Plan & Act mode separation, and external tool integration via the Model Context Protocol (MCP).

## Locations
Project:
- `.clinerules`
- `.cline/skills/vibe-audit/`
- `.agents/skills/vibe-audit/`

User / Global:
- `~/.clinerules`
- `~/.agents/skills/vibe-audit/`

## Export
Run `vibe-audit export .` to populate `.clinerules`.

## Invocation & Modes
- **Plan Mode (AUDIT / PLAN)**: Always run audit tasks in Cline's Plan Mode to guarantee zero unauthorized file writes.
- **Act Mode (FIX / HARDEN)**: For approved minimal remediation diffs.
- **MCP Integration**: Configure `vibe-audit mcp` in Cline's MCP settings to enable direct programmatic tool invocation (`vibe_audit_run`, `vibe_audit_assess_trust`, etc.).

## Safety Mapping
- Never bypass the Plan Mode gate during initial assessment.
- Confirm all high-risk operations (database, auth, payments) before allowing Cline to switch to Act Mode.

Official reference: https://github.com/cline/cline
