import React, { useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import AdminLayout from "@/Components/Admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
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

interface Customer {
  id: number;
  first_name: string;
  last_name: string;
}

interface Service {
  id: number;
  name: string;
  duration_minutes: number;
}

interface Staff {
  id: number;
  first_name: string;
  last_name: string;
}

interface Props {
  customers: Customer[];
  services: Service[];
  staff: Staff[];
}

export default function CreateAppointment({ customers = [], services = [], staff = [] }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    business_id: "",
    customer_id: "",
    service_id: "",
    staff_id: "",
    start_time: "",
    status: "pending",
    notes: "",
  });

  // Auto-set business_id when customer or service is selected
  React.useEffect(() => {
    if (data.customer_id && customers.length > 0) {
      const customer = customers.find((c: any) => c.id.toString() === data.customer_id);
      if (customer && (customer as any).business_id && !data.business_id) {
        setData("business_id", (customer as any).business_id.toString());
      }
    }
    if (data.service_id && services.length > 0) {
      const service = services.find((s: any) => s.id.toString() === data.service_id);
      if (service && (service as any).business_id && !data.business_id) {
        setData("business_id", (service as any).business_id.toString());
      }
    }
  }, [data.customer_id, data.service_id]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ensure business_id is set
    if (!data.business_id && data.customer_id) {
      const customer = customers.find((c: any) => c.id.toString() === data.customer_id);
      if (customer && (customer as any).business_id) {
        setData("business_id", (customer as any).business_id.toString());
      }
    }
    post("/appointments");
  };

  const getCustomerName = (customer: Customer) => {
    return `${customer.first_name} ${customer.last_name}`;
  };

  const getStaffName = (staffMember: Staff) => {
    return `${staffMember.first_name} ${staffMember.last_name}`;
  };

  return (
    <AdminLayout>
      <Head title="Create Appointment" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create Appointment</h1>
            <p className="text-muted-foreground mt-1">
              Schedule a new appointment
            </p>
          </div>
          <Link href="/appointments">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
            <CardDescription>
              Fill in the information to create a new appointment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              {/* Hidden business_id field */}
              {data.business_id && (
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
                          {service.name} ({service.duration_minutes} min)
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

                <div className="space-y-2">
                  <Label htmlFor="start_time">Date & Time *</Label>
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
                  {processing ? "Creating..." : "Create Appointment"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

