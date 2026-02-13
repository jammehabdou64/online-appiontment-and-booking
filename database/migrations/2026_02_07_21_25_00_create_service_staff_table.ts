import { Schema } from "jcc-express-mvc/Eloquent";
export class Migration {
  up() {
    return Schema.create("service_staff", (table) => {
      table.id();
      table.foreignId("service_id").constrained("services").cascadeOnDelete();

      table.foreignId("staff_id").constrained("staff").cascadeOnDelete();

      table.timestamps();

      // Note: Composite unique constraint (service_id, staff_id) should be added
      // via raw SQL if framework doesn't support array in unique() method
      // ALTER TABLE service_staff ADD UNIQUE KEY unique_service_staff (service_id, staff_id);
    });
  }

  down() {
    return Schema.dropIfExists("service_staff");
  }
}
