import { Carbon } from "jcc-express-mvc/Core/Date";
import { Inject } from "jcc-express-mvc/Core/Dependency";
import { Business } from "@/Models/Business";
import { CalendarRepository } from "app/Repositories/CalendarRepository";

@Inject()
export class CalendarController {
  constructor(private calendarRepository: CalendarRepository) {}

  async index() {
    const business = (await Business.first()) as any;
    const businessId = business?.id ?? 1;

    const req = request();
    const now = Carbon.now();
    const year = req.query.year ? parseInt(String(req.query.year), 10) : now.getYear();
    const month = req.query.month ? parseInt(String(req.query.month), 10) : now.getMonth() + 1;

    const { monthLabel, appointmentsByDate } =
      await this.calendarRepository.getAppointmentsForMonth(businessId, year, month);

    return inertia("Calendar/Index", {
      year,
      month,
      monthLabel,
      appointmentsByDate,
    });
  }
}
