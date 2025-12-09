"use client";

import { EmailCard } from "./email-card";
import { AlertCircle } from "lucide-react";
import type { Email } from "@/lib/mock-data";
import { memo } from "react";
import { motion } from "framer-motion";

interface UrgentEmailsProps {
  emails: Email[];
  count: number;
  onEmailClick: (email: Email) => void;
}

export const UrgentEmails = memo(function UrgentEmails({
  emails,
  count,
  onEmailClick,
}: UrgentEmailsProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <AlertCircle className="h-5 w-5 text-urgent" />
        <h2 className="text-lg font-semibold">Urgent ({count})</h2>
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
