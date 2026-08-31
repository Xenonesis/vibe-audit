// Synthetic fixture: Stripe webhook handler skipping signature verification
// Vulnerability: Accepting raw unverified JSON allows anyone to forge payment events
import { Request, Response } from 'express';

export async function handleStripeWebhook(req: Request, res: Response) {
  // Parsing body without stripe.webhooks.constructEvent
  const event = req.body;

  if (event.type === 'checkout.session.completed') {
    const customerId = event.data.object.customer;
    console.log(`Granting subscription access to customer ${customerId}`);
    // Unverified entitlement grant
  }

  res.json({ received: true });
}
