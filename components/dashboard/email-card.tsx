"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import type { Email } from "@/types/email";
import { memo } from "react";
import { motion } from "framer-motion";
import { EmailBadgeComponent, DraftReadyBadge } from "./email-badge";

interface EmailCardProps {
  email: Email;
  onClick: () => void;
}

const MotionCard = motion(Card);

export const EmailCard = memo(function EmailCard({
  email,
  onClick,
}: EmailCardProps) {
  return (
    <MotionCard
      className="p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-semibold text-sm line-clamp-1 flex-1">
            {email.subject}
          </h3>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {email.time}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-xs text-muted-foreground truncate">
            {email.sender}
          </p>
          {email.senderEmail !== email.sender && (
            <p className="text-xs text-muted-foreground/70 truncate">
              ({email.senderEmail})
            </p>
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {email.summary || email.snippet}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          {email.badge && <EmailBadgeComponent type={email.badge} />}
          
          {email.needsReply && email.draft && <DraftReadyBadge />}
          
          {email.score >= 90 && !email.badge && (
            <Badge variant="destructive" className="gap-1 text-xs">
              <Sparkles className="h-3 w-3" />
              High Priority
            </Badge>
          )}
          
          {email.aiReason && (
            <Badge variant="secondary" className="gap-1 text-xs">
              <Sparkles className="h-3 w-3" />
              AI Filtered
            </Badge>
          )}
        </div>
      </div>
    </MotionCard>
  );
});
