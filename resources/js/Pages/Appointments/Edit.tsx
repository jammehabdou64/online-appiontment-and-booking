import React from "react";
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

interface EditAppointmentProps {
  appointment: {
    id: number;
    customer_id: string;
    service_id: string;
    staff_id: string;
    date: string;
    time: string;
    status: string;
    notes?: string;
    customers: { id: number; first_name: string; last_name: string };
    services: { id: number; name: string; duration: number }
    staff: { id: number; first_name: string; last_name: string };
  };
  customers: Array<{ id: number; first_name: string; last_name: string }>;
  services: Array<{ id: number; name: string; duration: number }>;
  staff: Array<{ id: number; first_name: string; last_name: string }>;
}

export default function EditAppointment({ appointment, customers, services, staff }: EditAppointmentProps) {
  const { data, setData, put, processing, errors } = useForm({
    customer_id: appointment.customer_id.toString()||"",
    service_id: appointment.service_id.toString()||"",
    staff_id: appointment.staff_id.toString()||"",
    date: appointment.date||new Date().toISOString().split('T')[0]||"",
    time: appointment.time||new Date().toISOString().split('T')[1]||"",
    status: appointment.status||"pending",
    notes: appointment.notes || "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/appointments/${appointment.id}`);
  };

  return (
    <AdminLayout>
      <Head title="Edit Appointment" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Edit Appointment</h1>
            <p className="text-muted-foreground mt-1">
              Update appointment details
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
              Update the appointment information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
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
                          {customer.first_name} {customer.last_name}
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
                          {service.name} ({service.duration} min)
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
                          {member.first_name} {member.last_name}
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
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={data.date}
                    onChange={(e) => setData("date", e.target.value)}
                    required
                  />
                  {errors.date && (
                    <p className="text-sm text-destructive">{errors.date}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={data.time}
                    onChange={(e) => setData("time", e.target.value)}
                    required
                  />
                  {errors.time && (
                    <p className="text-sm text-destructive">{errors.time}</p>
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
                  {processing ? "Updating..." : "Update Appointment"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

