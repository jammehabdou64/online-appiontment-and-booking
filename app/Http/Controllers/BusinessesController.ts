import { httpContext } from "jcc-express-mvc";
import { Inject, Method } from "jcc-express-mvc/Core/Dependency";
import { Business } from "@/Models/Business";
import { BusinessRequest } from "@/Requests/BusinessRequest";

@Inject()
export class BusinessesController {
  /**
   * Display a listing of businesses
   */
  async index() {
    const businesses = await Business.all();

    return inertia("Businesses/Index", {
      businesses,
    });
  }

  /**
   * Show the form for creating a new business
   */
  async create() {
    return inertia("Businesses/Create");
  }

  /**
   * Store a newly created business
   */
  async store(request: BusinessRequest) {
    const business = await request.save();

    return business
      ? response()
          .with("success", "Business created successfully!")
          .redirect(303, `/businesses`)
      : response().with("error", "Failed to create business!").redirectBack();
  }

  /**
   * Display the specified business
   */
  @Method()
  async show(business: Business) {
    return inertia("Businesses/Show", {
      business,
    });
  }

  /**
   * Show the form for editing the specified business
   */
  @Method()
  async edit(business: Business) {
    return inertia("Businesses/Edit", {
      business,
    });
  }

  /**
   * Update the specified business
   */
  @Method()
  async update(request: BusinessRequest) {
    const business = await request.save();

    return business
      ? response()
          .with("success", "Business updated successfully!")
          .redirect(303, `/businesses}`)
      : response().with("error", "Failed to update business!").redirectBack();
  }

  /**
   * Remove the specified business
   */
  @Method()
  async destroy(business: Business) {
    await business.delete();

    return response()
      .with("success", "Business deleted successfully!")
      .redirect(303, "/businesses");
  }
}
