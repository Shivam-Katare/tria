"use client";

import { memo } from "react";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useEmailStore } from "@/store/email-store";

interface AISummaryProps {
  priorityCount: number;
  gardenCount: number;
  breezeCount: number;
}

export const AISummary = memo(function AISummary({
  priorityCount,
  gardenCount,
  breezeCount,
}: AISummaryProps) {
  const { globalSummary } = useEmailStore();
  const totalEmails = priorityCount + gardenCount + breezeCount;

  return (
    <Card className="p-8 lg:p-10 border-0 shadow-sm bg-card">
      <div className="flex items-start gap-5">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl
               bg-linear-to-br from-orange-500 via-pink-500 to-purple-600
               shrink-0"
        >
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1 space-y-4">
          <span className="mb-4 text-base font-semibold tracking-tight bg-linear-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Today's Summary
          </span>{" "}
          <p className="text-base lg:text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
            {globalSummary?.summary ||
              (totalEmails === 0 ? (
                "You're all caught up! No new emails to process. Enjoy your peaceful mind."
              ) : (
                <>
                  You have{" "}
                  <span className="font-semibold text-foreground">
                    {priorityCount}
                  </span>{" "}
                  priority {priorityCount === 1 ? "item" : "items"} needing
                  immediate attention,{" "}
                  <span className="font-semibold text-foreground">
                    {gardenCount}
                  </span>{" "}
                  in your garden to nurture, and{" "}
                  <span className="font-semibold text-foreground">
                    {breezeCount}
                  </span>{" "}
                  light {breezeCount === 1 ? "breeze" : "breezes"} for later.
                  Focus on what matters most and let AI handle the rest.
                </>
              ))}
          </p>
        </div>
      </div>
    </Card>
  );
});
