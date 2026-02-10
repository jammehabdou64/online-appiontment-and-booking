import { FormRequest } from "jcc-express-mvc/Core/FormRequest";
import { Request, bcrypt } from "jcc-express-mvc";
import { User } from "@/Models/User";

export class AuthRequest extends FormRequest {
  constructor(req: Request) {
    super(req);
  }

  async rules() {
    await this.validate({
      //
      name: ["required"],
      email: ["required", "unique:users"],
      password: ["required", "min:6", "same:confirmPassword"],
      confirmPassword: ["same:password"],
    });
  }

  async save() {
    return User.create({
      name: this.input("name"),
      email: this.input("email"),
      password: await bcrypt(this.input("password")),
    });
  }
}
