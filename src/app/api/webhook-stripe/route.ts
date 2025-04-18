import { NextRequest } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import getEmailTemplate from "@/lib/getEmailTemplate";

type StripePaymentIntent = {
  data: {
    object: {
      charges: {
        data: {
          amount: number;
          description: string;
          metadata: {
            locale: "en" | "es" | "it";
            name: string;
            paymentID: string;
          };
          billing_details: {
            email: string;
          };
          payment_method_details: {
            card: {
              last4: string;
            };
          };
        }[];
      };
    };
  };
};

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

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event as unknown as StripePaymentIntent;

    const charge = paymentIntent.data.object.charges.data[0];

    if (!charge) {
      return new Response("No charge data found", { status: 400 });
    }

    const {
      billing_details,
      amount,
      description,
      payment_method_details,
      metadata,
    } = charge;

    const customerEmail = billing_details?.email;
    let last4Digits = payment_method_details?.card?.last4;
    const locale = metadata?.locale;
    const name = metadata?.name;
    const paymentID = metadata?.paymentID;

    if (!customerEmail) {
      return new Response("Missing customer email", { status: 400 });
    }
    if (!description) {
      return new Response("Missing description", { status: 400 });
    }
    if (!name) {
      return new Response("Missing customer name", { status: 400 });
    }
    if (!paymentID) {
      return new Response("Missing payment ID", { status: 400 });
    }

    // Just In cas user uses link ( autosaved card )
    if (!last4Digits) {
      last4Digits = "XXXX";
    }

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email: customerEmail,
          description,
          amount,
          paymentID,
          last4Digits,
          locale,
        }),
      });
    } catch (err) {
      console.error("❌ Error saving payment:", err);
    }

    const html = await getEmailTemplate(
      description,
      amount,
      last4Digits,
      locale,
      name,
      paymentID
    );

    try {
      await resend.emails.send({
        from: "Stop All Ansia <stopallansia@jordirocasoler.com>",
        to: customerEmail,
        subject: "Stop All Ansia Payment Confirmation",
        html,
      });
    } catch (error) {
      console.error("❌ Resend email error:", error);
    }
  } else {
    console.log(`ℹ️ Unhandled event type: ${event.type}`);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
