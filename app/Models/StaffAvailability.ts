import { Model } from "jcc-express-mvc/Eloquent";
import { Staff } from "./Staff";

export class StaffAvailability extends Model {
  protected static table = "staff_availability";

  protected fillable = [
    "staff_id",
    "day_of_week",
    "start_time",
    "end_time",
    "is_available",
  ];

  // Relationships
  staff() {
    return this.belongsTo(Staff);
  }
}

