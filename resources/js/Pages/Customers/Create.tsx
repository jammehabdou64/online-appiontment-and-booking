import React from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Components/Admin/AdminLayout";
import { Button } from "@/Components/ui/button";
import CustomerForm from "./CustomerForm";

export default function CreateCustomer() {
  return (
    <AdminLayout>
      <Head title="Add Customer" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Add Customer</h1>
            <p className="text-muted-foreground mt-1">
              Add a new customer to your database
            </p>
          </div>
          <Link href="/customers">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>

        <CustomerForm isEditing={false} />
      </div>
    </AdminLayout>
  );
}

