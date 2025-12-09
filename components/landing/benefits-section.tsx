import type React from "react"
import { Search, Clock, Shield } from "lucide-react"

const benefits = [
  {
    number: "01",
    title: "Find what matters",
    description: "12 urgent emails buried in 847. No more panic.",
    icon: Search,
  },
  {
    number: "02",
    title: "Stop wasting time",
    description: "3 hours → 10 mins. AI does the sorting.",
    icon: Clock,
  },
  {
    number: "03",
    title: "Zero setup",
    description: "One click OAuth. Read-only safe. No risk.",
    icon: Shield,
  },
]

export function BenefitsSection() {
  return (
    <section className="py-20 md:py-32 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-16 tracking-tight">Why you'll use this</h2>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {benefits.map((benefit) => (
            <BenefitCard key={benefit.number} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface BenefitCardProps {
  number: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

function BenefitCard({ number, title, description, icon: Icon }: BenefitCardProps) {
  return (
    <div className="text-center space-y-4">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <span className="block text-sm font-medium text-muted-foreground">{number}</span>
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
