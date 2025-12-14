/**
 * API Response Types
 * Updated structure from tria_mock_key_api_request_response.json
 */

export interface APIResponse {
  emails: EmailData[][];
  summary: GlobalSummary;
  user_id: string;
  total_count: number;
  execution_time: string;
}

export interface EmailData {
  id: string;
  date: string;
  from: string;
  draft: string;
  score: string;
  reason: string;
  snippet: string;
  subject: string;
  summary: string;
  textHtml?: string;
  textPlain?: string;
  threadId: string;
  needs_reply: string;
  badge?: string;
}

export interface GlobalSummary {
  summary: string;
  low_count: number;
  medium_count: number;
  urgent_count: number;
}
