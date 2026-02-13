import { Schema } from "jcc-express-mvc/Eloquent";
export class Migration {
  up() {
    return Schema.create("staff_availability", (table) => {
      table.id();
      table.foreignId("staff_id").constrained("staff").cascadeOnDelete();

      table.integer("day_of_week"); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      table.time("start_time");
      table.time("end_time");
      table.boolean("is_available").default(true);
      table.timestamps();
    });
  }

  down() {
    return Schema.dropIfExists("staff_availability");
  }
}
