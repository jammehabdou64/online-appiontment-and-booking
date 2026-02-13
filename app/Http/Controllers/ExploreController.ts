import { DB } from "jcc-express-mvc/Eloquent";

/**
 * Public listing of all services across active businesses.
 * Uses DB.table to avoid Service model's BusinessScope.
 */
export class ExploreController {
  async services() {
    const rows = await DB.table("services")
      .join("businesses", "businesses.id", "=", "services.business_id")
      .whereRaw("businesses.is_active = ? AND services.is_active = ?", [1, 1])
      .whereNull("services.deleted_at")
      .whereNull("businesses.deleted_at")
      .select(
        "services.id",
        "services.name",
        "services.description",
        "services.duration_minutes",
        "services.price as price_cents",
        "services.business_id",
        "businesses.name as business_name",
        "businesses.slug as business_slug",
      )
      .get();

    const servicesList = (rows ?? []).map((row: any) => ({
      id: row.id,
      name: row.name,
      description: row.description ?? "",
      duration_minutes: row.duration_minutes,
      price: Number(row.price_cents || 0) / 100,
      business_id: row.business_id,
      business_name: row.business_name,
      business_slug: row.business_slug,
    }));

    return inertia("Explore/Services", { services: servicesList });
  }
}
