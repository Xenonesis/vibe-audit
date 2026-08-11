export async function getOrder(req: any, db: any) {
  if (!req.user) return { status: 401 };
  // BUG: authenticated user can read any order id.
  return db.order.findUnique({ where: { id: req.params.id } });
}
