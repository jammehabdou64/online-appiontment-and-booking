import { Service } from "@/Models/Service";
import { Staff } from "@/Models/Staff";
import { Customer } from "@/Models/Customer";
import { Business } from "@/Models/Business";
import { Appointment } from "@/Models/Appointment";
//
export class AppointmentRepository {

    async all() {
        const req = request();
        const staffId = req.query.staff_id;
        const customerId = req.query.customer_id;
        const status = req.query.status;
        const startDate = req.query.start_date;
        const endDate = req.query.end_date;
    
        let query = Appointment.query();
    
        if (staffId) {
          query = query.where("staff_id", staffId);
        }
    
        if (customerId) {
          query = query.where("customer_id", customerId);
        }
    
        if (status) {
          query = query.where("status", status);
        }
    
        if (startDate) {
          query = query.where("start_time", ">=", startDate);
        }
    
        if (endDate) {
          query = query.where("start_time", "<=", endDate);
        }
    
        query = query.orderBy("start_time", "asc");
    
        // Load relationships
        const appointments = await query
          .with(["customer","service","staff"])

          .paginate(req);

        return { 
          appointments,
          filters: {  
            staff_id: staffId, 
            customer_id: customerId, 
            status, 
            start_date: startDate, 
            end_date: endDate 
          } 
        };
    }


    async create() {
        // Get all customers, services, and staff with their business relationships
        const customers = await Customer.get();
        const services = await Service.where("is_active", true).get();
        const staff = await Staff.where("is_active", true).get();
        
        return { customers, services, staff };  
    }


}