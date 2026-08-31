# SaaS Billing & Payment Webhooks Reference

Payment systems (Stripe, LemonSqueezy, Paddle, PayPal) communicate state changes asynchronously via webhooks. Vibe-coded SaaS apps frequently contain critical flaws in webhook verification, duplicate processing, and checkout redirect race conditions that allow users to receive unpaid access or trigger billing corruption.

## Core Audit Targets

### 1. Webhook Signature Verification
Check:
- Missing signature validation: parsing the incoming JSON payload without verifying the cryptographic signature header (`stripe-signature`, `x-signature`).
- Body parsing corruption: using standard `express.json()` or Next.js `req.json()` before signature verification. Providers (like Stripe) require the exact raw bytes/buffer to compute the HMAC hash (`stripe.webhooks.constructEvent(rawBody, sig, secret)`).
- Hardcoding webhook secrets or failing open when the webhook secret environment variable (`STRIPE_WEBHOOK_SECRET`) is unset or empty.

### 2. Webhook Idempotency & Deduplication
Check:
- Missing event deduplication: payment providers guarantee at-least-once delivery; network retries can send the same `checkout.session.completed` or `invoice.payment_succeeded` event multiple times.
- Lack of an idempotency ledger (e.g., storing `event.id` in a `processed_webhook_events` database table with a unique constraint). Processing duplicate events can result in double credit allocations or multiple receipt emails.

### 3. Checkout Redirect vs. Webhook Race Conditions
Check:
- Immediate client redirect to `/dashboard` upon checkout completion before the asynchronous webhook has updated the user's subscription record in the database.
- Missing optimistic verification or checkout session polling (`/api/checkout/verify?session_id=...`) to ensure a smooth transition from checkout to active subscription.

### 4. Subscription State & Access Control
Check:
- Incomplete subscription lifecycle handling: handling `customer.subscription.created` but ignoring `customer.subscription.deleted`, `customer.subscription.updated`, or `invoice.payment_failed`.
- Failing to revoke entitlements when a subscription status becomes `canceled`, `past_due`, or `unpaid`.
- Insecure customer portal redirects: generating Stripe Billing Portal sessions without validating the authenticated user's ID against the Stripe Customer ID.

## Remediation Policy
- **Confidence:** `CRITICAL` / `CONFIRMED` when webhook signature verification is bypassed or raw body is missing in webhook handlers.
- **Change Risk:** `MEDIUM`. Adding raw body parsing and idempotency tables requires server middleware updates and database migrations.
