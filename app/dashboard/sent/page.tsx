import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card } from "@/components/ui/card"
import { Send } from "lucide-react"

export default function SentPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="max-w-4xl mx-auto px-6 py-8 md:py-16">
        <Card className="p-12 text-center">
          <Send className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Sent emails</h2>
          <p className="text-muted-foreground">View and track your sent emails here.</p>
        </Card>
      </main>
    </div>
  )
}
