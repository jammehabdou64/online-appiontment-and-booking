# Component Implementation Guide
## Quick Reference for Building the Dashboard

---

## File Structure

```
resources/
├── js/
│   ├── Pages/
│   │   ├── Auth/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── Onboarding.tsx
│   │   ├── Dashboard/
│   │   │   └── Index.tsx
│   │   ├── Appointments/
│   │   │   ├── Index.tsx
│   │   │   ├── Create.tsx
│   │   │   ├── Edit.tsx
│   │   │   └── Show.tsx
│   │   ├── Services/
│   │   │   ├── Index.tsx
│   │   │   ├── Create.tsx
│   │   │   └── Edit.tsx
│   │   ├── Staff/
│   │   │   ├── Index.tsx
│   │   │   ├── Create.tsx
│   │   │   ├── Edit.tsx
│   │   │   └── Availability.tsx
│   │   └── Settings/
│   │       └── Index.tsx
│   ├── Components/
│   │   ├── Layout/
│   │   │   ├── Layout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Header.tsx
│   │   ├── Appointments/
│   │   │   ├── AppointmentCard.tsx
│   │   │   ├── AppointmentForm.tsx
│   │   │   └── AppointmentDetails.tsx
│   │   ├── Services/
│   │   │   └── ServiceCard.tsx
│   │   ├── Staff/
│   │   │   └── StaffCard.tsx
│   │   └── Common/
│   │       ├── StatCard.tsx
│   │       ├── MiniCalendar.tsx
│   │       └── StatusBadge.tsx
│   └── app.tsx
└── css/
    └── app.css
```

---

## Core Layout Components

### Layout.tsx

```tsx
import { Sidebar } from '@/Components/Layout/Sidebar';
import { Header } from '@/Components/Layout/Header';

interface LayoutProps {
  children: React.ReactNode;
  flash?: {
    success?: string;
    error?: string;
  };
}

export default function Layout({ children, flash }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
```

### Sidebar.tsx

```tsx
import { Link } from '@inertiajs/react';
import { 
  LayoutDashboard, 
  Calendar, 
  Scissors, 
  Users, 
  Settings 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Appointments', href: '/appointments', icon: Calendar },
  { name: 'Services', href: '/services', icon: Scissors },
  { name: 'Staff', href: '/staff', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const currentPath = window.location.pathname;

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex h-16 items-center px-6 border-b border-slate-200">
          <h1 className="text-xl font-bold text-primary-600">Bookly</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => {
            const isActive = currentPath.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary-50 text-primary-600"
                    : "text-slate-700 hover:bg-slate-100"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
```

### Header.tsx

```tsx
import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center gap-4 px-6">
        {/* Search */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="search"
              placeholder="Search appointments, customers..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
```

---

## Dashboard Components

### Dashboard/Index.tsx

```tsx
import Layout from '@/Components/Layout/Layout';
import { StatCard } from '@/Components/Common/StatCard';
import { AppointmentCard } from '@/Components/Appointments/AppointmentCard';
import { MiniCalendar } from '@/Components/Common/MiniCalendar';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface DashboardProps {
  stats: {
    today: number;
    upcoming: number;
    completed: number;
  };
  todayAppointments: Array<{
    id: number;
    start_time: string;
    customer: { first_name: string; last_name: string };
    service: { name: string };
    status: string;
  }>;
}

export default function Dashboard({ stats, todayAppointments }: DashboardProps) {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600 mt-1">Welcome back! Here's what's happening today.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Today"
            value={stats.today}
            icon={Calendar}
            trend="+2 from yesterday"
          />
          <StatCard
            title="Upcoming"
            value={stats.upcoming}
            icon={CheckCircle}
            trend="Next 7 days"
          />
          <StatCard
            title="Completed"
            value={stats.completed}
            icon={CheckCircle}
            trend="This month"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Appointments */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Today's Appointments</h2>
                  <Link href="/appointments">
                    <Button variant="ghost" size="sm">View All</Button>
                  </Link>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {todayAppointments.length > 0 ? (
                  todayAppointments.map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                    <p>No appointments scheduled for today</p>
                    <Link href="/appointments/create">
                      <Button className="mt-4" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Appointment
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Quick Actions & Calendar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/appointments/create">
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    New Appointment
                  </Button>
                </Link>
                <Link href="/services/create">
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    New Service
                  </Button>
                </Link>
                <Link href="/staff/create">
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Staff
                  </Button>
                </Link>
              </div>
            </div>

            {/* Calendar Preview */}
            <MiniCalendar />
          </div>
        </div>
      </div>
    </Layout>
  );
}
```

### StatCard.tsx

```tsx
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
  variant?: 'default' | 'success' | 'warning';
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend,
  variant = 'default' 
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <Icon className={cn(
            "h-4 w-4",
            variant === 'success' && "text-emerald-500",
            variant === 'warning' && "text-amber-500",
            variant === 'default' && "text-slate-400"
          )} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        {trend && (
          <p className="text-xs text-slate-500 mt-1">{trend}</p>
        )}
      </CardContent>
    </Card>
  );
}
```

---

## Appointment Components

### AppointmentCard.tsx

```tsx
import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/Components/Common/StatusBadge';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Clock, User } from 'lucide-react';
import { format } from 'date-fns';

interface AppointmentCardProps {
  appointment: {
    id: number;
    start_time: string;
    end_time: string;
    customer: { first_name: string; last_name: string };
    service: { name: string };
    staff?: { first_name: string; last_name: string };
    status: string;
  };
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const startTime = new Date(appointment.start_time);
  const endTime = new Date(appointment.end_time);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-slate-400" />
              <span className="font-semibold">
                {format(startTime, 'h:mm a')} - {format(endTime, 'h:mm a')}
              </span>
              <StatusBadge status={appointment.status} />
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-slate-400" />
                <span className="font-medium">
                  {appointment.customer.first_name} {appointment.customer.last_name}
                </span>
              </div>
              <p className="text-sm text-slate-600 ml-6">
                {appointment.service.name}
              </p>
              {appointment.staff && (
                <p className="text-xs text-slate-500 ml-6">
                  with {appointment.staff.first_name} {appointment.staff.last_name}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Link href={`/appointments/${appointment.id}`}>
              <Button variant="ghost" size="sm">View</Button>
            </Link>
            <Link href={`/appointments/${appointment.id}/edit`}>
              <Button variant="ghost" size="sm">Edit</Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
```

### AppointmentForm.tsx (Sheet)

```tsx
import { useForm } from '@inertiajs/react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';

interface AppointmentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  services: Array<{ id: number; name: string; duration_minutes: number; price: number }>;
  staff: Array<{ id: number; first_name: string; last_name: string }>;
  customers: Array<{ id: number; first_name: string; last_name: string }>;
  appointment?: any; // For edit mode
}

export function AppointmentForm({ 
  open, 
  onOpenChange, 
  services, 
  staff, 
  customers,
  appointment 
}: AppointmentFormProps) {
  const { data, setData, post, put, processing, errors } = useForm({
    customer_id: appointment?.customer_id || '',
    service_id: appointment?.service_id || '',
    staff_id: appointment?.staff_id || '',
    start_time: appointment?.start_time || '',
    notes: appointment?.notes || '',
  });

  const selectedService = services.find(s => s.id === Number(data.service_id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (appointment) {
      put(`/appointments/${appointment.id}`);
    } else {
      post('/appointments');
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {appointment ? 'Edit Appointment' : 'New Appointment'}
          </SheetTitle>
          <SheetDescription>
            Create a new appointment for a customer.
          </SheetDescription>
        </SheetHeader>

        <Form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <FormField>
              <FormLabel>Customer *</FormLabel>
              <Select
                value={data.customer_id.toString()}
                onValueChange={(value) => setData('customer_id', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id.toString()}>
                      {customer.first_name} {customer.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.customer_id && (
                <FormMessage>{errors.customer_id}</FormMessage>
              )}
            </FormField>

            <FormField>
              <FormLabel>Service *</FormLabel>
              <Select
                value={data.service_id.toString()}
                onValueChange={(value) => setData('service_id', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id.toString()}>
                      {service.name} ({service.duration_minutes} min)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.service_id && (
                <FormMessage>{errors.service_id}</FormMessage>
              )}
            </FormField>

            {selectedService && (
              <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Duration:</span> {selectedService.duration_minutes} minutes
                </p>
                {selectedService.price && (
                  <p className="text-sm">
                    <span className="font-medium">Price:</span> ${(selectedService.price / 100).toFixed(2)}
                  </p>
                )}
              </div>
            )}

            {/* More fields... */}

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={processing}>
                {appointment ? 'Update' : 'Create'} Appointment
              </Button>
            </div>
          </div>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
```

---

## Common Utilities

### StatusBadge.tsx

```tsx
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
}

const statusConfig = {
  pending: { label: 'Pending', className: 'bg-amber-100 text-amber-800' },
  confirmed: { label: 'Confirmed', className: 'bg-blue-100 text-blue-800' },
  completed: { label: 'Completed', className: 'bg-emerald-100 text-emerald-800' },
  cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800' },
  no_show: { label: 'No Show', className: 'bg-slate-100 text-slate-800' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  
  return (
    <Badge className={cn('text-xs', config.className)}>
      {config.label}
    </Badge>
  );
}
```

---

## shadcn/ui Installation

```bash
# Install shadcn/ui
npx shadcn-ui@latest init

# Install required components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add select
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add table
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add calendar
npx shadcn-ui@latest add switch
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add form
npx shadcn-ui@latest add label
npx shadcn-ui@latest add textarea
```

---

## Key Dependencies

```json
{
  "dependencies": {
    "@inertiajs/react": "^1.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "lucide-react": "^0.300.0",
    "date-fns": "^2.30.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  }
}
```

---

This guide provides the foundation for implementing the dashboard UI. Start with the Layout components, then build out each page following the patterns shown here.

