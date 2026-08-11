const memo = new Map<string, any>();
export async function getCatalog(db:any, tenantId:string) {
  if (memo.has(tenantId)) return memo.get(tenantId);
  const v = await db.catalog.findMany({ where:{tenantId}, take:100 });
  memo.set(tenantId, v);
  return v;
}
