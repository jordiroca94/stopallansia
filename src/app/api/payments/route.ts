import { connectMongoDB } from "@/db/mongodb";
import Payment from "@/models/payment";
import { NextResponse } from "next/server";

// Define the filter type explicitly
interface PaymentFilters {
  name?: { $regex: string; $options: string };
  email?: { $regex: string; $options: string };
  description?: { $regex: string; $options: string };
  paymentID?: string;
  amount?: number;
}

export async function GET(req: Request) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(req.url);

    const filters: PaymentFilters = {};

    if (searchParams.has("name")) {
      filters.name = { $regex: searchParams.get("name")!, $options: "i" };
    }

    if (searchParams.has("email")) {
      filters.email = { $regex: searchParams.get("email")!, $options: "i" };
    }

    if (searchParams.has("description")) {
      filters.description = {
        $regex: searchParams.get("description")!,
        $options: "i",
      };
    }

    if (searchParams.has("paymentID")) {
      filters.paymentID = searchParams.get("paymentID")!;
    }

    if (searchParams.has("amount")) {
      const amount = parseFloat(searchParams.get("amount") || "");
      if (!isNaN(amount)) {
        filters.amount = amount;
      }
    }

    const payments = await Payment.find(filters).sort({ createdAt: -1 });

    return NextResponse.json({ payments }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while fetching payments", error },
      { status: 500 }
    );
  }
}
