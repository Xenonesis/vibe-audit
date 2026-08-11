export async function updateOrder(db:any, id:string, next:string) {
  // BUG: any state string accepted, including refunded -> shipped.
  return db.order.update({ where:{id}, data:{status:next} });
}
