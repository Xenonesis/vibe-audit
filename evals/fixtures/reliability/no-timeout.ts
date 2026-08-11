export async function fetchProfile(url:string) {
  return fetch(url).then(r => r.json()); // fixture: no explicit timeout/cancellation budget
}
