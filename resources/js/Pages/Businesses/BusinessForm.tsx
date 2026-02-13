import React from "react";
import { useForm } from "@inertiajs/react";
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
import { Switch } from "@/Components/ui/switch";
import { toast } from "sonner";

export default function BusinessForm() {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    description: "",
    primary_phone: "",
    secondary_phone: "",
    address: "",
    email: "",
    website: "",
    logo: "",
    currency: "USD",
    language: "en",
    timezone: "UTC",
    is_active: true,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    post("/businesses", {
      onSuccess: () => {
        toast.success("Business created successfully");
      },
      onError: () => {
        toast.error("Failed to create business. Please check the form.");
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Details</CardTitle>
        <CardDescription>
          Enter your business information to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Business Name *</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              placeholder="e.g., My Salon & Spa"
              required
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="A short description of your business for the public listing"
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="primary_phone">Primary Phone *</Label>
              <Input
                id="primary_phone"
                type="tel"
                value={data.primary_phone}
                onChange={(e) => setData("primary_phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
                required
              />
              {errors.primary_phone && (
                <p className="text-sm text-destructive">
                  {errors.primary_phone}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondary_phone">Secondary Phone</Label>
              <Input
                id="secondary_phone"
                type="tel"
                value={data.secondary_phone}
                onChange={(e) => setData("secondary_phone", e.target.value)}
                placeholder="+1 (555) 987-6543"
              />
              {errors.secondary_phone && (
                <p className="text-sm text-destructive">
                  {errors.secondary_phone}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={data.address}
              onChange={(e) => setData("address", e.target.value)}
              placeholder="123 Main St, City, State"
            />
            {errors.address && (
              <p className="text-sm text-destructive">{errors.address}</p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                placeholder="contact@business.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={data.website}
                onChange={(e) => setData("website", e.target.value)}
                placeholder="https://www.example.com"
              />
              {errors.website && (
                <p className="text-sm text-destructive">{errors.website}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Logo URL</Label>
            <Input
              id="logo"
              value={data.logo}
              onChange={(e) => setData("logo", e.target.value)}
              placeholder="https://example.com/logo.png"
            />
            {errors.logo && (
              <p className="text-sm text-destructive">{errors.logo}</p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                value={data.currency}
                onChange={(e) => setData("currency", e.target.value)}
                placeholder="USD"
                maxLength={3}
              />
              {errors.currency && (
                <p className="text-sm text-destructive">{errors.currency}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Input
                id="language"
                value={data.language}
                onChange={(e) => setData("language", e.target.value)}
                placeholder="en"
              />
              {errors.language && (
                <p className="text-sm text-destructive">{errors.language}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                value={data.timezone}
                onChange={(e) => setData("timezone", e.target.value)}
                placeholder="UTC"
              />
              {errors.timezone && (
                <p className="text-sm text-destructive">{errors.timezone}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Active</Label>
              <p className="text-sm text-muted-foreground">
                Make your business visible and available for bookings
              </p>
            </div>
            <Switch
              checked={data.is_active}
              onCheckedChange={(checked) => setData("is_active", checked)}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={processing}>
              {processing ? "Creating..." : "Create Business"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
