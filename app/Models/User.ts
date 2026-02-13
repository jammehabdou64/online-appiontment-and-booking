import { Model } from "jcc-express-mvc/Eloquent";
import { BusinessUser } from "./BusinessUser";
import { Staff } from "./Staff";
import { Customer } from "./Customer";
import { Business } from "./Business";

export class User extends Model {
  protected fillable = ["name", "email", "password"];

  protected hidden: string[] = ["password"];

  // Relationships
  businessUsers() {
    return this.hasMany(BusinessUser);
  }

  /** One-to-one: the business owned by this user (businesses.user_id) */
  business() {
    return this.hasOne(Business, "user_id");
  }

  staff() {
    return this.hasOne(Staff);
  }

  customer() {
    return this.hasOne(Customer);
  }
}
