"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import type { Email } from "@/lib/mock-data";
import { memo } from "react";
import { motion } from "framer-motion";

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
      className="p-4 cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-semibold truncate text-sm">{email.subject}</h3>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {email.time}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{email.sender}</p>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {email.preview}
        </p>

        {email.aiDraft && (
          <Badge variant="secondary" className="gap-1 text-xs">
            <Sparkles className="h-3 w-3" />
            AI Draft
          </Badge>
        )}
      </div>
    </MotionCard>
  );
});
