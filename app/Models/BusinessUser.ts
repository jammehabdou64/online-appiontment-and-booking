import { Model } from "jcc-express-mvc/Eloquent";
import { Business } from "./Business";
import { User } from "./User";

export class BusinessUser extends Model {
  protected static table = "business_users";

  protected fillable = ["business_id", "user_id", "role", "is_active"];

  // Relationships
  business() {
    return this.belongsTo(Business);
  }

  user() {
    return this.belongsTo(User);
  }
}

