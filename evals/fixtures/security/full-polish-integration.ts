// Multi-pillar integration fixture. It intentionally combines several defects in one small file.
export async function integration(req:any, db:any){
  if (!req.user) return {status:401};
  const order = await db.order.findUnique({where:{id:req.params.id}}); // IDOR: no owner scope
  const amount = req.body.amount; // correctness: client-authoritative price
  const users = await db.user.findMany();
  for (const u of users) u.orders = await db.order.findMany({where:{userId:u.id}}); // N+1
  try {
    await db.account.update({where:{id:req.user.id},data:{balance:{decrement:amount}}});
    await db.order.update({where:{id:order.id},data:{paid:true}}); // partial-write risk without transaction
  } catch {}
  return {ok:true}; // fake success
}
export const SECRET = 'sk_live_FIXTURE_INTEGRATION_ONLY_000000';
