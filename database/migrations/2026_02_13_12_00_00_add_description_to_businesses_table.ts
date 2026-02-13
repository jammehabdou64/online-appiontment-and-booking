import { Schema } from "jcc-express-mvc/Eloquent";

export class Migration {
  up() {
    return Schema.table("businesses", (table) => {
      table.text("description").nullable();
    });
  }

  down() {
    return Schema.table("businesses", (table) => {
      table.dropColumns("description");
    });
  }
}
