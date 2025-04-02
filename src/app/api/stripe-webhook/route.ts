import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const buf = await req.arrayBuffer();
  const body = Buffer.from(buf).toString("utf8");

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log("✅ Event:", event.type);
    return new NextResponse("OK", { status: 200 });
  } catch (err) {
    console.error("❌ Signature failed", err);
    return new NextResponse("Webhook Error", { status: 400 });
  }
}
