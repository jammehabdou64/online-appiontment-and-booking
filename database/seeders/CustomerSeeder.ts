import { Customer } from "@/Models/Customer";
import { Business } from "@/Models/Business";

export class CustomerSeeder {
  async run() {
    // Get all businesses
    const businesses = await Business.all();

    if (businesses.length === 0) {
      console.log("No businesses found. Please run BusinessSeeder first.");
      return;
    }

    const customers = [];

    // Customers for Beauty Salon
    const beautySalon = businesses.find((b: any) => (b as any).slug === "serene-beauty-salon");
    if (beautySalon) {
      customers.push(
        {
          business_id: (beautySalon as any).id,
          user_id: null,
          first_name: "Sarah",
          last_name: "Johnson",
          email: "sarah.johnson@example.com",
          phone: "+1 (555) 100-2001",
          notes: "Prefers morning appointments",
        },
        {
          business_id: (beautySalon as any).id,
          user_id: null,
          first_name: "Jessica",
          last_name: "Martinez",
          email: "jessica.martinez@example.com",
          phone: "+1 (555) 100-2002",
          notes: null,
        },
        {
          business_id: (beautySalon as any).id,
          user_id: null,
          first_name: "Amanda",
          last_name: "Lee",
          email: "amanda.lee@example.com",
          phone: "+1 (555) 100-2003",
          notes: "Regular customer, monthly visits",
        },
        {
          business_id: (beautySalon as any).id,
          user_id: null,
          first_name: "Emily",
          last_name: "White",
          email: "emily.white@example.com",
          phone: "+1 (555) 100-2004",
          notes: null,
        }
      );
    }

    // Customers for Barbershop
    const barbershop = businesses.find((b: any) => (b as any).slug === "elite-barbershop");
    if (barbershop) {
      customers.push(
        {
          business_id: (barbershop as any).id,
          user_id: null,
          first_name: "Michael",
          last_name: "Chen",
          email: "michael.chen@example.com",
          phone: "+1 (555) 200-3001",
          notes: null,
        },
        {
          business_id: (barbershop as any).id,
          user_id: null,
          first_name: "David",
          last_name: "Thompson",
          email: "david.thompson@example.com",
          phone: "+1 (555) 200-3002",
          notes: "Prefers weekend appointments",
        },
        {
          business_id: (barbershop as any).id,
          user_id: null,
          first_name: "James",
          last_name: "Chen",
          email: "james.chen@example.com",
          phone: "+1 (555) 200-3003",
          notes: null,
        },
        {
          business_id: (barbershop as any).id,
          user_id: null,
          first_name: "Oliver",
          last_name: "Brown",
          email: "oliver.brown@example.com",
          phone: "+1 (555) 200-3004",
          notes: null,
        },
        {
          business_id: (barbershop as any).id,
          user_id: null,
          first_name: "Robert",
          last_name: "Kim",
          email: "robert.kim@example.com",
          phone: "+1 (555) 200-3005",
          notes: null,
        }
      );
    }

    // Customers for Wellness Clinic
    const clinic = businesses.find((b: any) => (b as any).slug === "wellness-clinic");
    if (clinic) {
      customers.push(
        {
          business_id: (clinic as any).id,
          user_id: null,
          first_name: "Sophia",
          last_name: "Lee",
          email: "sophia.lee@example.com",
          phone: "+1 (555) 300-4001",
          notes: "First-time customer",
        },
        {
          business_id: (clinic as any).id,
          user_id: null,
          first_name: "Ava",
          last_name: "Martinez",
          email: "ava.martinez@example.com",
          phone: "+1 (555) 300-4002",
          notes: null,
        },
        {
          business_id: (clinic as any).id,
          user_id: null,
          first_name: "James",
          last_name: "Taylor",
          email: "james.taylor@example.com",
          phone: "+1 (555) 300-4003",
          notes: "Regular monthly appointments",
        }
      );
    }

    if (customers.length > 0) {
        for (const customer of customers) { 
          await Customer.create(customer);
        }
    }
  }
}

