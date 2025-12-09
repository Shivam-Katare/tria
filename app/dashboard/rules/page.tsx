import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card } from "@/components/ui/card"
import { Settings } from "lucide-react"

export default function RulesPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="max-w-4xl mx-auto px-6 py-8 md:py-16">
        <Card className="p-12 text-center">
          <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Email rules</h2>
          <p className="text-muted-foreground">Configure how Tria categorizes your emails.</p>
        </Card>
      </main>
    </div>
  )
}
