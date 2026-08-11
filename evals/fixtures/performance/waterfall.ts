export async function load(api:any) {
  const a = await api.get('/profile');
  const b = await api.get('/recommendations');
  const c = await api.get('/announcements');
  return {a,b,c}; // independent requests in this fixture
}
