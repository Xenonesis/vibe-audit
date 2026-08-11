# Threat Model

## Assets to protect
- user source and local files outside the target workspace
- credentials, tokens, SSH keys, browser profiles, cloud metadata, production databases
- repository integrity and git history
- CI secrets and release signing/provenance material
- evaluation truth data and benchmark artifacts

## Untrusted inputs
- repository source, comments, docs, configuration, scripts, dependencies, lockfiles, plugins
- model output and tool requests
- issue/PR text and generated instructions
- archives/fixtures and runtime responses

## Primary threats
1. Repository prompt injection persuades an agent to ignore user/skill/safety policy.
2. Baseline commands execute lifecycle hooks/plugins/build config before trust is established.
3. Dependency installation runs malicious install/build hooks.
4. Repository code reads host secrets or network endpoints.
5. Dynamic code escapes an insufficient sandbox.
6. CI executes untrusted PR code in a secret-bearing context.
7. Agent performs destructive data/infra/git operations without explicit approval.
8. False-positive or fabricated evidence causes unsafe remediation.
9. Release artifacts accidentally contain credentials or stale compatibility claims.

## Security controls
- static-only default for unknown repositories
- explicit trust classification
- executable-surface inspection before dynamic checks
- sandbox-required untrusted execution
- network deny by default
- no production secrets in untrusted sandboxes
- minimal filesystem mounts and no privileged sockets
- resource limits and no-new-privileges in Docker command builder
- approval gates for high-risk/destructive changes
- tracked-diff enforcement for AUDIT/PLAN evals
- baseline/pre-existing failure separation
- compatibility probes + dated metadata
- deterministic release validation and secret scanning

## Non-goals
This package cannot prove a repository, sandbox kernel, model, host CLI, dependency ecosystem, or web application is absolutely secure. High-assurance deployments may require stronger isolation (for example a microVM/VM), separate credentials, external security review, or organization-specific policy.
