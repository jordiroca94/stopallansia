import { connectMongoDB } from "@/db/mongodb";
import Payment from "@/models/payment";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const res = await req.json();
    const { name, email, description, amount, paymentID } = res;
    await connectMongoDB();
    await Payment.create({
      name,
      email,
      description,
      amount,
      paymentID,
    });

    return NextResponse.json(
      { message: "Payment saved successfully." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error ocurred while saving the payment", error },
      { status: 500 }
    );
  }
}
