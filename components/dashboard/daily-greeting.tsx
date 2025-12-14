"use client";

import { useSession } from "next-auth/react";

interface DailyGreetingProps {
  totalEmails: number;
}

export function DailyGreeting({ totalEmails }: DailyGreetingProps) {
  const { data: session } = useSession();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const userName = session?.user?.name?.split(" ")[0] || "there";

  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold tracking-tight">
        👋 {getGreeting()}, {userName}.
      </h1>
      <p className="text-muted-foreground">
        You received {totalEmails} email{totalEmails !== 1 ? "s" : ""} today so far.
      </p>
    </div>
  );
}
