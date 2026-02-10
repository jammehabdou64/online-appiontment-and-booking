import React from "react";
import { Head, Link } from "@inertiajs/react";
import {
  Calendar,
  Clock,
  Users,
  CalendarCheck,
  ChevronRight,
} from "lucide-react";
import AdminLayout from "@/Components/Admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";

// Mock data - replace with real data from props
const stats = {
  todayAppointments: 8,
  upcomingAppointments: 24,
  totalCustomers: 156,
  weeklyAppointments: 42,
};

const upcomingAppointments = [
  {
    id: 1,
    customer: "Sarah Johnson",
    service: "Haircut & Styling",
    staff: "Emma Wilson",
    date: "2024-01-15",
    time: "10:00 AM",
    status: "confirmed",
  },
  {
    id: 2,
    customer: "Michael Chen",
    service: "Consultation",
    staff: "Dr. Smith",
    date: "2024-01-15",
    time: "11:30 AM",
    status: "confirmed",
  },
  {
    id: 3,
    customer: "Jessica Martinez",
    service: "Manicure",
    staff: "Lisa Brown",
    date: "2024-01-15",
    time: "2:00 PM",
    status: "pending",
  },
  {
    id: 4,
    customer: "David Thompson",
    service: "Massage Therapy",
    staff: "John Doe",
    date: "2024-01-15",
    time: "3:30 PM",
    status: "confirmed",
  },
  {
    id: 5,
    customer: "Amanda Lee",
    service: "Facial Treatment",
    staff: "Sarah Davis",
    date: "2024-01-16",
    time: "9:00 AM",
    status: "confirmed",
  },
];

const weeklyCalendar = [
  { day: "Mon", date: "15", count: 8 },
  { day: "Tue", date: "16", count: 12 },
  { day: "Wed", date: "17", count: 6 },
  { day: "Thu", date: "18", count: 10 },
  { day: "Fri", date: "19", count: 15 },
  { day: "Sat", date: "20", count: 18 },
  { day: "Sun", date: "21", count: 4 },
];

const getStatusBadge = (status: string) => {
  const variants: Record<string, "default" | "secondary" | "outline"> = {
    confirmed: "default",
    pending: "secondary",
    cancelled: "outline",
  };

  return (
    <Badge variant={variants[status] || "outline"} className="capitalize">
      {status}
    </Badge>
  );
};

export default function Dashboard() {
  return (
    <AdminLayout>
      <Head title="Dashboard" />
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today's Appointments
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayAppointments}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.todayAppointments > 0
                  ? `${stats.todayAppointments} scheduled for today`
                  : "No appointments today"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Appointments
              </CardTitle>
              <CalendarCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.upcomingAppointments}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Next 7 days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Customers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCustomers}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Active customers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                This Week
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.weeklyAppointments}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Appointments scheduled
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upcoming Appointments */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Appointments</CardTitle>
              <Link href="/appointments">
                <Button variant="ghost" size="sm">
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.slice(0, 5).map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-foreground truncate">
                            {appointment.customer}
                          </p>
                          {getStatusBadge(appointment.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {appointment.service}
                        </p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span>{appointment.staff}</span>
                          <span>•</span>
                          <span>
                            {appointment.date} at {appointment.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No upcoming appointments</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Weekly Calendar Preview */}
          <Card>
            <CardHeader>
              <CardTitle>This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {weeklyCalendar.map((day, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-2 rounded-lg border border-border hover:bg-accent transition-colors"
                  >
                    <span className="text-xs font-medium text-muted-foreground">
                      {day.day}
                    </span>
                    <span className="text-lg font-semibold text-foreground mt-1">
                      {day.date}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      {day.count}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <Link href="/calendar">
                  <Button variant="outline" className="w-full">
                    View Full Calendar
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}

