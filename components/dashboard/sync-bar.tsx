"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw, Filter } from "lucide-react"

export function SyncBar() {
  const [syncing, setSyncing] = useState(false)

  const handleSync = () => {
    setSyncing(true)
    setTimeout(() => setSyncing(false), 1500)
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <RefreshCw className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
        <span>Last synced 2 mins ago</span>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={handleSync} disabled={syncing} className="gap-2 bg-transparent">
          <RefreshCw className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
          Sync
        </Button>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>
    </div>
  )
}
