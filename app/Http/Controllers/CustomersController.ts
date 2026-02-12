import { Inject, Method } from "jcc-express-mvc/Core/Dependency";
import { Customer } from "@/Models/Customer";
import { CustomerRequest } from "@/Requests/CustomerRequest";

@Inject()
export class CustomersController {
  /**
   * Display a listing of customers
   */

  async index() {
    return inertia("Customers/Index", {
      customers: await Customer.paginate(request()),
    });
  }

  /**
   * Show the form for creating a new customer
   */
  async create() {
    return inertia("Customers/Create", {
      business: [],
    });
  }

  /**
   * Store a newly created customer
   */

  @Method()
  async store(request: CustomerRequest) {
    const save = await request.save();

    return save
      ? response()
          .with("success", "Customer created successfully!")
          .redirect(303, `/customers`)
      : response().with("error", "Failed to create customer!").redirectBack();
  }

  /**
   * Display the specified customer
   */
  @Method()
  async show(customer: Customer) {
    await customer.load(["business", "appointments"]);

    return inertia("Customers/Show", {
      customer,
    });
  }

  /**
   * Show the form for editing the specified customer
   */
  @Method()
  async edit(customer: Customer) {
    await customer.load(["business"]);

    return inertia("Customers/Edit", {
      customer,
      // business,
    });
  }

  /**
   * Update the specified customer
   */
  @Method()
  async update(request: CustomerRequest) {
    const save = await request.save();

    return save
      ? response()
          .with("success", "Customer updated successfully!")
          .redirect(303, `/customers`)
      : response().with("error", "Failed to update customer!").redirectBack();
  }

  /**
   * Remove the specified customer
   */

  @Method()
  async destroy(customer: Customer) {
    await customer.delete();

    return response()
      .with("success", "Customer deleted successfully!")
      .redirect(303, "/customers");
  }
}
