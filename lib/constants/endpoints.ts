// Backend API Endpoints
export const BACKEND_ENDPOINTS = {
  GET_USER_SETTINGS:
    "http://localhost:8080/api/v1/main/executions/webhook/tria/get-user-settings/get-settings-webhook-key",
  UPDATE_USER_SETTINGS:
    "http://localhost:8080/api/v1/main/executions/webhook/tria/update-user-settings/update-settings-webhook-key",
  SEND_TO_SLACK:
    "http://localhost:8080/api/v1/main/executions/webhook/tria/slack_notification/slack-key",
  SEND_EMAIL:
    "http://localhost:8080/api/v1/main/executions/webhook/tria/send-email-via-gmail/send-email-webhook-key",
  FETCH_EMAILS:
    "http://localhost:8080/api/v1/main/executions/webhook/tria/hi-tria/tria-email-triage-key",
} as const;

// Frontend API Endpoints (Next.js API routes)
export const API_ENDPOINTS = {
  RULES: "/api/rules",
  SLACK: "/api/slack",
  SEND_EMAIL: "/api/send-email",
  EMAILS: "/api/emails",
} as const;
