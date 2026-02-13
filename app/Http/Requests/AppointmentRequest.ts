import { FormRequest } from "jcc-express-mvc/Core/FormRequest";
import { Request } from "jcc-express-mvc";
import { Appointment } from "@/Models/Appointment";
import { AppointmentInterface } from "@/Models/Interface";
import { Business } from "@/Models/Business";

export class AppointmentRequest extends FormRequest {
  constructor(req: Request) {
    super(req);
  }

  async rules() {
    await this.validate({
      service_id: ["required", "integer", "exists:services,id"],
      staff_id: ["nullable", "integer", "exists:staff,id"],
      customer_id: ["required", "integer", "exists:customers,id"],
      start_time: ["required", "date"],
      end_time: ["required", "date", "after:start_time"],
      status: ["nullable", "in:pending,confirmed,completed,cancelled,no_show"],
      notes: ["nullable", "string"],
      cancellation_reason: ["nullable", "string"],
      price: ["nullable", "integer", "min:0"],
      booking_source: ["nullable", "string", "max:50"],
    });
  }

  public async save() {
    const appointment = this.route("appointment")
      ? ((await Appointment.find(
          this.route("appointment"),
        )) as AppointmentInterface)
      : (new Appointment() as AppointmentInterface);

    appointment.business_id = auth().business.id;
    appointment.service_id = this.input("service_id");
    appointment.staff_id = this.input("staff_id");
    appointment.customer_id = this.input("customer_id");
    appointment.start_time = this.input("start_time");
    appointment.end_time = this.input("end_time");
    appointment.status = this.input("status");
    appointment.notes = this.input("notes");
    appointment.cancellation_reason = this.input("cancellation_reason");
    appointment.price = this.input("price");
    appointment.booking_source = this.input("booking_source");
    return await appointment.save();
  }
}
