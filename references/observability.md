# Observability and Monitoring Reference

Observability means an application's internal state, failures, and performance can be inferred from external outputs: structured logs, health endpoints, error telemetry, and correlation signals. Vibe-coded applications frequently rely solely on ad-hoc `console.log` statements with zero production visibility.

## Core Audit Targets

### 1. Structured Logging
Check:
- Raw `console.log`, `fmt.Println`, or `print()` in server-side request/data handlers instead of structured loggers (`pino`, `winston`, `zap`, `slog`, `loguru`, `structlog`).
- Unstructured string concatenation in log statements that prevents machine indexing and log aggregation.
- Log level discipline: missing distinction between `DEBUG`, `INFO`, `WARN`, `ERROR`.
- Sensitive data leakage in logs: authorization headers, passwords, session tokens, API keys, full credit cards, or plain-text PII in log payloads.

### 2. Error Tracking and Telemetry Integration
Check:
- Missing application error monitoring integration (e.g. Sentry, Datadog, Rollbar, Bugsnag, Honeybadger, OpenTelemetry).
- Unhandled promise rejections and uncaught exceptions crash handlers without reporting telemetry.
- Telemetry SDK initialization in production environments vs dev-mode gating.
- User context attached to error reports without exposing raw credentials or sensitive PII.

### 3. Health and Readiness Endpoints
Check:
- Absence of standard health check endpoints (`/health`, `/healthz`, `/livez`, `/readyz`, `/ping`).
- Health endpoints returning hardcoded `200 OK` without validating critical dependencies (database connection pool, Redis cache reachability, upstream service status).
- Readiness vs. liveness separation in containerized environments (failing liveness restarts container; failing readiness removes from load balancer pool).

### 4. Correlation and Request ID Propagation
Check:
- Missing unique Request ID / Trace ID generation per incoming HTTP or RPC request.
- Request ID not attached to request-scoped logger context or returned in response headers (`X-Request-Id`).
- Downstream HTTP/RPC calls not forwarding trace headers (`traceparent`, `X-Correlation-Id`), breaking distributed tracing.

### 5. Silent Error Swallowing
Check:
- Empty catch blocks (`catch (e) {}`, `except: pass`) that discard exceptions without logging or rethrowing.
- Catch blocks returning fallback values or fake success payloads without warning telemetry.
- Framework default error handlers exposing stack traces, internal SQL queries, or filesystem paths to public end users.

### 6. Metrics and Performance Visibility
Check:
- Missing instrumentation for critical business transactions (order completions, payment failures, auth attempts).
- No latency histogram or request duration measurement for external API dependencies.
- No database query duration metrics or slow query alarms.

## Finding Format and Risk
- **Category:** `Observability`
- **Severity:** `MEDIUM` for missing error tracking, silent swallowing, or leaking PII in logs; `LOW` for missing structured logging or health endpoints.
- **Confidence:** `CONFIRMED` when visible in code; `POTENTIAL` when telemetry SDK may be configured via runtime environment or external sidecar.
- **Change Risk:** `LOW` for adding structured logging wrappers or health check routes; `MEDIUM` for global error handling middleware changes.
