import Image from "next/image";
import { Card } from "@/components/ui/card";
import {
  Tag,
  Mail,
  MessageSquare,
  Settings,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Tag,
    title: "Auto-Badge Every Email",
    description:
      "AI categorizes emails with badges: Urgent, Action Required, Meeting, Newsletter, and more.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Mail,
    title: "Compose New Emails",
    description:
      "Draft and send new emails directly from Tria. AI assists with writing and formatting.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: MessageSquare,
    title: "Send to Slack Instantly",
    description:
      "Push important email summaries to your Slack channels with one click.",
    color: "from-orange-500 to-rose-500",
  },
  {
    icon: Settings,
    title: "Personalize AI Behavior",
    description:
      "Set your personality traits, interests, and email rules. AI adapts to your preferences.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: TrendingUp,
    title: "Priority Scoring",
    description:
      "Each email gets an AI score (0-100) based on relevance to your interests and goals.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: ShieldCheck,
    title: "Filter Out Noise",
    description:
      "Low-priority emails are automatically sorted away. Never get distracted by irrelevant messages.",
    color: "from-pink-500 to-rose-500",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-20 md:py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Everything You Need to{" "}
            <span className="bg-linear-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">
              Master Your Inbox
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tria combines AI intelligence with powerful automation to transform
            how you handle email
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-shadow border-border/50"
            >
              <div className="space-y-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-linear-to-br ${feature.color} flex items-center justify-center`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Slack Integration Highlight */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mt-24">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
              <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Slack Integration
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Push to{" "}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Slack
              </span>{" "}
              Instantly
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Important email? Send a formatted summary directly to your Slack
              workspace. Keep your team informed without forwarding cluttered
              email threads.
            </p>
            <ul className="space-y-3">
              {[
                "One-click Slack sharing",
                "Formatted email summaries",
                "Keep teams in sync",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden border border-border shadow-xl">
            <Image
              src="/send_slack.png"
              alt="Send emails to Slack"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
