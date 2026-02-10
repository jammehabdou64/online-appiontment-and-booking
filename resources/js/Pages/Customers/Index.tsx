import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { Plus, Eye, Edit, Mail, Phone, Calendar, Trash2 } from "lucide-react";
import AdminLayout from "@/Components/Admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
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
import { DeleteModal } from "@/Components/DeleteModal";

// Mock data - replace with real data from props
const customers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 (555) 123-4567",
    appointmentCount: 12,
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael@example.com",
    phone: "+1 (555) 234-5678",
    appointmentCount: 8,
  },
  {
    id: 3,
    name: "Jessica Martinez",
    email: "jessica@example.com",
    phone: "+1 (555) 345-6789",
    appointmentCount: 15,
  },
  {
    id: 4,
    name: "David Thompson",
    email: "david@example.com",
    phone: "+1 (555) 456-7890",
    appointmentCount: 5,
  },
  {
    id: 5,
    name: "Amanda Lee",
    email: "amanda@example.com",
    phone: "+1 (555) 567-8901",
    appointmentCount: 20,
  },
  {
    id: 6,
    name: "Robert Kim",
    email: "robert@example.com",
    phone: "+1 (555) 678-9012",
    appointmentCount: 3,
  },
  {
    id: 7,
    name: "Emily White",
    email: "emily@example.com",
    phone: "+1 (555) 789-0123",
    appointmentCount: 9,
  },
];

export default function Customers() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setSelectedCustomer(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedCustomer) {
      router.delete(`/customers/${selectedCustomer}`, {
        onSuccess: () => {
          setDeleteModalOpen(false);
          setSelectedCustomer(null);
        },
      });
    }
  };

  return (
    <AdminLayout>
      <Head title="Customers" />
      <DeleteModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Customer"
        description="Are you sure you want to delete this customer?"
        itemName={selectedCustomer ? customers.find(c => c.id === selectedCustomer)?.name : undefined}
      />
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Customers</h1>
            <p className="text-muted-foreground mt-1">
              Manage your customer database
            </p>
          </div>
          <Link href="/customers/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </Link>
        </div>

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Customers</CardTitle>
          </CardHeader>
          <CardContent>
            {customers.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Appointments</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">
                        {customer.name}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {customer.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {customer.phone}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {customer.appointmentCount}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {customer.appointmentCount === 1
                              ? "appointment"
                              : "appointments"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/customers/${customer.id}`}
                                className="flex items-center"
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/customers/${customer.id}/edit`}
                                className="flex items-center"
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeleteClick(customer.id)}
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
                <Mail className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No customers yet</p>
                <p className="text-sm mb-4">
                  Start by adding your first customer
                </p>
                <Link href="/customers/create">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Customer
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

