# Maintainability Reference

Goal: reduce future defect risk without turning the audit into an architecture rewrite.

## Giant modules/components
Look for files that combine rendering, fetching, validation, business logic, persistence/API calls, permissions, formatting, state management, and unrelated concerns. Extract only when a responsibility boundary is clear and testable.

Do not use line count alone as proof. A long cohesive generated table or schema can be easier to maintain than many artificial wrappers.

## Duplication
Distinguish duplicated syntax from duplicated business knowledge. Consolidate repeated business rules/queries/authorization checks when divergence is likely to cause defects. Do not abstract two trivial blocks merely for DRY aesthetics.

## Over-abstraction
Flag wrapper-around-wrapper layers, single-use factories, generic repositories with one implementation, pass-through services, one-line utility modules, abstraction that hides framework features, or "clean architecture" layers with no demonstrated need.

## Dead code and dependencies
Identify unused imports/variables/functions/routes/components/files/dependencies. Verify dynamic imports, framework conventions, string-based routes, build-time plugins, codegen, reflection, tests, and package scripts before deletion. Use project tooling/search evidence.

## Coupling and boundaries
Review circular dependencies, shared mutable globals, feature code reaching through many layers, business logic tied directly to UI, utilities that become dumping grounds, and privileged logic duplicated across client/server.

## Naming and structure
Names should reveal responsibility and security/business semantics. Prefer local, incremental restructuring over project-wide moves. Avoid renaming public APIs or persisted fields without migration/compatibility analysis.

## Safe refactoring
1. Establish behavior/tests.
2. Pick a narrow boundary.
3. Refactor without semantic changes.
4. Run targeted tests/typecheck/lint.
5. Remove verified dead code/imports.
6. Run broader checks at phase boundary.

Refactoring is not a performance claim and should not be presented as one unless measured.
