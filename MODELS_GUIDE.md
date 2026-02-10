# Models Guide - Booking SaaS

All Eloquent models have been created with proper relationships, fillable fields, and helper methods.

## Models Created

### Core Models
1. **Business** - Multi-tenant business entity
2. **User** - System users (admins, managers, staff, customers)
3. **BusinessUser** - Pivot table for business-user relationships with roles
4. **Service** - Services offered by businesses
5. **Staff** - Service providers (can be linked to users or standalone)
6. **StaffAvailability** - Recurring weekly schedules for staff
7. **StaffTimeOff** - Vacation/sick leave blocking
8. **Customer** - Customer information (supports public bookings)
9. **Appointment** - Core booking entity

## Relationships Overview

### Business Model
```typescript
business.services()        // hasMany - All services
business.staff()           // hasMany - All staff members
business.customers()       // hasMany - All customers
business.appointments()    // hasMany - All appointments
business.businessUsers()   // hasMany - All business-user relationships
```

### User Model
```typescript
user.businessUsers()       // hasMany - Business-user pivot records
user.businesses()          // belongsToMany - All businesses user belongs to
user.staff()               // hasOne - Staff profile (if user is staff)
user.customer()            // hasOne - Customer profile (if user is customer)
```

### Service Model
```typescript
service.business()         // belongsTo - Parent business
service.appointments()     // hasMany - All appointments for this service
service.staff()            // belongsToMany - Staff who can provide this service
```

### Staff Model
```typescript
staff.business()           // belongsTo - Parent business
staff.user()               // belongsTo - Linked user account (nullable)
staff.appointments()      // hasMany - All appointments
staff.availability()       // hasMany - Weekly availability schedule
staff.timeOff()           // hasMany - Time off records
staff.services()           // belongsToMany - Services this staff can provide
staff.fullName             // Getter - Full name (first_name + last_name)
```

### Customer Model
```typescript
customer.business()        // belongsTo - Parent business
customer.user()            // belongsTo - Linked user account (nullable)
customer.appointments()    // hasMany - All appointments
customer.fullName          // Getter - Full name (first_name + last_name)
```

### Appointment Model
```typescript
appointment.business()      // belongsTo - Parent business
appointment.service()      // belongsTo - Service being booked
appointment.staff()        // belongsTo - Staff member (nullable)
appointment.customer()     // belongsTo - Customer
appointment.isUpcoming     // Getter - Check if appointment is in the future
appointment.isPast         // Getter - Check if appointment is in the past
appointment.canBeCancelled // Getter - Check if appointment can be cancelled
```

## Usage Examples

### Creating Records

```typescript
// Create a business
const business = await Business.create({
  name: "Hair Salon",
  slug: "hair-salon",
  primary_phone: "+1234567890",
  email: "info@hairsalon.com",
  timezone: "America/New_York",
});

// Create a service
const service = await Service.create({
  business_id: business.id,
  name: "Haircut",
  duration_minutes: 30,
  price: 2500, // $25.00 (stored as cents)
  buffer_time_minutes: 10,
});

// Create staff
const staff = await Staff.create({
  business_id: business.id,
  first_name: "John",
  last_name: "Doe",
  email: "john@hairsalon.com",
  phone: "+1234567891",
  is_active: true,
});

// Link staff to service
await staff.services().attach([service.id]);

// Create customer (public booking)
const customer = await Customer.create({
  business_id: business.id,
  first_name: "Jane",
  last_name: "Smith",
  email: "jane@example.com",
  phone: "+1234567892",
});

// Create appointment
const appointment = await Appointment.create({
  business_id: business.id,
  service_id: service.id,
  staff_id: staff.id,
  customer_id: customer.id,
  start_time: "2026-02-15 10:00:00",
  end_time: "2026-02-15 10:30:00",
  status: "confirmed",
  price: 2500,
});
```

### Querying with Relationships

```typescript
// Get business with all services
const business = await Business.find(1);
const services = await business.services();

// Get service with staff
const service = await Service.find(1);
const staff = await service.staff();

// Get staff with availability
const staff = await Staff.find(1);
const availability = await staff.availability();

// Get customer appointments
const customer = await Customer.find(1);
const appointments = await customer.appointments();

// Eager load relationships
const appointments = await Appointment
  .with(["service", "staff", "customer", "business"])
  .where("business_id", 1)
  .get();
```

### Filtering Appointments

```typescript
// Get upcoming appointments for a business
const upcoming = await Appointment
  .where("business_id", 1)
  .where("start_time", ">", new Date())
  .where("status", "!=", "cancelled")
  .orderBy("start_time", "asc")
  .get();

// Get appointments for a specific staff member
const staffAppointments = await Appointment
  .where("staff_id", 1)
  .where("start_time", ">=", "2026-02-01")
  .where("start_time", "<=", "2026-02-28")
  .get();

// Check if staff is available
const staff = await Staff.find(1);
const availability = await staff.availability();
const timeOff = await staff.timeOff();
// Then check against existing appointments
```

### Using Helper Methods

```typescript
// Check appointment status
const appointment = await Appointment.find(1);
if (appointment.isUpcoming) {
  console.log("Appointment is in the future");
}

if (appointment.canBeCancelled) {
  // Allow cancellation
}

// Get full names
const staff = await Staff.find(1);
console.log(staff.fullName); // "John Doe"

const customer = await Customer.find(1);
console.log(customer.fullName); // "Jane Smith"
```

### Multi-Tenancy Queries

Always filter by `business_id` for multi-tenant safety:

```typescript
// Get all services for a business
const services = await Service
  .where("business_id", currentBusinessId)
  .where("is_active", true)
  .get();

// Get all appointments for a business
const appointments = await Appointment
  .where("business_id", currentBusinessId)
  .where("start_time", ">=", startDate)
  .where("start_time", "<=", endDate)
  .get();
```

## Fillable Fields

All models have `fillable` arrays defined to prevent mass assignment vulnerabilities. Only fields in `fillable` can be mass-assigned using `create()` or `update()`.

### Business
- name, slug, primary_phone, secondary_phone, address, email, website, logo, currency, language, timezone, is_active

### Service
- business_id, name, description, duration_minutes, price, buffer_time_minutes, booking_advance_notice_minutes, is_active

### Staff
- business_id, user_id, first_name, last_name, email, phone, avatar, bio, is_active

### Customer
- business_id, user_id, first_name, last_name, email, phone, notes

### Appointment
- business_id, service_id, staff_id, customer_id, start_time, end_time, status, notes, cancellation_reason, price, booking_source

## Notes

1. **Table Names**: Models automatically use pluralized table names (e.g., `Staff` → `staff`). For pivot tables, explicit table names are set (e.g., `business_users`, `staff_availability`).

2. **Soft Deletes**: All models support soft deletes. Use `whereNull("deleted_at")` to exclude soft-deleted records.

3. **Timestamps**: All models have `created_at` and `updated_at` timestamps.

4. **Price Storage**: Prices are stored as integers (cents) in the database. Convert to decimal when displaying.

5. **Timezones**: Store all datetimes in UTC. Convert to business timezone in application layer using `business.timezone`.

6. **Nullable Relationships**: `staff.user_id` and `customer.user_id` are nullable to support public bookings without user accounts.

