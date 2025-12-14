"use client";

import { EmailCard } from "./email-card";
import { Star } from "lucide-react";
import type { Email } from "@/types/email";
import { memo } from "react";
import { motion } from "framer-motion";

interface ImportantEmailsProps {
  emails: Email[];
  count: number;
  onEmailClick: (email: Email) => void;
}

export const ImportantEmails = memo(function ImportantEmails({
  emails,
  count,
  onEmailClick,
}: ImportantEmailsProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <Star className="h-5 w-5 text-important" />
        <h2 className="text-lg font-semibold">Important ({count})</h2>
      </div>

      <div className="space-y-2">
        {emails.map((email, index) => (
          <motion.div
            key={email.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
          >
            <EmailCard email={email} onClick={() => onEmailClick(email)} />
          </motion.div>
        ))}
      </div>
    </section>
  );
});
