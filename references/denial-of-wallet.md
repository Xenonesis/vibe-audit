# Denial of Wallet (DoW) & AI Endpoint Cost Protection Reference

Load when auditing applications with AI/LLM integrations, scraper APIs, pay-as-you-go third-party services, or expensive batch operations.

## Core Invariant
Every endpoint that invokes a billed API (OpenAI, Anthropic, Firecrawl, Replicate, AWS Bedrock) must be guarded against unauthenticated, un-rate-limited, or unbounded invocation.

---

## 1. Un-rate-limited Public AI Endpoints

### Check
Inspect routes calling `openai`, `anthropic`, `@google/genai`, or `firecrawl`. An attacker using a simple loop can burn monthly API credits in minutes.

### Code Smell
```typescript
// VULNERABLE: Public route with no rate limiting, no auth, no token bounds
export async function POST(req: Request) {
  const { prompt } = await req.json();
  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }]
  });
  return Response.json(res);
}
```

### Remediation
1. Enforce authentication or verify session.
2. Add rate limiting (e.g. Upstash Redis, Cloudflare Rate Limiting, `express-rate-limit`).
3. Set hard spending limits / token bounds:
```typescript
const res = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  max_tokens: 500,
  messages: [{ role: "user", content: prompt.slice(0, 2000) }]
});
```

**Severity**: `HIGH` | **Change Risk**: `LOW`
