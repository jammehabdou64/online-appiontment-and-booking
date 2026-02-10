import { Model } from "jcc-express-mvc/Eloquent";
import { Service } from "./Service";
import { Staff } from "./Staff";
import { Customer } from "./Customer";
import { Appointment } from "./Appointment";
import { BusinessUser } from "./BusinessUser";

export class Business extends Model {
  protected fillable = [
    "name",
    "slug",
    "primary_phone",
    "secondary_phone",
    "address",
    "email",
    "website",
    "logo",
    "currency",
    "language",
    "timezone",
    "is_active",
  ];

  // Relationships
  services() {
    return this.hasMany(Service);
  }

  staff() {
    return this.hasMany(Staff);
  }

  customers() {
    return this.hasMany(Customer);
  }

  appointments() {
    return this.hasMany(Appointment);
  }

  businessUsers() {
    return this.hasMany(BusinessUser);
  }
}

     