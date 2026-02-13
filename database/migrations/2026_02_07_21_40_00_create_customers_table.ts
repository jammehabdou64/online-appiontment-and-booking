import { Schema } from "jcc-express-mvc/Eloquent";
export class Migration {
  up() {
    return Schema.create("customers", (table) => {
      table.id();
      table
        .foreignId("business_id")
        .constrained("businesses")
        .cascadeOnDelete();

      table
        .foreignId("user_id")
        .constrained("users")
        .nullable()
        .onDelete("SET NULL");

      table.string("first_name");
      table.string("last_name");
      table.string("email").nullable();
      table.string("phone");
      table.text("notes").nullable();
      table.timestamps();
      table.softDeletes();
    });
  }

  down() {
    return Schema.dropIfExists("customers");
  }
}
