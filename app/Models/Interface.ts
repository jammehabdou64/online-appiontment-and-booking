import { Appointment } from "./Appointment";
import { Staff } from "./Staff";
import { Customer } from "./Customer";
import { Business } from "./Business";
import { Service } from "./Service";

export interface AppointmentInterface extends Appointment {
    business_id: string;
    service_id: string;
    staff_id: string;
    customer_id: string;
    start_time: Date;
    end_time: Date;
    status: string;
    notes: string;
    cancellation_reason: string;
    price: number;
    booking_source: string;
}