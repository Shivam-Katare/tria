import type { Email } from "@/types/email";

const SLACK_ENDPOINT = "http://localhost:8080/api/v1/main/executions/webhook/tria/tria-mock-filter/slack-key";

interface SlackPayload {
  message: string;
}

export async function sendToSlack(email: Email): Promise<void> {
  const message = formatSlackMessage(email);
  
  const payload: SlackPayload = {
    message,
  };

  try {
    const response = await fetch(SLACK_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to send to Slack: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending to Slack:", error);
    throw error;
  }
}

function formatSlackMessage(email: Email): string {
  const lines = [
    "Hi, I got a message from:",
    `*${email.sender}* <${email.senderEmail}>`,
    "",
    "This mail is regarding:",
    `${email.summary || email.snippet}`,
    "",
    "I received this mail on:",
    `${email.time}`,
    "",
    "Subject:",
    `${email.subject}`,
  ];

  if (email.score) {
    lines.push("", `Priority Score: ${email.score}`);
  }

  return lines.join("\n");
}
