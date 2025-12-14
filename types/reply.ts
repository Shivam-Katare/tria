/**
 * Types for email reply functionality
 * Matches Kestra webhook Send Mail task payload
 */

export interface SendEmailPayload {
  to: string[];
  subject?: string;
  htmlBody?: string;
  textBody?: string;
  cc?: string[];
  bcc?: string[];
  attachments?: string[];
}

export interface ReplyFormData {
  body: string;
  cc: string[];
  bcc: string[];
}

export interface SendEmailResponse {
  success: boolean;
  message?: string;
  error?: string;
}
