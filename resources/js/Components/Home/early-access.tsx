import React from "react"
import { Badge } from "../ui/badge"
import { Gift, MessageSquare, Sparkles } from "lucide-react"
const perks = [
  {
    icon: Gift,
    title: "Free forever plan",
    description:
      "Early adopters get access to core features at no cost, even after we launch paid tiers.",
  },
  {
    icon: MessageSquare,
    title: "Shape the product",
    description:
      "Your feedback directly influences our roadmap. Tell us what to build next.",
  },
  {
    icon: Sparkles,
    title: "New features weekly",
    description:
      "We ship fast. Expect regular updates, improvements, and new capabilities.",
  },
]

export default function EarlyAccess() {
  return (
    <section id="early-access" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="secondary"
            className="mb-4 gap-1.5 border border-border px-4 py-1.5 text-sm font-medium"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Early Access
          </Badge>
          <h2 className="font-heading text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Get in early. Get more.
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            {
              "We're building Bookly in the open. Join now and be part of the journey."
            }
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {perks.map((perk) => (
            <div
              key={perk.title}
              className="flex flex-col items-center rounded-xl border border-border bg-card p-8 text-center transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                <perk.icon className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-heading text-base font-semibold text-foreground">
                {perk.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {perk.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
