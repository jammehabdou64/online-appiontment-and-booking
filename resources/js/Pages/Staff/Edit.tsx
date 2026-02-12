import React from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Components/Admin/AdminLayout";
import { Button } from "@/Components/ui/button";
import StaffForm from "./StaffForm";

interface EditStaffProps {
  staff: {
    id: number;
    first_name: string;
    last_name: string;
    email?: string;
    phone?: string;
    avatar?: string;
    bio?: string;
    is_active: boolean;
  };
}

export default function EditStaff({ staff }: EditStaffProps) {
  return (
    <AdminLayout>
      <Head title="Edit Staff Member" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Edit Staff Member
            </h1>
            <p className="text-muted-foreground mt-1">
              Update staff member details
            </p>
          </div>
          <Link href="/staff">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>

        <StaffForm staff={staff} isEditing={true} />
      </div>
    </AdminLayout>
  );
}
