import { formatDistanceToNow } from "date-fns";
import type { APIResponse, EmailData } from "@/types/api";
import type { Email, EmailCategory } from "@/types/email";

/**
 * Extract sender name and email from the "from" field
 * Format: "Name <email@example.com>" or "email@example.com"
 */
export function parseSenderInfo(from: string): {
  name: string;
  email: string;
} {
  const match = from.match(/^(.+?)\s*<(.+?)>$/);

  if (match) {
    return {
      name: match[1].replace(/"/g, "").trim(),
      email: match[2].trim(),
    };
  }

  return {
    name: from.trim(),
    email: from.trim(),
  };
}

/**
 * Categorize email based on AI score
 * Priority: 80-100 (scores 8, 9, 10)
 * Garden: 50-79 (scores 5, 6, 7)
 * Breeze: <50 (scores <5)
 */
export function categorizeByScore(score: number): EmailCategory {
  if (score >= 80) return "urgent";
  if (score >= 50) return "important";
  return "normal";
}

/**
 * Format relative time from date string
 */
export function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    return "Unknown time";
  }
}

/**
 * Parse API response and transform to Email objects
 */
export function parseAPIResponse(apiResponse: APIResponse): Email[] {
  const emails: Email[] = [];

  // Flatten nested emails array
  const allEmails = apiResponse.emails.flat();

  allEmails.forEach((emailData: EmailData) => {
    const sender = parseSenderInfo(emailData.from);
    const score = parseInt(emailData.score, 10) || 0;

    const email: Email = {
      id: emailData.id,
      subject: emailData.subject,
      sender: sender.name,
      senderEmail: sender.email,
      time: formatRelativeTime(emailData.date),
      date: new Date(emailData.date),
      snippet: emailData.snippet,
      htmlContent:
        emailData.textHtml || emailData.textPlain || emailData.snippet,
      category: categorizeByScore(score),
      score: score,
      aiReason: emailData.reason,
      summary: emailData.summary,
      draft: emailData.draft || "",
      needsReply: emailData.needs_reply === "true",
      badge: emailData.badge as any,
    };

    emails.push(email);
  });

  // Sort by date (newest first)
  return emails.sort((a, b) => b.date.getTime() - a.date.getTime());
}

/**
 * Fetch emails from API endpoint
 */
export async function fetchEmailsFromAPI(): Promise<Email[]> {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/main/executions/webhook/tria/tria-filter-agent/tria_keys"
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data: APIResponse = await response.json();
    return parseAPIResponse(data);
  } catch (error) {
    console.error("Failed to fetch emails:", error);
    throw error;
  }
}
