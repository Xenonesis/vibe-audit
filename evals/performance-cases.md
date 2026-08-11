# Performance Cases

| ID | Fixture | Expected |
|---|---|---|
| P1 | `fixtures/performance/n-plus-one.ts` | N+1 heuristic; status based on runtime evidence. |
| P2 | `fixtures/performance/loop-insert.ts` | Batch opportunity if semantics preserved. |
| P3 | `fixtures/performance/waterfall.ts` | Independent sequential requests may be parallelized. |
| P4 | `fixtures/performance/no-blind-opt.ts` | Existing cache/memoization recognized; no redundant optimization. |

No numerical claim passes without recorded before/after measurement. If benchmark cannot run, expected wording is `Expected improvement; not empirically verified.`
