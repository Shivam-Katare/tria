"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { UrgentEmails } from "@/components/dashboard/urgent-emails";
import { ImportantEmails } from "@/components/dashboard/important-emails";
import { EmailDetail } from "@/components/dashboard/email-detail";
import { mockData } from "@/lib/mock-data";
import type { Email } from "@/lib/mock-data";

export default function DashboardPage() {
  const { summary, urgentEmails, importantEmails } = mockData;
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-6 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - 30% */}
          <DashboardSidebar
            processed={summary.processed}
            urgent={summary.urgent}
            important={summary.important}
            timeSaved={summary.timeSaved}
          />

          {/* Main Content - 70% */}
          <div className="flex-1 min-w-0">
            {selectedEmail ? (
              <EmailDetail
                email={selectedEmail}
                onClose={() => setSelectedEmail(null)}
              />
            ) : (
              <div className="space-y-8">
                <UrgentEmails
                  emails={urgentEmails}
                  count={summary.urgent}
                  onEmailClick={setSelectedEmail}
                />

                <div className="border-t border-border pt-8" />

                <ImportantEmails
                  emails={importantEmails}
                  count={summary.important}
                  onEmailClick={setSelectedEmail}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
