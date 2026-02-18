# 🚀 Tria ($4,000) Hackathon Winner
Your Inbox, Intelligently Managed

Live: https://hellotria.vercel.app/

<img width="200" height="300" alt="image" src="https://github.com/user-attachments/assets/b132749b-bf1f-4fef-b3b5-9fc481398179" />

# 🚀 Tria - Setup Guide

## 📋 Prerequisites

Before you begin, make sure you have:

* **Node.js** (v18 or higher)
* **Docker** and **Docker Compose**
* **Git**
* A **Gmail account** (for email fetching)
* **Gemini API Key** (Google AI Studio)
* **Resend API Key** (optional – for sending replies)
* **Slack Webhook URL** (optional – for notifications)

---

## 🛠️ Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/tria.git
cd tria
```

---

## 🔐 Step 2: Set Up Environment Variables

### Frontend Environment Setup

1. Copy the example env file:

```bash
cp .env.example .env.local
```

2. Open `.env.local` and add your credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Google OAuth (Gmail)
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

# Kestra
KESTRA_API_URL=http://localhost:8080

# Webhook Keys (must match Kestra secrets)
TRIA_EMAIL_TRIAGE_WEBHOOK_KEY=your_webhook_key
SEND_EMAIL_WEBHOOK_KEY=your_send_email_key
UPDATE_SETTINGS_WEBHOOK_KEY=your_update_settings_key
GET_SETTINGS_WEBHOOK_KEY=your_get_settings_key
SLACK_WEBHOOK_KEY=your_slack_webhook_key
REPLY_EMAIL_WEBHOOK_KEY=your_reply_email_key
```

---

## 🔒 Encode Secrets for Kestra

Kestra expects secrets in **base64** format.

```bash
echo -n "your_gmail_client_id" | base64
echo -n "your_gmail_client_secret" | base64
echo -n "your_gmail_refresh_token" | base64
echo -n "your_gemini_api_key" | base64
echo -n "your_resend_api_key" | base64
echo -n "your_slack_webhook_url" | base64
```

Save these encoded values — you’ll need them next.

---

## 🐳 Step 3: Start Kestra (Docker)

```bash
docker-compose up -d
```

Verify:

```bash
docker ps
```

Access Kestra UI:
**[http://localhost:8080](http://localhost:8080)**

**Default credentials**

* Username: `admin@kestra.io`
* Password: `kestra`

---

## 📂 Step 4: Import Kestra Flows

### Option 1: Auto-import (Recommended)

If volume mapping is correct, flows auto-load.

Check:

* Kestra UI → **Flows**
* Namespace: `tria`

Expected flows:

* `hi-tria`
* `send-email-via-gmail`
* `get-user-settings`
* `update-user-settings`
* `slack-notification`
* `reply-email-via-resend`

### Option 2: Manual Import

1. Kestra UI → **Flows → Create**
2. Copy `.yml` files from `/flows`
3. Paste into editor
4. Save each flow

---

## 🔑 Step 5: Configure Kestra Secrets

Edit `docker-compose.yml`:

```yaml
services:
  kestra:
    image: kestra/kestra:latest
    environment:
      GMAIL_CLIENT_ID: "base64_client_id"
      GMAIL_CLIENT_SECRET: "base64_client_secret"
      GMAIL_REFRESH_TOKEN: "base64_refresh_token"

      GEMINI_API_KEY: "base64_gemini_key"

      RESEND_API_KEY: "base64_resend_key"
      SLACK_WEBHOOK_URL: "base64_slack_webhook"

      TRIA_EMAIL_TRIAGE_WEBHOOK_KEY: "tria-email-triage-key"
      SEND_EMAIL_WEBHOOK_KEY: "send-email-webhook-key"
      UPDATE_SETTINGS_WEBHOOK_KEY: "update-settings-webhook-key"
      GET_SETTINGS_WEBHOOK_KEY: "get-settings-webhook-key"
      SLACK_WEBHOOK_KEY: "slack-key"
      REPLY_EMAIL_WEBHOOK_KEY: "reply-email-webhook-key"
```

Restart Kestra:

```bash
docker-compose down
docker-compose up -d
```

---

## 💾 Step 6: Configure KV Store

Kestra → **Namespaces → tria → KV Store**

Add:

| Key                              | Type   | Example                        |
| -------------------------------- | ------ | ------------------------------ |
| `user_tria_FULL_NAME`            | STRING | Shivam Kumar                   |
| `user_tria_ROLE`                 | STRING | Software Developer             |
| `user_tria_EMAIL_INTERESTS`      | STRING | AI, newsletters, tech updates  |
| `user_tria_COMMUNICATION_STYLES` | STRING | Professional, concise          |
| `user_tria_KEY_CONSTRAINTS`      | STRING | Never reply to no-reply emails |

Optional via API:

```bash
curl -X PUT http://localhost:8080/api/v1/namespaces/tria/kv/user_tria_FULL_NAME \
  -H "Content-Type: text/plain" \
  -d "Shivam Kumar"
```

---

## 🖥️ Step 7: Start the Frontend

### Local

```bash
npm install
npm run dev
```

Open: **[http://localhost:3000](http://localhost:3000)**

### Deployed (Vercel)

* Ensure Kestra is publicly reachable
* Set `KESTRA_API_URL` in Vercel env vars

> If Kestra is unreachable, Tria falls back to **mock data**.

---

## 📧 Step 8: Email Sending (Resend)

### Testing

* Can only send to **verified emails**
* Add your email in Resend dashboard

### Production

1. Verify domain in Resend
2. Send from `noreply@yourdomain.com`

Alternative: use **Gmail sending flow** (no domain required).

---

## ✅ Step 9: Test Everything

### Email Triage

* Open `/dashboard`
* Check summaries, badges, and drafts

### Slack

* Click **Send to Slack**
* Verify notification

### Replies

* Open an email
* Review draft
* Send reply

### Settings

* Update preferences
* Save
* Refresh dashboard
* Re-trigger fetch

---

## 🐛 Troubleshooting

### Flows Missing

* Check volume mapping:

  ```yaml
  - ./flows:/app/flows
  ```
* Restart Kestra

### Secret Not Found

* Ensure base64 encoding
* Restart containers
* Check logs

### Mock Data Showing

* Confirm Kestra is running
* Verify `KESTRA_API_URL`
* Check browser console

### Gmail Fetch Fails

* Validate OAuth credentials
* Refresh token validity
* Manually run `hi-tria` flow

### Resend Fails

* Verify API key
* Verify recipient or domain
* Use Gmail fallback

---

## 🎉 You’re All Set

Tria is now ready to:

* ✅ Triage emails automatically
* ✅ Show AI summaries
* ✅ Draft and send replies
* ✅ Notify via Slack
* ✅ Personalize scoring
* ✅ Compose new emails

---

## 📚 Resources

* Kestra: [https://kestra.io/docs](https://kestra.io/docs)
* Resend: [https://resend.com/docs](https://resend.com/docs)
* Gmail API: [https://developers.google.com/gmail/api](https://developers.google.com/gmail/api)
* Gemini API: [https://ai.google.dev](https://ai.google.dev)

---

