import { NextRequest, NextResponse } from "next/server";
import { BACKEND_ENDPOINTS } from "@/lib/constants/endpoints";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.to || !Array.isArray(body.to) || body.to.length === 0) {
      return NextResponse.json(
        { error: "Recipient email addresses (to) are required" },
        { status: 400 }
      );
    }

    if (!body.subject) {
      return NextResponse.json(
        { error: "Subject is required" },
        { status: 400 }
      );
    }

    // Prepare payload for backend
    const payload = {
      to: body.to,
      from: body.from || "onboarding@resend.dev",
      subject: body.subject,
      html: body.html,
      text: body.text,
      replyTo: body.replyTo,
      cc: body.cc,
      bcc: body.bcc,
    };

    // Call backend webhook
    const response = await fetch(BACKEND_ENDPOINTS.REPLY_EMAIL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error:", errorText);
      return NextResponse.json(
        { error: "Failed to send reply email" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in reply-email route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
