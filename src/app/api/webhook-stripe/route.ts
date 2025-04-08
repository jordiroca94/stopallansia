import { NextRequest } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { readFile } from "fs/promises";
import path from "path";

type StripePaymentIntent = {
  data: {
    object: {
      charges: {
        data: {
          amount: number;
          description: string;
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

async function getEmailTemplate(
  description: string,
  amount: number,
  last4Digits: string
): Promise<string> {
  const filePath = path.resolve(
    process.cwd(),
    "src/templates/email-template.html"
  );
  let template = await readFile(filePath, "utf-8");

  template = template.replace("{{description}}", description);
  template = template.replace("{{amount}}", (amount / 100).toFixed(2));
  template = template.replace("{{last4Digits}}", last4Digits);

  return template;
}

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

    const { billing_details, amount, description, payment_method_details } =
      charge;

    const customerEmail = billing_details?.email;
    const last4Digits = payment_method_details?.card?.last4;

    if (!customerEmail || !last4Digits || !description) {
      return new Response("Missing charge details", { status: 400 });
    }

    const html = await getEmailTemplate(description, amount, last4Digits);

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
