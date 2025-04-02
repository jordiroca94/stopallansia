// app/api/stripe-webhook/route.ts
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Mark this route to use Edge Runtime
export const config = {
  runtime: "edge",
};

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return new NextResponse("Missing Stripe signature", { status: 400 });
  }

  const rawBody = await req.arrayBuffer();
  const body = Buffer.from(rawBody).toString("utf8");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("❌ Signature verification failed:", err);
    return new NextResponse(`Webhook Error: ${err}`, { status: 400 });
  }

  console.log("✅ Webhook received:", event.type);

  // Handle event type (optional)
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    console.log("💰 Payment succeeded for:", paymentIntent.id);
  }

  return new NextResponse("Webhook received", { status: 200 });
}
