import { create } from "zustand";
import type { Email } from "@/types/email";
import type { GlobalSummary } from "@/types/api";
import toast from "react-hot-toast";

interface EmailStore {
  // State
  emails: Email[];
  priorityEmails: Email[]; // 8-10 scores
  gardenEmails: Email[]; // 5-7 scores
  breezeEmails: Email[]; // <5 scores
  selectedEmail: Email | null;
  isLoading: boolean;
  isSending: boolean;
  error: string | null;
  lastSync: Date | null;
  globalSummary: GlobalSummary | null;

  // Summary stats
  summary: {
    processed: number;
    priority: number;
    garden: number;
    breeze: number;
    timeSaved: number;
  };

  // Actions
  setEmails: (emails: Email[]) => void;
  setSelectedEmail: (email: Email | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setGlobalSummary: (summary: GlobalSummary) => void;
  categorizeEmails: () => void;
  updateSummary: () => void;
  resetStore: () => void;
  fetchEmails: () => Promise<void>;
  sendEmail: (payload: {
    to: string[];
    subject: string;
    htmlBody: string;
    cc?: string[];
    bcc?: string[];
  }) => Promise<void>;
  replyToEmail: (payload: {
    to: string[];
    from?: string;
    replyTo?: string[];
    subject: string;
    html?: string;
    text?: string;
    cc?: string[];
    bcc?: string[];
  }) => Promise<void>;
}

const initialState = {
  emails: [],
  priorityEmails: [],
  gardenEmails: [],
  breezeEmails: [],
  selectedEmail: null,
  isLoading: false,
  isSending: false,
  error: null,
  lastSync: null,
  globalSummary: null,
  summary: {
    processed: 0,
    priority: 0,
    garden: 0,
    breeze: 0,
    timeSaved: 0,
  },
};

export const useEmailStore = create<EmailStore>((set, get) => ({
  ...initialState,

  setEmails: (emails) => {
    set({ emails, lastSync: new Date() });
    get().categorizeEmails();
    get().updateSummary();
  },

  setSelectedEmail: (email) => set({ selectedEmail: email }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  setGlobalSummary: (globalSummary) => set({ globalSummary }),

  categorizeEmails: () => {
    const { emails } = get();

    // Priority: scores 8-10 (80-100)
    const priorityEmails = emails
      .filter((email) => email.score >= 80)
      .sort((a, b) => b.score - a.score);

    // Garden: scores 5-7 (50-79)
    const gardenEmails = emails
      .filter((email) => email.score >= 50 && email.score < 80)
      .sort((a, b) => b.score - a.score);

    // Breeze: scores <5 (<50)
    const breezeEmails = emails
      .filter((email) => email.score < 50)
      .sort((a, b) => b.score - a.score);

    set({ priorityEmails, gardenEmails, breezeEmails });
  },

  updateSummary: () => {
    const { emails, priorityEmails, gardenEmails, breezeEmails } = get();

    set({
      summary: {
        processed: emails.length,
        priority: priorityEmails.length,
        garden: gardenEmails.length,
        breeze: breezeEmails.length,
        timeSaved: emails.length * 2, // Estimate 2 min per email
      },
    });
  },

  fetchEmails: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/emails");

      if (!response.ok) {
        throw new Error("Failed to fetch emails");
      }

      const data = await response.json();

      // Parse emails using email-utils
      const { parseAPIResponse } = await import("@/lib/email-utils");
      const emails = parseAPIResponse(data);

      get().setEmails(emails);

      // Set global summary from API
      if (data.summary) {
        get().setGlobalSummary(data.summary);
      }

      set({ isLoading: false });
    } catch (error) {
      console.error("Error fetching emails:", error);
      set({ isLoading: false });
      throw error;
    }
  },

  sendEmail: async (payload) => {
    set({ isSending: true, error: null });
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        toast.error("Failed to send email");
      } else {
        toast.success("Email sent successfully!");
      }

      set({ isSending: false });
    } catch (error) {
      set({
        error: "Failed to send email. Please try again.",
        isSending: false,
      });
    }
  },

  replyToEmail: async (payload) => {
    set({ isSending: true, error: null });
    try {
      const response = await fetch("/api/reply-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        toast.error("Failed to reply to email");
      } else {
        toast.success("Reply sent successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }

      set({ isSending: false });
    } catch (error) {
      toast.error("Failed to reply to email. Please try again.");
      set({
        error: "Failed to reply to email. Please try again.",
        isSending: false,
      });
    }
  },

  resetStore: () => set(initialState),
}));
