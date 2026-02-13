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

export interface ServiceInterface extends Service {
  business_id: string;
  name: string;
  description: string;
  duration_minutes: number;
  price: number;
  buffer_time_minutes: number;
  booking_advance_notice_minutes: number;
  is_active: boolean;
}

export interface StaffInterface extends Staff {
  business_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  is_active: boolean;
  avatar?: string;
  bio?: string;
  user_id?: string;
}

export interface CustomerInterface extends Customer {
  business_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  notes?: string;
  user_id?: string;
}

export interface BusinessInterface extends Business {
  user_id?: string;
  name: string;
  description?: string;
  address: string;
  phone: string;
  email: string;
  slug: string;
  primary_phone: string | number;
  secondary_phone?: string | number;

  website?: string;
  logo?: string;
  currency?: string;
  language?: string;
  timezone?: string;
  is_active?: boolean | string;
}
