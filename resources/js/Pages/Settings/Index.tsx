import React from "react";
import { Head } from "@inertiajs/react";
import { Building2, Calendar, Bell, Lock } from "lucide-react";
import AdminLayout from "@/Components/Admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Switch } from "@/Components/ui/switch";
import { Separator } from "@/Components/ui/separator";
import { Badge } from "@/Components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

export default function Settings() {
  return (
    <AdminLayout>
      <Head title="Settings" />
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your business settings and preferences
          </p>
        </div>

        {/* Business Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <CardTitle>Business Information</CardTitle>
            </div>
            <CardDescription>
              Update your business details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="business-name">Business Name</Label>
                <Input
                  id="business-name"
                  defaultValue="My Business"
                  placeholder="Enter business name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business-email">Business Email</Label>
                <Input
                  id="business-email"
                  type="email"
                  defaultValue="contact@mybusiness.com"
                  placeholder="Enter business email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business-phone">Business Phone</Label>
                <Input
                  id="business-phone"
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  placeholder="Enter business phone"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business-address">Business Address</Label>
                <Input
                  id="business-address"
                  defaultValue="123 Main St, City, State 12345"
                  placeholder="Enter business address"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="business-description">Business Description</Label>
              <textarea
                id="business-description"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe your business..."
                defaultValue="We provide excellent service to our customers."
              />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Booking Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <CardTitle>Booking Settings</CardTitle>
            </div>
            <CardDescription>
              Configure how customers can book appointments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Online Bookings</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable customers to book appointments online
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="booking-advance">Advance Booking Period</Label>
                <Select defaultValue="30">
                  <SelectTrigger id="booking-advance">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  How far in advance customers can book
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cancellation-policy">Cancellation Policy</Label>
                <Select defaultValue="24">
                  <SelectTrigger id="cancellation-policy">
                    <SelectValue placeholder="Select policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour before</SelectItem>
                    <SelectItem value="24">24 hours before</SelectItem>
                    <SelectItem value="48">48 hours before</SelectItem>
                    <SelectItem value="72">72 hours before</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Minimum notice required for cancellations
                </p>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Confirmation</Label>
                  <p className="text-sm text-muted-foreground">
                    Appointments require manual confirmation
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Send Reminder Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically send reminder emails to customers
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Availability Rules */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <CardTitle>Availability Rules</CardTitle>
            </div>
            <CardDescription>
              Set your default business hours and availability
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="opening-time">Opening Time</Label>
                <Input
                  id="opening-time"
                  type="time"
                  defaultValue="09:00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="closing-time">Closing Time</Label>
                <Input
                  id="closing-time"
                  type="time"
                  defaultValue="17:00"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Business Days</Label>
              <div className="flex flex-wrap gap-2">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <Badge
                    key={day}
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80"
                  >
                    {day}
                  </Badge>
                ))}
              </div>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle>Notifications</CardTitle>
              <Badge variant="outline" className="ml-auto">
                Coming Soon
              </Badge>
            </div>
            <CardDescription>
              Configure notification preferences (coming soon)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <div className="text-center">
                <Lock className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">This feature is coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

