# AI / LLM Application Security

Load this reference only when the application actually contains LLM, agent, RAG, tool-calling, or autonomous AI functionality.

## Trust boundaries
Treat model input and model output as untrusted unless a stronger guarantee exists. A model instruction is not an authorization control.

## Prompt injection and tool use
Review:
- whether untrusted content can influence system/tool instructions
- tool permissions and least privilege
- confirmation gates for consequential actions
- URL/file/shell/database tools exposed to model output
- separation between retrieved content and trusted instructions
- allowlists/validation around tool arguments where practical

## Data access and RAG
Check:
- per-user/per-tenant authorization before retrieval
- vector-store/document ownership boundaries
- metadata filters enforced server-side
- leakage of hidden/system prompts, secrets, or private documents
- citations/provenance when the product relies on source-grounded answers

## Model output handling
Do not directly trust model output as:
- executable code or shell commands
- SQL
- HTML
- authorization decisions
- payment or pricing decisions
- file paths/URLs
without validation appropriate to the sink.

## Agent autonomy
For agents that can act, verify:
- scoped credentials
- bounded tool access
- explicit approval for destructive/high-risk actions
- idempotency for retryable actions
- audit trail for consequential operations
- safe failure and timeout behavior

## Cost and abuse
Check:
- authenticated ownership of expensive endpoints
- rate/budget limits by user/org/API key
- token/output bounds
- runaway loops/retries
- provider timeouts and fallback behavior
- prompt sizes and repeated context that can cause avoidable spend

## Safety of secrets
Never place provider secret keys in browser code. Avoid logging prompts/responses containing secrets or sensitive personal/business data unless the product explicitly requires and protects that logging.
