import { Schema } from "jcc-express-mvc/Eloquent";
export class Migration {
  up() {
    return Schema.create("business_users", (table) => {
      table.id();
      table
        .foreignId("business_id")
        .constrained("businesses")
        .cascadeOnDelete();

      table.foreignId("user_id").constrained("users").cascadeOnDelete();

      table.enum("role", ["owner", "manager", "staff"]).default("staff");
      table.boolean("is_active").default(true);
      table.timestamps();
      table.softDeletes();

      // table.index("user_id");
      // Note: Composite unique constraint (business_id, user_id) should be added
      // via raw SQL if framework doesn't support array in unique() method
      // ALTER TABLE business_users ADD UNIQUE KEY unique_business_user (business_id, user_id);
    });
  }

  down() {
    return Schema.dropIfExists("business_users");
  }
}
