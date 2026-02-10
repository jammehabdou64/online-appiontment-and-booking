import { httpContext } from "jcc-express-mvc";
import { Inject, Method } from "jcc-express-mvc/Core/Dependency";
import { Service } from "@/Models/Service";
import { Business } from "@/Models/Business";
import { ServiceRequest } from "@/Requests/ServiceRequest";

@Inject()
export class ServicesController {
  /**
   * Display a listing of services
   */
  @Method()
  async index({ req, res, next } = httpContext) {
    const businessId = req.query.business_id || req.params.business_id;

    let query = Service.query();

    if (businessId) {
      query = query.where("business_id", businessId);
    }

    const services = await query.get();
    const business = businessId ? await Business.find(businessId as string) : null;

    return res.inertia("Services/Index", {
      services,
      business,
    });
  }

  /**
   * Show the form for creating a new service
   */
  async create({ req, res, next } = httpContext) {
    const businessId = req.query.business_id || req.params.business_id;
    const business = businessId ? await Business.find(businessId as string) : null;

    return res.inertia("Services/Create", {
      business,
    });
  }

  /**
   * Store a newly created service
   */
  async store(
    { req, res, next } = httpContext,
    request: ServiceRequest
  ) {
    await request.rules();
    const validated = req.body;

    const service = await Service.create(validated);

    return res
      .with("success", "Service created successfully!")
      .inertiaRedirect(`/services/${(service as any).id}`);
  }

  /**
   * Display the specified service
   */
  async show(service: Service, { res } = httpContext) {
    const business = await service.business();

    return res.inertia("Services/Show", {
      service,
      business,
    });
  }

  /**
   * Show the form for editing the specified service
   */
  async edit(service: Service, { res } = httpContext) {
    const business = await service.business();

    return res.inertia("Services/Edit", {
      service,
      business,
    });
  }

  /**
   * Update the specified service
   */
  async update(
    service: Service,
    request: ServiceRequest,
    { req, res } = httpContext
  ) {
    await request.rules();
    const validated = req.body;

    await service.update(validated);

    return res
      .with("success", "Service updated successfully!")
      .inertiaRedirect(`/services/${(service as any).id}`);
  }

  /**
   * Remove the specified service
   */
  async destroy(service: Service, { res } = httpContext) {
    await service.delete();

    return res
      .with("success", "Service deleted successfully!")
      .inertiaRedirect("/services");
  }
}
     