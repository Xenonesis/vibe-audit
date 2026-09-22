# Next.js & Server Actions Security Reference

Load when auditing Next.js (App Router or Pages Router) applications, Server Actions, API routes, or React Server Components.

## Core Invariant
`'use server'` creates public HTTP POST endpoint. It does not authenticate. Anyone with curl can invoke any Server Action directly.

---

## 1. Server Actions Missing Auth / Ownership

### Check
Every Server Action that mutates data, deletes rows, charges cards, or exposes private fields MUST verify authentication and resource ownership inside action body.

### Code Smell
```typescript
// VULNERABLE: AI-generated Server Action trusting client ID without auth
'use server'
export async function deletePost(postId: string) {
  await db.post.delete({ where: { id: postId } });
}
```

### Remediation
```typescript
'use server'
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function deletePost(postId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');

  // Verify ownership before mutation
  const post = await db.post.findUnique({ where: { id: postId } });
  if (!post || post.userId !== session.user.id) {
    throw new Error('Not found or unauthorized');
  }

  await db.post.delete({ where: { id: postId } });
}
```

**Severity**: `CRITICAL` | **Change Risk**: `LOW`

---

## 2. Returning Raw Database Models (Over-Fetching & PII Leaks)

### Check
Server Actions return values serialize directly into client JSON. Never return raw database records containing hashed passwords, internal tokens, or billing identifiers.

### Code Smell
```typescript
// VULNERABLE: Sends passwordHash, stripeCustomerId to client bundle
'use server'
export async function updateProfile(formData: FormData) {
  const session = await auth();
  return await db.user.update({
    where: { id: session.user.id },
    data: { name: formData.get('name') as string }
  });
}
```

### Remediation
Return explicit DTO or boolean:
```typescript
'use server'
export async function updateProfile(formData: FormData) {
  const session = await auth();
  await db.user.update({
    where: { id: session.user.id },
    data: { name: formData.get('name') as string }
  });
  return { success: true };
}
```

**Severity**: `HIGH` | **Change Risk**: `LOW`

---

## 3. Production Source Maps Leaked

### Check
Inspect `next.config.js` or `next.config.ts`. `productionBrowserSourceMaps: true` leaks full TypeScript source code, comments, and hidden route signatures to public browsers.

### Remediation
Ensure `productionBrowserSourceMaps` is disabled (`false` or omitted) in production.

**Severity**: `MEDIUM` | **Change Risk**: `LOW`
