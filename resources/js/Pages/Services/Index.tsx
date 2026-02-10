import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { Plus, Edit, Trash2, Clock, DollarSign } from "lucide-react";
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
import { DeleteModal } from "@/Components/DeleteModal";

// Mock data - replace with real data from props
const services = [
  {
    id: 1,
    name: "Haircut & Styling",
    duration: 60,
    price: null,
    active: true,
  },
  {
    id: 2,
    name: "Consultation",
    duration: 30,
    price: null,
    active: true,
  },
  {
    id: 3,
    name: "Manicure",
    duration: 45,
    price: null,
    active: true,
  },
  {
    id: 4,
    name: "Massage Therapy",
    duration: 90,
    price: null,
    active: false,
  },
  {
    id: 5,
    name: "Facial Treatment",
    duration: 75,
    price: null,
    active: true,
  },
  {
    id: 6,
    name: "Pedicure",
    duration: 60,
    price: null,
    active: true,
  },
];

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins > 0 ? `${mins}m` : ""}`;
  }
  return `${mins}m`;
};

export default function Services() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setSelectedService(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedService) {
      router.delete(`/services/${selectedService}`, {
        onSuccess: () => {
          setDeleteModalOpen(false);
          setSelectedService(null);
        },
      });
    }
  };

  return (
    <AdminLayout>
      <Head title="Services" />
      <DeleteModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Service"
        description="Are you sure you want to delete this service?"
        itemName={selectedService ? services.find(s => s.id === selectedService)?.name : undefined}
      />
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
                              console.log(`Toggle service ${service.id} to ${checked}`);
                            }}
                          />
                          <span className="text-sm text-muted-foreground">
                            {service.active ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/services/${service.id}/edit`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                            onClick={() => handleDeleteClick(service.id)}
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

