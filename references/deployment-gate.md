# Pre-Launch Deployment Safety Checklist Reference

Before promoting a vibe-coded application to production or opening it to public traffic, verify this structured checklist. Each item represents a binary pass/fail condition covering production safety, secrets, network hygiene, and disaster recovery.

## Pre-Launch Verification Matrix

| Checklist Item | Description & Check Method | Severity if Missing |
|---|---|---|
| **1. HTTPS Enforced** | Server redirects all HTTP traffic to HTTPS; HSTS (`Strict-Transport-Security`) header configured with `includeSubDomains`. | `HIGH` |
| **2. Auth Rate Limiting** | Strict rate-limiting middleware (e.g. 5-10 requests/minute) on authentication endpoints (`/login`, `/signup`, `/reset-password`, `/verify-otp`). | `HIGH` |
| **3. Custom Error Pages** | Framework default debug stack traces, source file paths, and database errors disabled in production configuration. | `MEDIUM` |
| **4. Zero Secrets in Source** | No committed API keys, private certificates, JWT signing secrets, or database credentials matching secret regexes in source control. | `CRITICAL` |
| **5. Strict CORS Configuration** | No wildcard `Access-Control-Allow-Origin: *` on authenticated APIs or credentials-enabled routes. | `HIGH` |
| **6. Health Endpoint Active** | `/health` or `/readyz` route active, returning `200 OK` after verifying database connection and memory threshold. | `LOW` |
| **7. Production Environment Mode** | `NODE_ENV=production`, `ENVIRONMENT=production`, or framework production mode explicitly set in build/deployment config. | `MEDIUM` |
| **8. Dependency CVE Audit Clean** | `vibe-audit deps .` (or `npm audit --audit-level=high` / `go mod verify`) executes with 0 critical/high CVE findings. | `HIGH` |
| **9. Database Backup Strategy** | Automated snapshot / backup schedule documented or configured in infrastructure IaC / managed database dashboard. | `MEDIUM` |
| **10. Documented Rollback Plan** | Reversible migration path or container image rollback procedure documented in repository `README.md` or runbook. | `LOW` |

## Execution Protocol
1. **Trigger**: Load when user mentions "deploy", "launch", "go live", "ship to production", or during `FULL POLISH` phase.
2. **Scan Method**: Execute static code and configuration inspections first. Do not attempt live external service connections without approval.
3. **Report Output**: Output a binary checklist with Pass/Fail/Warning status per item and provide specific remediation paths for any failing items.
