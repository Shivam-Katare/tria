import { SyncBar } from "./sync-bar";
import { SummaryCard } from "./summary-card";
import { memo } from "react";

interface DashboardSidebarProps {
  processed: number;
  urgent: number;
  important: number;
  timeSaved: number;
}

export const DashboardSidebar = memo(function DashboardSidebar({
  processed,
  urgent,
  important,
  timeSaved,
}: DashboardSidebarProps) {
  return (
    <aside className="w-full lg:w-80 lg:sticky lg:top-8 space-y-6 self-start">
      <SyncBar />
      <SummaryCard
        processed={processed}
        urgent={urgent}
        important={important}
        timeSaved={timeSaved}
      />
    </aside>
  );
});
