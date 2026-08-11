export async function importRows(db:any, rows:any[]) {
  for (const row of rows) await db.item.create({ data: row });
}
