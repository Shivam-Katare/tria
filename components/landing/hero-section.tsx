"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Clock, Shield } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden bg-linear-to-br from-orange-50 via-rose-50 to-purple-50 dark:from-background dark:via-background dark:to-background">
      {/* Animated Background linear Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-linear-to-br from-orange-300/40 to-rose-300/40 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-20 -left-40 w-[600px] h-[600px] bg-linear-to-br from-rose-300/30 to-purple-300/30 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute -bottom-40 right-1/3 w-[500px] h-[500px] bg-linear-to-br from-amber-300/30 to-orange-300/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-linear-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center space-y-8">

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="block bg-linear-to-r from-orange-600 via-rose-600 to-purple-600 dark:from-orange-400 dark:via-rose-400 dark:to-purple-400 bg-clip-text text-transparent">
                Never Open
              </span>
              <span className="block text-foreground mt-2">Gmail Again</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Email productivity,{" "}
              <span className="italic font-serif text-orange-600 dark:text-orange-400">
                redefined.
              </span>
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">Instant Replies</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50">
              <Clock className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Save 2.5h Daily</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50">
              <Shield className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Zero Storage</span>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col items-center gap-4 pt-8">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="group relative px-8 py-6 text-lg font-semibold rounded-2xl bg-linear-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white border-0 shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  Get Started — It's Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground">
              No credit card required • 2 minute setup • Cancel anytime
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-30px, 30px) scale(0.9);
          }
          66% {
            transform: translate(20px, -20px) scale(1.1);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1.05);
          }
        }

        .animate-gradient {
          animation: gradient 8s ease infinite;
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 15s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
