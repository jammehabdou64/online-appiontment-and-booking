import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import {
  Plus,
  Edit,
  Trash2,
  Clock,
  DollarSign,
  MoreHorizontal,
} from "lucide-react";
import AdminLayout from "@/Components/Admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Switch } from "@/Components/ui/switch";
import { Badge } from "@/Components/ui/badge";
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

interface Service {
  id: number;
  name: string;
  duration: number;
  price?: number | null;
  active: boolean;
  description?: string;
}

interface ServicesPageProps {
  services: Service[];
}

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins > 0 ? `${mins}m` : ""}`;
  }
  return `${mins}m`;
};

export default function Services({ services }: ServicesPageProps) {
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const handleDeleteClick = (service: { id: number; name: string }) => {
    setSelectedService(service);
    setDeleteAlertOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedService) {
      router.delete(`/services/${selectedService.id}`, {
        onSuccess: () => {
          setDeleteAlertOpen(false);
          setSelectedService(null);
          toast.success(
            `Service "${selectedService.name}" deleted successfully`,
          );
        },
        onError: () => {
          toast.error("Failed to delete service");
        },
      });
    }
  };

  return (
    <AdminLayout>
      <Head title="Services" />
      <AlertDialog open={deleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Service</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                "{selectedService?.name}"
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
            <h1 className="text-3xl font-bold text-foreground">Services</h1>
            <p className="text-muted-foreground mt-1">
              Manage your service offerings
            </p>
          </div>
          <Link href="/services/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Service
            </Button>
          </Link>
        </div>

        {/* Services Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Services</CardTitle>
          </CardHeader>
          <CardContent>
            {services.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service Name</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">
                        {service.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{formatDuration(service.duration)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {service.price ? (
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span>${service.price}</span>
                          </div>
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            Free
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={service.active}
                            onCheckedChange={(checked) => {
                              // Handle toggle
                              console.log(
                                `Toggle service ${service.id} to ${checked}`,
                              );
                            }}
                          />
                          <span className="text-sm text-muted-foreground">
                            {service.active ? "Active" : "Inactive"}
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
                              <Link href={`/services/${service.id}/edit`}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleDeleteClick({
                                  id: service.id,
                                  name: service.name,
                                })
                              }
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
                <Clock className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No services yet</p>
                <p className="text-sm mb-4">
                  Create your first service to get started
                </p>
                <Link href="/services/create">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Service
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
