# SaaS Billing & Subscriptions Profile

Use for SaaS applications integrating Stripe, LemonSqueezy, Paddle, PayPal, or custom subscription engines.

Prioritize:
- Webhook signature verification: enforce raw buffer preservation in webhook routes (`stripe.webhooks.constructEvent` with `request.text()` / raw body stream); never bypass signature verification or accept unverified payloads
- Webhook idempotency & duplicate delivery: implement an event deduplication ledger (`processed_webhook_events` table) to prevent double entitlement grants, duplicate charges, or multi-sent transactional receipts
- Checkout redirect vs. webhook race conditions: guard against frontend redirecting to `/dashboard` before asynchronous webhook updates user tier in database (use optimistic verification, polling, or checkout session validation)
- Entitlement & downgrade logic: enforce strict subscription status validation (`active`, `trialing` vs `canceled`, `past_due`, `unpaid`), automatic access revocation on period end, and customer portal session security
- Secret hygiene: separate publishable client keys from restricted server secret keys; never expose Stripe restricted/secret keys in client bundles or public environment variables
