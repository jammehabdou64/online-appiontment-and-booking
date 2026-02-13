import { Request, Response, Next } from "jcc-express-mvc";
import { Business } from "@/Models/Business";

/**
 * Redirects to /businesses/create if the authenticated user has no business
 * (no row in businesses where user_id = user.id).
 * Skips check for GET /businesses/create and POST /businesses (store) so the user can create one.
 */
export async function EnsureUserHasBusiness(
  req: Request,
  res: Response,
  next: Next,
) {
  const path = req.path ?? req.url?.split("?")[0] ?? "";
  const isCreatePage =
    path === "/businesses/create" || path === "/businesses/create/";
  const isStoreBusiness = path === "/businesses" && req.method === "POST";

  if (isCreatePage || isStoreBusiness) {
    return next();
  }

  const user = await (req as any).user?.load(["business"]);
  if (!user?.id) {
    return next();
  }

  if (!user?.business?.id) {
    return res.redirect("/businesses/create");
  }

  next();
}
