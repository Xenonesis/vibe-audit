# CI/CD / Deployment Profile

Load `references/deployment-infra.md` and `references/execution-safety.md`.

Treat PR/issue/workflow input as untrusted. Review workflow token permissions, secret boundaries, unsafe checkout/execution contexts, mutable third-party actions, deployment/apply/destroy commands, artifact handling, environment protection, provenance, rollback, and separation between untrusted PR checks and privileged release jobs.
