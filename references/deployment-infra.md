# Deployment & Infrastructure Audit

Load this reference for production-readiness, deployment, Docker/container, CI/CD, cloud configuration, migration, backup, or observability concerns.

## Scope
Audit only what is represented in the repository or connected environment. Do not infer cloud settings that cannot be observed.

## Environment separation
Check:
- development/test/preview/production configuration boundaries
- production debug mode and verbose error settings
- secret injection method and public/private variable naming
- accidental use of development services in production
- source-map exposure when sensitive source disclosure matters

## Containers and runtime
Where applicable review:
- pinned/reasonable base images
- non-root execution where feasible
- minimal runtime image contents
- health/readiness checks
- signal handling and graceful shutdown
- resource limits/requests when configured
- unnecessary exposed ports
- copied secrets or credentials in image layers

## CI/CD
Check:
- least-privilege workflow permissions
- untrusted PR/fork secret exposure
- pinned or trusted third-party actions where appropriate
- test/build gates before deploy
- migration ordering and rollback strategy
- artifact provenance/signing when the project's risk warrants it
- deployment concurrency/race protection

## Database migrations
Treat destructive or irreversible migrations as HIGH change risk. Prefer backward-compatible expand/migrate/contract patterns when zero-downtime matters. Require rollback or forward-fix planning for material schema changes.

## Backups and recovery
Where evidence is available, review backup configuration, retention, restore procedure, and whether restore has been tested. Never claim recoverability based only on the existence of a backup toggle.

## Observability
Check for useful production signals:
- structured error logging
- request/job correlation identifiers when needed
- metrics for critical resources
- alerting on meaningful failure conditions
- health/readiness endpoints that do not leak secrets

## Infrastructure-as-code
If Terraform, Pulumi, CloudFormation, Kubernetes, Helm, or provider configuration is present, audit for least privilege, public exposure, secret handling, destructive changes, and environment drift. Do not apply infrastructure changes without the same approval gates as application architecture changes.
