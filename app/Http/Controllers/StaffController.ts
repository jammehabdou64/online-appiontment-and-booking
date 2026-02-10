import { httpContext } from "jcc-express-mvc";
import { Inject, Method } from "jcc-express-mvc/Core/Dependency";
import { Staff } from "@/Models/Staff";
import { Business } from "@/Models/Business";
import { StaffRequest } from "@/Requests/StaffRequest";

@Inject()
export class StaffController {
  /**
   * Display a listing of staff
   */
  @Method()
  async index({ req, res, next } = httpContext) {
    const businessId = req.query.business_id || req.params.business_id;

    let query = Staff.query();

    if (businessId) {
      query = query.where("business_id", businessId);
    }

    const staff = await query.get();
    const business = businessId ? await Business.find(businessId as string) : null;

    return res.inertia("Staff/Index", {
      staff,
      business,
    });
  }

  /**
   * Show the form for creating a new staff member
   */
  async create({ req, res, next } = httpContext) {
    const businessId = req.query.business_id || req.params.business_id;
    const business = businessId ? await Business.find(businessId as string) : null;

    return res.inertia("Staff/Create", {
      business,
    });
  }

  /**
   * Store a newly created staff member
   */
  async store({ req, res, next } = httpContext, request: StaffRequest) {
    await request.rules();
    const validated = req.body;

    const staff = await Staff.create(validated);

    return res
      .with("success", "Staff member created successfully!")
      .inertiaRedirect(`/staff/${(staff as any).id}`);
  }

  /**
   * Display the specified staff member
   */
  async show(staff: Staff, { res } = httpContext) {
    const business = await staff.business();
    const availability = await staff.availability();
    const services = await staff.services();

    return res.inertia("Staff/Show", {
      staff,
      business,
      availability,
      services,
    });
  }

  /**
   * Show the form for editing the specified staff member
   */
  async edit(staff: Staff, { res } = httpContext) {
    const business = await staff.business();
    const services = await staff.services();

    return res.inertia("Staff/Edit", {
      staff,
      business,
      services,
    });
  }

  /**
   * Update the specified staff member
   */
  async update(
    staff: Staff,
    request: StaffRequest,
    { req, res } = httpContext
  ) {
    await request.rules();
    const validated = req.body;

    await staff.update(validated);

    return res
      .with("success", "Staff member updated successfully!")
      .inertiaRedirect(`/staff/${(staff as any).id}`);
  }

  /**
   * Remove the specified staff member
   */
  async destroy(staff: Staff, { res } = httpContext) {
    await staff.delete();

    return res
      .with("success", "Staff member deleted successfully!")
      .inertiaRedirect("/staff");
  }
}

