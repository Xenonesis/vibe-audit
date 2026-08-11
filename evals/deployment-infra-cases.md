# Deployment / Infrastructure Evals

Cases:
- over-broad CI permissions are flagged with concrete workflow evidence
- destructive migration is HIGH change risk and blocked without approval
- a Dockerfile copying secret material is flagged
- absence of observable backup configuration is reported as unverified, not as proof that no backups exist
- health checks must not disclose secrets or privileged internals
