"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Archive, Sparkles, Mail, Send } from "lucide-react";
import { Slack } from "lucide-react";
import type { Email } from "@/types/email";
import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RichTextEditor } from "./rich-text-editor";
import { useSlackStore } from "@/store/slack-store";
import { useEmailStore } from "@/store/email-store";
import toast from "react-hot-toast";

interface EmailDetailProps {
  email: Email;
  onClose: () => void;
}

export const EmailDetail = memo(function EmailDetail({
  email,
  onClose,
}: EmailDetailProps) {
  const { sendToSlack, isSending: isSendingToSlack } = useSlackStore();
  const { replyToEmail, isSending: isSendingEmail } = useEmailStore();
  const [replyBody, setReplyBody] = useState("");
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [isInsightsExpanded, setIsInsightsExpanded] = useState(true);

  // Pre-fill draft if needs_reply is true and draft is not empty, and no replies exist
  useEffect(() => {
    // Check localStorage for existing replies
    const storageKey = `tria_email_replies_${email.id}`;
    const existingReplies = typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem(storageKey) || "[]")
      : [];

    // Only pre-fill draft if no replies exist in localStorage
    if (
      email.needsReply &&
      email.draft &&
      existingReplies.length === 0
    ) {
      setReplyBody(email.draft);
    }
  }, [email.id, email.needsReply, email.draft]);

  const handleSend = async () => {
    try {
      // Use draft if no reply body, otherwise use what user wrote
      const emailContent = replyBody || email.draft || "";

      if (!emailContent.trim()) {
        toast.error("Please write a message before sending.");
        return;
      }

      // Get configured reply email from localStorage
      const replyEmail =
        typeof window !== "undefined"
          ? localStorage.getItem("tria_reply_email") || "onboarding@resend.dev"
          : "onboarding@resend.dev";

      // Parse cc and bcc strings to arrays
      const ccArray = cc.trim() ? cc.split(",").map((e) => e.trim()) : [];
      const bccArray = bcc.trim() ? bcc.split(",").map((e) => e.trim()) : [];

      const payload = {
        to: [replyEmail],
        from: "onboarding@resend.dev",
        replyTo: [replyEmail],
        subject: `Re: ${email.subject}`,
        html: emailContent,
        cc: ccArray.length > 0 ? ccArray : undefined,
        bcc: bccArray.length > 0 ? bccArray : undefined,
      };

      await replyToEmail(payload);

      // Store reply in localStorage
      const replyData = {
        id: `reply-${Date.now()}`,
        content: emailContent,
        timestamp: new Date(),
        from: replyEmail,
        to: email.senderEmail,
      };

      // Get existing email data from localStorage
      const storageKey = `tria_email_replies_${email.id}`;
      const existingReplies =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem(storageKey) || "[]")
          : [];

      // Add new reply
      existingReplies.push(replyData);
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, JSON.stringify(existingReplies));
      }

      // Clear reply box
      setReplyBody("");
      setCc("");
      setBcc("");
    } catch (error) {
      toast.error("Failed to send email. Please try again.");
    }
  };

  const handleSendToSlack = async () => {
    await sendToSlack(email);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full"
    >
      {/* Header */}
      <div className="pb-4 mb-6 border-b">
        <div className="flex items-start justify-between p-4">
          <div className="flex-1 min-w-0 space-y-3">
            <h2 className="text-xl font-semibold leading-tight text-foreground!">
              {email.subject}
            </h2>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="font-medium truncate">{email.sender}</span>
                {email.senderEmail !== email.sender && (
                  <span className="text-muted-foreground truncate">
                    &lt;{email.senderEmail}&gt;
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>•</span>
                <span>{email.time}</span>
                {email.score && (
                  <>
                    <span>•</span>
                    <Badge
                      variant={email.score >= 80 ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      Score: {email.score}
                    </Badge>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-4 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSendToSlack}
              disabled={isSendingToSlack}
              className="gap-2 bg-linear-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white border-0"
            >
              <Slack className="h-4 w-4" />
              {isSendingToSlack ? "Sending..." : "Send to Slack"}
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* AI Insights - Full Width & Collapsible */}
        {(email.summary || email.aiReason) && (
          <div className="px-4 mt-4">
            <div className="p-4 bg-card rounded-xl border border-purple-100 dark:border-purple-900/30">
              <button
                onClick={() => setIsInsightsExpanded(!isInsightsExpanded)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl hover:opacity-90 transition-opacity"
              >
                {/* Icon container */}
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-linear-to-br from-orange-500 via-pink-500 to-purple-600">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>

                {/* Gradient text */}
                <span className="text-base font-semibold tracking-tight bg-linear-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  AI Insight
                </span>
              </button>

              {isInsightsExpanded && (
                <div className="space-y-3">
                  {email.summary && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground/70 mb-1">
                        Summary
                      </p>
                      <p className="text-sm text-foreground leading-relaxed">
                        {email.summary}
                      </p>
                    </div>
                  )}

                  {email.aiReason && (
                    <div className="pt-2 border-t border-purple-100/50 dark:border-purple-900/20">
                      <p className="text-xs font-medium text-muted-foreground/70 mb-1">
                        Why This Matters
                      </p>
                      <p className="text-sm text-foreground leading-relaxed">
                        {email.aiReason}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Two Column Layout: Email Content + Reply Area */}
      <div className="flex flex-col lg:flex-row gap-6 pb-6">
        {/* Left Side: Email Content (Scrollable) */}
        <div className="flex-1 min-w-0 px-4 overflow-y-auto max-h-[calc(100vh-300px)] space-y-4">
          {/* Original Email */}
          <div className="bg-card rounded-[12px] p-4 border">
            <div
              className="email-content prose prose-sm max-w-none [word-break:break-word] wrap-anywhere"
              dangerouslySetInnerHTML={{ __html: email.htmlContent }}
            />
          </div>

          {/* Replies Section */}
          {(() => {
            const storageKey = `tria_email_replies_${email.id}`;
            const replies =
              typeof window !== "undefined"
                ? JSON.parse(localStorage.getItem(storageKey) || "[]")
                : [];

            return (
              replies.length > 0 && (
                <div className="space-y-4">
                  {replies.map((reply: any, index: number) => (
                    <motion.div
                      key={reply.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-card rounded-[12px] p-4 border border-purple-200 dark:border-purple-800"
                    >
                      <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                        <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                          <Mail className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                        </div>
                        <span className="font-medium">You replied</span>
                        <span>•</span>
                        <span>
                          {new Date(reply.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div
                        className="email-content prose prose-sm max-w-none [word-break:break-word] wrap-anywhere"
                        dangerouslySetInnerHTML={{ __html: reply.content }}
                      />
                    </motion.div>
                  ))}
                </div>
              )
            );
          })()}
        </div>

        {/* Right Side: Reply Area (Fixed Width) */}
        <div className="w-full lg:w-[480px] shrink-0">
          <div className="bg-card rounded-lg border lg:sticky lg:top-4 max-h-[calc(100vh-120px)] overflow-y-auto">
            {/* Reply Header */}
            <div className="px-4 py-3 border-b bg-muted/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">To:</span>
                  <span className="text-muted-foreground truncate">
                    {email.senderEmail}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCc(!showCc)}
                    className="h-7 text-xs"
                  >
                    Cc
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBcc(!showBcc)}
                    className="h-7 text-xs"
                  >
                    Bcc
                  </Button>
                </div>
              </div>

              {showCc && (
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <span className="font-medium">Cc:</span>
                  <input
                    type="text"
                    value={cc}
                    onChange={(e) => setCc(e.target.value)}
                    placeholder="Add recipients"
                    className="flex-1 bg-transparent border-none outline-none text-sm"
                  />
                </div>
              )}

              {showBcc && (
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <span className="font-medium">Bcc:</span>
                  <input
                    type="text"
                    value={bcc}
                    onChange={(e) => setBcc(e.target.value)}
                    placeholder="Add recipients"
                    className="flex-1 bg-transparent border-none outline-none text-sm"
                  />
                </div>
              )}
            </div>

            {/* Rich Text Editor */}
            <RichTextEditor
              key={email.id}
              value={replyBody}
              onChange={setReplyBody}
              placeholder="Type your reply..."
            />

            {/* Reply Footer */}
            <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between">
              <Button
                onClick={handleSend}
                disabled={isSendingEmail}
                size="sm"
                className="gap-2 bg-linear-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 shadow-lg"
              >
                <Send className="h-4 w-4" />
                {isSendingEmail ? "Sending..." : "Send"}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="gap-2"
              >
                <Archive className="h-4 w-4" />
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
