import {Schema} from "jcc-express-mvc/Eloquent";
export class Migration {
  up() {
    return Schema.create("staffs", (table) => {
      table.id();
      table.foreignId("business_id")
        .constrained("businesses")
        .cascadeOnDelete();
      
      table.foreignId("user_id")
        .constrained("users")
        .nullable()
        .onDelete("SET NULL");
      
      table.string("first_name");
      table.string("last_name");
      table.string("email").nullable();
      table.string("phone").nullable();
      table.string("avatar").nullable();
      table.text("bio").nullable();
      table.boolean("is_active").default(true);
      table.timestamps();
      table.softDeletes();
      

    });
  }

  down() {
    return Schema.dropTable("staff");
  }
}

