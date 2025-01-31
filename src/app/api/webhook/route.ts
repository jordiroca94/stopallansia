import { NextRequest } from "next/server";

// EVENT payment_intent.succeeded

export async function POST(req: NextRequest) {
  console.log("REQ BODY ----> // ", req.body);
}
