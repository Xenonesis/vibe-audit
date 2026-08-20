# Codex Adapter

Codex supports the Agent Skills open standard.

## Recommended locations
- Project/repository: `.agents/skills/vibe-audit/`
- User: `~/.agents/skills/vibe-audit/`
- Admin-managed Linux/container installs may use `/etc/codex/skills/`.

Codex scans `.agents/skills` from the current working directory up to the repository root. Symlinked skill folders are supported.

## Invocation
- Implicit: Codex may select the skill when the request matches `description`.
- Explicit: use `/skills` or type `$` and select/mention `vibe-audit`.

## Plan Mode
Codex supports the `plan` mode of vibe-audit, which produces a prioritized remediation plan without source changes. The skill's description includes plan-related keywords for implicit selection.

## Notes
- Keep `SKILL.md` standards-compatible; do not depend on Codex-only metadata for core behavior.
- Optional Codex UI/tool metadata can live in `agents/openai.yaml`, but this package does not require it.
- For reusable distribution beyond a repository, Codex also supports plugin packaging; keep that separate from the skill's audit logic.

Official reference: https://developers.openai.com/codex/build-skills
