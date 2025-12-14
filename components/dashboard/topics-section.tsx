"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { COMMON_TOPICS } from "@/types/rules";

interface TopicsSectionProps {
  selected: string[];
  customTopic: string;
  onAdd: (topic: string) => void;
  onRemove: (topic: string) => void;
  onCustomChange: (value: string) => void;
  onCustomAdd: () => void;
}

export function TopicsSection({
  selected,
  customTopic,
  onAdd,
  onRemove,
  onCustomChange,
  onCustomAdd,
}: TopicsSectionProps) {
  return (
    <Card className="p-6 bg-card border-gray-200 dark:border-gray-800 shadow-sm">
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
        Common Topics (Up to 6)
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Topics you frequently discuss in emails
      </p>

      {/* Selected Topics */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selected.map((topic) => (
            <Badge
              key={topic}
              className="gap-1.5 px-3 py-1.5 text-sm bg-linear-to-r from-blue-500 to-cyan-500 text-white border-0"
            >
              {topic}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(topic);
                }}
                className="ml-1 hover:opacity-70 focus:outline-none"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Available Topics */}
      <div className="flex flex-wrap gap-2 mb-4">
        {COMMON_TOPICS.map(
          (topic) =>
            !selected.includes(topic) && (
              <Badge
                key={topic}
                onClick={() => onAdd(topic)}
                className={`cursor-pointer text-sm ${
                  selected.length >= 6
                    ? "opacity-50 cursor-not-allowed bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                } border-0`}
              >
                + {topic}
              </Badge>
            )
        )}
      </div>

      {/* Custom Topic Input */}
      {selected.length < 6 && (
        <input
          type="text"
          value={customTopic}
          onChange={(e) => onCustomChange(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && onCustomAdd()}
          placeholder="Add custom topic (press Enter)"
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 text-sm"
        />
      )}
    </Card>
  );
}
