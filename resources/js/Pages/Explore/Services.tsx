import React from "react";
import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Header";
import Footer from "@/Components/Shared/footer";
import { Clock, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExploreService {
  id: number | string;
  name: string;
  description: string;
  duration_minutes: number;
  price: number;
  business_id: number | string;
  business_name: string;
  business_slug: string;
}

interface ServicesPageProps {
  services: ExploreService[];
}

function formatPrice(price: number): string {
  if (price === 0) return "Free";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

export default function ExploreServicesPage({ services }: ServicesPageProps) {
  return (
    <>
      <Head title="All Services" />
      <div
        className={cn(
          "flex min-h-screen flex-col",
          "bg-[hsl(var(--sidebar-background))]",
        )}
      >
        <Navbar />
        <main className="flex-1 py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10">
              <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                All Services
              </h1>
              <p className="mt-2 text-muted-foreground">
                Browse and book services from our partner businesses.
              </p>
            </div>

            {!services?.length ? (
              <div className="rounded-xl border border-border bg-card p-12 text-center">
                <p className="text-muted-foreground">
                  No services available yet. Check back soon.
                </p>
                <Link
                  href="/"
                  className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
                >
                  Back to home
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      <span>{service.business_name}</span>
                    </div>
                    <h2 className="font-heading text-lg font-semibold text-foreground">
                      {service.name}
                    </h2>
                    {service.description && (
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                        {service.description}
                      </p>
                    )}
                    <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-4">
                      <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {formatDuration(service.duration_minutes)}
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {formatPrice(service.price)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
