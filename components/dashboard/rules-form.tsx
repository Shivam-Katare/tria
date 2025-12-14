"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import { useRulesStore } from "@/store/rules-store";
import { showToast } from "@/components/ui/toast";
import { CommunicationStyleSection } from "./communication-style-section";
import { TopicsSection } from "./topics-section";

export function RulesForm() {
  const {
    settings,
    isLoading,
    isSaving,
    error,
    fetchSettings,
    saveSettings,
    clearError,
  } = useRulesStore();
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [emailInterests, setEmailInterests] = useState<string[]>([]);
  const [communicationStyles, setCommunicationStyles] = useState<string[]>([]);
  const [keyConstraints, setKeyConstraints] = useState("");
  const [customTopic, setCustomTopic] = useState("");

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    if (settings) {
      setFullName(settings.fullName);
      setRole(settings.role);
      setEmailInterests(settings.emailInterests);
      setCommunicationStyles(settings.communicationStyles);
      setKeyConstraints(settings.keyConstraints);
    }
  }, [settings]);

  useEffect(() => {
    if (error) {
      showToast(error, "error");
      clearError();
    }
  }, [error, clearError]);

  const toggleStyle = (value: string) => {
    setCommunicationStyles((prev) =>
      prev.includes(value)
        ? prev.filter((s) => s !== value)
        : prev.length < 3
        ? [...prev, value]
        : prev
    );
  };

  const addTopic = (topic: string) => {
    if (!emailInterests.includes(topic) && emailInterests.length < 6) {
      setEmailInterests([...emailInterests, topic]);
    }
  };

  const removeTopic = (topic: string) => {
    setEmailInterests(emailInterests.filter((t) => t !== topic));
  };

  const addCustom = () => {
    if (
      customTopic.trim() &&
      !emailInterests.includes(customTopic.trim()) &&
      emailInterests.length < 6
    ) {
      setEmailInterests([...emailInterests, customTopic.trim()]);
      setCustomTopic("");
    }
  };

  const handleSave = async () => {
    try {
      await saveSettings({
        fullName,
        role,
        emailInterests,
        communicationStyles,
        keyConstraints,
      });
      showToast("Settings saved successfully!", "success");
    } catch (error) {
      // Error already handled by store and shown via toast
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-background text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400";

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card border-gray-200 dark:border-gray-800 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Basic Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Role & Company
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Head of Marketing at TechCorp"
              className={inputClass}
            />
          </div>
        </div>
      </Card>

      <CommunicationStyleSection
        selected={communicationStyles}
        onToggle={toggleStyle}
      />

      <Card className="p-6 bg-card border-gray-200 dark:border-gray-800 shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
          Key Constraints
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Things to avoid or remember in emails
        </p>
        <textarea
          value={keyConstraints}
          onChange={(e) => setKeyConstraints(e.target.value)}
          placeholder="No Friday meetings, avoid timeline commitments, no emojis"
          rows={4}
          maxLength={300}
          className={`${inputClass} resize-none`}
        />
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-right">
          {keyConstraints.length}/300
        </div>
      </Card>

      <TopicsSection
        selected={emailInterests}
        customTopic={customTopic}
        onAdd={addTopic}
        onRemove={removeTopic}
        onCustomChange={setCustomTopic}
        onCustomAdd={addCustom}
      />

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="gap-2 px-6 py-2.5 bg-linear-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 shadow-lg"
        >
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
