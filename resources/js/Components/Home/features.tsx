import React from "react"
import { Badge } from "../ui/badge"
import {
  Globe,
  CalendarDays,
  Users,
  Clock,
  Bell,
  Link2,
} from "lucide-react"

const features = [
  {
    icon: Globe,
    title: "Online Booking Page",
    description:
      "A beautiful, shareable booking page where clients pick a time that works for them.",
    free: true,
  },
  {
    icon: CalendarDays,
    title: "Appointment Calendar",
    description:
      "See all your upcoming appointments in one clean calendar view. Never miss a booking.",
    free: true,
  },
  {
    icon: Users,
    title: "Staff & Service Management",
    description:
      "Add team members, define services, set durations and assign staff to each service.",
    free: true,
  },
  {
    icon: Clock,
    title: "Availability Scheduling",
    description:
      "Set your working hours, breaks, and days off. Clients only see times you're available.",
    free: true,
  },
  {
    icon: Bell,
    title: "Email Notifications",
    description:
      "Automatic confirmations and reminders to reduce no-shows and keep clients informed.",
    comingSoon: true,
  },
  {
    icon: Link2,
    title: "Shareable Booking Link",
    description:
      "One link to share on social media, your website, or anywhere clients can find you.",
    free: true,
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Features
          </p>
          <h2 className="font-heading mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Everything you need to get booked
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            All features included in the free tier. No upsells, no hidden fees.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-accent">
                <feature.icon className="h-5 w-5 text-accent-foreground" />
              </div>
              <h3 className="font-heading text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
              <div className="mt-4">
                {feature.comingSoon ? (
                  <Badge variant="outline" className="text-xs text-muted-foreground">
                    Coming Soon
                  </Badge>
                ) : (
                  <Badge
                    variant="secondary"
                    className="bg-accent text-xs text-accent-foreground"
                  >
                    Free
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
