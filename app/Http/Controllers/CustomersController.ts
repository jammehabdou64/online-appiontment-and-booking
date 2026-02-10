import { httpContext } from "jcc-express-mvc";
import { Inject, Method } from "jcc-express-mvc/Core/Dependency";
import { Customer } from "@/Models/Customer";
import { Business } from "@/Models/Business";
import { CustomerRequest } from "@/Requests/CustomerRequest";

@Inject()
export class CustomersController {
  /**
   * Display a listing of customers
   */
  @Method()
  async index({ req, res, next } = httpContext) {
    const businessId = req.query.business_id || req.params.business_id;

    let query = Customer.query();

    if (businessId) {
      query = query.where("business_id", businessId);
    }

    const customers = await query.get();
    const business = businessId ? await Business.find(businessId as string) : null;

    return res.inertia("Customers/Index", {
      customers,
      business,
    });
  }

  /**
   * Show the form for creating a new customer
   */
  async create({ req, res, next } = httpContext) {
    const businessId = req.query.business_id || req.params.business_id;
    const business = businessId ? await Business.find(businessId as string) : null;

    return res.inertia("Customers/Create", {
      business,
    });
  }

  /**
   * Store a newly created customer
   */
  async store(
    { req, res, next } = httpContext,
    request: CustomerRequest
  ) {
    await request.rules();
    const validated = req.body;

    const customer = await Customer.create(validated);

    return res
      .with("success", "Customer created successfully!")
      .inertiaRedirect(`/customers/${(customer as any).id}`);
  }

  /**
   * Display the specified customer
   */
  async show(customer: Customer, { res } = httpContext) {
    const business = await customer.business();
    const appointments = await customer.appointments();

    return res.inertia("Customers/Show", {
      customer,
      business,
      appointments,
    });
  }

  /**
   * Show the form for editing the specified customer
   */
  async edit(customer: Customer, { res } = httpContext) {
    const business = await customer.business();

    return res.inertia("Customers/Edit", {
      customer,
      business,
    });
  }

  /**
   * Update the specified customer
   */
  async update(
    customer: Customer,
    request: CustomerRequest,
    { req, res } = httpContext
  ) {
    await request.rules();
    const validated = req.body;

    await customer.update(validated);

    return res
      .with("success", "Customer updated successfully!")
      .inertiaRedirect(`/customers/${(customer as any).id}`);
  }

  /**
   * Remove the specified customer
   */
  async destroy(customer: Customer, { res } = httpContext) {
    await customer.delete();

    return res
      .with("success", "Customer deleted successfully!")
      .inertiaRedirect("/customers");
  }
}

