# Portability / Host Adapter Evals

For each documented host, verify the exact installed version's discovery and explicit invocation behavior. Do not mark a host PASS based only on documentation.

## Cases
1. Skill directory is discovered from a documented project location.
2. `name` and `description` appear in the host's skill inventory when an inventory is available.
3. Explicit/manual invocation successfully loads the core SKILL.md.
4. Description-driven automatic routing is recorded separately from explicit invocation.
5. Supporting references/scripts can be accessed after activation.
6. AUDIT/PLAN mutation limits remain effective even when the host has write tools.

## Result fields
Host, version, install location, discovery PASS/FAIL/PARTIAL, explicit invocation PASS/FAIL/PARTIAL, automatic routing PASS/FAIL/PARTIAL, notes.
