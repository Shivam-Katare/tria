import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { RulesForm } from "@/components/dashboard/rules-form";
import { ToastContainer } from "@/components/ui/toast";
import { Sparkles } from "lucide-react";

export default function RulesPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50/30 via-blue-50/20 to-pink-50/30 dark:from-orange-950/20 dark:via-blue-950/10 dark:to-pink-950/20">
      <ToastContainer />
      <DashboardHeader />
      <main className="max-w-4xl mx-auto px-6 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-linear-to-br from-orange-400 to-pink-500 dark:from-orange-500 dark:to-pink-600">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Knowledge
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-base">
            Help your AI assistant understand your communication style and
            context.
          </p>
        </div>

        {/* Rules Form */}
        <RulesForm />
      </main>
    </div>
  );
}
