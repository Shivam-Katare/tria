import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="max-w-4xl mx-auto px-6 py-8 md:py-16">
        <Card className="p-12 text-center">
          <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Email statistics</h2>
          <p className="text-muted-foreground">Track your email productivity and time saved.</p>
        </Card>
      </main>
    </div>
  )
}
