export async function createCheckout(req: any, payments: any) {
  // BUG: client controls authoritative amount.
  return payments.createIntent({ amount: req.body.amount, currency: req.body.currency });
}
