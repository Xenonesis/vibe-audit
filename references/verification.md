# Verification and Reporting Reference

## Baseline
Before modification capture applicable lint, typecheck, tests, build, smoke test, dependency audit, and requested performance metrics. Record PRE-EXISTING failures.

## Atomic verification
After each coherent change batch run the narrowest meaningful check: affected tests, route/authorization test, typecheck/lint of changed area, query behavior, or reproducer. Do not rerun a huge suite after every trivial edit if a narrower check is sufficient.

## Phase-boundary verification
After a security/correctness/reliability/performance/maintainability phase, run broader applicable checks such as lint, typecheck, tests, build, dependency audit, and smoke tests.

## Security regression
Verify the exploit path closes, not just that code changed. Example: User A denied access to User B's order; User B still allowed; admin behavior matches policy.

## Correctness regression
Assert domain invariants such as nonnegative inventory, authoritative pricing, coupon limits, valid transitions, correct totals, and boundary dates.

## Reliability regression
Where practical test duplicate webhook/job, transaction rollback, repeated idempotency key, concurrent update, provider timeout, and retry safety.

## Performance verification
Use the same workload/environment where practical. Record metric, before, after, difference, method, and limitations. Without a runnable benchmark, use "Expected improvement; not empirically verified." Do not invent numbers.

## Behavior preservation
For affected areas verify authentication, authorization, forms, navigation, CRUD, API contracts, payments, database behavior, and business rules. Explicitly report intentional behavior changes separately.

## Rollback awareness
For meaningful schema, dependency, cache, auth, payment, or infrastructure changes, state how to revert and whether rollback itself has data/compatibility risk.

## Failure attribution
Final status labels:
- PRE-EXISTING — observed before modification
- INTRODUCED — caused by current changes
- FIXED — verified resolved
- REMAINING — still present
- UNVERIFIED — could not be conclusively checked

Do not hide remaining failures merely because they are unrelated.

## Production Readiness Report

```markdown
# Production Readiness Report

## Project
## Stack Detected
## Mode

## Baseline
- Tests:
- Typecheck:
- Lint:
- Build:
- PRE-EXISTING failures:
- Relevant performance baseline:

## Findings
For each finding:
- Finding / Category
- Severity / Confidence / Status
- Evidence
- Impact
- Recommended fix
- Change Risk / Approval Required
- Verification Method / Result

## Changes Made
## Verification Performed
## Performance Before / After
## PRE-EXISTING / INTRODUCED / FIXED / REMAINING / UNVERIFIED
## Remaining Risks and Assumptions
## Changes Requiring Approval
## Production Readiness Status
```

Allowed readiness statuses:
- NOT READY
- PARTIALLY READY
- READY WITH WARNINGS
- READY

Never state "100% secure", "perfectly secure", or guaranteed production safety. Readiness is scoped to evidence and checks actually performed.
