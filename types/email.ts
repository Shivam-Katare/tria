// Email domain types for the application

export type EmailCategory = "urgent" | "important" | "normal";

export type EmailBadge =
  | "ACTION_REQUIRED"
  | "URGENT"
  | "TRACKING"
  | "MEETING"
  | "NEWSLETTER"
  | "PROMOTIONAL"
  | "SOCIAL"
  | "FYI";

export interface EmailReply {
  id: string;
  content: string;
  timestamp: Date;
  from: string;
  to: string;
}

export interface Email {
  id: string;
  subject: string;
  sender: string;
  senderEmail: string;
  time: string;
  date: Date;
  snippet: string;
  htmlContent: string;
  category: EmailCategory;
  score: number;
  aiReason?: string;
  summary: string;
  draft: string;
  needsReply: boolean;
  badge?: EmailBadge;
  replies?: EmailReply[];
}

export interface DashboardSummary {
  processed: number;
  urgent: number;
  important: number;
  archived: number;
  timeSaved: number;
}

export interface DashboardData {
  summary: DashboardSummary;
  urgentEmails: Email[];
  importantEmails: Email[];
  lastSync: Date | null;
}
