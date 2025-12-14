import { NextResponse } from "next/server";
import { BACKEND_ENDPOINTS } from "@/lib/constants/endpoints";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(BACKEND_ENDPOINTS.SEND_TO_SLACK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to send to Slack" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Slack API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
