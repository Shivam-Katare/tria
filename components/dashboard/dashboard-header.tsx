"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ComposeEmailDialog } from "./compose-email-dialog";
import { cn } from "@/lib/utils";
import { LogOut, Mail } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Inbox" },
  { href: "/dashboard/sent", label: "Sent" },
  { href: "/dashboard/rules", label: "Rules" },
  { href: "/dashboard/stats", label: "Stats" },
];

export function DashboardHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold tracking-tight">
              Tria
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-sm rounded-md transition-colors",
                    pathname === item.href
                      ? "bg-secondary text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Compose Button */}
            <Button
              size="sm"
              onClick={() => setIsComposeOpen(true)}
              className="gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Compose</span>
            </Button>

          {/* User Email */}
          <span className="text-sm text-muted-foreground hidden md:block">
            {session?.user?.email}
          </span>

          {/* Logout Button */}
          <button
            onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>

          <ThemeToggle />
        </div>
      </div>
    </header>

      {/* Compose Email Dialog */}
      <ComposeEmailDialog
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        userEmail={session?.user?.email || ""}
      />
    </>
  );
}
