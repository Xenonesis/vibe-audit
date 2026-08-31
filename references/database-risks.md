# Database Risk Profile and Performance Reference

AI-generated web applications frequently introduce structural database risks: in-memory guards that fail in distributed production, unindexed query filters that cause full table scans, N+1 query loops, missing transactional boundaries, and unsafe migration scripts.

## Relationship to Security Playbook
- `references/security.md` covers SQL injection and input parameterization.
- `references/database-risks.md` covers structural architecture, query performance, data isolation, migration safety, and concurrency.

## Core Audit Targets

### 1. N+1 Query Patterns
Check:
- ORM queries (`.find()`, `.where()`, `.findOne()`, `SELECT`) executed inside `for`, `forEach`, `map`, or list loops.
- Missing eager-loading / preloading directives (e.g. Prisma `include`, Sequelize `include`, TypeORM `relations`, ActiveRecord `includes`, SQLAlchemy `joinedload`, Django `select_related`/`prefetch_related`).
- GraphQL resolvers executing unbounded single-entity database queries per parent item without DataLoader batching.

### 2. Missing Indexes and Query Performance
Check:
- Foreign key columns lacking explicit database indexes.
- Columns frequently used in `WHERE`, `ORDER BY`, `GROUP BY`, or `JOIN` clauses missing indexes (e.g., `tenant_id`, `user_id`, `created_at`, `status`, `slug`).
- Over-indexing: redundant composite indexes whose prefixes already cover queries.
- Unbounded `SELECT *` on wide tables containing large `TEXT`, `BLOB`, or `JSON` fields.

### 3. Raw SQL Construction and Complex Queries
Check:
- Template literals or string concatenation building SQL queries or fragments (`SELECT ... WHERE id = ${id}`).
- Dynamic table or column names interpolated directly into queries without identifier escaping or allowlisting.
- In-memory pagination (fetching all 100,000 rows into Node.js/Python memory then slicing `[0:20]`) instead of SQL `LIMIT`/`OFFSET` or keyset/cursor pagination.

### 4. Schema Migration Safety and Reversibility
Check:
- Destructive migration operations: `DROP TABLE`, `DROP COLUMN`, or `TRUNCATE` in automatic deployment migrations without rollback safety.
- Column type modifications that lock tables or fail on existing data conversion.
- Adding `NOT NULL` columns without a `DEFAULT` value or backfill step on populated tables.
- Missing rollback migrations (`down` migrations or reversible scripts).

### 5. Multi-Tenant Isolation and Row-Level Security (RLS)
Check:
- Shared multi-tenant database tables queried without explicit tenant scoping (`WHERE tenant_id = current_tenant`).
- Missing Postgres Row-Level Security (RLS) policies on shared tenant tables where direct client or connection-pooling access is permitted.
- In-memory tenant filtering: loading all records across all tenants into application memory and filtering by tenant ID in JavaScript/Python.

### 6. Connection Pooling and Transaction Management
Check:
- Database clients instantiated per-request or inside serverless handler functions without connection pooling.
- Missing pool limits (`max_connections`), connection timeout, or idle connection cleanup settings.
- Multi-step write operations (e.g. create order + debit balance + update inventory) executed across separate queries without an atomic database transaction (`BEGIN ... COMMIT` / `prisma.$transaction`).
- Long-running external network calls (e.g. Stripe API, OpenAI API) executed *inside* open database transactions, exhausting connection pool slots.

## Finding Format and Risk
- **Category:** `Database`
- **Severity:** `CRITICAL` for unparameterized SQL or cross-tenant data leakage; `HIGH` for missing transactions on financial/inventory writes; `MEDIUM` for N+1 queries and missing foreign key indexes.
- **Change Risk:** `LOW` for adding indexes or eager loading; `HIGH` for schema migrations or tenant filtering refactors (requires explicit user consent).
