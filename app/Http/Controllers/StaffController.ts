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
  async index() {
    return inertia("Staff/Index", {
      staff: await Staff.paginate(request()),
    });
  }

  /**
   * Show the form for creating a new staff member
   */
  async create() {
    return inertia("Staff/Create");
  }

  /**
   * Store a newly created staff member
   */
  @Method()
  async store(request: StaffRequest) {
    const staff = await request.save();

    return staff
      ? response()
          .with("success", "Staff member created successfully!")
          .redirect(303, `/staff`)
      : response()
          .with("error", "Failed to create staff member!")
          .redirectBack();
  }

  /**
   * Display the specified staff member
   */
  @Method()
  async show(staff: Staff) {
    return inertia("Staff/Show", {
      staff,
    });
  }

  /**
   * Show the form for editing the specified staff member
   */
  @Method()
  async edit(staff: Staff) {
    return inertia("Staff/Edit", {
      staff,
    });
  }

  /**
   * Update the specified staff member
   */
  @Method()
  async update(staff: Staff, request: StaffRequest) {
    const updated = await request.save();

    return updated
      ? response()
          .with("success", "Staff member updated successfully!")
          .redirect(303, `/staff`)
      : response()
          .with("error", "Failed to update staff member!")
          .redirectBack();
  }

  /**
   * Remove the specified staff member
   */
  @Method()
  async destroy(staff: Staff) {
    const deleted = await staff.delete();

    return deleted
      ? response()
          .with("success", "Staff member deleted successfully!")
          .redirect(303, `/staff`)
      : response()
          .with("error", "Failed to delete staff member!")
          .redirectBack();
  }
}
