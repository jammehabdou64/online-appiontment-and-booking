import { Service } from "@/Models/Service";
import { Business } from "@/Models/Business";

export class ServiceSeeder {
  async run() {
    // Get all businesses
    const businesses = await Business.all();

    if (businesses.length === 0) {
      console.log("No businesses found. Please run BusinessSeeder first.");
      return;
    }

    const services = [];

    // Services for Beauty Salon
    const beautySalon = businesses.find((b: any) => b.slug === "serene-beauty-salon");
    if (beautySalon) {
      services.push(
        {
          business_id: (beautySalon as any).id,
          name: "Haircut & Styling",
          description: "Professional haircut with styling and finishing",
          duration_minutes: 60,
          price: 45,
          buffer_time_minutes: 10,
          booking_advance_notice_minutes: 60,
          is_active: true,
        },
        {
          business_id: (beautySalon as any).id,
          name: "Hair Coloring",
          description: "Full hair coloring service with consultation",
          duration_minutes: 120,
          price: 120,
          buffer_time_minutes: 15,
          booking_advance_notice_minutes: 1440, // 24 hours
          is_active: true,
        },
        {
          business_id: (beautySalon as any).id,
          name: "Facial Treatment",
          description: "Deep cleansing facial with moisturizing",
          duration_minutes: 75,
          price: 85,
          buffer_time_minutes: 10,
          booking_advance_notice_minutes: 120,
          is_active: true,
        },
        {
          business_id: (beautySalon as any).id,
          name: "Manicure & Pedicure",
          description: "Full nail care service",
          duration_minutes: 90,
          price: 65,
          buffer_time_minutes: 10,
          booking_advance_notice_minutes: 60,
          is_active: true,
        },
        {
          business_id: (beautySalon as any).id,
          name: "Blowout",
          description: "Professional hair blowout and styling",
          duration_minutes: 45,
          price: 35,
          buffer_time_minutes: 5,
          booking_advance_notice_minutes: 30,
          is_active: true,
        }
      );
    }

    // Services for Barbershop
    const barbershop = businesses.find((b: any) => (b as any).slug === "elite-barbershop");
    if (barbershop) {
      services.push(
        {
          business_id: (barbershop as any).id,
          name: "Men's Haircut",
          description: "Classic men's haircut with clippers and scissors",
          duration_minutes: 30,
          price: 25,
          buffer_time_minutes: 5,
          booking_advance_notice_minutes: 30,
          is_active: true,
        },
        {
          business_id: (barbershop as any).id,
          name: "Beard Trim",
          description: "Professional beard trimming and shaping",
          duration_minutes: 20,
          price: 15,
          buffer_time_minutes: 5,
          booking_advance_notice_minutes: 30,
          is_active: true,
        },
        {
          business_id: (barbershop as any).id,
          name: "Haircut & Beard",
          description: "Complete grooming package",
          duration_minutes: 45,
          price: 35,
          buffer_time_minutes: 5,
          booking_advance_notice_minutes: 30,
          is_active: true,
        }
      );
    }

    // Services for Wellness Clinic
    const clinic = businesses.find((b: any) => (b as any).slug === "wellness-clinic");
    if (clinic) {
      services.push(
        {
          business_id: (clinic as any).id,
          name: "Consultation",
          description: "Initial health consultation",
          duration_minutes: 30,
          price: 50,
          buffer_time_minutes: 10,
          booking_advance_notice_minutes: 1440, // 24 hours
          is_active: true,
        },
        {
          business_id: (clinic as any).id,
          name: "Massage Therapy",
          description: "Full body massage therapy session",
          duration_minutes: 60,
          price: 80,
          buffer_time_minutes: 15,
          booking_advance_notice_minutes: 120,
          is_active: true,
        },
        {
          business_id: (clinic as any).id,
          name: "Deep Tissue Massage",
          description: "Intensive deep tissue massage",
          duration_minutes: 90,
          price: 120,
          buffer_time_minutes: 15,
          booking_advance_notice_minutes: 120,
          is_active: true,
        },
        {
          business_id: (clinic as any).id,
          name: "Spa Package",
          description: "Complete spa experience package",
          duration_minutes: 180,
          price: 200,
          buffer_time_minutes: 20,
          booking_advance_notice_minutes: 2880, // 48 hours
          is_active: true,
        }
      );
    }

    if (services.length > 0) {
        for (const service of services) {
          await Service.create(service);
        // console.log('==================')
        // console.log(service)
        // console.log('==================')
        }
    }
  }
}

