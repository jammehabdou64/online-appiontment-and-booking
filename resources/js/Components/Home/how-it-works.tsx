import { UserPlus, Settings, Share2, CalendarCheck } from "lucide-react"
import React from "react"
const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Sign up free",
    description: "Create your account in seconds. No credit card, no commitment.",
  },
  {
    icon: Settings,
    step: "02",
    title: "Set up services",
    description:
      "Add your services, set availability, and customize your booking page.",
  },
  {
    icon: Share2,
    step: "03",
    title: "Share your link",
    description:
      "Send your booking link to clients via email, social media, or your website.",
  },
  {
    icon: CalendarCheck,
    step: "04",
    title: "Start getting booked",
    description:
      "Clients pick a time, you get notified, and your calendar stays organized.",
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-t border-border bg-muted/30 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            How It Works
          </p>
          <h2 className="font-heading mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Up and running in minutes
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Four simple steps to start accepting online bookings today.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.step} className="relative flex flex-col items-center text-center">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute left-[calc(50%+2rem)] top-8 hidden h-px w-[calc(100%-4rem)] bg-border lg:block" />
              )}

              <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
                <step.icon className="h-7 w-7 text-primary" />
                <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {step.step}
                </span>
              </div>

              <h3 className="font-heading text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
