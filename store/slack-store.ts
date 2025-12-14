import { create } from "zustand";
import { API_ENDPOINTS } from "@/lib/constants/endpoints";
import type { Email } from "@/types/email";
import { toast } from "react-hot-toast";

interface SlackStore {
  isSending: boolean;
  error: string | null;
  sendToSlack: (email: Email) => Promise<void>;
  clearError: () => void;
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

export const useSlackStore = create<SlackStore>((set) => ({
  isSending: false,
  error: null,

  sendToSlack: async (email: Email) => {
    set({ isSending: true, error: null });
    try {
      const payload = {
        text: formatSlackMessage(email),
      };

      const response = await fetch(API_ENDPOINTS.SLACK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        toast.error("Failed to send to Slack");
      } else {
        toast.success("Successfully sent to Slack!");
      }

      set({ isSending: false });
    } catch (error) {
      set({
        error: "Failed to send to Slack. Please try again.",
        isSending: false,
      });
      toast.error("Failed to send to Slack. Please try again.");
    }
  },

  clearError: () => set({ error: null }),
}));
