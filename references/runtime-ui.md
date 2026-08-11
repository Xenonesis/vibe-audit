# Runtime & UI Verification

Load this reference when static checks are insufficient to prove that a web application still works in a browser or when the user asks for end-to-end/runtime validation.

## Principles
- Prefer a real running application over assumptions from source code.
- Preserve AUDIT/PLAN mutation limits: do not rewrite app state merely to make a smoke test possible.
- Never expose production secrets or use destructive production accounts for browser tests.
- Treat browser automation as evidence, not as permission to broaden scope.

## Runtime smoke checks
Where the stack and environment allow, verify the smallest representative set:
- application starts without fatal errors
- primary route renders
- console has no new fatal errors
- critical network requests do not fail unexpectedly
- navigation and redirects behave as intended
- authenticated and unauthenticated route boundaries behave correctly
- forms submit and show truthful success/failure states
- responsive layout does not hide critical controls
- hydration/runtime errors are absent on changed flows

## Browser-driven verification
Prefer an existing project E2E harness (Playwright, Cypress, framework-native runner) before adding a new dependency. If no runner exists and adding one would be MEDIUM risk, propose it instead of installing it automatically.

For changed critical flows, use evidence such as:
- exact route tested
- user/role state used
- action sequence
- expected result
- actual result
- console/network failures
- screenshots or traces when the harness supports them

## Visual regression
Use screenshots only when they materially verify layout/visual behavior. Avoid pixel-perfect pass/fail claims when fonts, OS rendering, animations, or dynamic data make them unstable. Prefer stable region checks and semantic assertions.

## High-risk flows
Do not perform real purchases, irreversible deletions, production email blasts, credential rotation, or other consequential actions merely to verify UI. Use test/sandbox environments or mocked provider boundaries where appropriate.

## Reporting
Distinguish:
- VERIFIED IN RUNTIME
- VERIFIED BY TEST ONLY
- STATICALLY VERIFIED
- NOT RUNTIME VERIFIED
