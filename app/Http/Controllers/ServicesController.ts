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
  async index() {
    return inertia("Services/Index", {
      services: await Service.with(["business"]).paginate(request()),
      business: {},
    });
  }

  /**
   * Show the form for creating a new service
   */
  async create() {
    return inertia("Services/Create", {});
  }

  /**
   * Store a newly created service
   */
  @Method()
  async store(request: ServiceRequest) {
    const service = await request.save();

    return service
      ? response()
          .with("success", "Service created successfully!")
          .redirect(`/services`)
      : //
        response().with("error", "Failed to create service!").redirectBack();
  }

  /**
   * Display the specified service
   */
  @Method()
  async show(service: Service) {
    const business = await service.business();

    return inertia("Services/Show", {
      service,
      business,
    });
  }

  /**
   * Show the form for editing the specified service
   */

  @Method()
  async edit(service: Service) {
    const business = await service.business();

    return inertia("Services/Edit", {
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
    { req, res } = httpContext,
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
