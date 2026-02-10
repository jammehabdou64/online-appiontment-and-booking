import { httpContext } from "jcc-express-mvc";
import { Inject, Method } from "jcc-express-mvc/Core/Dependency";
import { Appointment } from "@/Models/Appointment";
import { Service } from "@/Models/Service";
import { Staff } from "@/Models/Staff";
import { Customer } from "@/Models/Customer";
import { Business } from "@/Models/Business";
import { AppointmentRequest } from "@/Requests/AppointmentRequest";
import { AppointmentRepository } from "app/Repositories/AppointmentRepository";

@Inject()
export class AppointmentsController {


    constructor(private appointmentRepository: AppointmentRepository) {}
  /**
   * Display a listing of appointments
   */
  async index() {
    const { appointments, filters } = await this.appointmentRepository.all();

    return inertia("Appointments/Index", {
      appointments,
      filters,
    });
  }

  /**
   * Show the form for creating a new appointment
   */
  async create() {
    const { customers, services, staff } = await this.appointmentRepository.create();

    return inertia("Appointments/Create", {
      customers,
      services,
      staff,
    });
  }

  /**
   * Store a newly created appointment
   */
  @Method()
  async store(request: AppointmentRequest, { res } = httpContext) {
    const save = await request.save();

    return save
      ? res
          .with("success", "Appointment created successfully!")
          .inertiaRedirect(`/appointments/${(save as any).id}`)
      : res
          .with("error", "Failed to create appointment!")
          .inertiaRedirect("/appointments");
  }

  /**
   * Display the specified appointment
   */
  @Method()
  async show(appointment: Appointment) {

//   const [business, service, staff, customer] = await Promise.all([
//       appointment.business(),
//       appointment.service(),
//       (appointment as any).staff_id ? appointment.staff() : null,
//       appointment.customer(),
//     ])

 await appointment.load(["business", "service", "staff", "customer"])
//  return appointment
    // return {business, service, staff, customer}

    return inertia("Appointments/Show", {
      appointment,
    //   business,
    //   service,
    //   staff,
    //   customer,
    });
  }

  /**
   * Show the form for editing the specified appointment
   */
  @Method()
  async edit(appointment: Appointment) {
    // await appointment.load(["business", "service", "staff", "customer"])
  const [customers, services, staff] = await Promise.all([
      Customer.select("id", "first_name", "last_name").getRaw(),
      Service.select("id", "name", "description").getRaw(),
      Staff.select("id", "first_name", "last_name").getRaw(),
      appointment.load(["business", "service", "staff", "customer"]),
    ])
//return {appointment ,customers, services, staff};
    return inertia("Appointments/Edit", {
      appointment,
      customers,
      services,
      staff,
    });
  }

  /**
   * Update the specified appointment
   */
  @Method()
  async update(request: AppointmentRequest) {
    const save = await request.save();
    
    return save
      ? response()
          .with("success", "Appointment updated successfully!")
          .inertiaRedirect(`/appointments/${(save as any).id}`)

      : response()
          .with("error", "Failed to update appointment!")
          .inertiaRedirect("/appointments");
  }

  /**
   * Remove the specified appointment
   */
  @Method()
  async destroy(appointment: Appointment) {
    const deleted = await appointment.delete();

    return deleted
      ? response()
          .with("success", "Appointment deleted successfully!")
          .inertiaRedirect("/appointments")
      : response()
          .with("error", "Failed to delete appointment!")
          .inertiaRedirect("/appointments");
  }

  /**
   * Cancel an appointment
   */
  async cancel(
    appointment: Appointment,
  ) {
    const cancellationReason = request().body.cancellation_reason || "";

    await appointment.update({
      status: "cancelled",
      cancellation_reason: cancellationReason,
    });

    return response()
      .with("success", "Appointment cancelled successfully!")
      .inertiaRedirect(`/appointments/${(appointment as any).id}`);
  }

  /**
   * Confirm an appointment
   */
  async confirm(appointment: Appointment) {
    await appointment.update({
      status: "confirmed",
    });

    return response()
      .with("success", "Appointment confirmed successfully!")
      .inertiaRedirect(`/appointments/${(appointment as any).id}`);
  }
}

