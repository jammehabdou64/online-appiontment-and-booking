import React from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Components/Admin/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { AppointmentForm } from "./AppointmentForm";

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
    services: { id: number; name: string; duration: number };
    staff: { id: number; first_name: string; last_name: string };
  };
  customers: Array<{ id: number; first_name: string; last_name: string }>;
  services: Array<{ id: number; name: string; duration: number }>;
  staff: Array<{ id: number; first_name: string; last_name: string }>;
}

export default function EditAppointment({
  appointment,
  customers,
  services,
  staff,
}: EditAppointmentProps) {
  return (
    <AdminLayout>
      <Head title="Edit Appointment" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Edit Appointment
            </h1>
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
            <AppointmentForm
              appointment={appointment}
              customers={customers}
              services={services}
              staff={staff}
              isEditing={true}
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
