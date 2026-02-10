import React from "react"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { ArrowRight, Play, Calendar, Clock, Users, CheckCircle2 } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/4 rounded-full bg-accent/60 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-20 pt-20 md:pb-28 md:pt-28">
        <div className="flex flex-col items-center text-center">
          <Badge
            variant="secondary"
            className="mb-6 gap-1.5 border border-border px-4 py-1.5 text-sm font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Now in Early Access
          </Badge>

          <h1 className="font-heading max-w-3xl text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl md:leading-tight">
            Let clients book you online  for free
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Accept online bookings, manage appointments, staff, and
            availability all from one simple dashboard. Set up in minutes.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2 px-8 text-base font-semibold">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 px-8 text-base font-medium bg-transparent"
            >
              <Play className="h-4 w-4" />
              See How It Works
            </Button>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required
          </p>

          {/* Dashboard preview */}
          <div className="mt-16 w-full max-w-4xl">
            <div className="rounded-xl border border-border bg-card p-2 shadow-2xl shadow-primary/5">
              <div className="rounded-lg bg-muted/50 p-6 md:p-8">
                {/* Mock dashboard header */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                      <Calendar className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="font-heading text-sm font-semibold text-foreground">
                      Today&apos;s Appointments
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    4 upcoming
                  </Badge>
                </div>

                {/* Mock appointment cards */}
                <div className="flex flex-col gap-3">
                  {[
                    {
                      time: "9:00 AM",
                      name: "Sarah Johnson",
                      service: "Consultation",
                      status: "Confirmed",
                    },
                    {
                      time: "10:30 AM",
                      name: "Mike Chen",
                      service: "Follow-up",
                      status: "Confirmed",
                    },
                    {
                      time: "1:00 PM",
                      name: "Emily Davis",
                      service: "New Patient",
                      status: "Pending",
                    },
                    {
                      time: "3:30 PM",
                      name: "James Wilson",
                      service: "Consultation",
                      status: "Confirmed",
                    },
                  ].map((apt) => (
                    <div
                      key={apt.name}
                      className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span className="w-20 text-sm font-medium">
                            {apt.time}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {apt.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {apt.service}
                          </p>
                        </div>
                      </div>
                      <div className="hidden items-center gap-2 sm:flex">
                        {apt.status === "Confirmed" ? (
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        ) : (
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span
                          className={`text-xs font-medium ${apt.status === "Confirmed" ? "text-primary" : "text-muted-foreground"}`}
                        >
                          {apt.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats row */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {[
                    { icon: Calendar, label: "Today", value: "4" },
                    { icon: Users, label: "Clients", value: "127" },
                    { icon: Clock, label: "This week", value: "18" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col items-center rounded-lg border border-border bg-card p-3"
                    >
                      <stat.icon className="mb-1 h-4 w-4 text-primary" />
                      <span className="text-lg font-bold text-foreground">
                        {stat.value}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
