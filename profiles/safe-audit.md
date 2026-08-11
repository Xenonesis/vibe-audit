# Safe Audit Profile

Use for unknown, downloaded, forked, PR, marketplace, or otherwise untrusted repositories.

1. Load `references/execution-safety.md` first.
2. Remain static-only until executable surfaces are inspected.
3. Do not install dependencies or run project scripts/config/plugins on the host.
4. Dynamic verification requires an approved sandbox with network denied by default and no production credentials.
5. If dynamic evidence cannot be collected safely, report `UNVERIFIED`; do not weaken the trust boundary.
