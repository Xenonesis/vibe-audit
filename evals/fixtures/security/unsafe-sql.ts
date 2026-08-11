export async function search(req: any, db: any) {
  return db.$queryRawUnsafe(`SELECT * FROM products WHERE name LIKE '%${req.query.q}%'`);
}
