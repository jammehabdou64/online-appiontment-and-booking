import { Model, ScopedBy } from "jcc-express-mvc/Eloquent";
import { Business } from "./Business";
import { Service } from "./Service";
import { Staff } from "./Staff";
import { Customer } from "./Customer";
import { BusinessScope } from "app/Scope/BusinessScope";

@ScopedBy([BusinessScope])
export class Appointment extends Model {
  protected softDelete = true;
  protected fillable = [
    "business_id",
    "service_id",
    "staff_id",
    "customer_id",
    "start_time",
    "end_time",
    "status",
    "notes",
    "cancellation_reason",
    "price",
    "booking_source",
  ];

  // Relationships
  business() {
    return this.belongsTo(Business);
  }

  service() {
    return this.belongsTo(Service);
  }

  staff() {
    return this.belongsTo(Staff);
  }

  customer() {
    return this.belongsTo(Customer);
  }

  // Helper: Check if appointment is upcoming
  get isUpcoming() {
    const now = new Date();
    const startTime = new Date(this._attributes.start_time);
    return startTime > now && this._attributes.status !== "cancelled";
  }

  // Helper: Check if appointment is past
  get isPast() {
    const now = new Date();
    const endTime = new Date(this._attributes.end_time);
    return endTime < now;
  }

  // Helper: Check if appointment can be cancelled
  get canBeCancelled() {
    const now = new Date();
    const startTime = new Date(this._attributes.start_time);
    const hoursUntilStart =
      (startTime.getTime() - now.getTime()) / (1000 * 60 * 60);
    return (
      (this._attributes.status === "pending" ||
        this._attributes.status === "confirmed") &&
      hoursUntilStart > 24
    ); // Can cancel if more than 24 hours away
  }
}
