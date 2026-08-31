# AI Test Generation Evaluator Reference

Vibe coders frequently generate unit tests using AI prompts, but AI-generated test suites exhibit common anti-patterns: testing only happy paths, mocking 100% of dependencies (providing zero behavioral verification), asserting hallucinated conditions, and ignoring critical error/mutation branches.

## Core Audit Targets

### 1. Test-to-Source Density and Coverage Scope
Check:
- Test-to-source LOC ratio below minimal threshold (< 0.3 test LOC per source LOC indicates major untested surface area).
- Complete absence of test files for core business logic, API route handlers, or authentication routines.
- Tests existing only for trivial utilities (e.g. `sum(a, b)`) while complex financial or authorization code has zero coverage.

### 2. Happy-Path-Only Anti-Pattern
Check:
- Test suites containing zero negative assertions, error branch assertions, or rejection checks (e.g. absence of `expect(...).toThrow()`, `expect(...).rejects`, `assertRaises`, `assert_eq!(Err(...))`).
- No tests verifying HTTP `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, or `429 Too Many Requests` status codes on API handlers.
- No tests verifying schema validation failure behavior on malformed input payloads.

### 3. Mock-Everything Anti-Pattern (Zero-Integration Confidence)
Check:
- Over-mocking: unit tests where all imports, database layers, and service calls are mocked to return hardcoded objects, testing only that the mock was invoked rather than actual logic.
- Tests that mock the exact function being tested or assert against mock implementation return values instead of business invariants.
- Lack of integration or contract tests validating actual database queries, schema conversions, or serialized responses.

### 4. Boundary and Edge-Case Coverage
Check:
- Missing boundary conditions: zero, negative numbers, empty strings, null / undefined / None, maximum length strings, Unicode / emojis, out-of-order timestamps, duplicate IDs.
- Concurrency and race condition testing: missing concurrent execution checks on checkout, balance mutation, or inventory reservation paths.
- Pagination boundaries: testing page 1 with 5 items, but never testing empty page, last page, or negative page offsets.

### 5. Hallucinated Assertions and Vacuous Tests
Check:
- Test descriptions describing behaviors completely different from what is actually asserted in the test body (AI prompt tell).
- Vacuous assertions: `expect(true).toBe(true)`, `expect(result).toBeDefined()` on functions that always return an object, or assertions with no `expect()` call inside async callbacks.
- Self-fulfilling assertions: testing a mock against another mock without exercising the target codebase.

### 6. Critical Path Prioritization
Prioritize testing inspection on:
1. **Authentication & Access Control**: Login, token verification, permission checks, password reset.
2. **Payment & Billing**: Checkout, webhook processing, refund calculation, currency precision.
3. **Data Mutation**: Create, update, delete operations on primary entities.
4. **External Integrations**: Third-party API failure handling, rate limit backoff, timeout handling.

## Confidence and Risk Guidelines
- **Heuristic Rule**: Test quality assessments are heuristic by nature. Mark findings as `POTENTIAL` or `LIKELY` unless direct code evidence shows a vacuous assertion or complete lack of error coverage on critical paths.
- **Change Risk**: `LOW` for adding new boundary/negative test cases; `ZERO` during read-only AUDIT mode.
