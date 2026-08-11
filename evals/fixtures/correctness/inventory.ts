export async function buy(db: any, productId: string, qty: number) {
  const p = await db.product.findUnique({ where:{id:productId} });
  if (!p) throw new Error('not found');
  // BUG: no qty > 0 check and non-atomic stock check/update.
  if (p.stock < qty) throw new Error('out of stock');
  await db.product.update({ where:{id:productId}, data:{stock:p.stock-qty} });
}
