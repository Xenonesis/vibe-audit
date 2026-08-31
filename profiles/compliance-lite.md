# Compliance Baseline Profile (SOC2-Lite / General)

Use when preparing an application for external security audits, enterprise clients, or general SOC2-readiness without a specific regional regulation named.

> **Disclaimer:** These are technical heuristic checks against common security and compliance baselines. They are not legal advice and do not replace formal third-party SOC2 / ISO-27001 audit certifications.

## Core Baseline Controls

1. **Secrets & Credential Management**:
   - Zero hardcoded credentials, database connection strings, private certificates, or JWT signing keys committed in version control.
   - All runtime secrets sourced from environment variables or external secret managers (Vault, AWS Secrets Manager, Doppler).

2. **Access Control & Least Privilege**:
   - Authentication enforced across all data access and mutation endpoints (zero unauthenticated admin/internal endpoints).
   - Role-based authorization separating standard users from system administrators.

3. **Audit Trails & Security Event Logging**:
   - Authentication events (login, failed password attempts, password resets, MFA status) recorded in structured logs with timestamps.
   - Administrative actions (user role changes, billing modifications, data exports) logged with actor ID and action details.

4. **Data Transmission & Network Security**:
   - HTTPS / TLS enforced across all public endpoints (HTTP automatically redirected to HTTPS).
   - Secure cookie attributes: `Secure`, `HttpOnly`, `SameSite=Lax/Strict`.

5. **Supply-Chain & Dependency Hygiene**:
   - Dependency vulnerability scanner integrated into CI pipeline (`vibe-audit deps` or `npm audit`).
   - Lockfile present and committed to guarantee reproducible builds.

## Risk & Governance
- Any authentication or credential refactor is `HIGH` change risk.
- Adding audit event logs or security headers is `MEDIUM` change risk.
