import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
  LayoutDashboard,
  Calendar,
  CalendarDays,
  Scissors,
  Users,
  UserCircle,
  Settings,
  Bell,
  Menu,
  X,
  LogOut,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";
import { ThemeToggle } from "@/Components/ThemeToggle";
import { Badge } from "@/Components/ui/badge";
import { Toaster } from "@/Components/ui/sonner";
interface AdminLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Appointments", href: "/appointments", icon: Calendar },
  { name: "Calendar", href: "/calendar", icon: CalendarDays },
  { name: "Services", href: "/services", icon: Scissors },
  { name: "Staff", href: "/staff", icon: Users },
  { name: "Customers", href: "/customers", icon: UserCircle },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const page = usePage();
  const currentPath = page.url;
  const auth = (page.props as any)?.auth || {};

  const businessName = auth?.business?.name || "My Business";
  const userName = auth?.name || "User";
  const userEmail = auth?.email || "admin@example.com";
  const userInitials = userName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Get current page title from nav items
  const getPageTitle = () => {
    const currentItem = navItems.find(
      (item) =>
        currentPath === item.href || currentPath.startsWith(item.href + "/"),
    );
    return currentItem?.name || "Dashboard";
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 ease-in-out lg:translate-x-0",
          "bg-[hsl(var(--sidebar-background))] border-r border-[hsl(var(--sidebar-border))]",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo/Brand */}
          <div className="flex h-16 items-center justify-between border-b border-[hsl(var(--sidebar-border))] px-6">
            <div>
              {/* <h2 className="text-xl font-bold text-[hsl(var(--sidebar-foreground))]">
                BookEasy
              </h2>
              <p className="text-xs text-[hsl(var(--sidebar-foreground))]/70">
                Admin Panel
              </p> */}
              <img
                src="/images/logo.png"
                alt="Bookly"
                width={180}
                height={100}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-accent))]"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            <p className="px-3 text-xs font-semibold text-[hsl(var(--sidebar-foreground))]/70 uppercase tracking-wider mb-2">
              Menu
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                currentPath === item.href ||
                currentPath.startsWith(item.href + "/");

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-[hsl(var(--sidebar-foreground))]/80 hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))]",
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Early Access Badge */}
          <div className="px-4 pb-4">
            <div className="rounded-lg bg-[hsl(var(--sidebar-accent))] p-3 border border-[hsl(var(--sidebar-border))]">
              <p className="text-xs font-medium text-[hsl(var(--sidebar-accent-foreground))] mb-2">
                Early Access
              </p>
              <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 w-full justify-center">
                Free
              </Badge>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-semibold text-foreground">
                {getPageTitle()}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <RefreshCw className="h-5 w-5" />
              </Button>
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
              </Button>
              <div className="flex items-center gap-3 ml-2 pl-3 border-l border-border">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={auth?.avatar} />
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-foreground">
                    {businessName}
                  </p>
                  <p className="text-xs text-muted-foreground">{userEmail}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
        <Toaster
          position="top-right"
          toastOptions={{ duration: 4000 }}
          richColors
        />
      </div>
    </div>
  );
}
