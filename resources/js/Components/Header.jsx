import React from "react"

import { useState } from "react"
import { Button } from "./ui/button"
import { Menu, X } from "lucide-react"
import { Link } from "@inertiajs/react"

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Bookly" width={180} height={100} />
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="/#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </a>
          <a
            href="/#how-it-works"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            How It Works
          </a>
          <a
            href="/#early-access"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Early Access
          </a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm">
            <Link href="/login">Log in</Link>
          </Button>
          <Button size="sm">Get Started Free</Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            <a
              href="/#features"
              className="text-sm font-medium text-muted-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Features
            </a>
            <a
              href="/#how-it-works"
              className="text-sm font-medium text-muted-foreground"
              onClick={() => setMobileOpen(false)}
            >
              How It Works
            </a>
            <a
              href="/#early-access"
              className="text-sm font-medium text-muted-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Early Access
            </a>
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <Link href="/login">Log in</Link>
              </Button>
              <Button size="sm" className="w-full">
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
