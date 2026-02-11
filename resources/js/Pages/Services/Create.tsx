import React from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Components/Admin/AdminLayout";
import { Button } from "@/Components/ui/button";
import ServiceForm from "./ServiceForm";

export default function CreateService() {
  return (
    <AdminLayout>
      <Head title="Create Service" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Create Service
            </h1>
            <p className="text-muted-foreground mt-1">
              Add a new service to your offerings
            </p>
          </div>
          <Link href="/services">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>

        <ServiceForm isEditing={false} />
      </div>
    </AdminLayout>
  );
}
