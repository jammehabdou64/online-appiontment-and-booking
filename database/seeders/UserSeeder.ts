import { bcrypt } from "jcc-express-mvc";
import { User } from "../../app/Models/User";

export class UserSeeder {
  //

  async run() {
    const users = [
      {
        name: "Administrator",
        email: "admin@example.com",
        password: await bcrypt("password"),
        email_verified_at: now().toDateTimeString(),
      },
      {
        name: "User",
        email: "user@example.com",
        password: await bcrypt("password"),
        email_verified_at: now().toDateTimeString(),
      },
    ];

    for (const user of users) {
      await User.create(user);
    }
  }
}
