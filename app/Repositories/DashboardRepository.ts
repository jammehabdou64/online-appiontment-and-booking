import { Carbon } from "jcc-express-mvc/Core/Date";
import { Appointment } from "@/Models/Appointment";
import { Customer } from "@/Models/Customer";

/** Format time for display (e.g. "9:00 AM") using Carbon */
function formatTime(dateStr: string): string {
  const c = new Carbon(dateStr);
  const h = c.getHour();
  const m = c.getMinute();
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${m === 0 ? "00" : String(m).padStart(2, "0")} ${ampm}`;
}

function getInitials(firstName?: string, lastName?: string): string {
  const f = (firstName || "").trim().charAt(0).toUpperCase();
  const l = (lastName || "").trim().charAt(0).toUpperCase();
  return f + l || "?";
}

/** Get attribute from model or raw object (handles both Eloquent and plain) */
function attr(obj: any, key: string): any {
  if (obj == null) return undefined;
  if (obj[key] !== undefined) return obj[key];
  return obj._attributes?.[key];
}

export interface DashboardStats {
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

export interface UpcomingTodayItem {
  id: number;
  customer: string;
  initials: string;
  service: string;
  time: string;
  status: string;
}

export interface WeeklyAppointmentItem {
  dayIndex: number;
  time: string;
  service: string;
}

export interface DashboardData {
  stats: DashboardStats;
  upcomingToday: UpcomingTodayItem[];
  weeklyAppointments: WeeklyAppointmentItem[];
}

export class DashboardRepository {
  /**
   * Get all dashboard data for a business: stats, upcoming today list, weekly overview.
   */
  async getDashboardData(businessId: number): Promise<DashboardData> {
    const {
      todayStartStr,
      todayEndStr,
      weekStart,
      weekStartStr,
      weekEndStr,
      monthStartStr,
      thirtyDaysStr,
      nowStr,
    } = this.getDateRanges();

    const baseAppointment = () =>
      Appointment.query().where("business_id", businessId);

    // Single query for today's appointments (we derive counts from this)
    const todayAppointmentsList = (await baseAppointment()
      .where("start_time", ">=", todayStartStr)
      .where("start_time", "<=", todayEndStr)
      .whereNot("status", "cancelled")
      .with(["customer", "service"])
      .orderBy("start_time", "asc")
      .get()) as any[];

    const todayTotal = todayAppointmentsList.length;
    const todayConfirmed = todayAppointmentsList.filter(
      (a) => attr(a, "status") === "confirmed",
    ).length;
    const todayPending = todayAppointmentsList.filter(
      (a) => attr(a, "status") === "pending",
    ).length;

    // Weekly appointments: fetch once, use for both count and list
    const weekAppointmentsRaw = (await baseAppointment()
      .where("start_time", ">=", weekStartStr)
      .where("start_time", "<=", weekEndStr)
      .whereNot("status", "cancelled")
      .with(["service"])
      .orderBy("start_time", "asc")
      .get()) as any[];

    const weekTotal = weekAppointmentsRaw.length;

    const [
      totalCustomers,
      customersNewThisMonth,
      last30Total,
      last30Completed,
    ] = await Promise.all([
      Customer.query().where("business_id", businessId).count(),
      Customer.query()
        .where("business_id", businessId)
        .where("created_at", ">=", monthStartStr)
        .count(),
      baseAppointment().where("start_time", ">=", thirtyDaysStr).count(),
      baseAppointment()
        .where("start_time", ">=", thirtyDaysStr)
        .where("end_time", "<", nowStr)
        .whereNot("status", "cancelled")
        .count(),
    ]);

    const completionRate =
      last30Total > 0 ? Math.round((last30Completed / last30Total) * 100) : 0;

    const upcomingToday = todayAppointmentsList.map((apt) =>
      this.mapUpcomingToday(apt),
    );
    const weeklyAppointments = this.mapWeeklyAppointments(
      weekAppointmentsRaw,
      weekStart,
    );

    const stats: DashboardStats = {
      todayAppointments: todayTotal,
      todayConfirmed,
      todayPending,
      upcomingThisWeek: weekTotal,
      totalCustomers,
      customersNewThisMonth,
      completionRate,
      todayAppointmentsPercent: "+0%",
      upcomingPercent: "+0%",
      customersPercent: "+0%",
      completionPercent: "+0%",
      completionLabel: "Last 30 days",
    };

    return { stats, upcomingToday, weeklyAppointments };
  }

  /**
   * Build date ranges for dashboard queries using Carbon (Monday = start of week).
   */
  private getDateRanges(): {
    todayStartStr: string;
    todayEndStr: string;
    weekStart: Carbon;
    weekStartStr: string;
    weekEndStr: string;
    monthStartStr: string;
    thirtyDaysStr: string;
    nowStr: string;
  } {
    const n = Carbon.now();
    const todayStart = n.clone().startOfDay();
    const todayEnd = n.clone().endOfDay();
    // Week: Monday–Sunday (Carbon.startOfWeek() uses Sunday, so we compute Monday)
    const dayOfWeek = n.getDayOfWeek();
    const weekStart = n
      .clone()
      .startOfDay()
      .subDays(dayOfWeek === 0 ? 6 : dayOfWeek - 1);
    const weekEnd = weekStart.clone().addDays(6).endOfDay();
    const monthStart = n.clone().startOfMonth();
    const thirtyDaysAgo = n.clone().subDays(30).startOfDay();

    return {
      todayStartStr: todayStart.toDateTimeString(),
      todayEndStr: todayEnd.toDateTimeString(),
      weekStart,
      weekStartStr: weekStart.toDateTimeString(),
      weekEndStr: weekEnd.toDateTimeString(),
      monthStartStr: monthStart.toDateTimeString(),
      thirtyDaysStr: thirtyDaysAgo.toDateTimeString(),
      nowStr: n.toDateTimeString(),
    };
  }

  private mapUpcomingToday(apt: any): UpcomingTodayItem {
    const cust = apt.customer || {};
    const first = attr(cust, "first_name") ?? "";
    const last = attr(cust, "last_name") ?? "";
    const serviceName = attr(apt.service, "name") ?? "—";
    const startTime = attr(apt, "start_time");
    const status = attr(apt, "status") ?? "pending";
    const id = attr(apt, "id");
    return {
      id,
      customer: `${first} ${last}`.trim() || "Customer",
      initials: getInitials(first, last),
      service: serviceName,
      time: startTime ? formatTime(startTime) : "—",
      status,
    };
  }

  private mapWeeklyAppointments(
    appointments: any[],
    weekStart: Carbon,
  ): WeeklyAppointmentItem[] {
    const result: WeeklyAppointmentItem[] = [];
    for (const apt of appointments) {
      const startTime = attr(apt, "start_time");
      if (!startTime) continue;
      const start = new Carbon(startTime);
      const dayIndex = start.diffInDays(weekStart.toDate());
      if (dayIndex >= 0 && dayIndex <= 6) {
        const h = start.getHour();
        const m = start.getMinute();
        const time = `${h}:${m === 0 ? "00" : String(m).padStart(2, "0")}`;
        const serviceName = attr(apt.service, "name") ?? "—";
        result.push({ dayIndex, time, service: serviceName });
      }
    }
    return result;
  }
}
