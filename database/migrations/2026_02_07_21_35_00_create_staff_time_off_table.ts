import { Schema } from "jcc-express-mvc/Eloquent";
export class Migration {
  up() {
    return Schema.create("staff_time_off", (table) => {
      table.id();
      table.foreignId("staff_id").constrained("staff").cascadeOnDelete();

      table.date("start_date");
      table.date("end_date");
      table.string("reason").nullable();
      table.boolean("is_approved").default(false);
      table.timestamps();
      table.softDeletes();
    });
  }

  down() {
    return Schema.dropIfExists("staff_time_off");
  }
}
