import { auth } from "./auth";
import { cors } from "./cors";
import { engine } from "./engine";
import { rateLimit } from "./rate-limit";

export const config = {
  auth,
  engine,
  cors,
  rateLimit,
};
