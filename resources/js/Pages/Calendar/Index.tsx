import React, { useMemo } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AdminLayout from "@/Components/Admin/AdminLayout";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";

const SERVICE_COLORS: Record<string, string> = {
  "Hair Coloring": "bg-rose-600",
  Haircut: "bg-rose-600",
  "Coloring x2": "bg-rose-600",
  "Haircut x3": "bg-rose-600",
  Facial: "bg-blue-600",
  "Beard Trim": "bg-blue-600",
  Pedicure: "bg-blue-600",
  Massage: "bg-amber-700",
  Manicure: "bg-amber-700",
  "Spa Package": "bg-emerald-600",
  Blowout: "bg-emerald-600",
  "Massage x2": "bg-emerald-600",
};

const getServiceColor = (service: string) => SERVICE_COLORS[service] ?? "bg-primary";

const DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarPageProps {
  year: number;
  month: number;
  monthLabel: string;
  appointmentsByDate: Record<string, { service: string; badge?: number }[]>;
}

export default function Calendar() {
  const page = usePage();
  const props = page.props as unknown as CalendarPageProps;
  const now = useMemo(() => new Date(), []);
  const year = props?.year ?? now.getFullYear();
  const month = props?.month ?? now.getMonth() + 1;
  const monthLabel = props?.monthLabel ?? now.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const appointmentsByDate = props?.appointmentsByDate ?? {};

  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const startOffset = firstDay;
  const totalCells = 6 * 7;

  const isToday = (day: number) =>
    day === now.getDate() &&
    month === now.getMonth() + 1 &&
    year === now.getFullYear();

  const cells = useMemo(() => {
    const result: { day: number | null; dateKey: string | null }[] = [];
    for (let i = 0; i < totalCells; i++) {
      const dayNumber = i - startOffset + 1;
      if (dayNumber < 1 || dayNumber > daysInMonth) {
        result.push({ day: null, dateKey: null });
      } else {
        const dateKey = `${year}-${String(month).padStart(2, "0")}-${String(dayNumber).padStart(2, "0")}`;
        result.push({ day: dayNumber, dateKey });
      }
    }
    return result;
  }, [year, month, daysInMonth, startOffset, totalCells]);

  const prevMonth = () => {
    if (month <= 1) {
      router.get("/calendar", { year: year - 1, month: 12 });
    } else {
      router.get("/calendar", { year, month: month - 1 });
    }
  };

  const nextMonth = () => {
    if (month >= 12) {
      router.get("/calendar", { year: year + 1, month: 1 });
    } else {
      router.get("/calendar", { year, month: month + 1 });
    }
  };

  const goToday = () => {
    router.get("/calendar");
  };

  return (
    <AdminLayout>
      <Head title="Calendar" />
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-foreground">{monthLabel}</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevMonth}
              className="rounded-full h-9 w-9 shrink-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextMonth}
              className="rounded-full h-9 w-9 shrink-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToday}
              className="rounded-full px-4"
            >
              Today
            </Button>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 overflow-hidden">
          <div className="grid grid-cols-7 border-b border-border bg-muted/50">
            {DAY_HEADERS.map((day) => (
              <div
                key={day}
                className="py-2 text-center text-sm font-medium text-muted-foreground"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {cells.map((cell, index) => (
              <div
                key={index}
                className={cn(
                  "min-h-[100px] sm:min-h-[120px] border-b border-r border-border p-1.5 flex flex-col",
                  (index + 1) % 7 === 0 && "border-r-0",
                  !cell.day && "bg-muted/20"
                )}
              >
                {cell.day !== null ? (
                  <>
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={cn(
                          "text-sm font-medium tabular-nums",
                          isToday(cell.day)
                            ? "flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground"
                            : "text-foreground"
                        )}
                      >
                        {cell.day}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col gap-1 overflow-hidden">
                      {(appointmentsByDate[cell.dateKey!] ?? []).map((apt, i) => (
                        <div
                          key={i}
                          className={cn(
                            "relative rounded px-1.5 py-0.5 text-xs font-medium text-white truncate",
                            getServiceColor(apt.service)
                          )}
                        >
                          {apt.badge !== undefined && (
                            <span className="absolute -top-1 -left-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                              {apt.badge}
                            </span>
                          )}
                          {apt.service}
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Link href="/appointments/create">
            <Button variant="outline" size="sm" className="rounded-full">
              New Appointment
            </Button>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
