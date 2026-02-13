import React from "react";
import { Calendar } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Bookly" width={180} height={100} />
          </div>

          <div className="flex items-center gap-6">
            <a
              href="/explore/services"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Services
            </a>
            <a
              href="/#featured-businesses"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Businesses
            </a>
            <a
              href="/#features"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="/#how-it-works"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              How It Works
            </a>
            <a
              href="/#early-access"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Early Access
            </a>
          </div>

          <p className="text-sm text-muted-foreground">
            {"© 2026 Bookly. All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
}
