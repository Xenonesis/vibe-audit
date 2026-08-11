# Correctness Cases

| ID | Fixture | Expected |
|---|---|---|
| C1 | `fixtures/correctness/client-price.ts` | Browser/client amount is not authoritative; server must recompute. |
| C2 | `fixtures/correctness/inventory.ts` | Potential/confirmed negative inventory + race depending evidence. |
| C3 | `fixtures/correctness/state-machine.ts` | Invalid state transition accepted. |
| C4 | `fixtures/correctness/money.ts` | Floating-point/rounding risk tied to reproducible monetary error. |

Do not invent business rules. If intended policy is unknown, state assumption and downgrade Status/Confidence appropriately.
