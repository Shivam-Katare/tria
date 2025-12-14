import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 md:py-32 px-6 bg-linear-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-orange-950/20">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl border border-border bg-card/50 backdrop-blur-sm p-8 md:p-12 shadow-2xl">
          {/* Background Decoration */}
          <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-orange-500/5 rounded-3xl"></div>

          <div className="relative z-10 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Ready to Transform Your{" "}
                <span className="bg-linear-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">
                  Email Experience?
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join users who've reclaimed hours of their day with AI-powered
                email management
              </p>
            </div>

            {/* Benefits List */}
            <div className="flex flex-wrap items-center justify-center gap-6 py-6">
              {[
                "AI filters & badges",
                "Draft replies ready",
                "Slack integration",
                "No storage required",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-4">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="group px-10 py-7 text-lg font-semibold rounded-xl bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    Start Using Tria Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
