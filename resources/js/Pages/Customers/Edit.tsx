import React from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Components/Admin/AdminLayout";
import { Button } from "@/Components/ui/button";
import CustomerForm from "./CustomerForm";

interface EditCustomerProps {
  customer: {
    id: number;
    first_name: string;
    last_name: string;
    email?: string;
    phone?: string;
    notes?: string;
  };
}

export default function EditCustomer({ customer }: EditCustomerProps) {
  return (
    <AdminLayout>
      <Head title="Edit Customer" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Edit Customer
            </h1>
            <p className="text-muted-foreground mt-1">
              Update customer details
            </p>
          </div>
          <Link href="/customers">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>

        <CustomerForm customer={customer} isEditing={true} />
      </div>
    </AdminLayout>
  );
}
