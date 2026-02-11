import { FormRequest } from "jcc-express-mvc/Core/FormRequest";
import { Request } from "jcc-express-mvc";
import { Business } from "@/Models/Business";
import { BusinessInterface } from "@/Models/Interface";

export class BusinessRequest extends FormRequest {
  constructor(req: Request) {
    super(req);
  }

  async rules() {
    const isUpdate = this.route("business") || this.input("id");
    
    await this.validate({
      name: isUpdate ? ["sometimes", "string", "max:255"] : ["required", "string", "max:255"],
      slug: isUpdate 
        ? ["sometimes", "string", "max:255"]
        : ["required", "string", "max:255", "unique:businesses,slug"],
      primary_phone: isUpdate ? ["sometimes", "string", "max:20"] : ["required", "string", "max:20"],
      secondary_phone: ["nullable", "string", "max:20"],
      address: ["nullable", "string", "max:500"],
      email: isUpdate
        ? ["nullable", "email", "max:255"]
        : ["nullable", "email", "max:255", "unique:businesses,email"],
      website: ["nullable", "url", "max:255"],
      logo: ["nullable", "string", "max:255"],
      currency: ["nullable", "string", "max:3"],
      language: ["nullable", "string", "max:10"],
      timezone: ["nullable", "string", "max:50"],
      is_active: ["nullable", "boolean"],
    });
  }

  async save() {
    const business = this.route("business")
      ? ((await Business.find(this.route("business"))) as BusinessInterface)
      : (new Business() as BusinessInterface);

    business.name = this.input("name");
    business.slug = this.input("slug");
    business.primary_phone = this.input("primary_phone");
    business.secondary_phone = this.input("secondary_phone");
    business.address = this.input("address");
    business.email = this.input("email");
    business.website = this.input("website");
    business.logo = this.input("logo");
    business.currency = this.input("currency");
    business.language = this.input("language");
    business.timezone = this.input("timezone");
    business.is_active = this.input("is_active") ?? true;

    return await business.save();
  }
}

