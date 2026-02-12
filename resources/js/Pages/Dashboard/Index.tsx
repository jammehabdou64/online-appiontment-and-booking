import React, { useMemo } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import {
  Calendar,
  Clock,
  Users,
  CalendarClock,
  TrendingUp,
} from "lucide-react";
import AdminLayout from "@/Components/Admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { cn } from "@/lib/utils";

const SERVICE_COLORS: Record<string, string> = {
  "Hair Coloring": "bg-rose-500/90",
  "Men's Haircut": "bg-emerald-600/90",
  "Facial": "bg-blue-600/90",
  "Deep Tissue Massage": "bg-amber-700/90",
  "Manicure": "bg-rose-400/90",
  "Pedicure": "bg-pink-400/90",
  "Beard Trim": "bg-slate-600/90",
  "Blowout": "bg-teal-500/90",
  "Haircut": "bg-indigo-600/90",
  "Spa Package": "bg-amber-800/90",
};

const getServiceColor = (service: string) => SERVICE_COLORS[service] || "bg-primary/90";

interface DashboardStats {
  todayAppointments: number;
  todayConfirmed: number;
  todayPending: number;
  upcomingThisWeek: number;
  totalCustomers: number;
  customersNewThisMonth: number;
  completionRate: number;
  todayAppointmentsPercent: string;
  upcomingPercent: string;
  customersPercent: string;
  completionPercent: string;
  completionLabel: string;
}

const defaultStats: DashboardStats = {
  todayAppointments: 0,
  todayConfirmed: 0,
  todayPending: 0,
  upcomingThisWeek: 0,
  totalCustomers: 0,
  customersNewThisMonth: 0,
  completionRate: 0,
  todayAppointmentsPercent: "+0%",
  upcomingPercent: "+0%",
  customersPercent: "+0%",
  completionPercent: "+0%",
  completionLabel: "Last 30 days",
};

export default function Dashboard() {
  const page = usePage();
  const props = page.props as unknown as {
    stats?: DashboardStats;
    upcomingToday?: { id: number; customer: string; initials: string; service: string; time: string; status: string }[];
    weeklyAppointments?: { dayIndex: number; time: string; service: string }[];
  };
  const stats = props.stats ?? defaultStats;
  const upcomingToday = props.upcomingToday ?? [];
  const weeklyAppointments = props.weeklyAppointments ?? [];

  const auth = (page.props as any)?.auth || {};
  const businessName = auth?.business?.name || "Serene Beauty";

  const weekStart = useMemo(() => {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
    return new Date(d.setDate(diff));
  }, []);
  const today = useMemo(() => new Date(), []);
  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      const isToday =
        d.getDate() === today.getDate() &&
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear();
      return {
        day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
        date: d.getDate(),
        isToday,
      };
    });
  }, [weekStart, today]);

  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

  const parseRowHour = (timeLabel: string) => {
    const [hourStr] = timeLabel.replace(" AM", "").replace(" PM", "").split(":");
    let h = parseInt(hourStr, 10);
    if (timeLabel.includes("PM") && h !== 12) h += 12;
    if (timeLabel.includes("AM") && h === 12) h = 0;
    return h;
  };

  const getBlockForCell = (dayIndex: number, timeLabel: string) => {
    const rowHour = parseRowHour(timeLabel);
    return weeklyAppointments.filter((a) => {
      if (a.dayIndex !== dayIndex) return false;
      const [ah] = a.time.split(":");
      const apptHour = parseInt(ah, 10);
      return apptHour === rowHour;
    });
  };

  return (
    <AdminLayout>
      <Head title="Dashboard" />
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {businessName}
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your bookings today.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today's Appointments
              </CardTitle>
              <Calendar className="h-4 w-4 text-primary" strokeWidth={2} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayAppointments}</div>
              <p className="text-xs mt-1">
                <span className="text-emerald-500">+12%</span>{" "}
                <span className="text-muted-foreground">
                  {stats.todayConfirmed} confirmed, {stats.todayPending} pending
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming This Week
              </CardTitle>
              <CalendarClock className="h-4 w-4 text-primary" strokeWidth={2} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.upcomingThisWeek}</div>
              <p className="text-xs mt-1">
                <span className="text-emerald-500">{stats.upcomingPercent}</span>{" "}
                <span className="text-muted-foreground">Next 7 days</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Customers
              </CardTitle>
              <Users className="h-4 w-4 text-primary" strokeWidth={2} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCustomers}</div>
              <p className="text-xs mt-1">
                <span className="text-emerald-500">{stats.customersPercent}</span>{" "}
                <span className="text-muted-foreground">{stats.customersNewThisMonth} new this month</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completion Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" strokeWidth={2} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completionRate}%</div>
              <p className="text-xs mt-1">
                <span className="text-emerald-500">{stats.completionPercent}</span>{" "}
                <span className="text-muted-foreground">{stats.completionLabel}</span>
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upcoming Today */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Today</CardTitle>
              <Link
                href="/appointments"
                className="text-sm font-medium text-primary hover:underline"
              >
                View all →
              </Link>
            </CardHeader>
            <CardContent>
              {upcomingToday.length > 0 ? (
                <div className="space-y-4">
                  {upcomingToday.map((apt) => (
                    <div
                      key={apt.id}
                      className="flex items-center gap-3 border-b border-border pb-4 last:border-0 last:pb-0"
                    >
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium"
                        )}
                      >
                        {apt.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground">{apt.customer}</p>
                        <p className="text-sm text-muted-foreground">{apt.service}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{apt.time}</span>
                        </div>
                      </div>
                      <Badge
                        variant={apt.status === "confirmed" ? "default" : "secondary"}
                        className={cn(
                          "capitalize shrink-0",
                          apt.status === "confirmed" && "bg-emerald-600 hover:bg-emerald-600",
                          apt.status === "pending" && "bg-amber-500 text-white hover:bg-amber-500"
                        )}
                      >
                        {apt.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No upcoming appointments today</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Weekly Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="min-w-[600px]">
                  {/* Days row */}
                  <div className="grid grid-cols-8 gap-px mb-1">
                    <div className="h-8" />
                    {weekDays.map((d, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex flex-col items-center justify-center rounded-t-md text-sm",
                          d.isToday
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted/60 text-muted-foreground"
                        )}
                      >
                        <span className="font-medium">{d.day}</span>
                        <span className="text-xs opacity-90">{d.date}</span>
                      </div>
                    ))}
                  </div>
                  {/* Time rows */}
                  <div className="border border-border rounded-b-md overflow-hidden">
                    {timeSlots.map((time, rowIndex) => (
                      <div key={time} className="grid grid-cols-8 gap-px border-b border-border last:border-b-0">
                        <div className="flex items-center px-2 py-1 bg-muted/30 text-muted-foreground text-xs font-medium">
                          {time}
                        </div>
                        {weekDays.map((_, dayIndex) => {
                          const blocks = getBlockForCell(dayIndex, time);
                          const block = blocks[0];
                          return (
                            <div
                              key={dayIndex}
                              className="min-h-[36px] p-1 bg-background"
                            >
                              {block && (
                                <div
                                  className={cn(
                                    "rounded px-1.5 py-0.5 text-xs font-medium text-white truncate",
                                    getServiceColor(block.service)
                                  )}
                                  title={block.service}
                                >
                                  {block.service}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <Link href="/calendar">
                  <span className="text-sm font-medium text-primary hover:underline">
                    View full calendar →
                  </span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
