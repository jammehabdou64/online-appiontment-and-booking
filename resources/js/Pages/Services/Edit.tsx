import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import AdminLayout from "@/Components/Admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Switch } from "@/Components/ui/switch";

interface EditServiceProps {
  service: {
    id: number;
    name: string;
    duration: number;
    price?: number;
    active: boolean;
    description?: string;
  };
}

export default function EditService({ service }: EditServiceProps) {
  const { data, setData, put, processing, errors } = useForm({
    name: service.name,
    duration: service.duration.toString(),
    price: service.price?.toString() || "",
    active: service.active,
    description: service.description || "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/services/${service.id}`);
  };

  return (
    <AdminLayout>
      <Head title="Edit Service" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Edit Service</h1>
            <p className="text-muted-foreground mt-1">
              Update service details
            </p>
          </div>
          <Link href="/services">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
            <CardDescription>
              Update the service information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Service Name *</Label>
                <Input
                  id="name"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  placeholder="e.g., Haircut & Styling"
                  required
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes) *</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    value={data.duration}
                    onChange={(e) => setData("duration", e.target.value)}
                    placeholder="60"
                    required
                  />
                  {errors.duration && (
                    <p className="text-sm text-destructive">{errors.duration}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (optional)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={data.price}
                    onChange={(e) => setData("price", e.target.value)}
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="text-sm text-destructive">{errors.price}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Service description..."
                  value={data.description}
                  onChange={(e) => setData("description", e.target.value)}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Active</Label>
                  <p className="text-sm text-muted-foreground">
                    Make this service available for booking
                  </p>
                </div>
                <Switch
                  checked={data.active}
                  onCheckedChange={(checked) => setData("active", checked)}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Link href="/services">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={processing}>
                  {processing ? "Updating..." : "Update Service"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

