import React from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Components/Admin/AdminLayout";
import { Button } from "@/Components/ui/button";
import StaffForm from "./StaffForm";

export default function CreateStaff() {
  return (
    <AdminLayout>
      <Head title="Add Staff Member" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Add Staff Member
            </h1>
            <p className="text-muted-foreground mt-1">
              Add a new team member to your staff
            </p>
          </div>
          <Link href="/staff">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>

        <StaffForm isEditing={false} />
      </div>
    </AdminLayout>
  );
}
