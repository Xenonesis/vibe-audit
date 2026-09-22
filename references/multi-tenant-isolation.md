# Multi-Tenant Isolation & Database Scoping Reference

Load when auditing SaaS architectures, Supabase / Firebase integrations, multi-user apps, or data filtering layers.

## Core Invariant
Never send multi-tenant data to the client and filter in UI. Filter at database query level using authenticated identity.

---

## 1. Client-Side Multi-Tenant Filtering ("Leak All, Filter in React")

### Check
Inspect frontend code (`.tsx`, `.jsx`) filtering backend lists by `userId`, `tenantId`, `orgId`. If the backend returns all rows and leaves filtering to the browser, all data is exposed via network inspection.

### Code Smell
```typescript
// VULNERABLE: Backend returned all users/invoices; client filters
const myInvoices = allInvoices.filter(inv => inv.userId === currentUser.id);
```

### Remediation
Enforce filtering on the server/database query:
```typescript
const { data } = await supabase
  .from('invoices')
  .select('*')
  .eq('user_id', currentUser.id);
```

**Severity**: `CRITICAL` | **Change Risk**: `MEDIUM`

---

## 2. Supabase / Firebase Missing or Empty RLS (`USING (true)`)

### Check
Every table in Supabase exposed to the public anon key must have Row Level Security enabled and non-trivial policies.
A policy with `USING (true)` or `WITH CHECK (true)` on a table containing user secrets turns the public anon key into full read/write access.

### Remediation
```sql
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only read own invoices"
ON invoices FOR SELECT
USING (auth.uid() = user_id);
```

**Severity**: `CRITICAL` | **Change Risk**: `MEDIUM`
