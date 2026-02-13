import { Business } from "@/Models/Business";

/**
 * Public landing page with featured businesses (3–4).
 */
export class HomeController {
  async index() {
    const featuredBusinesses = await Business.query()
      .where("is_active", true)
      .limit(4)
      .getRaw();

    return inertia("Index", {
      featuredBusinesses: featuredBusinesses ?? [],
    });
  }
}
