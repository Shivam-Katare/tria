import type React from "react";
import { Card } from "@/components/ui/card";
import { Clock, Inbox, AlertTriangle, CheckCircle } from "lucide-react";

interface SummaryCardProps {
  processed: number;
  urgent: number;
  important: number;
  timeSaved: number;
}

export function SummaryCard({
  processed,
  urgent,
  important,
  timeSaved,
}: SummaryCardProps) {
  return (
    <Card className="p-6">
      <h2 className="text-base font-semibold mb-5">Today's snapshot</h2>
      <div className="space-y-4">
        <StatItem icon={Inbox} label="Processed" value={processed.toString()} />
        <StatItem
          icon={AlertTriangle}
          label="Urgent"
          value={urgent.toString()}
          variant="urgent"
        />
        <StatItem
          icon={CheckCircle}
          label="Important"
          value={important.toString()}
          variant="important"
        />
        <StatItem
          icon={Clock}
          label="Time saved"
          value={`${timeSaved}h`}
          variant="success"
        />
      </div>
      <p className="text-xs text-muted-foreground mt-5 pt-5 border-t">
        {processed} processed → {urgent} need action • You saved {timeSaved}{" "}
        hours
      </p>
    </Card>
  );
}

interface StatItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  variant?: "default" | "urgent" | "important" | "success";
}

function StatItem({
  icon: Icon,
  label,
  value,
  variant = "default",
}: StatItemProps) {
  const colorClasses = {
    default: "text-foreground",
    urgent: "text-urgent",
    important: "text-important",
    success: "text-success",
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span className="text-sm">{label}</span>
      </div>
      <p className={cn("text-xl font-bold", colorClasses[variant])}>{value}</p>
    </div>
  );
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
