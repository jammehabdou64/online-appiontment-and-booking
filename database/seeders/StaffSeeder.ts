import { Staff } from "@/Models/Staff";
import { Business } from "@/Models/Business";
import { User } from "@/Models/User";

export class StaffSeeder {
  async run() {
    // Get all businesses
    const businesses = await Business.all();
    const users = await User.all();

    if (businesses.length === 0) {
      console.log("No businesses found. Please run BusinessSeeder first.");
      return;
    }

    const staffMembers = [];

    // Staff for Beauty Salon
    const beautySalon = businesses.find((b: any) => (b as any).slug === "serene-beauty-salon");
    if (beautySalon) {
      staffMembers.push(
        {
          business_id: (beautySalon as any).id,
          user_id: users.length > 0 ? (users[0] as any).id : null,
          first_name: "Emma",
          last_name: "Wilson",
          email: "emma@serenebeauty.com",
          phone: "+1 (555) 111-2222",
          avatar: null,
          bio: "Experienced hairstylist specializing in color and styling",
          is_active: true,
        },
        {
          business_id: (beautySalon as any).id,
          user_id: null,
          first_name: "Sarah",
          last_name: "Davis",
          email: "sarah@serenebeauty.com",
          phone: "+1 (555) 111-2223",
          avatar: null,
          bio: "Facial treatment specialist with 5 years of experience",
          is_active: true,
        },
        {
          business_id: (beautySalon as any).id,
          user_id: null,
          first_name: "Lisa",
          last_name: "Brown",
          email: "lisa@serenebeauty.com",
          phone: "+1 (555) 111-2224",
          avatar: null,
          bio: "Nail care expert",
          is_active: true,
        }
      );
    }

    // Staff for Barbershop
    const barbershop = businesses.find((b: any) => (b as any).slug === "elite-barbershop");
    if (barbershop) {
      staffMembers.push(
        {
          business_id: (barbershop as any).id,
          user_id: null,
          first_name: "John",
          last_name: "Doe",
          email: "john@elitebarbers.com",
          phone: "+1 (555) 222-3333",
          avatar: null,
          bio: "Master barber with 10 years of experience",
          is_active: true,
        },
        {
          business_id: (barbershop as any).id,
          user_id: null,
          first_name: "Mike",
          last_name: "Johnson",
          email: "mike@elitebarbers.com",
          phone: "+1 (555) 222-3334",
          avatar: null,
          bio: "Specialist in modern haircuts and beard grooming",
          is_active: true,
        }
      );
    }

    // Staff for Wellness Clinic
    const clinic = businesses.find((b: any) => (b as any).slug === "wellness-clinic");
    if (clinic) {
      staffMembers.push(
        {
          business_id: (clinic as any).id,
          user_id: null,
          first_name: "Dr. Smith",
          last_name: "",
          email: "smith@wellnessclinic.com",
          phone: "+1 (555) 333-4444",
          avatar: null,
          bio: "Licensed health consultant",
          is_active: true,
        },
        {
          business_id: (clinic as any).id,
          user_id: null,
          first_name: "Maria",
          last_name: "Garcia",
          email: "maria@wellnessclinic.com",
          phone: "+1 (555) 333-4445",
          avatar: null,
          bio: "Certified massage therapist",
          is_active: true,
        }
      );
    }

    if (staffMembers.length > 0) {
      for (const staffMember of staffMembers) {
        await Staff.create(staffMember);
      }
    }
  }
}

