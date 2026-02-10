import {Schema} from "jcc-express-mvc/Eloquent";
export class Migration {
  up() {
    return Schema.create("appointments", (table) => {
      table.id();
      table.foreignId("business_id")
        .constrained("businesses")
        .cascadeOnDelete();
      
      table.foreignId("service_id")
        .constrained("services")
        .cascadeOnDelete();
      
      table.foreignId("staff_id")
        .constrained("staff")
        .nullable()
        .onDelete("SET NULL");
      
      table.foreignId("customer_id")
        .constrained("customers")
        .cascadeOnDelete();
      
      table.dateTime("start_time");
      table.dateTime("end_time");
      table.enum("status", ["pending", "confirmed", "completed", "cancelled", "no_show"])
        .default("pending");
      table.text("notes").nullable();
      table.text("cancellation_reason").nullable();
      table.bigInteger("price").nullable();
      table.string("booking_source").default("online"); // online, phone, walk_in, etc.
      table.timestamps();
      table.softDeletes();
      
    
    });
  }

  down() {
    return Schema.dropTable("appointments");
  }
}

