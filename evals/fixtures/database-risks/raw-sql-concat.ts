// Synthetic fixture: Raw SQL string template interpolation
interface DBClient {
  query: (sql: string) => Promise<unknown[]>;
}

export async function searchProducts(db: DBClient, category: string, minPrice: number): Promise<unknown[]> {
  // Vulnerable raw SQL string concatenation
  const queryStr = `SELECT * FROM products WHERE category = '${category}' AND price >= ${minPrice}`;
  return await db.query(queryStr);
}
