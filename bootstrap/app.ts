import { Application } from "jcc-express-mvc/Core";

import { providers } from "./providers";
import { Kernel } from "../app/Http/kernel";
import { config } from "../app/Config/index";

const app = Application.configuration()
  .withRouting([
    {
      name: "routes/api",
      prefix: "/api",
    },
    {
      name: "routes/web",
      prefix: "",
    },
  ])
  .withProviders(providers)
  .withConfig(config)
  .withKernel(Kernel)
  .withMiddleware()
  .create();

export { app };
