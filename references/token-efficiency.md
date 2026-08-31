# AI & LLM Token Efficiency Playbook

Load this reference when auditing applications that integrate LLMs, AI agents, or chat interfaces to detect token waste, runaway cost vulnerabilities, and context inflation.

## 1. Unbounded Message History (Context Explosion)
- **Anti-pattern**: Sending full chat history directly to the provider (`messages: [...allChatMessages]`).
- **Risk**: As conversation grows, every turn costs $O(N)$ tokens, rapidly hitting rate limits, max context windows, and burning huge API bills.
- **Remediation**: Implement sliding-window truncation (e.g. keep last $K$ turns), token-budgeted summarization, or semantic retrieval for older turns.

## 2. Missing `max_tokens` / Completion Bounds
- **Anti-pattern**: Calling `openai.chat.completions.create` or `anthropic.messages.create` without specifying `max_tokens` / `max_completion_tokens`.
- **Risk**: Models may enter repetitive loops or output unexpectedly long responses, draining budget or triggering client timeouts.
- **Remediation**: Always specify explicit upper bounds on completion tokens suited for the specific task.

## 3. Prompt Caching Gaps
- **Anti-pattern**: Sending large static system prompts or document context on every turn without caching headers.
- **Risk**: Paying 100% full input token costs instead of 10-25% cached token rates (e.g. Anthropic prompt caching, OpenAI prefix caching).
- **Remediation**: Place static instructions and system messages at the top of the prompt and attach cache breakpoints where supported.

## 4. Heavy Unpruned Tool / Function Schemas
- **Anti-pattern**: Passing 50+ broad OpenAPI tool specifications in every LLM request.
- **Risk**: Burns thousands of input tokens per completion before user prompt even starts.
- **Remediation**: Dynamically select tools via semantic router or category filtering.

## 5. Schema Bloat & Streaming
- **Anti-pattern**: Requesting verbose nested JSON objects with repeated keys when a flattened array or TSV structure achieves the same result.
- **Remediation**: Use minimal schema keys and enable streaming responses for immediate UI feedback.
