export async function webhook(req: any, db: any) {
  // BUG: no provider signature or duplicate-event check.
  if (req.body.type === 'payment.paid') await db.order.update({ where:{id:req.body.orderId}, data:{paid:true} });
  return { status: 200 };
}
