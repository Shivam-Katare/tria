"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import {
  KeyRound,
  Database,
  Mail,
  Sparkles,
  Send,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Copy,
  ExternalLink,
  Server,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function SetupPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const keys = [
    {
      name: "SECRET_GMAIL_CLIENT_ID",
      useCase: "Fetch & send emails via Gmail",
      icon: <Mail className="h-4 w-4" />,
      link: "https://console.cloud.google.com/apis/credentials",
      linkText: "Google Cloud Console",
      steps: "Create OAuth Client → Copy Client ID",
    },
    {
      name: "SECRET_GMAIL_CLIENT_SECRET",
      useCase: "Authenticate Gmail API",
      icon: <Mail className="h-4 w-4" />,
      link: "https://console.cloud.google.com/apis/credentials",
      linkText: "Google Cloud Console",
      steps: "Create OAuth Client → Copy Client Secret",
    },
    {
      name: "SECRET_GMAIL_REFRESH_TOKEN",
      useCase: "Maintain Gmail session",
      icon: <Mail className="h-4 w-4" />,
      link: "https://developers.google.com/oauthplayground",
      linkText: "OAuth 2.0 Playground",
      steps: "Authorize Gmail API → Exchange token",
    },
    {
      name: "SECRET_GEMINI_API_KEY",
      useCase: "AI categorization & summaries",
      icon: <Sparkles className="h-4 w-4" />,
      link: "https://aistudio.google.com/apikey",
      linkText: "Google AI Studio",
      steps: "Create API Key",
    },
    {
      name: "SECRET_RESEND_API_KEY",
      useCase: "Send reply emails",
      icon: <Send className="h-4 w-4" />,
      link: "https://resend.com/api-keys",
      linkText: "Resend Dashboard",
      steps: "Create API Key",
    },
    {
      name: "SECRET_SLACK_WEBHOOK_URL",
      useCase: "Send summaries to Slack",
      icon: <MessageSquare className="h-4 w-4" />,
      link: "https://api.slack.com/messaging/webhooks",
      linkText: "Slack API",
      steps: "Create Incoming Webhook",
    },
  ];

  const commands = [
    {
      step: "1",
      command: "# Create .env file with all keys",
      description: "Store secrets locally in project root",
      code: `SECRET_GMAIL_CLIENT_ID=your_client_id
SECRET_GMAIL_CLIENT_SECRET=your_client_secret
SECRET_GMAIL_REFRESH_TOKEN=your_refresh_token
SECRET_GEMINI_API_KEY=your_gemini_key
SECRET_RESEND_API_KEY=your_resend_key
SECRET_SLACK_WEBHOOK_URL=your_slack_webhook`,
    },
    {
      step: "2",
      command:
        "docker run --rm -v $(pwd):/data kestra/kestra:latest sys env-encoder /data/.env > .envencoded",
      description: "Encode secrets for Kestra",
      code: null,
    },
    {
      step: "3",
      command: "# Update docker-compose.yaml",
      description: "Add encoded secrets to Kestra service",
      code: `kestra:
  image: kestra/kestra:latest
  env_file:
    - .envencoded  # Add this line`,
    },
    {
      step: "4",
      command: "docker-compose up -d",
      description: "Start Kestra + PostgreSQL",
      code: null,
    },
    {
      step: "5",
      command: "# Access Kestra UI",
      description: "Open browser and navigate to Kestra",
      code: "http://localhost:8080",
    },
    {
      step: "6",
      command: "# Login credentials",
      description: "Use these credentials to access flows",
      code: "Email: katare27451@gmail.com\nPassword: Tria2341",
    },
    {
      step: "7",
      command: "# Flows auto-loaded",
      description: "Flows from flows/ directory are automatically available",
      code: null,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-5xl mx-auto px-6 py-8 lg:py-12">
        {/* Alert Banner */}
        <Card className="mb-8 p-6 border-2 border-orange-200 dark:border-orange-900/30 bg-linear-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
          <div className="flex items-start gap-4">
            <div className="shrink-0 mt-0.5">
              <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2">
                Currently Showing Mock Data
              </h3>
              <p className="text-sm text-orange-800 dark:text-orange-200 leading-relaxed">
                The app is displaying sample data until you complete the Kestra
                setup below. All features will work with real data once you
                configure the API keys and start Kestra.
              </p>
            </div>
          </div>
        </Card>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3 bg-linear-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            Setup Guide
          </h1>
          <p className="text-muted-foreground text-lg">
            Follow these steps to connect Tria with your email and AI services
          </p>
        </div>

        {/* API Keys Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <KeyRound className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-2xl font-semibold">API Keys Required</h2>
          </div>

          <div className="grid gap-4">
            {keys.map((key, index) => (
              <Card
                key={index}
                className="p-5 hover:border-purple-200 dark:hover:border-purple-800 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 p-2 rounded-lg bg-muted">
                    {key.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <code className="text-sm font-mono font-semibold text-foreground">
                        {key.name}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => copyToClipboard(key.name, index)}
                      >
                        {copiedIndex === index ? (
                          <CheckCircle2 className="h-3 w-3 text-green-500" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {key.useCase}
                    </p>
                    <div className="flex items-center gap-4 text-xs">
                      <a
                        href={key.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-purple-600 dark:text-purple-400 hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {key.linkText}
                      </a>
                      <span className="text-muted-foreground">
                        → {key.steps}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Setup Commands */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Server className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-semibold">Setup Commands</h2>
          </div>

          <div className="space-y-6">
            {commands.map((cmd, index) => (
              <Card key={index} className="p-5">
                <div className="flex gap-4">
                  <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                    {cmd.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1">
                      {cmd.command.replace("# ", "")}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {cmd.description}
                    </p>
                    {cmd.code && (
                      <div className="relative">
                        <pre className="p-4 rounded-lg bg-muted text-sm overflow-x-auto border">
                          <code>{cmd.code}</code>
                        </pre>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 h-7 w-7 p-0"
                          onClick={() =>
                            copyToClipboard(cmd.code!, 100 + index)
                          }
                        >
                          {copiedIndex === 100 + index ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Using Secrets in Flows */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
              <Database className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-semibold">Using Secrets in Flows</h2>
          </div>

          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-4">
              Kestra automatically reads environment variables prefixed with{" "}
              <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">
                SECRET_
              </code>
            </p>
            <div className="relative">
              <pre className="p-4 rounded-lg bg-muted text-sm overflow-x-auto border">
                <code>{`# In your flow YAML files
tasks:
  - id: fetch_emails
    type: io.kestra.plugin.gmail.FetchEmails
    clientId: "{{ secret('GMAIL_CLIENT_ID') }}"
    clientSecret: "{{ secret('GMAIL_CLIENT_SECRET') }}"
    refreshToken: "{{ secret('GMAIL_REFRESH_TOKEN') }}"

  - id: ai_processing
    type: io.kestra.plugin.gemini.Process
    apiKey: "{{ secret('GEMINI_API_KEY') }}"`}</code>
              </pre>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-7 w-7 p-0"
                onClick={() =>
                  copyToClipboard(
                    `clientId: "{{ secret('GMAIL_CLIENT_ID') }}"`,
                    200
                  )
                }
              >
                {copiedIndex === 200 ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
          </Card>
        </section>

        {/* Reply Email Configuration */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
              <Mail className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="text-2xl font-semibold">
              Reply Email Configuration
            </h2>
          </div>

          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Your Reply Email Address
                </label>
                <input
                  type="email"
                  placeholder="your-email@resend.dev"
                  defaultValue={
                    typeof window !== "undefined"
                      ? localStorage.getItem("tria_reply_email") || ""
                      : ""
                  }
                  onChange={(e) => {
                    if (typeof window !== "undefined") {
                      localStorage.setItem("tria_reply_email", e.target.value);
                    }
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800">
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  <strong>Important:</strong> To reply using Resend, you need to
                  publish your domain in the Resend dashboard. Otherwise, you
                  can only reply to yourself (same email address). Use an email
                  like{" "}
                  <code className="px-1 py-0.5 rounded bg-orange-100 dark:bg-orange-900">
                    onboarding@your-domain.com
                  </code>
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Quick Start CTA */}
        <Card className="p-6 bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-2 border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Ready to Start?</h3>
              <p className="text-sm text-muted-foreground">
                Once setup is complete, navigate back to the Inbox to see your
                real emails
              </p>
            </div>
            <Button
              size="lg"
              className="gap-2 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() => (window.location.href = "/dashboard")}
            >
              <Play className="h-4 w-4" />
              Go to Dashboard
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
