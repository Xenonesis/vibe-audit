# Maintainability Cases

| ID | Fixture | Expected |
|---|---|---|
| MT1 | `fixtures/maintainability/giant-component.tsx` | Identify mixed responsibilities; propose focused extraction, not rewrite. |
| MT2 | `fixtures/maintainability/duplication.ts` | Consolidate shared business rule if semantics match. |
| MT3 | `fixtures/maintainability/over-abstraction.ts` | Flag pass-through abstraction with no demonstrated value. |
| MT4 | `fixtures/maintainability/dead-code.ts` | Delete only after reference/usage verification. |

Architecture/style preference alone is not a maintainability defect.
