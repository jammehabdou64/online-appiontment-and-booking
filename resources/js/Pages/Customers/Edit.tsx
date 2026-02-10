import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import AdminLayout from "@/Components/Admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

interface EditCustomerProps {
  customer: {
    id: number;
    name: string;
    email: string;
    phone?: string;
  };
}

export default function EditCustomer({ customer }: EditCustomerProps) {
  const { data, setData, put, processing, errors } = useForm({
    name: customer.name,
    email: customer.email,
    phone: customer.phone || "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/customers/${customer.id}`);
  };

  return (
    <AdminLayout>
      <Head title="Edit Customer" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Edit Customer</h1>
            <p className="text-muted-foreground mt-1">
              Update customer details
            </p>
          </div>
          <Link href="/customers">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Customer Details</CardTitle>
            <CardDescription>
              Update the customer information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
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

              <div className="grid gap-4 md:grid-cols-2">
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

              <div className="flex justify-end gap-2">
                <Link href="/customers">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={processing}>
                  {processing ? "Updating..." : "Update Customer"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

