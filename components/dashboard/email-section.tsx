"use client";

import { EmailCard } from "./email-card";
import type { Email } from "@/types/email";
import type { LucideIcon } from "lucide-react";
import { memo } from "react";
import { motion } from "framer-motion";

interface EmailSectionProps {
  title: string;
  subtitle?: string;
  emails: Email[];
  icon?: LucideIcon;
  iconColor?: string;
  onEmailClick: (email: Email) => void;
}

export const EmailSection = memo(function EmailSection({
  title,
  subtitle,
  emails,
  icon: Icon,
  iconColor = "text-foreground",
  onEmailClick,
}: EmailSectionProps) {
  if (emails.length === 0) return null;

  return (
    <section className="space-y-4 mb-8">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className={iconColor}>
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div>
          <h2 className="text-lg font-semibold">
            {title} ({emails.length})
          </h2>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {emails.map((email, index) => (
          <motion.div
            key={email.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
              ease: "easeOut",
            }}
          >
            <EmailCard email={email} onClick={() => onEmailClick(email)} />
          </motion.div>
        ))}
      </div>
    </section>
  );
});
