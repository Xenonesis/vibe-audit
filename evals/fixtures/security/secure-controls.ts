export async function getOrder(req: any, db: any) {
  if (!req.user) return { status: 401 };
  return db.order.findFirst({ where: { id: req.params.id, ownerId: req.user.id } });
}
export async function byName(name: string, db: any) {
  return db.product.findMany({ where: { name: { contains: name } } });
}
