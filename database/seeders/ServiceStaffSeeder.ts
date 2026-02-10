import { Service } from "@/Models/Service";
import { Staff } from "@/Models/Staff";
import { Business } from "@/Models/Business";
import { DB } from "jcc-express-mvc/Eloquent";

export class ServiceStaffSeeder {
  async run() {
    // Get all businesses
    
  const [businesses,services,staff] = await  Promise.all([Business.getRaw(),Service.getRaw(),Staff.getRaw()])

    // Assign services to staff members
    const beautySalon = businesses.find((b: any) => (b as any).slug === "serene-beauty-salon");
    if (beautySalon) {
      const beautyServices = services.filter((s: any) => (s as any).business_id === (beautySalon as any).id);
      const beautyStaff = staff.filter((s: any) => (s as any).business_id === (beautySalon as any).id);

      // Emma Wilson - Hair services
      const emma = beautyStaff.find((s: any) => (s as any).first_name === "Emma");
      if (emma) {
        const hairServices = beautyServices.filter((s: any) =>
          ["Haircut & Styling", "Hair Coloring", "Blowout"].includes((s as any).name)
        );
        for (const service of hairServices) {
          await DB.table("service_staff").insert({
            service_id: (service as any).id,
            staff_id: (emma as any).id,
          });
        }
      }

      // Sarah Davis - Facial services
      const sarah = beautyStaff.find((s: any) => (s as any).first_name === "Sarah");
      if (sarah) {
        const facialService = beautyServices.find((s: any) => (s as any).name === "Facial Treatment");
        if (facialService) {
          await DB.table("service_staff").insert({
            service_id: (facialService as any).id,
            staff_id: (sarah as any).id,
          });
        }
      }

      // Lisa Brown - Nail services
      const lisa = beautyStaff.find((s: any) => (s as any).first_name === "Lisa");
      if (lisa) {
        const nailService = beautyServices.find((s: any) => (s as any).name === "Manicure & Pedicure");
        if (nailService) {
          await DB.table("service_staff").insert({
            service_id: (nailService as any).id,
            staff_id: (lisa as any).id,
          });
        }
      }
    }

    // Barbershop staff assignments
    const barbershop = businesses.find((b: any) => (b as any).slug === "elite-barbershop");
    if (barbershop) {
      const barberServices = services.filter((s: any) => (s as any).business_id === (barbershop as any).id);
      const barberStaff = staff.filter((s: any) => (s as any).business_id === (barbershop as any).id);

      // Assign all barber services to all barber staff
      for (const staffMember of barberStaff) {
        for (const service of barberServices) {
          await DB.table("service_staff").insert({
            service_id: (service as any).id,
            staff_id: (staffMember as any).id,
          });
        }
      }
    }

    // Clinic staff assignments
    const clinic = businesses.find((b: any) => (b as any).slug === "wellness-clinic");
    if (clinic) {
      const clinicServices = services.filter((s: any) => (s as any).business_id === (clinic as any).id);
      const clinicStaff = staff.filter((s: any) => (s as any).business_id === (clinic as any).id);

      // Dr. Smith - Consultations
      const drSmith = clinicStaff.find((s: any) => (s as any).first_name === "Dr. Smith");
      if (drSmith) {
        const consultationService = clinicServices.find((s: any) => (s as any).name === "Consultation");
        if (consultationService) {
          await DB.table("service_staff").insert({
            service_id: (consultationService as any).id,
            staff_id: (drSmith as any).id,
          });
        }
      }

      // Maria Garcia - Massage services
      const maria = clinicStaff.find((s: any) => (s as any).first_name === "Maria");
      if (maria) {
        const massageServices = clinicServices.filter((s: any) =>
          (s as any).name.includes("Massage") || (s as any).name === "Spa Package"
        );
        for (const service of massageServices) {
          await DB.table("service_staff").insert({
            service_id: (service as any).id,
            staff_id: (maria as any).id,
          });
        }
      }
    }
  }
}

