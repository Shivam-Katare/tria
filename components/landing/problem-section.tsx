import { Card } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, Inbox, Sparkles } from "lucide-react"

export function ProblemSection() {
  return (
    <section className="py-20 md:py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-16 tracking-tight">
          The problem you know too well
        </h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <ChaosCard />
          <ClarityCard />
        </div>
      </div>
    </section>
  )
}

function ChaosCard() {
  const issues = ["800+ unread emails", "Mixed priorities", "Can't find urgent", "Decision paralysis"]

  return (
    <Card className="p-8 border-destructive/20 bg-destructive/5">
      <div className="flex items-center gap-3 mb-6">
        <Inbox className="h-6 w-6 text-destructive" />
        <h3 className="text-xl font-semibold">The chaos</h3>
      </div>
      <div className="space-y-3">
        {issues.map((issue) => (
          <div key={issue} className="flex items-center gap-3 text-muted-foreground">
            <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
            <span>{issue}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

function ClarityCard() {
  const benefits = ["12 urgent — handled", "45 important — queued", "Rest archived safely", "10 min total time"]

  return (
    <Card className="p-8 border-success/20 bg-success/5">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="h-6 w-6 text-success" />
        <h3 className="text-xl font-semibold">The clarity</h3>
      </div>
      <div className="space-y-3">
        {benefits.map((benefit) => (
          <div key={benefit} className="flex items-center gap-3 text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
            <span>{benefit}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
