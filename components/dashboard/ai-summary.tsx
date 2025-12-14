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
    <Card className="p-6 mb-8 bg-linear-to-br from-primary/5 to-primary/10 border-primary/20">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10 shrink-0">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 space-y-3">
          <h2 className="text-sm font-semibold text-foreground">
            Today's Summary
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
            {globalSummary?.summary ||
              (totalEmails === 0 ? (
                "You're all caught up! No new emails to process. Enjoy your peaceful mind."
              ) : (
                <>
                  You have{" "}
                  <span className="font-medium text-foreground">
                    {priorityCount}
                  </span>{" "}
                  priority {priorityCount === 1 ? "item" : "items"} needing
                  immediate attention,{" "}
                  <span className="font-medium text-foreground">
                    {gardenCount}
                  </span>{" "}
                  in your garden to nurture, and{" "}
                  <span className="font-medium text-foreground">
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
