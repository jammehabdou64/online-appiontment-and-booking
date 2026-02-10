import { Next, Request, Response } from "jcc-express-mvc";

export const UserMiddleware = (req: Request, res: Response, next: Next) => {
  console.log("first");
  next();
};
