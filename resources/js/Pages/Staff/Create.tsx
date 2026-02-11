import React from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Components/Admin/AdminLayout";
import { Button } from "@/Components/ui/button";
import StaffForm from "./StaffForm";

export default function CreateStaff() {
  return (
    <AdminLayout>
      <Head title="Add Staff Member" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Add Staff Member</h1>
            <p className="text-muted-foreground mt-1">
              Add a new team member to your staff
            </p>
          </div>
          <Link href="/staff">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>

        <StaffForm isEditing={false} />
      </div>
    </AdminLayout>
  );
}

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
                    const service = availableServices.find((s) => s.id === serviceId);
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
                  {availableServices
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
                  {processing ? "Creating..." : "Add Staff Member"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

