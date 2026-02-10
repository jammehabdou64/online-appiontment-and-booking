import React, { useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import AdminLayout from "@/Components/Admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Switch } from "@/Components/ui/switch";
import { Badge } from "@/Components/ui/badge";
import { X } from "lucide-react";

interface EditStaffProps {
  staff: {
    id: number;
    name: string;
    email: string;
    phone?: string;
    active: boolean;
    services?: Array<{ id: number; name: string }>;
  };
  services: Array<{ id: number; name: string }>;
}

export default function EditStaff({ staff, services }: EditStaffProps) {
  const [selectedServices, setSelectedServices] = useState<number[]>(
    staff.services?.map((s) => s.id) || []
  );

  const { data, setData, put, processing, errors } = useForm({
    name: staff.name,
    email: staff.email,
    phone: staff.phone || "",
    active: staff.active,
    service_ids: selectedServices,
  });

  const toggleService = (serviceId: number) => {
    const newServices = selectedServices.includes(serviceId)
      ? selectedServices.filter((id) => id !== serviceId)
      : [...selectedServices, serviceId];
    setSelectedServices(newServices);
    setData("service_ids", newServices);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/staff/${staff.id}`);
  };

  return (
    <AdminLayout>
      <Head title="Edit Staff Member" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Edit Staff Member</h1>
            <p className="text-muted-foreground mt-1">
              Update staff member details
            </p>
          </div>
          <Link href="/staff">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Staff Member Details</CardTitle>
            <CardDescription>
              Update the staff member information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    placeholder="john@example.com"
                    required
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={data.phone}
                    onChange={(e) => setData("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Assigned Services</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedServices.map((serviceId) => {
                    const service = services.find((s) => s.id === serviceId);
                    return service ? (
                      <Badge key={serviceId} variant="secondary" className="gap-1">
                        {service.name}
                        <button
                          type="button"
                          onClick={() => toggleService(serviceId)}
                          className="ml-1 hover:bg-secondary-foreground/20 rounded-full"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ) : null;
                  })}
                </div>
                <div className="flex flex-wrap gap-2">
                  {services
                    .filter((service) => !selectedServices.includes(service.id))
                    .map((service) => (
                      <Badge
                        key={service.id}
                        variant="outline"
                        className="cursor-pointer hover:bg-accent"
                        onClick={() => toggleService(service.id)}
                      >
                        {service.name}
                      </Badge>
                    ))}
                </div>
                {errors.service_ids && (
                  <p className="text-sm text-destructive">{errors.service_ids}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Active</Label>
                  <p className="text-sm text-muted-foreground">
                    Make this staff member available for appointments
                  </p>
                </div>
                <Switch
                  checked={data.active}
                  onCheckedChange={(checked) => setData("active", checked)}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Link href="/staff">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={processing}>
                  {processing ? "Updating..." : "Update Staff Member"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

