"use client";

import { Card } from "@/components/ui/card";
import { COMMUNICATION_STYLE_OPTIONS } from "@/types/rules";

interface CommunicationStyleSectionProps {
  selected: string[];
  onToggle: (value: string) => void;
}

export function CommunicationStyleSection({
  selected,
  onToggle,
}: CommunicationStyleSectionProps) {
  return (
    <Card className="p-6 bg-card border-gray-200 dark:border-gray-800 shadow-sm">
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
        Communication Style (Select up to 3)
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Help your AI assistant understand your communication preferences
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {COMMUNICATION_STYLE_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => onToggle(option.value)}
            disabled={!selected.includes(option.value) && selected.length >= 3}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              selected.includes(option.value)
                ? "border-orange-500 bg-orange-50 dark:bg-orange-950/20"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600"
            } ${
              !selected.includes(option.value) && selected.length >= 3
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {option.label}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {option.description}
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
}
