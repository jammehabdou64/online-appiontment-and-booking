import React from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Components/Admin/AdminLayout";
import { Button } from "@/Components/ui/button";
import ServiceForm from "./ServiceForm";

interface EditServiceProps {
  service: {
    id: number;
    name: string;
    duration: number;
    price?: number;
    active: boolean;
    description?: string;
  };
}

export default function EditService({ service }: EditServiceProps) {
  return (
    <AdminLayout>
      <Head title="Edit Service" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Edit Service</h1>
            <p className="text-muted-foreground mt-1">Update service details</p>
          </div>
          <Link href="/services">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>

        <ServiceForm service={service} isEditing={true} />
      </div>
    </AdminLayout>
  );
}
