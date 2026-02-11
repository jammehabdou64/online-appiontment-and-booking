import React from "react";
import { useForm, Link } from "@inertiajs/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Switch } from "@/Components/ui/switch";
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

interface StaffFormProps {
  staff?: Staff;
  isEditing?: boolean;
}

export default function StaffForm({ staff, isEditing = false }: StaffFormProps) {
  const { data, setData, post, patch, processing, errors } = useForm({
    first_name: staff?.first_name || "",
    last_name: staff?.last_name || "",
    email: staff?.email || "",
    phone: staff?.phone || "",
    avatar: staff?.avatar || "",
    bio: staff?.bio || "",
    is_active: staff?.is_active !== undefined ? staff.is_active : true,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const onSuccess = () => {
      toast.success(
        isEditing ? "Staff member updated successfully" : "Staff member created successfully"
      );
    };

    const onError = () => {
      toast.error("Failed to save staff member");
    };

    if (isEditing && staff) {
      patch(`/staff/${staff.id}`, {
        onSuccess,
        onError,
      });
    } else {
      post("/staff", {
        onSuccess,
        onError,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff Member Details</CardTitle>
        <CardDescription>
          {isEditing
            ? "Update the staff member information"
            : "Fill in the information to add a new staff member"}
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
            <Label htmlFor="avatar">Avatar URL</Label>
            <Input
              id="avatar"
              value={data.avatar}
              onChange={(e) => setData("avatar", e.target.value)}
              placeholder="https://example.com/avatar.jpg"
            />
            {errors.avatar && (
              <p className="text-sm text-destructive">{errors.avatar}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Staff member bio..."
              value={data.bio}
              onChange={(e) => setData("bio", e.target.value)}
            />
            {errors.bio && (
              <p className="text-sm text-destructive">{errors.bio}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Active</Label>
              <p className="text-sm text-muted-foreground">
                Make this staff member available for scheduling
              </p>
            </div>
            <Switch
              checked={data.is_active}
              onCheckedChange={(checked) => setData("is_active", checked)}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Link href="/staff">
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
                ? "Update Staff Member"
                : "Add Staff Member"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
