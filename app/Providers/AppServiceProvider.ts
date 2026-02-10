import { Application } from "jcc-express-mvc/Core";
import { ServiceProvider } from "jcc-express-mvc/Core/Provider";

export class AppServiceProvider extends ServiceProvider {
  constructor(app: Application) {
    super(app);
  }

  public register(): void {}

  public boot(): void {}
}
