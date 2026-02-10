import { Appointment } from "@/Models/Appointment";
import { Business } from "@/Models/Business";
import { Service } from "@/Models/Service";
import { Staff } from "@/Models/Staff";
import { Customer } from "@/Models/Customer";

export class AppointmentSeeder {
  async run() {
    // Get all related data
    const businesses = await Business.getRaw();
    const services = await Service.getRaw();
    const staff = await Staff.getRaw();
    const customers = await Customer.getRaw();

    if (businesses.length === 0 || services.length === 0 || staff.length === 0 || customers.length === 0) {
      console.log("Missing required data. Please run BusinessSeeder, ServiceSeeder, StaffSeeder, and CustomerSeeder first.");
      return;
    }

    const appointments = [];
    const now = new Date();

    // Helper function to format date for MySQL (YYYY-MM-DD HH:MM:SS)
    const formatMySQLDateTime = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    // Helper function to create appointment
    const createAppointment = (
      businessId: any,
      serviceId: any,
      staffId: any,
      customerId: any,
      startTime: Date,
      status: string,
      notes?: string
    ) => {
      const service = services.find((s: any) => (s as any).id === serviceId);
      const duration = service ? (service as any).duration_minutes : 60;
      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + duration);

      return {
        business_id: businessId,
        service_id: serviceId,
        staff_id: staffId,
        customer_id: customerId,
        start_time: formatMySQLDateTime(startTime),
        end_time: formatMySQLDateTime(endTime),
        status: status,
        notes: notes || null,
        cancellation_reason: null,
        price: service ? (service as any).price : null,
        booking_source: "admin",
      };
    };

    // Beauty Salon appointments
    const beautySalon = businesses.find((b: any) => (b as any).slug === "serene-beauty-salon");
    if (beautySalon) {
      const beautyServices = services.filter((s: any) => (s as any).business_id === (beautySalon as any).id);
      const beautyStaff = staff.filter((s: any) => (s as any).business_id === (beautySalon as any).id);
      const beautyCustomers = customers.filter((c: any) => (c as any).business_id === (beautySalon as any).id);

      if (beautyServices.length > 0 && beautyStaff.length > 0 && beautyCustomers.length > 0) {
        // Today's appointments
        const today = new Date(now);
        today.setHours(9, 0, 0, 0);

        appointments.push(
          createAppointment(
            (beautySalon as any).id,
            (beautyServices[0] as any).id, // Haircut & Styling
            (beautyStaff[0] as any).id, // Emma Wilson
            (beautyCustomers[0] as any).id, // Sarah Johnson
            new Date(today.getTime() + 0 * 60 * 60 * 1000), // 9:00 AM
            "confirmed",
            "Regular monthly appointment"
          ),
          createAppointment(
            (beautySalon as any).id,
            (beautyServices[1] as any).id, // Hair Coloring
            (beautyStaff[0] as any).id, // Emma Wilson
            (beautyCustomers[1] as any).id, // Jessica Martinez
            new Date(today.getTime() + 1.5 * 60 * 60 * 1000), // 10:30 AM
            "confirmed"
          ),
          createAppointment(
            (beautySalon as any).id,
            (beautyServices[2] as any).id, // Facial Treatment
            (beautyStaff[1] as any).id, // Sarah Davis
            (beautyCustomers[2] as any).id, // Amanda Lee
            new Date(today.getTime() + 2 * 60 * 60 * 1000), // 11:00 AM
            "pending"
          ),
          createAppointment(
            (beautySalon as any).id,
            (beautyServices[3] as any).id, // Manicure & Pedicure
            (beautyStaff[2] as any).id, // Lisa Brown
            (beautyCustomers[3] as any).id, // Emily White
            new Date(today.getTime() + 5.5 * 60 * 60 * 1000), // 2:30 PM
            "pending"
          )
        );

        // Tomorrow's appointments
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        appointments.push(
          createAppointment(
            (beautySalon as any).id,
            (beautyServices[4] as any).id, // Blowout
            (beautyStaff[0] as any).id, // Emma Wilson
            (beautyCustomers[0] as any).id, // Sarah Johnson
            new Date(tomorrow.getTime() + 0 * 60 * 60 * 1000), // 9:00 AM
            "confirmed"
          )
        );
      }
    }

    // Barbershop appointments
    const barbershop = businesses.find((b: any) => (b as any).slug === "elite-barbershop");
    if (barbershop) {
      const barberServices = services.filter((s: any) => (s as any).business_id === (barbershop as any).id);
      const barberStaff = staff.filter((s: any) => (s as any).business_id === (barbershop as any).id);
      const barberCustomers = customers.filter((c: any) => (c as any).business_id === (barbershop as any).id);

      if (barberServices.length > 0 && barberStaff.length > 0 && barberCustomers.length > 0) {
        const today = new Date(now);
        today.setHours(9, 0, 0, 0);

        appointments.push(
          createAppointment(
            (barbershop as any).id,
            (barberServices[0] as any).id, // Men's Haircut
            (barberStaff[0] as any).id, // John Doe
            (barberCustomers[0] as any).id, // Michael Chen
            new Date(today.getTime() + 1.5 * 60 * 60 * 1000), // 10:30 AM
            "confirmed"
          ),
          createAppointment(
            (barbershop as any).id,
            (barberServices[1] as any).id, // Beard Trim
            (barberStaff[0] as any).id, // John Doe
            (barberCustomers[1] as any).id, // David Thompson
            new Date(today.getTime() + 4.5 * 60 * 60 * 1000), // 1:30 PM
            "confirmed"
          )
        );
      }
    }

    // Wellness Clinic appointments
    const clinic = businesses.find((b: any) => (b as any).slug === "wellness-clinic");
    if (clinic) {
      const clinicServices = services.filter((s: any) => (s as any).business_id === (clinic as any).id);
      const clinicStaff = staff.filter((s: any) => (s as any).business_id === (clinic as any).id);
      const clinicCustomers = customers.filter((c: any) => (c as any).business_id === (clinic as any).id);

      if (clinicServices.length > 0 && clinicStaff.length > 0 && clinicCustomers.length > 0) {
        const today = new Date(now);
        today.setHours(9, 0, 0, 0);

        appointments.push(
          createAppointment(
            (clinic as any).id,
            (clinicServices[1] as any).id, // Massage Therapy
            (clinicStaff[1] as any).id, // Maria Garcia
            (clinicCustomers[0] as any).id, // Sophia Lee
            new Date(today.getTime() + 5 * 60 * 60 * 1000), // 2:00 PM
            "confirmed"
          ),
          createAppointment(
            (clinic as any).id,
            (clinicServices[0] as any).id, // Consultation
            (clinicStaff[0] as any).id, // Dr. Smith
            (clinicCustomers[1] as any).id, // Ava Martinez
            new Date(today.getTime() + 6 * 60 * 60 * 1000), // 3:00 PM
            "pending"
          )
        );
      }
    }

    if (appointments.length > 0) {
      for (const appointment of appointments) {
        await Appointment.create(appointment);
      }
    }
  }
}
