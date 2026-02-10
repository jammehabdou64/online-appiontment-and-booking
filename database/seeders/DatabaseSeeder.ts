import { UserSeeder } from "./UserSeeder";
import { BusinessSeeder } from "./BusinessSeeder";
import { ServiceSeeder } from "./ServiceSeeder";
import { StaffSeeder } from "./StaffSeeder";
import { CustomerSeeder } from "./CustomerSeeder";
import { ServiceStaffSeeder } from "./ServiceStaffSeeder";
import { AppointmentSeeder } from "./AppointmentSeeder";

export class DatabaseSeeder {
  async run() {
    // Run seeders in order to maintain foreign key relationships
    return [
      UserSeeder,
      BusinessSeeder,
      ServiceSeeder,
      StaffSeeder,
      CustomerSeeder,
      ServiceStaffSeeder, // Must run after Service and Staff
      AppointmentSeeder, // Must run after all others
    ];
  }
}
