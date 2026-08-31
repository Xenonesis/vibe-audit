// Synthetic fixture: Multi-tenant query missing tenant scoping (IDOR / BOLA risk)
interface TenantRecord {
  id: string;
  tenantId: string;
  data: string;
}

interface TenantDB {
  findDocumentById: (id: string) => Promise<TenantRecord | null>;
}

export async function getTenantDocument(db: TenantDB, _currentTenantId: string, docId: string): Promise<TenantRecord | null> {
  // Missing tenantId check in query or post-fetch validation
  const doc = await db.findDocumentById(docId);
  return doc;
}
