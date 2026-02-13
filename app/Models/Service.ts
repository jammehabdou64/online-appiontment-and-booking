import { Model, ScopedBy } from "jcc-express-mvc/Eloquent";
import { Business } from "./Business";
import { Appointment } from "./Appointment";
import { Staff } from "./Staff";
import { AttributeOptions } from "jcc-express-mvc/lib/Jcc-eloquent/lib/Types";
import { BusinessScope } from "app/Scope/BusinessScope";

@ScopedBy([BusinessScope])
export class Service extends Model {
  protected fillable = [
    "business_id",
    "name",
    "description",
    "duration_minutes",
    "price",
    "buffer_time_minutes",
    "booking_advance_notice_minutes",
    "is_active",
  ];

  protected attributes(): Record<string, AttributeOptions> {
    return {
      price: {
        get: (value: any) => {
          return Number(value || 0) / 100;
        },
        set: (value: any) => {
          this._attributes.price = Number(value || 0) * 100;
        },
      },
    };
  }

  // // Relationships
  business() {
    return this.belongsTo(Business);
  }

  appointments() {
    return this.hasMany(Appointment);
  }

  staff() {
    return this.belongsToMany(Staff, "service_staff", "service_id", "staff_id");
  }
}
