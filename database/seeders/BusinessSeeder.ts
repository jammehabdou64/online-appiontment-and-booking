import { Business } from "@/Models/Business";

export class BusinessSeeder {
  async run() {
    const businesses = [
      {
        name: "Serene Beauty Salon",
        slug: "serene-beauty-salon",
        primary_phone: "+1 (555) 123-4567",
        secondary_phone: "+1 (555) 123-4568",
        address: "123 Main Street, City, State 12345",
        email: "info@serenebeauty.com",
        website: "https://serenebeauty.com",
        logo: null,
        currency: "USD",
        language: "en",
        timezone: "America/New_York",
        is_active: true,
      },
      {
        name: "Elite Barbershop",
        slug: "elite-barbershop",
        primary_phone: "+1 (555) 234-5678",
        secondary_phone: null,
        address: "456 Oak Avenue, City, State 12345",
        email: "contact@elitebarbers.com",
        website: null,
        logo: null,
        currency: "USD",
        language: "en",
        timezone: "America/Chicago",
        is_active: true,
      },
      {
        name: "Wellness Clinic",
        slug: "wellness-clinic",
        primary_phone: "+1 (555) 345-6789",
        secondary_phone: "+1 (555) 345-6790",
        address: "789 Health Boulevard, City, State 12345",
        email: "appointments@wellnessclinic.com",
        website: "https://wellnessclinic.com",
        logo: null,
        currency: "USD",
        language: "en",
        timezone: "America/Los_Angeles",
        is_active: true,
      },
    ];
        for (const business of businesses) {
        await Business.create(business);
        }
  }
}

