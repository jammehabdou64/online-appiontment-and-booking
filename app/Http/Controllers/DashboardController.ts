import { Inject } from "jcc-express-mvc/Core/Dependency";
import { Business } from "@/Models/Business";
import { DashboardRepository } from "app/Repositories/DashboardRepository";

@Inject()
export class DashboardController {
  constructor(private dashboardRepository: DashboardRepository) {}

  async index() {
    const business = (await Business.first()) as any;
    const businessId = business?.id ?? 1;

    const { stats, upcomingToday, weeklyAppointments } =
      await this.dashboardRepository.getDashboardData(businessId);

    return inertia("Dashboard/Index", {
      stats,
      upcomingToday,
      weeklyAppointments,
    });
  }
}
