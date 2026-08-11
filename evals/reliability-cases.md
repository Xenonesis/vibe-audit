# Reliability Cases

| ID | Fixture | Expected |
|---|---|---|
| R1 | `fixtures/reliability/partial-write.ts` | Related writes can partially commit; transaction/outbox discussion proportional to design. |
| R2 | `fixtures/reliability/duplicate-webhook.ts` | Duplicate delivery can duplicate side effect; idempotency required. |
| R3 | `fixtures/reliability/unsafe-retry.ts` | Unbounded/non-idempotent retry risk. |
| R4 | `fixtures/reliability/no-timeout.ts` | Remote call can hang beyond acceptable request budget. |

Verification should propose failure-injection/duplicate/concurrency tests rather than asserting resilience from code appearance.
