"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

export function TimeDisplay() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const greeting =
    hours < 12
      ? "Good morning"
      : hours < 18
      ? "Good afternoon"
      : "Good evening";

  const formatTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const formatDate = time.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
      <div className="space-y-4">
        {/* Time - Large and Bold */}
        <div className="text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          {formatTime}
        </div>

        {/* Greeting */}
        <p className="text-lg text-gray-600 dark:text-gray-400">{greeting}</p>

        {/* Date */}
        <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-800">
          <Clock className="h-4 w-4 text-gray-500 dark:text-gray-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {formatDate}
          </span>
        </div>
      </div>
    </Card>
  );
}
