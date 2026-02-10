import { FormRequest } from "jcc-express-mvc/Core/FormRequest";
import { Request } from "jcc-express-mvc";

export class BusinessRequest extends FormRequest {
  constructor(req: Request) {
    super(req);
  }

  async rules() {
    const isUpdate = this.route("id") || this.input("id");
    
    await this.validate({
      name: isUpdate ? ["sometimes", "string", "max:255"] : ["required", "string", "max:255"],
      slug: isUpdate 
        ? ["sometimes", "string", "max:255"]
        : ["required", "string", "max:255", "unique:businesses,slug"],
      primary_phone: isUpdate ? ["sometimes", "string", "max:20"] : ["required", "string", "max:20"],
      secondary_phone: ["nullable", "string", "max:20"],
      address: ["nullable", "string", "max:500"],
      email: isUpdate
        ? ["nullable", "email", "max:255"]
        : ["nullable", "email", "max:255", "unique:businesses,email"],
      website: ["nullable", "url", "max:255"],
      logo: ["nullable", "string", "max:255"],
      currency: ["nullable", "string", "max:3"],
      language: ["nullable", "string", "max:10"],
      timezone: ["nullable", "string", "max:50"],
      is_active: ["nullable", "boolean"],
    });
  }
}

