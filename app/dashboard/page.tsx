"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DailyGreeting } from "@/components/dashboard/daily-greeting";
import { AISummary } from "@/components/dashboard/ai-summary";
import { EmailSection } from "@/components/dashboard/email-section";
import { EmailDetail } from "@/components/dashboard/email-detail";
import { useEmailStore } from "@/store/email-store";
import { useLoadEmails } from "@/hooks/use-load-emails";
import { Flame, Flower2, Wind } from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  // Redirect to sign-in if not authenticated
  if (status === "unauthenticated") {
    redirect("/auth/signin");
  }

  useLoadEmails();

  const {
    emails,
    priorityEmails,
    gardenEmails,
    breezeEmails,
    selectedEmail,
    setSelectedEmail,
    isLoading,
  } = useEmailStore();

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="max-w-6xl mx-auto px-6 py-8 lg:py-12">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading emails...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-6 py-8 lg:py-12">
        {selectedEmail ? (
          <EmailDetail
            email={selectedEmail}
            onClose={() => setSelectedEmail(null)}
          />
        ) : (
          <div className="space-y-8">
            {/* Greeting */}
            <DailyGreeting totalEmails={emails.length} />

            {/* Full Width Summary - No Grid */}
            <AISummary
              priorityCount={priorityEmails.length}
              gardenCount={gardenEmails.length}
              breezeCount={breezeEmails.length}
            />

            {/* Email Sections */}
            <EmailSection
              title="Priority"
              subtitle="Urgent matters requiring immediate attention"
              icon={Flame}
              emails={priorityEmails}
              onEmailClick={setSelectedEmail}
            />

            <EmailSection
              title="Garden"
              subtitle="Important emails to nurture and respond to"
              icon={Flower2}
              emails={gardenEmails}
              onEmailClick={setSelectedEmail}
            />

            <EmailSection
              title="Breeze"
              subtitle="Low priority items you can handle later"
              icon={Wind}
              emails={breezeEmails}
              onEmailClick={setSelectedEmail}
            />
          </div>
        )}
      </main>
    </div>
  );
}
