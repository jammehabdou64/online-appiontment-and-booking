import { FormRequest } from "jcc-express-mvc/Core/FormRequest";
import { Request } from "jcc-express-mvc";
import { Service } from "@/Models/Service";
import { Business } from "@/Models/Business";
import { ServiceInterface } from "@/Models/Interface";

export class ServiceRequest extends FormRequest {
  constructor(req: Request) {
    super(req);
  }

  async rules() {
    await this.validate({
      // business_id: ["required", "integer", "exists:businesses,id"],
      name: ["required", "string", "max:255"],
      description: ["nullable", "string"],
      duration_minutes: ["required", "integer", "min:1"],
      price: ["nullable", "integer", "min:0"],
      buffer_time_minutes: ["nullable", "integer", "min:0"],
      booking_advance_notice_minutes: ["nullable", "integer", "min:0"],
      is_active: ["nullable", "boolean"],
    });
  }

  public async save() {
    const service = this.route("service")
      ? ((await Service.find(this.route("service"))) as ServiceInterface)
      : (new Service() as ServiceInterface);

    service.business_id = (await Business.first())?.id || 1;
    service.name = this.input("name");
    service.description = this.input("description");
    service.duration_minutes = this.input("duration_minutes");
    service.price = this.input("price");
    service.buffer_time_minutes = this.input("buffer_time_minutes");
    service.booking_advance_notice_minutes = this.input(
      "booking_advance_notice_minutes",
    );
    service.is_active = this.input("is_active") ?? true;

    return service.save();
  }
}
