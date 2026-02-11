import React from "react";
import { useForm, Link } from "@inertiajs/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { toast } from "sonner";

interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  notes?: string;
}

interface CustomerFormProps {
  customer?: Customer;
  isEditing?: boolean;
}

export default function CustomerForm({
  customer,
  isEditing = false,
}: CustomerFormProps) {
  const { data, setData, post, patch, processing, errors } = useForm({
    first_name: customer?.first_name || "",
    last_name: customer?.last_name || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
    notes: customer?.notes || "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const onSuccess = () => {
      toast.success(
        isEditing
          ? "Customer updated successfully"
          : "Customer created successfully",
      );
    };

    const onError = () => {
      toast.error("Failed to save customer");
    };

    if (isEditing && customer) {
      patch(`/customers/${customer.id}`, {
        onSuccess,
        onError,
      });
    } else {
      post("/customers", {
        onSuccess,
        onError,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Details</CardTitle>
        <CardDescription>
          {isEditing
            ? "Update the customer information"
            : "Fill in the information to add a new customer"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name *</Label>
              <Input
                id="first_name"
                value={data.first_name}
                onChange={(e) => setData("first_name", e.target.value)}
                placeholder="John"
                required
              />
              {errors.first_name && (
                <p className="text-sm text-destructive">{errors.first_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name *</Label>
              <Input
                id="last_name"
                value={data.last_name}
                onChange={(e) => setData("last_name", e.target.value)}
                placeholder="Doe"
                required
              />
              {errors.last_name && (
                <p className="text-sm text-destructive">{errors.last_name}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                value={data.phone}
                onChange={(e) => setData("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
                required
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <textarea
              id="notes"
              className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Additional notes about the customer..."
              value={data.notes}
              onChange={(e) => setData("notes", e.target.value)}
            />
            {errors.notes && (
              <p className="text-sm text-destructive">{errors.notes}</p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Link href="/customers">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={processing}>
              {processing
                ? isEditing
                  ? "Updating..."
                  : "Creating..."
                : isEditing
                  ? "Update Customer"
                  : "Add Customer"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
