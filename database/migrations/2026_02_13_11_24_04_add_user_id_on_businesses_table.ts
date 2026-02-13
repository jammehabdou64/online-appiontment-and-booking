import { Schema } from "jcc-express-mvc/Eloquent";
export class Migration {
  up() {
    return Schema.table("businesses", (table) => {
      table
        .foreignId("user_id")
        .nullable()
        .constrained("users")
        .cascadeOnDelete();
      table.index("user_id");
    });
  }

  down() {
    return Schema.table("businesses", (table) => {
      table.dropColumns("user_id");
    });
  }
}
