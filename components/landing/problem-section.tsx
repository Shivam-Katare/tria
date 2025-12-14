import Image from "next/image";
import { Sparkles, FileText, BarChart3 } from "lucide-react";

export function ProblemSection() {
  return (
    <section className="py-20 md:py-32 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Feature 1: AI Drafts */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden border border-border shadow-xl">
              <Image
                src="/ai_draft.png"
                alt="AI draft ready emails"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800">
              <FileText className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                AI Drafts
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Reply in{" "}
              <span className="bg-linear-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                One Click
              </span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              AI analyzes each email and generates contextual draft replies.
              Edit if needed, or send instantly. Never stare at a blank compose
              window again.
            </p>
            <ul className="space-y-3">
              {[
                "Context-aware responses",
                "Your writing style",
                "Ready to send or edit",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-orange-600 dark:bg-orange-400"></div>
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Feature 2: AI Summary */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                AI Insights
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <span className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Understand
              </span>{" "}
              Your Day Instantly
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Get a daily AI summary of all your emails. Know what's urgent,
              what can wait, and what doesn't need your attention at all.
            </p>
            <ul className="space-y-3">
              {[
                "Email summaries in seconds",
                "AI insights on importance",
                "Focus on what matters",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400"></div>
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden border border-border shadow-xl">
            <Image
              src="/ai_summary.png"
              alt="AI email summary and insights"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Feature 3: AI Personality */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden border border-border shadow-xl">
              <Image
                src="/ai_personality.png"
                alt="Set your AI personality and interests"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/30 border border-pink-200 dark:border-pink-800">
              <BarChart3 className="w-4 h-4 text-pink-600 dark:text-pink-400" />
              <span className="text-sm font-medium text-pink-700 dark:text-pink-300">
                Smart Scoring
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Emails{" "}
              <span className="bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Scored
              </span>{" "}
              for You
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Tell Tria your interests, priorities, and email preferences. AI
              scores each email based on your rules, surfacing only what aligns
              with your goals.
            </p>
            <ul className="space-y-3">
              {[
                "Personalized AI scoring",
                "Auto-filter uninteresting emails",
                "Never miss important messages",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-pink-600 dark:bg-pink-400"></div>
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
