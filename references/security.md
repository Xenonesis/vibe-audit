# Security Audit and Remediation Reference

## Baseline and standards

Apply current, stack-appropriate security guidance. Use OWASP ASVS 5.x concepts as the broad verification baseline, OWASP Top 10:2025 for prioritization awareness, and OWASP API Security guidance for API/object authorization. Do not mechanically map every project to every control; apply controls supported by the application's threat model and evidence.

Security audit order:
1. Trust boundaries, authentication, authorization, tenancy.
2. Input/output handling and injection.
3. Secrets, cryptography, sessions, configuration.
4. High-risk integrations: uploads, webhooks, payments, outbound fetches.
5. Dependencies/supply chain, logging, exceptional conditions, abuse controls.

## Authentication

Inspect login, signup, logout, password reset, verification, OAuth/magic links, MFA where present, session/token issuance, expiration, refresh, rotation, invalidation, remember-me behavior, and logout semantics.

Flag with evidence:
- client-side-only authentication or bypassable route guards
- hardcoded/demo accounts or development bypasses in production paths
- unsafe token storage or token leakage
- weak reset/recovery flows
- OAuth state/PKCE/callback weaknesses where applicable
- unsafe open redirects
- sessions that are not invalidated when policy requires it

**Architecture boundary:** do not replace custom auth with Clerk/Supabase/Better Auth/etc. automatically. First determine whether the defect can be fixed locally. Provider/model replacement is HIGH Change Risk and requires explicit approval.

## Password security

Only applies if the application directly owns password credentials.
- Never store plain text or reversibly encrypted passwords.
- Use a trusted password hashing implementation configured to current guidance; Argon2id is preferred for new implementations where supported, while legacy schemes require a migration plan rather than a blind rewrite.
- Do not implement hashing/constant-time verification primitives manually when trusted libraries provide them.
- Review reset tokens, credential logging, account enumeration, and migration compatibility.

## Authorization and tenant isolation

Authentication is not authorization. For every protected operation determine:
- Who is the caller?
- What role/tenant/org/workspace context applies?
- May this caller perform this action on this exact object?

Check IDOR/BOLA, horizontal and vertical privilege escalation, admin bypass, role hierarchy, ownership checks, organization/workspace isolation, mass assignment, server-side policy enforcement, and authorization on indirect resources/downloads.

For object IDs supplied by the caller, verify the data access is scoped to the authorized principal/tenant rather than merely checking that a session exists.

### Supabase
When detected, inspect RLS enablement, table policies, storage policies, service-role use, ownership/tenant columns, client-side data access, and whether privileged keys are exposed to browser bundles. Do not report the public anon key as a secret merely because it is public by design; evaluate RLS/policy safety.

### Firebase
When detected, inspect Security Rules and server/Admin SDK boundaries. Client UI restrictions are not data authorization.

## Server-side validation

Validate untrusted data at trust boundaries: request bodies, route/query parameters, cookies, relevant headers, forms, uploads, webhooks, and externally sourced payloads used in privileged operations.

Reuse the existing adequate mechanism (Zod/Valibot/Joi/DTOs/Pydantic/Django/Laravel/etc.). Do not install a preferred validator merely for consistency.

Validation should cover type, shape, length/range, enum/domain constraints, normalization assumptions, pagination bounds, and business constraints where appropriate. Validation is not a substitute for authorization.

## Injection and dangerous execution

Inspect raw/string-built SQL, NoSQL query operator injection, shell/process execution, `eval`/dynamic code, template injection, path traversal, unsafe deserialization, and dynamic file paths.

Prefer parameterized/query-builder APIs and safe structured interfaces. A raw SQL call is not automatically vulnerable; the evidence must show untrusted data reaches an unsafe sink without adequate binding/validation.

## XSS and output handling

Review HTML/Markdown/rich-text/CMS/user content. Investigate `dangerouslySetInnerHTML`, `innerHTML`, `v-html`, raw template output, unsafe Markdown rendering, URL handling, DOM sinks, and stored user content.

Do not double-sanitize content that is already safely encoded; identify the actual source→sink path and context.

## CSRF

Assess based on browser credential semantics. Cookie-authenticated state-changing routes generally require an appropriate anti-CSRF strategy unless SameSite/origin framework guarantees demonstrably cover the threat. Do not bolt CSRF middleware onto APIs where browser credential replay is not the threat model.

## SSRF

Inspect user-controlled outbound fetches: URL previews, image fetch/proxy, webhook tester, PDF generator, remote imports, URL-based uploads. Where applicable block/validate private/loopback/link-local/cloud-metadata destinations, unsafe redirect chains, alternate IP representations, and protocol abuse.

## CORS

Check origin policy, credentials, wildcard/reflected origins, methods, headers, preflight behavior, and environment-specific origin configuration. Avoid wildcard+credential or unbounded dynamic reflection patterns.

## Security headers and browser policy

First detect CDN/framework/platform behavior. Review CSP (including `frame-ancestors`), HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and related controls where relevant. Avoid conflicting duplicates and unsafe CSP relaxation simply to make content load.

## Secrets and environment configuration

Search known token/key prefixes, private keys, database URLs, OAuth/payment/webhook secrets, JWT signing secrets, service-role/admin credentials, and suspicious high-entropy literals.

A likely committed production secret requires incident-aware handling:
1. Confirm likely real/active secret without exposing it in output.
2. Remove active source exposure.
3. Move configuration to appropriate environment/secret storage.
4. Verify ignore/deploy configuration.
5. Inspect repository history where appropriate.
6. Recommend rotation/revocation if exposure is credible.
7. Do not rotate/revoke production secrets automatically.
8. Verify dependent behavior after an authorized rotation.

`.env` is not automatically a production secret store. Do not treat public client configuration as secret solely because it resembles a key; evaluate semantics.

Validate required env variables and avoid unsafe production defaults/silent fallback secrets.

## Dependencies and software supply chain

Run ecosystem-native audits where safe. Classify findings by severity, reachability, exploitability, runtime exposure, available fix, and upgrade risk. Avoid `--force`/major/breaking remediation without approval.

Inspect suspicious/typosquatted packages, abandoned packages, unsafe lifecycle/install scripts, direct Git dependencies, lockfile integrity, unneeded dependencies, and integrity/signature mechanisms where the ecosystem supports them. Verify usage before deletion.

## Uploads and file processing

Review file size/count limits, extension allowlists, MIME and magic-byte/content checks, filename generation, path traversal, storage location, authorization, public exposure, download authorization, signed URL scope/expiry, archive extraction limits, parser/image/document risks, metadata, and malware scanning where warranted.

Do not rely on user-supplied MIME or extension alone.

## Webhooks

Check signature verification on the raw/expected body, timestamp/replay defenses where provider supports them, idempotency, duplicate event handling, secret handling, ordering assumptions, event state validation, and failure/retry semantics.

## Payments

Server must own authoritative price/amount/currency/product mapping. Review payment-intent/session creation, webhook authenticity, fulfillment after authoritative confirmation, idempotency, duplicate fulfillment, refund/cancellation state, and resource authorization. Do not accept client-provided totals as authoritative.

## API abuse and resource exhaustion

Identify high-abuse or expensive routes: login/signup/reset/OTP/email, AI generation, search, exports, uploads, expensive queries, payment actions. Choose limit identity based on risk (IP, user, org, email/account, API key/session). Reuse existing infrastructure; do not blindly install a specific limiter.

Also inspect pagination/resource bounds, decompression/archive bombs, expensive regex/query shapes, unbounded concurrency, and per-tenant quotas where relevant.

## Logging and exceptional conditions

Flag passwords, authorization headers, access/refresh tokens, API keys, credentials, payment secrets, or unnecessary sensitive PII in logs.

Review empty catch blocks, ignored errors, success-after-failure, leaked stack traces/internal paths/DB errors, inconsistent error semantics, unsafe fail-open behavior, and exceptional-condition handling. Preserve enough structured logging for incident diagnosis without leaking secrets.

## Finding discipline

Evidence must show the relevant source/sink/policy/configuration. If reachability/exploitability cannot be demonstrated, use LIKELY/POTENTIAL rather than CONFIRMED. Do not inflate severity because a pattern looks suspicious.
