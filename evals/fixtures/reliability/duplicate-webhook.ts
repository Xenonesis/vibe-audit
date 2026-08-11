export async function paid(event:any, db:any, mail:any) {
  await db.order.update({ where:{id:event.orderId}, data:{fulfilled:true} });
  await mail.send(event.customer, 'Your order shipped'); // duplicates on webhook retry
}
