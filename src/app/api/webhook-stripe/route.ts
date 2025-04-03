import { NextRequest } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

async function readStreamToBuffer(
  readable: ReadableStream<Uint8Array>
): Promise<Buffer> {
  const reader = readable.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }

  return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  if (!req.body) {
    return new Response("Missing request body", { status: 400 });
  }

  const rawBody = await readStreamToBuffer(req.body);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err: unknown) {
    const error = err as Error;
    console.error("❌ Webhook signature verification failed:", error.message);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      const customerEmail =
        // @ts-expect-error Stripe types are not accurate
        paymentIntent?.charges?.data?.[0]?.billing_details?.email;
      // @ts-expect-error Stripe types are not accurate
      const amountCaptured = paymentIntent.charges.data[0].amount_captured;

      try {
        await resend.emails.send({
          from: "Stop All Ansia <onboarding@resend.dev>",
          to: customerEmail,
          subject: "Stop All Ansia Payment Confirmation",
          html: `<p>Your payment of <strong>${amountCaptured / 100}€</strong> has been successfully processed.</p>`,
        });
      } catch (error) {
        console.error("Resend error:", error);
      }
      break;
    default:
      console.log(`ℹ️ Unhandled event type: ${event.type}`);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
