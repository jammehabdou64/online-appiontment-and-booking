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

  businesses() {
    return this.belongsToMany(Business, "business_users", "user_id", "business_id");
  }

  staff() {
    return this.hasOne(Staff);
  }

  customer() {
    return this.hasOne(Customer);
  }
}
