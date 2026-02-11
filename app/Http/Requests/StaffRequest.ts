import { FormRequest } from "jcc-express-mvc/Core/FormRequest";
import { Request } from "jcc-express-mvc";
import { Staff } from "@/Models/Staff";
import { StaffInterface } from "@/Models/Interface";

export class StaffRequest extends FormRequest {
  constructor(req: Request) {
    super(req);
  }

  async rules() {
    const isUpdate = !!this.route("staff");
    
    await this.validate({
      business_id: isUpdate 
        ? ["sometimes", "integer", "exists:businesses,id"]
        : ["required", "integer", "exists:businesses,id"],
      user_id: ["nullable", "integer", "exists:users,id"],
      first_name: isUpdate ? ["sometimes", "string", "max:255"] : ["required", "string", "max:255"],
      last_name: isUpdate ? ["sometimes", "string", "max:255"] : ["required", "string", "max:255"],
      email: ["nullable", "email", "max:255"],
      phone: ["nullable", "string", "max:20"],
      avatar: ["nullable", "string", "max:255"],
      bio: ["nullable", "string"],
      is_active: ["nullable", "boolean"],
    });
  }

  async save() {
    const staff = this.route("staff")
      ? ((await Staff.find(this.route("staff"))) as StaffInterface)
      : (new Staff() as StaffInterface);

    staff.business_id = this.input("business_id");
    staff.user_id = this.input("user_id");
    staff.first_name = this.input("first_name");
    staff.last_name = this.input("last_name");
    staff.email = this.input("email");
    staff.phone = this.input("phone");
    staff.avatar = this.input("avatar");
    staff.bio = this.input("bio");
    staff.is_active = this.input("is_active") ?? true;

    return await staff.save();
  }
}

