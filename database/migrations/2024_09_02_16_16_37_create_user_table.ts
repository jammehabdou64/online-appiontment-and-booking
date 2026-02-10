import { Schema } from "jcc-express-mvc/Eloquent";
export class Migration {
  up() {
    return Schema.create("users", (table) => {
      table.id();
      table.string("name");
      table.string("email").unique();
      table.string("password");
      table.string("remember_token").nullable();
      table.timestamp('email_verified_at').nullable()
      table.timestamps();
      table.softDeletes();
    });
  }

  down() {
    return Schema.dropTable("users");
  }
}
