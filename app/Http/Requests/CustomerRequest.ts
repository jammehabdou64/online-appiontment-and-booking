import { FormRequest } from "jcc-express-mvc/Core/FormRequest";
import { Request } from "jcc-express-mvc";

export class CustomerRequest extends FormRequest {
  constructor(req: Request) {
    super(req);
  }

  async rules() {
    const isUpdate = this.req.params?.id || this.input("id");
    
    await this.validate({
      business_id: isUpdate 
        ? ["sometimes", "integer", "exists:businesses,id"]
        : ["required", "integer", "exists:businesses,id"],
      user_id: ["nullable", "integer", "exists:users,id"],
      first_name: isUpdate ? ["sometimes", "string", "max:255"] : ["required", "string", "max:255"],
      last_name: isUpdate ? ["sometimes", "string", "max:255"] : ["required", "string", "max:255"],
      email: ["nullable", "email", "max:255"],
      phone: isUpdate ? ["sometimes", "string", "max:20"] : ["required", "string", "max:20"],
      notes: ["nullable", "string"],
    });
  }
}

