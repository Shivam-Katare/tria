import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 md:py-32 px-6 bg-background">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Still reading? Just try it.</h2>

        <Link href="/dashboard">
          <Button
            size="lg"
            className="text-lg px-8 py-6 h-auto rounded-lg font-medium transition-transform hover:scale-[1.02]"
          >
            <Mail className="mr-2 h-5 w-5" />
            Connect Gmail — It's Free
          </Button>
        </Link>
      </div>
    </section>
  )
}
