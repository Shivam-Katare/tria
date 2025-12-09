import { LandingHeader } from "@/components/landing/landing-header"
import { HeroSection } from "@/components/landing/hero-section"
import { ProblemSection } from "@/components/landing/problem-section"
import { BenefitsSection } from "@/components/landing/benefits-section"
import { CTASection } from "@/components/landing/cta-section"

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <LandingHeader />
      <HeroSection />
      <ProblemSection />
      <BenefitsSection />
      <CTASection />
    </main>
  )
}
