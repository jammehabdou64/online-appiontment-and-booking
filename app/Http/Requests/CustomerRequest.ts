import { FormRequest } from "jcc-express-mvc/Core/FormRequest";
import { Request } from "jcc-express-mvc";
import { Customer } from "@/Models/Customer";
import { CustomerInterface } from "@/Models/Interface";

export class CustomerRequest extends FormRequest {
  constructor(req: Request) {
    super(req);
  }

  async rules() {
    const isUpdate = this.route("customer") || this.input("id");
    
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

  async save() {
    const customer = this.route("customer")
      ? ((await Customer.find(this.route("customer"))) as CustomerInterface)
      : (new Customer() as CustomerInterface);

    customer.business_id = this.input("business_id");
    customer.user_id = this.input("user_id");
    customer.first_name = this.input("first_name");
    customer.last_name = this.input("last_name");
    customer.email = this.input("email");
    customer.phone = this.input("phone");
    customer.notes = this.input("notes");

    return await customer.save();
  }
}

