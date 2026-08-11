# OMP Adapter

Verified against current Oh My Pi (OMP) skill documentation when this package was authored. OMP discovery behavior changes over time; recheck current docs before asserting a single universal install path.

## Directory layout
OMP provider/custom-directory discovery expects each skill one level below a configured skills root:

```text
<skills-root>/vibe-audit/SKILL.md
```

Provider/custom scans are non-recursive under the configured skills root, so do not bury the skill at `<skills-root>/group/vibe-audit/SKILL.md` unless the configured custom directory points directly to `group` as the skill parent root.

## Providers/locations
OMP supports multiple providers and custom skill directories. Its current docs describe `.agent[s]/skills` as the canonical OMP-native provider while also supporting other provider layouts/custom directories. Prefer the user's configured provider rather than hard-coding one universal path.

## Loading
OMP exposes discovered skills to the model when the read tool is available. Explicit loading can use:

```text
skill://vibe-audit
```

and, when skill commands are enabled:

```text
/skill:vibe-audit
```

Relative assets can be resolved as `skill://vibe-audit/references/security.md` by OMP's skill URL mechanism.

## Automatic-selection limitation
Discovery does not guarantee the model will choose/load the skill for every matching prompt. Test automatic routing separately from explicit `skill://` or `/skill:` invocation.

## Windows consideration
Prefer copy-based skill installation into a supported skill root when symlink/plugin-link behavior is restricted by Windows permissions. Adapter installation should not depend on symlink support.
