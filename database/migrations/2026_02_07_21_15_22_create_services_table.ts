import { Schema } from "jcc-express-mvc/Eloquent";
export class Migration {
  up() {
    return Schema.create("services", (table) => {
      table.id();
      table
        .foreignId("business_id")
        .constrained("businesses")
        .cascadeOnDelete();

      table.string("name");
      table.text("description").nullable();

      table.integer("duration_minutes");
      table.bigInteger("price").nullable();
      table.integer("buffer_time_minutes").default(0);
      table.integer("booking_advance_notice_minutes").default(0);
      table.boolean("is_active").default(true);
      table.timestamps();
      table.softDeletes();
    });
  }

  down() {
    return Schema.dropIfExists("services");
  }
}
