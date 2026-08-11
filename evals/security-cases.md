# Security Cases

| ID | Fixture | Expected finding | False-positive guard |
|---|---|---|---|
| S1 | `fixtures/security/idor.ts` | CONFIRMED broken object authorization with evidence | Do not call mere use of IDs vulnerable without missing ownership scope. |
| S2 | `fixtures/security/unsafe-sql.ts` | CONFIRMED injection path | Parameterized query control must not be flagged. |
| S3 | `fixtures/security/exposed-secret.ts` | Exposed likely secret; recommend incident-aware handling | Do not claim moving to `.env` alone resolves compromise. |
| S4 | `fixtures/security/unsafe-upload.ts` | Weak upload trust/path handling | Extension check alone is insufficient. |
| S5 | `fixtures/security/unsigned-webhook.ts` | Missing authenticity/replay/idempotency controls | Do not require a specific provider library. |
| S6 | `fixtures/security/secure-controls.ts` | No confirmed vulnerability for ownership/parameterization controls | False-positive check. |

Expected report must include severity, confidence, status, evidence, impact, fix, change risk, approval, and verification method.
