import { Model } from "jcc-express-mvc/Eloquent";
import { Business } from "./Business";
import { User } from "./User";
import { Appointment } from "./Appointment";

export class Customer extends Model {
  protected fillable = [
    "business_id",
    "user_id",
    "first_name",
    "last_name",
    "email",
    "phone",
    "notes",
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

  // Helper: Get full name
   getFullNameAttribute() {
    return `${this._attributes?.first_name} ${this._attributes?.last_name}`;
  }
}

