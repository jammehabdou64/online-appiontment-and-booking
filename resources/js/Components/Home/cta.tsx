import React from "react"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section className="border-t border-border bg-muted/30 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card px-8 py-16 text-center md:px-16">
          {/* Subtle glow */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
          </div>

          <h2 className="font-heading mx-auto max-w-xl text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Ready to simplify your scheduling?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-pretty text-muted-foreground">
            Join hundreds of businesses already using Bookly to save time and
            get more bookings. It takes less than two minutes.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="gap-2 px-8 text-base font-semibold"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required
          </p>
        </div>
      </div>
    </section>
  )
}
