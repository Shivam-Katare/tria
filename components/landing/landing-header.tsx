import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import "@/styles/globals.css"

export function LandingHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-henny tracking-tight">
          Tria
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
