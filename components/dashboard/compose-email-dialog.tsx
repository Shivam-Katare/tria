"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Send } from "lucide-react";
import { RichTextEditor } from "./rich-text-editor";
import { useEmailStore } from "@/store/email-store";
import { motion, AnimatePresence } from "framer-motion";

interface ComposeEmailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
}

export function ComposeEmailDialog({
  isOpen,
  onClose,
  userEmail,
}: ComposeEmailDialogProps) {
  const { sendEmail, isSending } = useEmailStore();
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);

  const handleSend = async () => {
    const toArray = to
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);

    if (toArray.length === 0) {
      alert("Please add at least one recipient");
      return;
    }

    if (!subject.trim()) {
      alert("Please add a subject");
      return;
    }

    if (!body.trim()) {
      alert("Please write a message");
      return;
    }

    try {
      const ccArray = cc.trim() ? cc.split(",").map((e) => e.trim()) : [];
      const bccArray = bcc.trim() ? bcc.split(",").map((e) => e.trim()) : [];

      await sendEmail({
        to: toArray,
        subject: subject,
        htmlBody: body,
        cc: ccArray.length > 0 ? ccArray : undefined,
        bcc: bccArray.length > 0 ? bccArray : undefined,
      });

      alert("Email sent successfully!");
      onClose();

      // Reset form
      setTo("");
      setCc("");
      setBcc("");
      setSubject("");
      setBody("");
      setShowCc(false);
      setShowBcc(false);
    } catch (error) {
      alert("Failed to send email. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-background rounded-lg shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">Send Mail</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Email Fields */}
          <div className="px-6 py-4 space-y-3 border-b">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium w-16">From:</span>
              <span className="text-sm text-muted-foreground">{userEmail}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium w-16">To:</span>
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="recipient@example.com, another@example.com"
                className="flex-1 bg-transparent border-none outline-none text-sm"
              />
              <div className="flex gap-2">
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
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium w-16">Cc:</span>
                <input
                  type="text"
                  value={cc}
                  onChange={(e) => setCc(e.target.value)}
                  placeholder="cc@example.com"
                  className="flex-1 bg-transparent border-none outline-none text-sm"
                />
              </div>
            )}

            {showBcc && (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium w-16">Bcc:</span>
                <input
                  type="text"
                  value={bcc}
                  onChange={(e) => setBcc(e.target.value)}
                  placeholder="bcc@example.com"
                  className="flex-1 bg-transparent border-none outline-none text-sm"
                />
              </div>
            )}

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium w-16">Subject:</span>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject"
                className="flex-1 bg-transparent border-none outline-none text-sm"
              />
            </div>
          </div>

          {/* Rich Text Editor */}
          <div className="flex-1 overflow-hidden bg-card rounded-[12px] mx-4">
            <RichTextEditor
              value={body}
              onChange={setBody}
              placeholder="Write your message..."
            />
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t flex items-center justify-between bg-muted/20">
            <Button onClick={handleSend} disabled={isSending} className="gap-2 bg-linear-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 shadow-lg">
              <Send className="h-4 w-4" />
              {isSending ? "Sending..." : "Send"}
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
