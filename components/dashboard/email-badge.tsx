import { Badge } from "@/components/ui/badge";
import type { EmailBadge } from "@/types/email";

interface BadgeConfig {
  colors: string;
  icon: string;
  label: string;
}

const BADGE_CONFIG: Record<EmailBadge, BadgeConfig> = {
  ACTION_REQUIRED: {
    colors:
      "bg-gradient-to-r from-red-500 to-pink-600 dark:from-red-600 dark:to-pink-700 text-white border-0",
    icon: "⚡",
    label: "Action Required",
  },
  URGENT: {
    colors:
      "bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-600 dark:to-red-600 text-white border-0",
    icon: "🔥",
    label: "Urgent",
  },
  TRACKING: {
    colors:
      "bg-gradient-to-r from-yellow-400 to-orange-400 dark:from-yellow-500 dark:to-orange-500 text-gray-900 dark:text-gray-900 border-0",
    icon: "📦",
    label: "Tracking",
  },
  MEETING: {
    colors:
      "bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 text-white border-0",
    icon: "📅",
    label: "Meeting",
  },
  NEWSLETTER: {
    colors:
      "bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 text-white border-0",
    icon: "📰",
    label: "Newsletter",
  },
  PROMOTIONAL: {
    colors:
      "bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 text-white border-0",
    icon: "🏷️",
    label: "Promo",
  },
  SOCIAL: {
    colors:
      "bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-600 dark:to-blue-600 text-white border-0",
    icon: "👥",
    label: "Social",
  },
  FYI: {
    colors:
      "bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-500 dark:to-gray-600 text-white border-0",
    icon: "ℹ️",
    label: "FYI",
  },
};

const DRAFT_READY_BADGE: BadgeConfig = {
  colors:
    "bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600 text-white border-0",
  icon: "✨",
  label: "Draft Ready",
};

interface EmailBadgeProps {
  type: EmailBadge;
  className?: string;
}

export function EmailBadgeComponent({ type, className = "" }: EmailBadgeProps) {
  const config = BADGE_CONFIG[type];

  return (
    <Badge
      className={`gap-1 text-xs font-medium ${config.colors} ${className}`}
    >
      <span>{config.icon}</span>
      {config.label}
    </Badge>
  );
}

interface DraftReadyBadgeProps {
  className?: string;
}

export function DraftReadyBadge({ className = "" }: DraftReadyBadgeProps) {
  return (
    <Badge
      className={`gap-1 text-xs font-medium ${DRAFT_READY_BADGE.colors} ${className}`}
    >
      <span>{DRAFT_READY_BADGE.icon}</span>
      {DRAFT_READY_BADGE.label}
    </Badge>
  );
}
