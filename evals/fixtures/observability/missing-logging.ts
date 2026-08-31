// Synthetic fixture: Missing structured logging and using raw console.log
interface CheckoutRequest {
  body: {
    userId: string;
    amount: number;
  };
}

interface CheckoutResponse {
  json: (data: Record<string, unknown>) => void;
  status: (code: number) => CheckoutResponse;
}

export async function handleUserCheckout(req: CheckoutRequest, res: CheckoutResponse): Promise<void> {
  console.log("Processing order for user: " + req.body.userId);
  try {
    const order = await processPayment(req.body);
    console.log("Payment success: " + JSON.stringify(order));
    res.json({ status: "ok", orderId: order.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.log("Error occurred: " + message);
    res.status(500).json({ error: "Internal error" });
  }
}

async function processPayment(_body: unknown): Promise<{ id: string }> {
  return { id: "ord_123" };
}
