"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Archive, Sparkles, Mail, Send, MessageSquare } from "lucide-react";
import type { Email } from "@/types/email";
import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RichTextEditor } from "./rich-text-editor";
import { useSlackStore } from "@/store/slack-store";
import { useEmailStore } from "@/store/email-store";

interface EmailDetailProps {
  email: Email;
  onClose: () => void;
}

export const EmailDetail = memo(function EmailDetail({
  email,
  onClose,
}: EmailDetailProps) {
  const { sendToSlack, isSending: isSendingToSlack } = useSlackStore();
  const { sendEmail, isSending: isSendingEmail } = useEmailStore();
  const [replyBody, setReplyBody] = useState("");
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");

  // Pre-fill draft if needs_reply is true and draft is not empty
  useEffect(() => {
    if (email.needsReply && email.draft) {
      setReplyBody(email.draft);
      console.log(replyBody, email.draft);
    }
  }, [email.id, email.needsReply, email.draft]);

  const handleSend = async () => {
    try {
      // Use draft if no reply body, otherwise use what user wrote
      const emailContent = replyBody || email.draft || "";

      if (!emailContent.trim()) {
        alert("Please write a message before sending.");
        return;
      }

      // Parse cc and bcc strings to arrays
      const ccArray = cc.trim() ? cc.split(",").map((e) => e.trim()) : [];
      const bccArray = bcc.trim() ? bcc.split(",").map((e) => e.trim()) : [];

      const payload = {
        to: [email.senderEmail],
        subject: `Re: ${email.subject}`,
        htmlBody: emailContent,
        cc: ccArray.length > 0 ? ccArray : undefined,
        bcc: bccArray.length > 0 ? bccArray : undefined,
      };

      await sendEmail(payload);
      alert("Email sent successfully!");
      onClose();
    } catch (error) {
      alert("Failed to send email. Please try again.");
    }
  };

  const handleSendToSlack = async () => {
    try {
      await sendToSlack(email);
      alert("Successfully sent to Slack!");
    } catch (error) {
      alert("Failed to send to Slack. Please try again.");
    }
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

            {email.summary && (
              <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium mb-1">Email Summary</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {email.summary}
                  </p>
                </div>
              </div>
            )}

            {email.aiReason && (
              <div className="flex items-start gap-2 p-3 bg-secondary/50 rounded-lg">
                <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium mb-1">AI Analysis</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {email.aiReason}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 ml-4 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSendToSlack}
              disabled={isSendingToSlack}
              className="gap-2 bg-linear-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white border-0"
            >
              <MessageSquare className="h-4 w-4" />
              {isSendingToSlack ? "Sending..." : "Send to Slack"}
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Email Content + Reply Area */}
      <div className="flex flex-col lg:flex-row gap-6 pb-6">
        {/* Left Side: Email Content (Scrollable) */}
        <div className="flex-1 min-w-0 px-4 overflow-y-auto max-h-[calc(100vh-300px)]">
          <div
            className="email-content prose prose-sm max-w-none [word-break:break-word] wrap-anywhere"
            dangerouslySetInnerHTML={{ __html: email.htmlContent }}
          />
        </div>

        {/* Right Side: Reply Area (Fixed Width) */}
        <div className="w-full lg:w-[480px] shrink-0">
          <div className="bg-background rounded-lg border lg:sticky lg:top-4 max-h-[calc(100vh-120px)] overflow-y-auto">
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
                className="gap-2"
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
                Archive & Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
