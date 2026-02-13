import { Model, ScopedBy } from "jcc-express-mvc/Eloquent";
import { Business } from "./Business";
import { User } from "./User";
import { Appointment } from "./Appointment";
import { StaffAvailability } from "./StaffAvailability";
import { StaffTimeOff } from "./StaffTimeOff";
import { Service } from "./Service";
import { BusinessScope } from "app/Scope/BusinessScope";

@ScopedBy([BusinessScope])
export class Staff extends Model {
  protected static table: string = "staff";
  protected fillable = [
    "business_id",
    "user_id",
    "first_name",
    "last_name",
    "email",
    "phone",
    "avatar",
    "bio",
    "is_active",
  ];

  // Relationships
  business() {
    return this.belongsTo(Business);
  }

  user() {
    return this.belongsTo(User);
  }

  appointments() {
    return this.hasMany(Appointment);
  }

  availability() {
    return this.hasMany(StaffAvailability);
  }

  timeOff() {
    return this.hasMany(StaffTimeOff);
  }

  services() {
    return this.belongsToMany(
      Service,
      "service_staff",
      "staff_id",
      "service_id",
    );
  }

  // Helper: Get full name
  getFullNameAttribute() {
    return `${this._attributes?.first_name} ${this._attributes?.last_name}`;
  }
}
