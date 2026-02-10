import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { Plus, Edit, Trash2, UserCheck, UserX } from "lucide-react";
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
import { DeleteModal } from "@/Components/DeleteModal";

// Mock data - replace with real data from props
const staff = [
  {
    id: 1,
    name: "Emma Wilson",
    email: "emma@example.com",
    services: ["Haircut & Styling", "Haircut"],
    availability: "available",
    active: true,
    avatar: null,
  },
  {
    id: 2,
    name: "Dr. Smith",
    email: "smith@example.com",
    services: ["Consultation"],
    availability: "available",
    active: true,
    avatar: null,
  },
  {
    id: 3,
    name: "Lisa Brown",
    email: "lisa@example.com",
    services: ["Manicure", "Pedicure"],
    availability: "busy",
    active: true,
    avatar: null,
  },
  {
    id: 4,
    name: "John Doe",
    email: "john@example.com",
    services: ["Massage Therapy", "Full Body Massage"],
    availability: "available",
    active: false,
    avatar: null,
  },
  {
    id: 5,
    name: "Sarah Davis",
    email: "sarah@example.com",
    services: ["Facial Treatment"],
    availability: "available",
    active: true,
    avatar: null,
  },
];

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getAvailabilityBadge = (status: string) => {
  const variants: Record<string, "default" | "secondary" | "outline"> = {
    available: "default",
    busy: "secondary",
    unavailable: "outline",
  };

  return (
    <Badge variant={variants[status] || "outline"} className="capitalize">
      {status}
    </Badge>
  );
};

export default function Staff() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setSelectedStaff(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedStaff) {
      router.delete(`/staff/${selectedStaff}`, {
        onSuccess: () => {
          setDeleteModalOpen(false);
          setSelectedStaff(null);
        },
      });
    }
  };

  return (
    <AdminLayout>
      <Head title="Staff" />
      <DeleteModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Staff Member"
        description="Are you sure you want to delete this staff member?"
        itemName={selectedStaff ? staff.find(s => s.id === selectedStaff)?.name : undefined}
      />
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
            {staff.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff Member</TableHead>
                    <TableHead>Assigned Services</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={member.avatar || undefined} />
                            <AvatarFallback>
                              {getInitials(member.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">
                              {member.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {member.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {member.services.map((service, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getAvailabilityBadge(member.availability)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={member.active}
                            onCheckedChange={(checked) => {
                              // Handle toggle
                              console.log(
                                `Toggle staff ${member.id} to ${checked}`
                              );
                            }}
                          />
                          <span className="text-sm text-muted-foreground">
                            {member.active ? (
                              <span className="flex items-center gap-1">
                                <UserCheck className="h-4 w-4 text-primary" />
                                Active
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <UserX className="h-4 w-4 text-muted-foreground" />
                                Inactive
                              </span>
                            )}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/staff/${member.id}/edit`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                            onClick={() => handleDeleteClick(member.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
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

