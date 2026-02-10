import { httpContext } from "jcc-express-mvc";
import { Inject, Method } from "jcc-express-mvc/Core/Dependency";
import { Business } from "@/Models/Business";
import { BusinessRequest } from "@/Requests/BusinessRequest";

@Inject()
export class BusinessesController {
  /**
   * Display a listing of businesses
   */
  @Method()
  async index({ req, res, next } = httpContext) {
    const businesses = await Business.all();

    return res.inertia("Businesses/Index", {
      businesses,
    });
  }

  /**
   * Show the form for creating a new business
   */
  async create({ req, res, next } = httpContext) {
    return res.inertia("Businesses/Create");
  }

  /**
   * Store a newly created business
   */
  async store(
    { req, res, next } = httpContext,
    request: BusinessRequest
  ) {
    await request.rules();
    const validated = req.body;

    const business = await Business.create(validated);

    return res
      .with("success", "Business created successfully!")
      .inertiaRedirect(`/businesses/${(business as any).id}`);
  }

  /**
   * Display the specified business
   */
  async show(business: Business, { res } = httpContext) {
    return res.inertia("Businesses/Show", {
      business,
    });
  }

  /**
   * Show the form for editing the specified business
   */
  async edit(business: Business, { res } = httpContext) {
    return res.inertia("Businesses/Edit", {
      business,
    });
  }

  /**
   * Update the specified business
   */
  async update(
    business: Business,
    request: BusinessRequest,
    { req, res } = httpContext
  ) {
    await request.rules();
    const validated = req.body;

    await business.update(validated);

    return res
      .with("success", "Business updated successfully!")
      .inertiaRedirect(`/businesses/${(business as any).id}`);
  }

  /**
   * Remove the specified business
   */
  async destroy(business: Business, { res } = httpContext) {
    await business.delete();

    return res
      .with("success", "Business deleted successfully!")
      .inertiaRedirect("/businesses");
  }
}
     