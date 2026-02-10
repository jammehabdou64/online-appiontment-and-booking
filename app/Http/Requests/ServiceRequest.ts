import { FormRequest } from "jcc-express-mvc/Core/FormRequest";
import { Request } from "jcc-express-mvc";

export class ServiceRequest extends FormRequest {
  constructor(req: Request) {
    super(req);
  }

  async rules() {
    const isUpdate = this.req.params?.id || this.input("id");
    
    await this.validate({
      business_id: isUpdate 
        ? ["sometimes", "integer", "exists:businesses,id"]
        : ["required", "integer", "exists:businesses,id"],
      name: isUpdate ? ["sometimes", "string", "max:255"] : ["required", "string", "max:255"],
      description: ["nullable", "string"],
      duration_minutes: isUpdate 
        ? ["sometimes", "integer", "min:1"]
        : ["required", "integer", "min:1"],
      price: ["nullable", "integer", "min:0"],
      buffer_time_minutes: ["nullable", "integer", "min:0"],
      booking_advance_notice_minutes: ["nullable", "integer", "min:0"],
      is_active: ["nullable", "boolean"],
    });
  }
}

