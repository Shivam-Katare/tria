/**
 * @deprecated This file is deprecated. Use the new types from @/types/email instead.
 * Email data is now managed through Zustand store (@/store/email-store)
 * and loaded from API response format defined in @/types/api.
 *
 * See:
 * - @/types/email for Email and DashboardData types
 * - @/store/email-store for state management
 * - @/lib/email-utils for data parsing utilities
 * - @/hooks/use-load-emails for data loading
 */

export interface Email {
  id: number;
  subject: string;
  sender: string;
  time: string;
  preview: string;
  category: "urgent" | "important" | "normal";
  aiDraft?: string;
}

export interface DashboardData {
  summary: {
    processed: number;
    urgent: number;
    important: number;
    archived: number;
    timeSaved: number;
  };
  urgentEmails: Email[];
  importantEmails: Email[];
}

export const mockData: DashboardData = {
  summary: {
    processed: 812,
    urgent: 12,
    important: 45,
    archived: 755,
    timeSaved: 2.5,
  },
  urgentEmails: [
    {
      id: 1,
      subject: "Q4 Budget Review — Due Today",
      sender: "Sarah Johnson (CEO)",
      time: "2h ago",
      preview: "Need your input on Q4 budget by EOD...",
      category: "urgent",
    },
    {
      id: 2,
      subject: "Client Meeting Tomorrow — Agenda Needed",
      sender: "John Smith",
      time: "4h ago",
      preview: "Can you send the agenda for tomorrow?",
      category: "urgent",
      aiDraft: "Hi John, here's the agenda...",
    },
    {
      id: 3,
      subject: "Server Outage — Immediate Action Required",
      sender: "DevOps Alert",
      time: "1h ago",
      preview: "Production server experiencing issues...",
      category: "urgent",
    },
  ],
  importantEmails: [
    {
      id: 4,
      subject: "Project update — needs review",
      sender: "Marketing",
      time: "5h ago",
      preview: "Please review the latest project updates...",
      category: "important",
    },
    {
      id: 5,
      subject: "Invoice reminder",
      sender: "Vendor",
      time: "1d ago",
      preview: "Reminder about outstanding invoice...",
      category: "important",
    },
    {
      id: 6,
      subject: "Team poll — respond by Friday",
      sender: "HR",
      time: "2d ago",
      preview: "We need your input on the team poll...",
      category: "important",
    },
    {
      id: 7,
      subject: "Quarterly report draft",
      sender: "Finance",
      time: "3d ago",
      preview: "Draft of Q4 quarterly report attached...",
      category: "important",
    },
    {
      id: 8,
      subject: "New hire onboarding docs",
      sender: "HR",
      time: "4d ago",
      preview: "Documents for new hire onboarding process...",
      category: "important",
    },
  ],
};
