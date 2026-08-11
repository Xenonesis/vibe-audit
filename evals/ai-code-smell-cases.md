# AI-Code-Smell Cases

| ID | Fixture | Expected |
|---|---|---|
| A1 | `fixtures/ai-code-smells/fake-auth.ts` | Fake/placeholder authentication production path. |
| A2 | `fixtures/ai-code-smells/fake-success.ts` | Failure swallowed and reported as success. |
| A3 | `fixtures/ai-code-smells/hallucinated-import.ts` | Import cannot be reconciled with manifest/local code. |
| A4 | `fixtures/ai-code-smells/production-mock.ts` | Mock response reachable in production path. |

Keyword presence alone is not a confirmed finding; determine reachability/impact.
