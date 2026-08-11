# Reliability Reference

Reliability audit asks whether operations remain correct under failure, concurrency, retries, latency, duplicate delivery, partial availability, and process restarts.

## Partial writes and transactions
Use transactions when related persistent writes must commit or roll back together. Check write-then-fail sequences, cross-table invariants, outbox/event publication gaps, and external side effects that cannot be rolled back. Avoid giant transactions spanning unrelated work or slow network calls.

## Idempotency
Prioritize payments, webhooks, orders, jobs, imports, provisioning, emails with side effects, and external mutations. Determine the idempotency key/scope, persistence window, response replay semantics, and behavior after partial completion.

## Retries
Retries require failure classification, bounded count, backoff/jitter where relevant, timeout budget, and idempotency. Do not retry validation/auth failures or non-idempotent mutations blindly. Respect provider-specific retry behavior and `Retry-After` where appropriate.

## Timeouts and cancellation
Check outbound HTTP, remote DB/cache/storage, AI providers, subprocesses, queues, and other remote dependencies. Avoid infinite waits; propagate cancellation and close resources where stack supports it. Coordinate connect/read/overall timeouts with retry budgets.

## Race conditions and concurrency
Inspect read-check-write patterns, counters, inventory, uniqueness assumptions, optimistic locking/versioning, double-submit, concurrent workers, shared mutable state, cache stampede, and distributed lock usage. Prefer DB constraints/atomic operations when they express the invariant more reliably than application locks.

## Duplicate/out-of-order events
Webhooks/queues may deliver more than once or out of order. Validate event IDs/state versions, ignore already-applied transitions, and avoid assuming transport ordering without evidence.

## Resource lifecycle
Check unclosed files/sockets/streams, leaked DB connections, listener accumulation, unbounded queues, worker/thread leaks, temporary file cleanup, and request-scoped resources.

## Async error handling
Inspect unhandled promise/task errors, fire-and-forget critical work, background task exceptions, empty catches, swallowed cancellation, and success responses sent before durable completion where semantics require completion.

## Dependency failure isolation
Circuit breakers are optional, not default. Consider only for remote dependencies where repeated calls amplify failure. First ensure timeout, retry, concurrency, fallback, and observability semantics are sensible.

## Verification
Use fault-oriented tests where practical: force second write failure, deliver duplicate webhook, simulate timeout, retry same idempotency key, run concurrent updates, or kill/restart a worker. Mark untestable distributed scenarios as UNVERIFIED rather than claiming resilience.
