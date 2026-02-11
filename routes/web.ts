import { AuthController } from "@Controllers/AuthController";
import { BusinessesController } from "@Controllers/BusinessesController";
import { ServicesController } from "@Controllers/ServicesController";
import { StaffController } from "@Controllers/StaffController";
import { CustomersController } from "@Controllers/CustomersController";
import { AppointmentsController } from "@Controllers/AppointmentsController";
import { Auth } from "jcc-express-mvc/";
import { Route } from "jcc-express-mvc/Core";

// Public Routes
Route.middleware("guest").get("/", (req, res) => {
  return res.inertia("Index");
});

Route.middleware("guest").get("/login", (req, res) =>
  res.inertia("Auth/Login"),
);

Route.middleware("guest").get("/register", (req, res) =>
  res.inertia("Auth/Register"),
);

Route.prefix("/auth").group((Route) => {
  Route.post("/login", Auth.attempt);
  Route.post("/register", [AuthController, "register"]);
});

Route.get("/logout", Auth.logout);

// Authenticated Routes
Route.group(() => {
  //.middleware(["auth"])
  // Dashboard
  Route.get("/dashboard", (req, res) => {
    return res.inertia("Dashboard/Index");
  });

  Route.get("/calendar", (req, res) => {
    return res.inertia("Calendar/Index");
  });

  Route.get("/home", (req, res, next) => {
    return redirect("/dashboard", 303); //res.inertia("Home");
  });

  // Businesses Routes
  Route.prefix("/businesses")
    .controller(BusinessesController)
    .group((Route) => {
      Route.get("/", "index");
      Route.get("/create", "create");
      Route.post("/", "store");
      Route.get("/{business}", "show");
      Route.get("/{business}/edit", "edit");
      Route.put("/{business}", "update");
      Route.delete("/{business}", "destroy");
    });

  // Services Routes
  Route.prefix("/services")
    .controller(ServicesController)
    .group((Route) => {
      Route.get("/", "index");
      Route.get("/create", "create");
      Route.post("/", "store");
      Route.get("/{service}", "show");
      Route.get("/{service}/edit", "edit");
      Route.put("/{service}", "update");
      Route.patch("/{service}", "update");
      Route.delete("/{service}", "destroy");
    });

  // Staff Routes
  Route.prefix("/staff")
    .controller(StaffController)
    .group((Route) => {
      Route.get("/", "index");
      Route.get("/create", "create");
      Route.post("/", "store");
      Route.get("/{staff}", "show");
      Route.get("/{staff}/edit", "edit");
      Route.put("/{staff}", "update");
      Route.delete("/{staff}", "destroy");
    });

  // Customers Routes
  Route.prefix("/customers")
    .controller(CustomersController)
    .group((Route) => {
      Route.get("/", "index");
      Route.get("/create", "create");
      Route.post("/", "store");
      Route.get("/{customer}", "show");
      Route.get("/{customer}/edit", "edit");
      Route.put("/{customer}", "update");
      Route.delete("/{customer}", "destroy");
    });

  // Appointments Routes
  Route.prefix("/appointments")
    .controller(AppointmentsController)
    .group((Route) => {
      Route.get("/", "index");
      Route.get("/create", "create");
      Route.post("/", "store");
      Route.get("/{appointment}", "show");
      Route.get("/{appointment}/edit", "edit");
      Route.put("/{appointment}", "update");
      Route.delete("/{appointment}", "destroy");
      Route.post("/{appointment}/cancel", "cancel");
      Route.post("/{appointment}/confirm", "confirm");
    });
});
