import { Model } from "jcc-express-mvc/Eloquent";
import { Staff } from "./Staff";

export class StaffTimeOff extends Model {
  protected static table = "staff_time_off";

  protected fillable = [
    "staff_id",
    "start_date",
    "end_date",
    "reason",
    "is_approved",
  ];

  // Relationships
  staff() {
    return this.belongsTo(Staff);
  }
}

