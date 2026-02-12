import React, { useMemo } from "react";
import { Head, Link } from "@inertiajs/react";
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

// Mock: appointments per day for the visible month. Key = "YYYY-MM-DD", value = list of { service, count? }
const MOCK_APPOINTMENTS: Record<string, { service: string; count?: number; badge?: number }[]> = {
  "2026-02-03": [{ service: "Hair Coloring" }],
  "2026-02-05": [{ service: "Facial" }, { service: "Massage" }],
  "2026-02-09": [{ service: "Spa Package", badge: 9 }],
  "2026-02-12": [{ service: "Haircut x3" }, { service: "Beard Trim" }],
  "2026-02-14": [{ service: "Manicure" }],
  "2026-02-15": [{ service: "Blowout" }],
  "2026-02-18": [{ service: "Coloring x2" }],
  "2026-02-20": [{ service: "Pedicure" }],
  "2026-02-22": [{ service: "Facial" }],
  "2026-02-25": [{ service: "Massage x2" }],
  "2026-02-27": [{ service: "Haircut" }],
};

const DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar() {
  const [viewDate, setViewDate] = React.useState(() => new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthLabel = viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = firstDay;
  const totalCells = 6 * 7;

  const today = useMemo(() => new Date(), []);
  const isToday = (day: number) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const cells = useMemo(() => {
    const result: { day: number | null; dateKey: string | null }[] = [];
    for (let i = 0; i < totalCells; i++) {
      const dayNumber = i - startOffset + 1;
      if (dayNumber < 1 || dayNumber > daysInMonth) {
        result.push({ day: null, dateKey: null });
      } else {
        const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNumber).padStart(2, "0")}`;
        result.push({ day: dayNumber, dateKey });
      }
    }
    return result;
  }, [year, month, daysInMonth, startOffset, totalCells]);

  const prevMonth = () => {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1));
  };
  const nextMonth = () => {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1));
  };
  const goToday = () => {
    setViewDate(new Date());
  };

  return (
    <AdminLayout>
      <Head title="Calendar" />
      <div className="space-y-6">
        {/* Controls: month title left, arrows + Today right */}
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

        {/* Month grid */}
        <div className="rounded-lg border border-border bg-muted/30 overflow-hidden">
          {/* Day headers */}
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
          {/* 6 rows of days */}
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
                      {(MOCK_APPOINTMENTS[cell.dateKey!] ?? []).map((apt, i) => (
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
