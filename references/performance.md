# Performance Reference

Absolute rule: **do not claim an empirical performance improvement without measurement when measurement is reasonably possible.** If measurement cannot be run, say "Expected improvement; not empirically verified."

## Workflow
1. Choose a user-visible/server/database metric relevant to the complaint.
2. Capture baseline under a reproducible workload where possible.
3. Identify the bottleneck with evidence.
4. Apply the smallest targeted change.
5. Rerun the same measurement.
6. Report before, after, difference, method, and limitations.

Do not optimize code merely because a pattern can be made more complex.

## Frontend
Inspect bundle composition, code splitting, route-level lazy loading, unnecessary client-side JavaScript, hydration cost, request/render waterfalls, excessive rerenders, large lists/DOM, expensive synchronous work, third-party scripts, images, fonts, video, and animation main-thread cost.

Do not blindly add memoization. Confirm the rerender/computation is material and memoization overhead/dependency correctness is acceptable.

## Images
Check source vs rendered dimensions, responsive `srcset`/framework image component, lazy loading below fold, decoding, modern formats where delivery stack supports them, cache/CDN behavior, and huge assets. Do not duplicate CDN/framework optimization.

## Fonts
Check families/weights, blocking external requests, preload misuse, subset/self-host/framework-native options, and whether unused font weights materially increase bytes.

## Bundles/dependencies
Find whole-library imports, duplicate package versions, unused browser dependencies, polyfills, server-only libraries leaked to client bundles, excessive client components, and expensive third-party SDKs. Replacement of a major dependency is MEDIUM/HIGH risk and needs evidence of meaningful gain.

## API/network
Check over-fetching, unbounded collections, missing pagination, repeated/duplicate calls, sequential independent calls that can safely run concurrently, payload size, serialization, compression negotiation, caching headers, and request waterfalls.

### Compression
First detect CDN/proxy/host/framework compression. Avoid double compression. Brotli/gzip choice is environment/client/workload dependent; higher compression can trade CPU/latency for bytes. Measure if application-managed compression is a material change.

## Database
Inspect N+1 patterns, loop inserts/updates, repeated identical queries, unbounded queries, SELECT *, missing pagination, inefficient joins/aggregations, large OFFSET pagination, lock/contention behavior, and query count/latency.

### N+1 discipline
Static heuristics can identify loops around DB calls but may not prove runtime N+1 across ORMs/resolvers/helpers. Use CONFIRMED/LIKELY/POTENTIAL and verify with query logs/instrumentation/tracing/tests when possible.

### Indexes
Do not blindly add indexes. Evaluate actual query predicates/joins/sorts, table size, selectivity, existing indexes, query plans, write/storage cost, and migration risk.

### Batching
Bulk insert/update/upsert/transactions can reduce round trips, but preserve per-row validation, error semantics, transaction boundaries, generated values, and side effects.

## Caching
Never "add Redis" by default. Determine:
- what operation is expensive
- freshness and acceptable staleness
- invalidation owner
- scope (global/tenant/user/request)
- security/privacy requirements
- failure semantics

Choose simplest suitable layer: framework-native, HTTP/CDN, memory, database-derived/materialized, distributed cache, stale-while-revalidate, etc.

Never globally cache personalized/sensitive responses. Include user/org/permissions/locale/query/auth context in keys when semantics require it. Ensure authorization is evaluated correctly on cache hits.

## External APIs
Review timeout, retry/backoff, concurrency, duplicate requests, response caching, batching, payload size, connection reuse, provider rate limits, and fallback behavior. Circuit breakers are only for dependencies where ongoing calls amplify failure.

## Optimistic UI
Use for reversible, low-consequence, conflict-tolerant actions with clear rollback. Avoid optimistic authoritative confirmation for payments, permission changes, money movement, irreversible deletion, stock guarantees, or critical account changes.

## Background work
Consider queue/background execution for email, reports, PDF/image/video processing, large exports/imports, AI generation, or other slow work when synchronous completion is unnecessary. Do not introduce queue infrastructure for trivial work.

## Measurement report
For each claimed improvement record:
- Metric
- Workload/environment
- Before
- After
- Difference
- Measurement tool/method
- Known limitations/variance

No fabricated percentages, timings, query counts, or Core Web Vitals.
