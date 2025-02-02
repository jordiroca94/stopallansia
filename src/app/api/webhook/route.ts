import { NextRequest } from "next/server";

// EVENT payment_intent.succeeded

export async function POST(req: NextRequest) {
  try {
    if (!req.body) {
      return {
        status: 400,
        body: { error: "Missing request body" },
      };
    }
    const event = req.body;
    console.log("Event received:", event);

    return {
      status: 200,
    };
  } catch (error) {
    console.error("Internal Error:", error);
    return {
      status: 500,
      body: { error: `Internal Server Error: ${error}` },
    };
  }
}
