import React from "react";
import { Head, Link } from "@inertiajs/react";
import { ChevronLeft, ChevronRight, Plus, Clock } from "lucide-react";
import AdminLayout from "@/Components/Admin/AdminLayout";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";

// Mock data - replace with real data from props
const appointments = [
  { id: 1, time: "09:00", customer: "Sarah Johnson", service: "Haircut", status: "confirmed" },
  { id: 2, time: "10:00", customer: "Michael Chen", service: "Consultation", status: "confirmed" },
  { id: 3, time: "11:30", customer: "Jessica Martinez", service: "Manicure", status: "pending" },
  { id: 4, time: "14:00", customer: "David Thompson", service: "Massage", status: "confirmed" },
  { id: 5, time: "15:30", customer: "Amanda Lee", service: "Facial", status: "confirmed" },
];

const timeSlots = Array.from({ length: 12 }, (_, i) => {
  const hour = 9 + i;
  return `${hour.toString().padStart(2, "0")}:00`;
});

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    confirmed: "bg-primary text-primary-foreground",
    pending: "bg-secondary text-secondary-foreground",
    cancelled: "bg-muted text-muted-foreground",
  };
  return colors[status] || colors.pending;
};

export default function Calendar() {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = React.useState(currentDate);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getAppointmentsForTime = (time: string) => {
    return appointments.filter((apt) => apt.time === time);
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    setSelectedDate(newDate);
  };

  return (
    <AdminLayout>
      <Head title="Calendar" />
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
            <p className="text-muted-foreground mt-1">
              View and manage your appointments
            </p>
          </div>
          <Link href="/appointments/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Appointment
            </Button>
          </Link>
        </div>

        {/* Calendar View */}
        <Card>
          <CardContent className="p-6">
            {/* Date Navigation */}
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateDate("prev")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-center">
                <h2 className="text-xl font-semibold text-foreground">
                  {formatDate(selectedDate)}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedDate(new Date())}
                  className="mt-1"
                >
                  Today
                </Button>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateDate("next")}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Time Slots */}
            <div className="space-y-2">
              {timeSlots.map((time) => {
                const timeAppointments = getAppointmentsForTime(time);
                return (
                  <div
                    key={time}
                    className="flex items-start gap-4 border-b border-border pb-2 last:border-0"
                  >
                    <div className="w-20 flex-shrink-0 pt-2">
                      <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {time}
                      </div>
                    </div>
                    <div className="flex-1 grid gap-2">
                      {timeAppointments.length > 0 ? (
                        timeAppointments.map((appointment) => (
                          <Link
                            key={appointment.id}
                            href={`/appointments/${appointment.id}`}
                          >
                            <div
                              className={`p-3 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${getStatusColor(
                                appointment.status
                              )}`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">
                                    {appointment.customer}
                                  </p>
                                  <p className="text-sm opacity-90">
                                    {appointment.service}
                                  </p>
                                </div>
                                <Badge
                                  variant="outline"
                                  className="capitalize bg-background/20 border-background/30"
                                >
                                  {appointment.status}
                                </Badge>
                              </div>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="p-3 text-sm text-muted-foreground">
                          No appointments
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

