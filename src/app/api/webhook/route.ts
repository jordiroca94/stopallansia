import { stripe } from "@/stripe/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  // Get the Stripe-Signature header to verify the event
  const sig = req.headers.get("stripe-signature");

  // Read the raw body as text
  const buf = await req.text();

  let event: Stripe.Event;

  try {
    // Verify the event using Stripe's helper function
    event = stripe.webhooks.constructEvent(
      buf,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error(`⚠️  Webhook signature verification failed.`, err);
    return new NextResponse(`Webhook Error: ${err}`, { status: 400 });
  }

  // Log the event type and object for debugging purposes
  console.log("✅ Success: Event received", event.type);
  console.log(event.data.object);

  // Here you can add additional event handling logic based on event.type
  // For example, if (event.type === 'payment_intent.succeeded') { ... }

  // Return a 200 response to acknowledge receipt of the event
  return new NextResponse("Received", { status: 200 });
}
