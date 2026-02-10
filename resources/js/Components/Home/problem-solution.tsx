import React from "react"
import { AlertTriangle, Zap, ArrowDown } from "lucide-react"
export default function ProblemSolution() {
  return (
    <section className="border-t border-border bg-muted/30 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            The Problem
          </p>
          <h2 className="font-heading mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Booking should be easy. For everyone.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {/* Problem card */}
          <div className="rounded-xl border border-border bg-card p-8">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground">
              Without Bookly
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {[
                "Endless phone calls and back-and-forth emails",
                "Double bookings and scheduling conflicts",
                "Clients can't book outside business hours",
                "No-shows with no automated reminders",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-destructive" />
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution card */}
          <div className="rounded-xl border border-primary/20 bg-accent/30 p-8">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground">
              With Bookly
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {[
                "Clients book instantly from your custom link",
                "Smart scheduling prevents conflicts automatically",
                "24/7 online booking — even while you sleep",
                "Email notifications keep everyone in the loop",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span className="text-sm leading-relaxed text-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 shadow-sm">
            <ArrowDown className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              See what you get — completely free
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
