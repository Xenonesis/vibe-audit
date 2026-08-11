# AI-Generated Code Smells Reference

These checks target failure modes common in rapidly generated code. Keywords are investigation signals, not proof.

## Placeholder/fake security
Look for hardcoded users, mock sessions, `isAdmin=true`, always-true checks, client-only auth, temporary allow-all policies, disabled verification, development bypasses, TODO authorization, or fake service-role logic.

## Hallucinated APIs and dependencies
Verify imports/packages/functions/config keys against manifests, installed APIs, typechecking, local definitions, and current framework version. Flag nonexistent packages, made-up methods, wrong options, obsolete/deprecated calls that are actually incompatible, dead integrations, and impossible code paths.

## Production mocks and sample behavior
Find mock products/users, fake analytics, placeholder payment/session responses, dummy IDs, sample data wired into production paths, fallback-to-success behavior, or development fixtures selected by production config.

## Fake success states
Investigate `catch {}`, swallowed rejections, `return 200` after failure, UI success before required authoritative result, fake API response fallback, and error paths that resolve as success.

## Invented configuration
Check environment variable names against `.env.example`, deployment config, code usage, and provider docs where available. A missing env var may be a deployment issue; do not invent one to make code look complete.

## Unsafe generated fallbacks
Examples: disabling TLS verification, `*` CORS to "fix" requests, permissive RLS/security rules, broad admin fallback, default hardcoded secrets, catching any auth error and allowing access, skipping webhook verification in production.

## TODO/FIXME/HACK/TEMP signals
Review each in security/business critical paths. Do not report ordinary TODOs as vulnerabilities unless behavior is dangerous or incomplete in a production path.

## Ownership boundary with maintainability
AI-code smells own fake/hallucinated/placeholder/generated behavior. General dead code, duplication, giant modules, naming, coupling, and abstraction quality belong in `maintainability.md` to avoid duplicate findings.

## Verification
A generated-code smell becomes a finding only after determining its runtime/build/business impact or clear production reachability. Otherwise mark it INFO/POTENTIAL and state what would confirm it.
