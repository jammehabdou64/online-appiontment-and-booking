import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { Plus, Edit, Trash2, UserCheck, MoreHorizontal } from "lucide-react";
import AdminLayout from "@/Components/Admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Switch } from "@/Components/ui/switch";
import { Badge } from "@/Components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import { toast } from "sonner";

interface Staff {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  is_active: boolean;
}

interface StaffPageProps {
  staff: {
    data: Staff[];
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
};

export default function StaffList({ staff }: StaffPageProps) {
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const handleDeleteClick = (member: Staff) => {
    setSelectedStaff({
      id: member.id,
      name: `${member.first_name} ${member.last_name}`,
    });
    setDeleteAlertOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedStaff) {
      router.delete(`/staff/${selectedStaff.id}`, {
        onSuccess: () => {
          setDeleteAlertOpen(false);
          setSelectedStaff(null);
          toast.success(`Staff member "${selectedStaff.name}" deleted successfully`);
        },
        onError: () => {
          toast.error("Failed to delete staff member");
        },
      });
    }
  };

  return (
    <AdminLayout>
      <Head title="Staff" />
      <AlertDialog open={deleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Staff Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                "{selectedStaff?.name}"
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Staff</h1>
            <p className="text-muted-foreground mt-1">
              Manage your team members
            </p>
          </div>
          <Link href="/staff/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Staff Member
            </Button>
          </Link>
        </div>

        {/* Staff Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Staff Members</CardTitle>
          </CardHeader>
          <CardContent>
            {staff?.data && staff.data.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff Member</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.data.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={member.avatar || undefined} />
                            <AvatarFallback>
                              {getInitials(member.first_name, member.last_name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">
                              {member.first_name} {member.last_name}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {member.email || "-"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {member.phone || "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={member.is_active}
                            onCheckedChange={(checked) => {
                              // Handle toggle
                              console.log(
                                `Toggle staff ${member.id} to ${checked}`
                              );
                            }}
                          />
                          <span className="text-sm text-muted-foreground">
                            {member.is_active ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/staff/${member.id}/edit`}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteClick(member)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <UserCheck className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No staff members yet</p>
                <p className="text-sm mb-4">
                  Add your first staff member to get started
                </p>
                <Link href="/staff/create">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Staff Member
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

