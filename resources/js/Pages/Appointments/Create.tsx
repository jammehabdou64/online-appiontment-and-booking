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

export default function CreateAppointment({
  customers = [],
  services = [],
  staff = [],
}: Props) {
  return (
    <AdminLayout>
      <Head title="Create Appointment" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Create Appointment
            </h1>
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
            <AppointmentForm
              customers={customers}
              services={services}
              staff={staff}
              isEditing={false}
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
