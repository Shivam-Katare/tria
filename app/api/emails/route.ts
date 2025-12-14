import { NextResponse } from "next/server";
import { BACKEND_ENDPOINTS } from "@/lib/constants/endpoints";

export async function GET() {
  try {
    const response = await fetch(BACKEND_ENDPOINTS.FETCH_EMAILS);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch emails" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Emails API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
