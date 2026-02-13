import { Schema } from "jcc-express-mvc/Eloquent";
export class Migration {
  up() {
    return Schema.create("businesses", (table) => {
      table.id();
      table.string("name");
      table.string("slug").unique();
      table.string("primary_phone");
      table.string("secondary_phone").nullable();
      table.string("address").nullable();
      table.string("email").nullable();
      table.string("website").nullable();
      table.string("logo").nullable();
      table.string("currency").default("D");
      table.string("language").default("en");
      table.string("timezone").default("UTC");
      table.boolean("is_active").default(true);
      table.timestamps();
      table.softDeletes();
    });
  }

  down() {
    return Schema.dropIfExists("businesses");
  }
}
