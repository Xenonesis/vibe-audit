export async function transfer(db:any, from:string, to:string, amount:number) {
  await db.account.update({ where:{id:from}, data:{balance:{decrement:amount}} });
  // If this fails, first write remains committed.
  await db.account.update({ where:{id:to}, data:{balance:{increment:amount}} });
}
