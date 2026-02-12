import { Carbon } from "jcc-express-mvc/Core/Date";
import { Appointment } from "@/Models/Appointment";

/** Get attribute from model or raw object (handles both Eloquent and plain) */
function attr(obj: any, key: string): any {
  if (obj == null) return undefined;
  if (obj[key] !== undefined) return obj[key];
  return obj._attributes?.[key];
}

export interface CalendarDayAppointment {
  service: string;
  badge?: number;
}

/** Appointments keyed by date (YYYY-MM-DD) for the calendar month grid */
export type AppointmentsByDate = Record<string, CalendarDayAppointment[]>;

export interface CalendarMonthData {
  year: number;
  month: number;
  monthLabel: string;
  appointmentsByDate: AppointmentsByDate;
}

export class CalendarRepository {
  /**
   * Get appointments for a given month, grouped by date, for the calendar view.
   * Uses Carbon for month boundaries. Non-cancelled only.
   */
  async getAppointmentsForMonth(
    businessId: number,
    year: number,
    month: number
  ): Promise<CalendarMonthData> {
    // Carbon.create(year, month, day): month is 1–12
    const monthStart = Carbon.create(year, month, 1).startOfDay();
    const monthEnd = monthStart.clone().endOfMonth().endOfDay();

    const appointments = (await Appointment.query()
      .where("business_id", businessId)
      .where("start_time", ">=", monthStart.toDateTimeString())
      .where("start_time", "<=", monthEnd.toDateTimeString())
      .whereNot("status", "cancelled")
      .with(["service"])
      .orderBy("start_time", "asc")
      .get()) as any[];

    const appointmentsByDate: AppointmentsByDate = {};

    for (const apt of appointments) {
      const startTime = attr(apt, "start_time");
      if (!startTime) continue;
      const c = new Carbon(startTime);
      const dateKey = c.toDateString();

      const serviceName = attr(apt.service, "name") ?? "—";
      if (!appointmentsByDate[dateKey]) {
        appointmentsByDate[dateKey] = [];
      }
      appointmentsByDate[dateKey].push({ service: serviceName });
    }

    // Set badge (count for the day) on the first item of each day when there are appointments
    for (const dateKey of Object.keys(appointmentsByDate)) {
      const list = appointmentsByDate[dateKey];
      if (list.length > 0) {
        list[0] = { ...list[0], badge: list.length };
      }
    }

    const monthLabel = monthStart.format("MMMM yyyy");

    return {
      year,
      month,
      monthLabel,
      appointmentsByDate,
    };
  }
}
