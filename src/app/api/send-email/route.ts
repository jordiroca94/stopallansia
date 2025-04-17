import { NextResponse } from "next/server";
import { Resend } from "resend";
import getEmailTemplate from "@/lib/getEmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const payment = await req.json();

  if (!payment.last4Digits) {
    payment.last4Digits = "XXXX";
  }

  try {
    const html = await getEmailTemplate(
      payment.description,
      payment.amount,
      payment.last4Digits,
      payment.locale,
      payment.name,
      payment.paymentID
    );

    await resend.emails.send({
      from: "Stop All Ansia <stopallansia@jordirocasoler.com>",
      to: payment.email,
      subject: "Stop All Ansia Payment Confirmation",
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
