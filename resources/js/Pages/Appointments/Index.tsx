import React, { useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Plus, Eye, Edit, X, Calendar, MoreHorizontal } from "lucide-react";
import AdminLayout from "@/Components/Admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
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
import { Pagination } from "@/Components/ui/pagination";

interface Appointment {
  id: number;
  customer?: {
    id: number;
    first_name: string;
    last_name: string;
  };
  service?: {
    id: number;
    name: string;
  };
  staff?: {
    id: number;
    first_name: string;
    last_name: string;
  } | null;
  start_time: string;
  end_time: string;
  status: string;
}

interface Props {
  appointments: {
    data: Appointment[];
    meta?: {
      current_page: number;
      per_page: number;
      total: number;
      total_pages?: number;
      last_page?: number;
    };
  };
  filters?: {
    staff_id?: string;
    customer_id?: string;
    status?: string;
    start_date?: string;
    end_date?: string;
  };
}

const getStatusBadge = (status: string) => {
  const variants: Record<string, "default" | "secondary" | "outline"> = {
    confirmed: "default",
    pending: "secondary",
    cancelled: "outline",
  };

  return (
    <Badge variant={variants[status] || "outline"} className="capitalize">
      {status}
    </Badge>
  );
};

export default function Appointments({ appointments, filters }: Props) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(
    null,
  );

  const appointmentList: Appointment[] = appointments?.data ?? [];

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const dateStr = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const timeStr = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return { date: dateStr, time: timeStr };
  };

  const getCustomerName = (appointment: Appointment) => {
    if (appointment?.customer) {
      return `${appointment.customer.first_name} ${appointment.customer.last_name}`;
    }
    return "Unknown Customer";
  };

  const getServiceName = (appointment: Appointment) => {
    return appointment?.service?.name || "Unknown Service";
  };

  const getStaffName = (appointment: Appointment) => {
    if (appointment?.staff) {
      return `${appointment.staff.first_name} ${appointment.staff.last_name}`;
    }
    return "Unassigned";
  };

  const handleDeleteClick = (id: number) => {
    setSelectedAppointment(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedAppointment) {
      router.delete(`/appointments/${selectedAppointment}`, {
        onSuccess: () => {
          setDeleteModalOpen(false);
          setSelectedAppointment(null);
        },
      });
    }
  };

  return (
    <AdminLayout>
      <Head title="Appointments" />
      <AlertDialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Appointment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this appointment for{" "}
              <span className="font-medium text-foreground">
                {selectedAppointment
                  ? getCustomerName(
                      appointmentList.find(
                        (a: Appointment) => a.id === selectedAppointment,
                      ) as Appointment,
                    )
                  : ""}
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
            <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
            <p className="text-muted-foreground mt-1">
              Manage all your appointments in one place
            </p>
          </div>
          <Link href="/appointments/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Appointment
            </Button>
          </Link>
        </div>

        {/* Appointments Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {appointmentList.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Staff</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointmentList.map((appointment: Appointment) => {
                    const { date, time } = formatDateTime(
                      appointment.start_time,
                    );
                    return (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">
                          {getCustomerName(appointment)}
                        </TableCell>
                        <TableCell>{getServiceName(appointment)}</TableCell>
                        <TableCell>{getStaffName(appointment)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {date} at {time}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(appointment.status)}
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
                                <Link
                                  href={`/appointments/${appointment.id}`}
                                  className="flex items-center"
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/appointments/${appointment.id}/edit`}
                                  className="flex items-center"
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() =>
                                  handleDeleteClick(appointment.id)
                                }
                              >
                                <X className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : null}
            {appointmentList.length > 0 && appointments?.meta && (
              <div className="mt-4 border-t border-border pt-4">
                <Pagination
                  meta={appointments.meta}
                  basePath="/appointments"
                  queryParams={{
                    staff_id: filters?.staff_id,
                    customer_id: filters?.customer_id,
                    status: filters?.status,
                    start_date: filters?.start_date,
                    end_date: filters?.end_date,
                  }}
                />
              </div>
            )}
            {appointmentList.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No appointments yet</p>
                <p className="text-sm mb-4">
                  Start by creating your first appointment
                </p>
                <Link href="/appointments/create">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Appointment
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
