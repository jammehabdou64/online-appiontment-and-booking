import React from "react";
import { Link } from "@inertiajs/react";
import { Building2, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export interface FeaturedBusiness {
  id: number | string;
  name: string;
  slug?: string;
  description?: string | null;
  address?: string | null;
  email?: string | null;
  website?: string | null;
  logo?: string | null;
  is_active?: boolean;
}

interface FeaturedBusinessesProps {
  businesses: FeaturedBusiness[];
}

export default function FeaturedBusinesses({ businesses }: FeaturedBusinessesProps) {
  if (!businesses?.length) return null;

  return (
    <section id="featured-businesses" className="py-20 md:py-28 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Featured Businesses
          </p>
          <h2 className="font-heading mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Book with trusted local businesses
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Discover services from our partner businesses and book appointments online.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {businesses.map((business) => (
            <div
              key={business.id}
              className="group relative flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                {business.logo ? (
                  <img
                    src={business.logo}
                    alt=""
                    className="h-8 w-8 rounded object-contain"
                  />
                ) : (
                  <Building2 className="h-6 w-6 text-accent-foreground" />
                )}
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {business.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                {business.description ||
                  business.address ||
                  "Book appointments online with this business."}
              </p>
              {business.address && !business.description && (
                <p className="mt-1 text-xs text-muted-foreground/80">{business.address}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/explore/services">
            <Button size="lg" className="gap-2">
              View all services
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
