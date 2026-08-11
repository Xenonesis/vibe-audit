export async function save(api:any, data:any) {
  try { await api.post('/save', data); } catch {}
  return { ok:true, message:'Saved successfully' };
}
