import { connectMongoDB } from "@/db/mongodb";
import Payment from "@/models/payment";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    const payments = await Payment.find().sort({ createdAt: -1 });

    return NextResponse.json({ payments }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while fetching payments", error },
      { status: 500 }
    );
  }
}
