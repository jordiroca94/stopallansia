import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { amount, description } = await req.json();
    // add locale on the request
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "eur",
      description: description,
      automatic_payment_methods: { enabled: true },
      // metadata: {
      //   locale: locale,
      // },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
