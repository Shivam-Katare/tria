"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Reply, Archive, Sparkles } from "lucide-react";
import type { Email } from "@/lib/mock-data";
import { memo } from "react";
import { motion } from "framer-motion";

interface EmailDetailProps {
  email: Email;
  onClose: () => void;
}

export const EmailDetail = memo(function EmailDetail({
  email,
  onClose,
}: EmailDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-4 border-b">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold mb-2">{email.subject}</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">{email.sender}</span>
              <span>•</span>
              <span>{email.time}</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {email.preview}
          </p>
        </div>

        {/* Actions */}
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            {email.aiDraft && (
              <Badge variant="secondary" className="gap-1.5">
                <Sparkles className="h-3 w-3" />
                AI Draft Ready
              </Badge>
            )}
            <div className="flex gap-2 ml-auto">
              <Button variant="outline" size="sm" className="gap-2">
                <Reply className="h-4 w-4" />
                Reply
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Archive className="h-4 w-4" />
                Archive
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
});
