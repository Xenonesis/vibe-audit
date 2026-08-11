export async function charge(api:any, body:any) {
  while (true) {
    try { return await api.charge(body); }
    catch { /* BUG: unbounded retry of non-idempotent mutation */ }
  }
}
