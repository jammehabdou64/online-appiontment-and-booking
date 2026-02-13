import { Scope } from "jcc-express-mvc/Eloquent";
import { Builder } from "jcc-express-mvc/Eloquent/Builder";
export class BusinessScope implements Scope {
  //
  async apply(query: Builder) {
    return query.where("business_id", auth().business?.id);
  }
}
