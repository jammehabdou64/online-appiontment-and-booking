import React, { useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { toast } from "sonner";

// Format ISO datetime string to datetime-local format (yyyy-MM-ddThh:mm)
const formatToDatetimeLocal = (isoString: string): string => {
  if (!isoString) return "";

  try {
    const date = new Date(isoString);
    // Get local date and time
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  } catch (error) {
    return isoString;
  }
};

interface Customer {
  id: number;
  first_name: string;
  last_name: string;
}

interface Service {
  id: number;
  name: string;
  duration_minutes?: number;
  duration?: number;
}

interface Staff {
  id: number;
  first_name: string;
  last_name: string;
}

interface AppointmentFormData {
  business_id?: string;
  customer_id: string;
  service_id: string;
  staff_id: string;
  start_time: string;
  end_time: string;
  status: string;
  notes: string;
}

interface AppointmentFormProps {
  appointment?: Record<string, any>;
  customers: Customer[];
  services: Service[];
  staff: Staff[];
  isEditing?: boolean;
}

export function AppointmentForm({
  appointment,
  customers,
  services,
  staff,
  isEditing = false,
}: AppointmentFormProps) {
  const { data, setData, processing, errors, patch, post } = useForm({
    business_id: "",
    customer_id: "",
    service_id: "",
    staff_id: "",
    start_time: "",
    end_time: "",
    status: "pending",
    notes: "",
  });

  // Initialize form with appointment data if editing
  useEffect(() => {
    if (isEditing && appointment?.id) {
      // Handle start_time - could be ISO string or in date/time format
      let formattedStartTime = "";
      if (appointment.start_time) {
        formattedStartTime = formatToDatetimeLocal(appointment.start_time);
      } else if (appointment.date && appointment.time) {
        // Fallback to date/time combination if start_time is not available
        formattedStartTime = `${appointment.date}T${appointment.time.substring(0, 5)}`;
      }

      // Handle end_time similarly
      let formattedEndTime = "";
      if (appointment.end_time) {
        formattedEndTime = formatToDatetimeLocal(appointment.end_time);
      }

      setData({
        business_id: data.business_id,
        customer_id: appointment.customer_id?.toString() || "",
        service_id: appointment.service_id?.toString() || "",
        staff_id: appointment.staff_id?.toString() || "",
        start_time: formattedStartTime,
        end_time: formattedEndTime,
        status: appointment.status || "pending",
        notes: appointment.notes || "",
      });
    }
  }, [appointment?.id, isEditing]);

  // Auto-set business_id when customer or service is selected
  useEffect(() => {
    if (!isEditing) {
      if (data.customer_id && customers.length > 0) {
        const customer = customers.find(
          (c) => c.id.toString() === data.customer_id,
        );
        if (customer && (customer as any).business_id && !data.business_id) {
          setData("business_id", (customer as any).business_id.toString());
        }
      }
      if (data.service_id && services.length > 0) {
        const service = services.find(
          (s) => s.id.toString() === data.service_id,
        );
        if (service && (service as any).business_id && !data.business_id) {
          setData("business_id", (service as any).business_id.toString());
        }
      }
    }
  }, [data.customer_id, data.service_id, isEditing]);

  const getCustomerName = (customer: Customer) => {
    return `${customer.first_name} ${customer.last_name}`;
  };

  const getStaffName = (staffMember: Staff) => {
    return `${staffMember.first_name} ${staffMember.last_name}`;
  };

  const getServiceDuration = (service: Service) => {
    return service.duration_minutes || service.duration || 0;
  };

  const submitButtonText = isEditing
    ? "Update Appointment"
    : "Create Appointment";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEditing) {
      // Ensure business_id is set for new appointments
      if (!data.business_id && data.customer_id) {
        const customer = customers.find(
          (c) => c.id.toString() === data.customer_id,
        );
        if (customer && (customer as any).business_id) {
          setData("business_id", (customer as any).business_id.toString());
        }
      }
      post("/appointments", {
        onSuccess: () => {
          toast.success("Appointment created successfully");
        },
        onError: () => {
          toast.error("Failed to create appointment");
        },
      });
    } else if (appointment?.id) {
      patch(`/appointments/${appointment.id}`, {
        onSuccess: () => {
          toast.success("Appointment updated successfully");
        },
        onError: () => {
          toast.error("Failed to update appointment");
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Hidden business_id field for new appointments */}
      {!isEditing && data.business_id && (
        <input type="hidden" name="business_id" value={data.business_id} />
      )}
      {/* Hidden business_id field for new appointments */}
      {!isEditing && data.business_id && (
        <input type="hidden" name="business_id" value={data.business_id} />
      )}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="customer_id">Customer *</Label>
          <Select
            value={data.customer_id}
            onValueChange={(value) => setData("customer_id", value)}
          >
            <SelectTrigger id="customer_id">
              <SelectValue placeholder="Select customer" />
            </SelectTrigger>
            <SelectContent>
              {customers.map((customer) => (
                <SelectItem key={customer.id} value={customer.id.toString()}>
                  {getCustomerName(customer)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.customer_id && (
            <p className="text-sm text-destructive">{errors.customer_id}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="service_id">Service *</Label>
          <Select
            value={data.service_id}
            onValueChange={(value) => setData("service_id", value)}
          >
            <SelectTrigger id="service_id">
              <SelectValue placeholder="Select service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.id} value={service.id.toString()}>
                  {service.name} ({getServiceDuration(service)} min)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.service_id && (
            <p className="text-sm text-destructive">{errors.service_id}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="staff_id">Staff Member *</Label>
          <Select
            value={data.staff_id}
            onValueChange={(value) => setData("staff_id", value)}
          >
            <SelectTrigger id="staff_id">
              <SelectValue placeholder="Select staff member" />
            </SelectTrigger>
            <SelectContent>
              {staff.map((member) => (
                <SelectItem key={member.id} value={member.id.toString()}>
                  {getStaffName(member)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.staff_id && (
            <p className="text-sm text-destructive">{errors.staff_id}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select
            value={data.status}
            onValueChange={(value) => setData("status", value)}
          >
            <SelectTrigger id="status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && (
            <p className="text-sm text-destructive">{errors.status}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="start_time">Start Time *</Label>
          <Input
            id="start_time"
            type="datetime-local"
            value={data.start_time}
            onChange={(e) => setData("start_time", e.target.value)}
            required
          />
          {errors.start_time && (
            <p className="text-sm text-destructive">{errors.start_time}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="end_time">End Time *</Label>
          <Input
            id="end_time"
            type="datetime-local"
            value={data.end_time}
            onChange={(e) => setData("end_time", e.target.value)}
            required
          />
          {errors.end_time && (
            <p className="text-sm text-destructive">{errors.end_time}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <textarea
          id="notes"
          className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Additional notes..."
          value={data.notes}
          onChange={(e) => setData("notes", e.target.value)}
        />
        {errors.notes && (
          <p className="text-sm text-destructive">{errors.notes}</p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Link href="/appointments">
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </Link>
        <Button type="submit" disabled={processing}>
          {processing ? `${submitButtonText}...` : submitButtonText}
        </Button>
      </div>
    </form>
  );
}
