# Admin Dashboard UI Design System
## Multi-Tenant Appointment & Booking SaaS

---

## Design Philosophy

**"Clarity Through Simplicity"**

- **Purpose-Driven**: Every element serves a clear business function
- **Time-Aware**: Emphasizes "now" and "next" - appointments are time-sensitive
- **Context-Rich**: Business context is always visible
- **Action-Oriented**: Primary actions are prominent, secondary actions are accessible

---

## Visual Identity

### Color Palette

```css
/* Base Colors - Slate Foundation */
--slate-50: #f8fafc
--slate-100: #f1f5f9
--slate-200: #e2e8f0
--slate-300: #cbd5e1
--slate-400: #94a3b8
--slate-500: #64748b
--slate-600: #475569
--slate-700: #334155
--slate-800: #1e293b
--slate-900: #0f172a

/* Primary Accent - Professional Blue */
--primary-50: #eff6ff
--primary-100: #dbeafe
--primary-500: #3b82f6  /* Main brand color */
--primary-600: #2563eb
--primary-700: #1d4ed8

/* Semantic Colors */
--success: #10b981 (emerald-500)
--warning: #f59e0b (amber-500)
--error: #ef4444 (red-500)
--info: #06b6d4 (cyan-500)
```

### Typography Scale

```css
/* Headings */
h1: text-3xl font-bold (30px) - Page titles
h2: text-2xl font-semibold (24px) - Section headers
h3: text-xl font-semibold (20px) - Card titles
h4: text-lg font-medium (18px) - Subsection headers

/* Body */
body: text-base (16px) - Default text
small: text-sm (14px) - Secondary text
tiny: text-xs (12px) - Labels, timestamps
```

### Spacing System

```css
/* Consistent spacing scale */
--space-1: 0.25rem (4px)
--space-2: 0.5rem (8px)
--space-3: 0.75rem (12px)
--space-4: 1rem (16px)
--space-6: 1.5rem (24px)
--space-8: 2rem (32px)
--space-12: 3rem (48px)
```

---

## Layout Structure

### Main Layout Component

```tsx
// Layout.tsx - Root layout for all authenticated pages
<Layout>
  <Sidebar /> {/* Fixed left sidebar */}
  <div className="flex-1 flex flex-col">
    <Header /> {/* Top navigation bar */}
    <main className="flex-1 p-6 lg:p-8 bg-slate-50">
      {children} {/* Inertia page content */}
    </main>
  </div>
</Layout>
```

**Key Features:**
- Sidebar: 256px wide, fixed on desktop, collapsible
- Header: 64px height, sticky top
- Main content: Flexible, with consistent padding
- Mobile: Sidebar becomes drawer/sheet

---

## Page Designs

### 1. Authentication Pages

#### Login Page

**Layout:**
```
┌─────────────────────────────────────┐
│                                     │
│         [Logo/Brand]                │
│                                     │
│    ┌─────────────────────┐         │
│    │                     │         │
│    │   Login Form        │         │
│    │                     │         │
│    │   Email             │         │
│    │   Password          │         │
│    │   [Login Button]    │         │
│    │                     │         │
│    │   Forgot Password?  │         │
│    │                     │         │
│    └─────────────────────┘         │
│                                     │
│    New here? [Register]             │
│                                     │
└─────────────────────────────────────┘
```

**Components:**
- `Card` (shadcn) - Form container
- `Input` (shadcn) - Email/password fields
- `Button` (shadcn) - Primary action
- `Label` (shadcn) - Form labels

**Tailwind Pattern:**
```tsx
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
  <Card className="w-full max-w-md shadow-xl">
    <CardHeader className="space-y-1 text-center">
      <h1 className="text-3xl font-bold">Welcome Back</h1>
      <p className="text-slate-600">Sign in to your account</p>
    </CardHeader>
    <CardContent>
      {/* Form fields */}
    </CardContent>
  </Card>
</div>
```

**UX Rationale:**
- Centered, focused layout reduces distraction
- Single-column form is scannable
- Clear hierarchy: Logo → Title → Form → Secondary action
- Gradient background adds subtle depth without noise

---

#### Register Page

**Similar to Login but:**
- Two-step: Account creation → Business setup
- Or single form with business name field
- Auto-redirect to onboarding after registration

---

#### Onboarding Page (Create Business)

**Layout:**
```
┌─────────────────────────────────────┐
│  [Progress: Step 1 of 3]           │
│                                     │
│  ┌─────────────────────┐           │
│  │ Business Details    │           │
│  │                     │           │
│  │ Business Name *     │           │
│  │ Slug (auto-gen)     │           │
│  │ Primary Phone *     │           │
│  │ Email               │           │
│  │                     │           │
│  │ [Continue]          │           │
│  └─────────────────────┘           │
└─────────────────────────────────────┘
```

**Components:**
- `Progress` (shadcn) - Step indicator
- `Card` - Form container
- Multi-step form with Inertia page transitions

**UX Rationale:**
- Progress indicator reduces abandonment
- Focused, one-step-at-a-time approach
- Clear "Continue" CTA, "Back" available

---

### 2. Dashboard (Home)

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  Dashboard                          [Date Picker]│
├─────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │ Today    │ │ Upcoming│ │ Completed│        │
│  │   12     │ │   8     │ │   24     │        │
│  └──────────┘ └──────────┘ └──────────┘        │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │ Today's Appointments                    │   │
│  │                                         │   │
│  │ 09:00  John Doe - Haircut              │   │
│  │        [View] [Edit]                   │   │
│  │                                         │   │
│  │ 10:30  Jane Smith - Consultation      │   │
│  │        [View] [Edit]                   │   │
│  │                                         │   │
│  │ [View All Appointments →]              │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  ┌──────────────────┐ ┌──────────────────┐    │
│  │ Quick Actions    │ │ Calendar Preview │    │
│  │                  │ │                  │    │
│  │ [+ New Booking]  │ │  [Mini Calendar] │    │
│  │ [+ New Service]  │ │                  │    │
│  │ [+ Add Staff]    │ │                  │    │
│  └──────────────────┘ └──────────────────┘    │
└─────────────────────────────────────────────────┘
```

**Components:**
- `Card` - Stats cards and content sections
- `Badge` (shadcn) - Status indicators
- `Button` - Quick actions
- `Table` (shadcn) - Appointment list (optional)
- Custom `MiniCalendar` component

**Tailwind Pattern:**
```tsx
<div className="space-y-6">
  {/* Stats Grid */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>Today</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">12</div>
      </CardContent>
    </Card>
    {/* ... more stats */}
  </div>

  {/* Today's Appointments */}
  <Card>
    <CardHeader>
      <CardTitle>Today's Appointments</CardTitle>
    </CardHeader>
    <CardContent>
      {/* Appointment list */}
    </CardContent>
  </Card>
</div>
```

**UX Rationale:**
- **Time-First**: Today's appointments are primary focus
- **Quick Stats**: At-a-glance metrics without navigation
- **Action-Oriented**: Quick actions reduce clicks
- **Calendar Preview**: Visual context for upcoming week

---

### 3. Appointments

#### List View

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  Appointments              [+ New Appointment]  │
├─────────────────────────────────────────────────┤
│  [Filters: Date | Staff | Status | Search]     │
├─────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────┐  │
│  │ Time  │ Customer │ Service │ Staff │ ...│  │
│  ├─────────────────────────────────────────┤  │
│  │ 09:00 │ John Doe │ Haircut │ Sarah │ ...│  │
│  │ 10:30 │ Jane S.  │ Color   │ Mike  │ ...│  │
│  │ 14:00 │ Bob W.   │ Cut     │ Sarah │ ...│  │
│  └─────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

**Components:**
- `DataTable` (shadcn) - Sortable, filterable table
- `Select` (shadcn) - Filter dropdowns
- `Input` - Search field
- `Button` - New appointment CTA
- `Badge` - Status indicators

**Tailwind Pattern:**
```tsx
<div className="space-y-4">
  {/* Header with Actions */}
  <div className="flex items-center justify-between">
    <h1 className="text-3xl font-bold">Appointments</h1>
    <Button>
      <Plus className="mr-2 h-4 w-4" />
      New Appointment
    </Button>
  </div>

  {/* Filters */}
  <Card>
    <CardContent className="pt-6">
      <div className="flex gap-4 flex-wrap">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Staff" />
          </SelectTrigger>
        </Select>
        {/* More filters */}
      </div>
    </CardContent>
  </Card>

  {/* Table */}
  <Card>
    <CardContent className="p-0">
      <Table>
        {/* Table rows */}
      </Table>
    </CardContent>
  </Card>
</div>
```

**UX Rationale:**
- **Filter Bar**: Always visible, reduces cognitive load
- **Table View**: Efficient for scanning many appointments
- **Inline Actions**: Quick access to common actions
- **Status Colors**: Visual status at a glance

---

#### Create/Edit Appointment Form

**Layout:**
```
┌─────────────────────────────────────┐
│  New Appointment          [X Close] │
├─────────────────────────────────────┤
│  ┌─────────────────────┐            │
│  │ Customer *          │            │
│  │ [Select or Create]  │            │
│  │                     │            │
│  │ Service *           │            │
│  │ [Dropdown]          │            │
│  │                     │            │
│  │ Staff               │            │
│  │ [Dropdown]          │            │
│  │                     │            │
│  │ Date & Time *       │            │
│  │ [Date Picker]       │            │
│  │ [Time Picker]       │            │
│  │                     │            │
│  │ Duration: 30 min    │            │
│  │ Price: $50          │            │
│  │                     │            │
│  │ Notes               │            │
│  │ [Textarea]          │            │
│  │                     │            │
│  │ [Cancel] [Save]     │            │
│  └─────────────────────┘            │
└─────────────────────────────────────┘
```

**Components:**
- `Sheet` or `Dialog` (shadcn) - Form container (side panel preferred)
- `Form` (shadcn) - Form wrapper with validation
- `Select` - Dropdowns
- `Calendar` (shadcn) - Date picker
- `Textarea` (shadcn) - Notes field
- `Button` - Actions

**Tailwind Pattern:**
```tsx
<Sheet open={isOpen} onOpenChange={setIsOpen}>
  <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
    <SheetHeader>
      <SheetTitle>New Appointment</SheetTitle>
    </SheetHeader>
    <Form>
      <div className="space-y-4 py-4">
        <FormField>
          <FormLabel>Customer</FormLabel>
          <Select>
            {/* Customer selection */}
          </Select>
        </FormField>
        {/* More fields */}
      </div>
      <SheetFooter>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Create Appointment</Button>
      </SheetFooter>
    </Form>
  </SheetContent>
</Sheet>
```

**UX Rationale:**
- **Side Panel**: Doesn't block context, feels lightweight
- **Progressive Disclosure**: Show duration/price after service selection
- **Smart Defaults**: Pre-fill current date/time, suggest next available slot
- **Validation**: Real-time feedback, clear error messages

---

#### Appointment Details

**Layout:**
```
┌─────────────────────────────────────┐
│  Appointment Details      [Edit] [X]│
├─────────────────────────────────────┤
│  ┌─────────────────────┐            │
│  │ Status: Confirmed   │            │
│  │                     │            │
│  │ Customer            │            │
│  │ John Doe            │            │
│  │ john@example.com    │            │
│  │ +1 234-567-8900     │            │
│  │                     │            │
│  │ Service             │            │
│  │ Haircut - 30 min    │            │
│  │ $50                 │            │
│  │                     │            │
│  │ Staff               │            │
│  │ Sarah Johnson       │            │
│  │                     │            │
│  │ Date & Time         │            │
│  │ Feb 15, 2024        │            │
│  │ 10:00 AM - 10:30 AM │            │
│  │                     │            │
│  │ Notes               │            │
│  │ Customer prefers... │            │
│  │                     │            │
│  │ [Cancel] [Reschedule]│           │
│  └─────────────────────┘            │
└─────────────────────────────────────┘
```

**Components:**
- `Sheet` - Details panel
- `Badge` - Status
- `Separator` (shadcn) - Visual dividers
- `Button` - Actions

**UX Rationale:**
- **Read-First**: Information hierarchy, easy to scan
- **Action Grouping**: Primary actions (Edit, Cancel) prominent
- **Contact Info**: Quick access to customer details
- **Status Prominence**: Color-coded badge for quick recognition

---

### 4. Services

#### Services List

**Layout:**
```
┌─────────────────────────────────────┐
│  Services            [+ New Service]│
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐   │
│  │ Name      │ Duration │ Price │   │
│  ├─────────────────────────────┤   │
│  │ Haircut   │ 30 min   │ $50  │   │
│  │ Color     │ 60 min   │ $120 │   │
│  │ Styling   │ 45 min   │ $80  │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

**Components:**
- `Card` - Service cards (alternative to table)
- `Table` - List view option
- `Badge` - Active/inactive status
- `Button` - Actions

**UX Rationale:**
- **Simple List**: Services are straightforward, no need for complex views
- **Key Info Visible**: Duration and price are most important
- **Quick Edit**: Inline or modal edit for speed

---

#### Service Form (Create/Edit)

**Layout:**
```
┌─────────────────────────────────────┐
│  New Service            [X Close]   │
├─────────────────────────────────────┤
│  ┌─────────────────────┐            │
│  │ Name *              │            │
│  │ [Input]             │            │
│  │                     │            │
│  │ Description         │            │
│  │ [Textarea]          │            │
│  │                     │            │
│  │ Duration *          │            │
│  │ [30] minutes        │            │
│  │                     │            │
│  │ Price               │            │
│  │ $ [50.00]           │            │
│  │                     │            │
│  │ Buffer Time         │            │
│  │ [10] minutes        │            │
│  │                     │            │
│  │ Advance Notice      │            │
│  │ [24] hours          │            │
│  │                     │            │
│  │ Active              │            │
│  │ [Toggle]            │            │
│  │                     │            │
│  │ [Cancel] [Save]     │            │
│  └─────────────────────┘            │
└─────────────────────────────────────┘
```

**Components:**
- `Sheet` - Form panel
- `Input` - Text fields
- `Textarea` - Description
- `Switch` (shadcn) - Active toggle
- `Form` - Validation wrapper

**UX Rationale:**
- **Logical Grouping**: Basic info → Pricing → Rules
- **Helpful Defaults**: Suggest common durations (15, 30, 60 min)
- **Clear Labels**: Explain buffer time and advance notice

---

### 5. Staff

#### Staff List

**Layout:**
```
┌─────────────────────────────────────┐
│  Staff                [+ Add Staff] │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐   │
│  │ Avatar │ Name    │ Email    │   │
│  ├─────────────────────────────┤   │
│  │ [IMG]  │ Sarah J │ sarah@.. │   │
│  │ [IMG]  │ Mike T  │ mike@... │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

**Components:**
- `Table` - Staff list
- `Avatar` (shadcn) - Profile images
- `Badge` - Active status
- `DropdownMenu` (shadcn) - Row actions

**UX Rationale:**
- **Visual Identity**: Avatars help recognition
- **Contact Info**: Email visible for quick reference
- **Actions Menu**: Edit, Deactivate, View Availability

---

#### Staff Form

**Similar to Service form but includes:**
- First/Last name
- Email, Phone
- Avatar upload
- Bio/Notes
- Link to User account (optional)

---

#### Staff Availability Management

**Layout:**
```
┌─────────────────────────────────────┐
│  Sarah's Availability               │
├─────────────────────────────────────┤
│  ┌─────────────────────┐            │
│  │ Weekly Schedule     │            │
│  │                     │            │
│  │ Mon: 9:00 - 17:00  │ [Edit]     │
│  │ Tue: 9:00 - 17:00  │ [Edit]     │
│  │ Wed: 9:00 - 17:00  │ [Edit]     │
│  │ Thu: 9:00 - 17:00  │ [Edit]     │
│  │ Fri: 9:00 - 17:00  │ [Edit]     │
│  │ Sat: Closed        │ [Edit]     │
│  │ Sun: Closed        │ [Edit]     │
│  │                     │            │
│  │ [+ Add Time Off]    │            │
│  └─────────────────────┘            │
│                                     │
│  ┌─────────────────────┐            │
│  │ Time Off            │            │
│  │                     │            │
│  │ Feb 20 - Feb 22     │            │
│  │ Vacation            │            │
│  │                     │            │
│  └─────────────────────┘            │
└─────────────────────────────────────┘
```

**Components:**
- `Card` - Schedule sections
- `Button` - Edit actions
- `Dialog` - Edit time slot
- `Calendar` - Time off date picker

**UX Rationale:**
- **Weekly Pattern**: Most common use case
- **Quick Edit**: Per-day editing is fast
- **Time Off Visible**: Exceptions are clear
- **Bulk Actions**: "Copy to all weekdays" helpful

---

### 6. Business Settings

**Layout:**
```
┌─────────────────────────────────────┐
│  Settings                            │
├─────────────────────────────────────┤
│  ┌─────────────────────┐            │
│  │ Profile             │            │
│  │                     │            │
│  │ Business Name       │            │
│  │ Logo Upload         │            │
│  │ Contact Info         │            │
│  │                     │            │
│  └─────────────────────┘            │
│                                     │
│  ┌─────────────────────┐            │
│  │ Booking Rules       │            │
│  │                     │            │
│  │ Default Duration    │            │
│  │ Buffer Time         │            │
│  │ Advance Notice      │            │
│  │                     │            │
│  └─────────────────────┘            │
│                                     │
│  ┌─────────────────────┐            │
│  │ Working Hours       │            │
│  │                     │            │
│  │ Mon-Fri: 9-5        │            │
│  │                     │            │
│  └─────────────────────┘            │
└─────────────────────────────────────┘
```

**Components:**
- `Tabs` (shadcn) - Settings sections
- `Card` - Setting groups
- `Input` - Form fields
- `Switch` - Toggles
- `Button` - Save actions

**UX Rationale:**
- **Tabbed Interface**: Logical grouping, reduces scrolling
- **Sectioned Cards**: Each setting area is self-contained
- **Save Per Section**: Or single "Save All" button
- **Clear Labels**: Help text for complex settings

---

## Component Library Usage

### shadcn/ui Components

**Primary Components:**
- `Button` - All actions
- `Card`, `CardHeader`, `CardTitle`, `CardContent` - Content containers
- `Input`, `Textarea`, `Select` - Form fields
- `Table`, `TableHeader`, `TableRow`, `TableCell` - Data display
- `Dialog`, `Sheet` - Modals and side panels
- `Badge` - Status indicators
- `Avatar` - Profile images
- `DropdownMenu` - Action menus
- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` - Tabbed interfaces
- `Calendar` - Date pickers
- `Switch` - Toggles
- `Separator` - Visual dividers
- `Progress` - Progress indicators

**Custom Components Needed:**
- `Sidebar` - Navigation sidebar
- `Header` - Top navigation bar
- `MiniCalendar` - Dashboard calendar preview
- `TimePicker` - Time selection
- `StatusBadge` - Appointment status with colors
- `AppointmentCard` - Appointment list item
- `StatCard` - Dashboard statistics

---

## Tailwind Utility Patterns

### Common Layout Patterns

```tsx
// Page Container
<div className="space-y-6">
  {/* Content */}
</div>

// Card Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>

// Flex Header
<div className="flex items-center justify-between">
  <h1 className="text-3xl font-bold">Title</h1>
  <Button>Action</Button>
</div>

// Form Layout
<div className="space-y-4">
  <FormField>
    <FormLabel>Label</FormLabel>
    <FormControl>
      <Input />
    </FormControl>
  </FormField>
</div>
```

### Color Utilities

```tsx
// Primary Actions
className="bg-primary-500 hover:bg-primary-600 text-white"

// Status Colors
className="bg-emerald-100 text-emerald-800" // Success
className="bg-amber-100 text-amber-800"     // Warning
className="bg-red-100 text-red-800"        // Error

// Neutral Backgrounds
className="bg-slate-50"  // Page background
className="bg-white"    // Card background
className="bg-slate-100" // Subtle sections
```

### Spacing & Typography

```tsx
// Consistent spacing
className="p-6"        // Card padding
className="space-y-4"   // Vertical spacing
className="gap-4"      // Grid/flex gap

// Typography
className="text-3xl font-bold"      // Page title
className="text-sm text-slate-600"  // Secondary text
className="font-semibold"           // Emphasis
```

---

## Animation & Transitions

### Subtle Animations

```tsx
// Hover effects
className="transition-colors hover:bg-slate-100"

// Focus states
className="focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"

// Page transitions (Inertia handles these)
// But add loading states:
{isLoading && <Skeleton />}

// Button loading
<Button disabled={isLoading}>
  {isLoading ? <Loader2 className="animate-spin" /> : "Save"}
</Button>
```

---

## Mobile Responsiveness

### Breakpoints Strategy

```tsx
// Mobile-first approach
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Sidebar becomes Sheet on mobile
<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" className="md:hidden">
      <Menu />
    </Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SidebarContent />
  </SheetContent>
</Sheet>

// Table becomes cards on mobile
<div className="hidden md:block">
  <Table />
</div>
<div className="md:hidden space-y-4">
  {items.map(item => <Card key={item.id}>{/* Card content */}</Card>)}
</div>
```

---

## UX Best Practices

### 1. Loading States
- Show skeleton loaders during Inertia page transitions
- Disable buttons during form submission
- Show progress indicators for long operations

### 2. Error Handling
- Inline validation errors (FormRequest provides these)
- Toast notifications for success/error (use Inertia flash messages)
- Clear error messages with actionable guidance

### 3. Empty States
- Friendly empty state illustrations
- Clear CTAs: "Create your first appointment"
- Helpful guidance text

### 4. Confirmation Dialogs
- Use `AlertDialog` (shadcn) for destructive actions
- Clear messaging: "Are you sure you want to cancel this appointment?"
- Distinguish between Cancel (soft) and Delete (hard)

### 5. Keyboard Navigation
- Tab order is logical
- Enter submits forms
- Escape closes modals/sheets
- Arrow keys navigate tables/lists

---

## Implementation Notes

### Inertia Integration

```tsx
// Page components receive props from server
export default function AppointmentsIndex({ appointments, business }) {
  return (
    <Layout>
      {/* Use server data */}
      {appointments.map(appointment => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
    </Layout>
  );
}

// Forms submit via Inertia
import { useForm } from '@inertiajs/react';

const { data, setData, post, processing } = useForm({
  customer_id: '',
  service_id: '',
  // ...
});

<form onSubmit={(e) => {
  e.preventDefault();
  post('/appointments');
}}>
  {/* Form fields */}
</form>
```

### Flash Messages

```tsx
// Access flash messages from shared props
export default function Layout({ flash }) {
  return (
    <>
      {flash?.success && (
        <Toast>
          <ToastDescription>{flash.success}</ToastDescription>
        </Toast>
      )}
      {/* Rest of layout */}
    </>
  );
}
```

---

## Design Tokens Summary

```tsx
// Colors
primary: slate-500 → primary-500 (blue)
background: slate-50
surface: white
text: slate-900
text-muted: slate-600

// Spacing
container-padding: p-6 lg:p-8
card-padding: p-6
section-gap: space-y-6

// Typography
page-title: text-3xl font-bold
section-title: text-2xl font-semibold
card-title: text-xl font-semibold
body: text-base
muted: text-sm text-slate-600

// Borders & Shadows
border: border border-slate-200
rounded: rounded-lg
shadow: shadow-sm (cards), shadow-md (modals)
```

---

## Next Steps

1. **Set up shadcn/ui**: Install components needed
2. **Create Layout Components**: Sidebar, Header, Layout wrapper
3. **Build Page Components**: Start with Dashboard, then Appointments
4. **Implement Forms**: Use FormRequest validation with Inertia
5. **Add Animations**: Subtle transitions and loading states
6. **Mobile Testing**: Ensure responsive behavior
7. **Polish**: Refine spacing, colors, typography

This design system provides a solid foundation for a professional, scalable SaaS admin dashboard that feels modern and purposeful.

