export function securityHeaders(res:any){
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  res.setHeader('X-Content-Type-Options', 'nosniff');
}
export function validateBody(body:any){
  if (typeof body.email !== 'string' || body.email.length > 254) throw new Error('invalid');
  return body;
}
export function rateKey(req:any){ return req.user?.id ?? req.ip; }
// Fixture represents an application that already has adequate validation/header/rate-limit hooks.
