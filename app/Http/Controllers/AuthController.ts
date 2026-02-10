import { Auth } from "jcc-express-mvc";
import { httpContext } from "jcc-express-mvc";
import { Inject, Method } from "jcc-express-mvc/Core/Dependency";
import { AuthRequest } from "@/Requests/AuthRequest";

@Inject()
export class AuthController {
  //

  //

  @Method()
  async register({ req, res, next } = httpContext, authRequest: AuthRequest) {
    const save = await authRequest.save();
    return save
      ? Auth.attempt(req, res, next)
      : res.json({ message: "Invalid credentials" });
  }

  //

  async login({ req, res, next } = httpContext) {
    return Auth.attempt(req, res, next);
  }
}
