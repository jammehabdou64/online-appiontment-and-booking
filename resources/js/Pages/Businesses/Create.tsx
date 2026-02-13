import React from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Components/Admin/AdminLayout";
import BusinessForm from "./BusinessForm";

export default function CreateBusiness() {
  return (
    <AdminLayout>
      <Head title="Create Business" />
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Create Your Business
          </h1>
          <p className="text-muted-foreground mt-1">
            Set up your business profile to start managing appointments and
            services
          </p>
        </div>

        <BusinessForm />
      </div>
    </AdminLayout>
  );
}
