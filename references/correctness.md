# Correctness and Business Logic Reference

Correctness means the application enforces intended domain rules under normal, boundary, concurrent, and adversarial inputs. Secure code can still be wrong.

## Audit method
1. Identify authoritative entities and state transitions.
2. Trace where business rules are enforced: browser, API, service, DB constraints.
3. Test boundaries and duplicate/reordered requests.
4. Prefer server/DB invariants for authoritative rules.
5. Record domain assumptions explicitly when requirements are unavailable.

## Server authority
Never rely only on disabled buttons, hidden UI, client-calculated totals, client role flags, client validation, or client state to enforce authoritative business behavior.

## Monetary correctness
Check:
- floating-point use for money; prefer integer minor units or exact decimal semantics appropriate to stack
- rounding mode and rounding stage
- currency exponent/precision assumptions
- tax/discount ordering
- discount stacking and maximums
- negative/zero amounts and quantities
- currency conversion source/timestamp semantics
- refund/partial refund totals
- total recomputation server-side
- overflow/underflow and serialization precision

## Inventory and counters
Check overselling, negative inventory, stale stock checks, duplicate decrements, race conditions, reservation expiry, retry behavior, and atomic update conditions.

## Coupons, credits, entitlements
Check single-use/multi-use limits, per-user/account limits, expiration/timezone, stacking, minimum spend, eligibility, race conditions, replay, and redemption after refund/cancel.

## Workflow/state machines
Enumerate legal states/transitions for orders, subscriptions, approvals, onboarding, content moderation, payouts, etc. Reject impossible transitions (e.g. refunded→shipped unless explicitly modeled). Validate transition preconditions server-side and make repeated requests safe where appropriate.

## Ownership/business rules
Separate authorization from domain eligibility. A user may be authorized to access a record yet not allowed to perform a particular business transition. Check self-dealing rules, ownership transfer, role hierarchy, approval separation, organization boundaries, and immutable fields.

## Dates/timezones
Check UTC/local conversion, DST boundaries, inclusive/exclusive expiration, date-only vs timestamp semantics, leap days, month arithmetic, scheduling windows, billing cycles, and server/client timezone disagreement.

## Boundary and malformed inputs
Check zero, negative, maximum, empty, duplicate, stale, out-of-order, unexpected enum, huge pagination, duplicate form submission, and concurrent requests. Do not infer a bug solely from missing UI validation if server enforcement is correct.

## Duplicate/replay operations
Check order creation, account credits, coupon redemption, reservation, subscription actions, emails/jobs, and fulfillment for repeat requests. Coordinate with reliability/idempotency rules.

## Evidence and verification
A correctness finding should state the expected rule, observed implementation, reproducible input/sequence, impact, and regression test. If business requirements are not known, phrase the assumption and use LIKELY/POTENTIAL rather than asserting a defect.
