import { NextResponse } from "next/server";
import { BACKEND_ENDPOINTS } from "@/lib/constants/endpoints";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, subject, htmlBody, textBody, cc, bcc } = body;

    // Validate required fields
    if (!to || !Array.isArray(to) || to.length === 0) {
      return NextResponse.json(
        { error: "Recipient email addresses are required" },
        { status: 400 }
      );
    }

    // Prepare payload - FIXED: Don't duplicate 'to' into cc/bcc
    const payload = {
      to,
      subject: subject || "Email from Tria",
      htmlBody: htmlBody || "",
      textBody: textBody || "",
      cc: cc && cc.length > 0 ? cc : [],  // ✅ Empty array instead of 'to'
      bcc: bcc && bcc.length > 0 ? bcc : []  // ✅ Empty array instead of 'to'
    };

    console.log("Sending email payload:", JSON.stringify(payload, null, 2));

    const response = await fetch(BACKEND_ENDPOINTS.SEND_EMAIL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Email send failed:", errorText);
      return NextResponse.json(
        { error: "Failed to send email", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Kestra response:", JSON.stringify(data, null, 2));
    
    // Handle both response formats
    return NextResponse.json({
      success: true,
      threadId: data.outputs?.threadId || data.threadId,
      messageId: data.outputs?.messageId || data.messageId
    });
    
  } catch (error) {
    console.error("Send email API route error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
