# Controllers & FormRequests Guide

All controllers and FormRequest validation classes have been created for the booking SaaS application.

## Controllers Created

### 1. BusinessesController
**Location:** `app/Http/Controllers/BusinessesController.ts`

**Methods:**
- `index()` - List all businesses
- `create()` - Show create form
- `store()` - Create new business
- `show()` - Show single business
- `edit()` - Show edit form
- `update()` - Update business
- `destroy()` - Delete business

**Routes:**
```typescript
Route.get("/businesses", [BusinessesController, "index"]);
Route.get("/businesses/create", [BusinessesController, "create"]);
Route.post("/businesses", [BusinessesController, "store"]);
Route.get("/businesses/:id", [BusinessesController, "show"]);
Route.get("/businesses/:id/edit", [BusinessesController, "edit"]);
Route.put("/businesses/:id", [BusinessesController, "update"]);
Route.delete("/businesses/:id", [BusinessesController, "destroy"]);
```

### 2. ServicesController
**Location:** `app/Http/Controllers/ServicesController.ts`

**Methods:**
- `index()` - List services (filterable by business_id)
- `create()` - Show create form
- `store()` - Create new service
- `show()` - Show single service
- `edit()` - Show edit form
- `update()` - Update service
- `destroy()` - Delete service

**Query Parameters:**
- `business_id` - Filter services by business

### 3. StaffController
**Location:** `app/Http/Controllers/StaffController.ts`

**Methods:**
- `index()` - List staff (filterable by business_id)
- `create()` - Show create form
- `store()` - Create new staff member
- `show()` - Show single staff with availability and services
- `edit()` - Show edit form
- `update()` - Update staff member
- `destroy()` - Delete staff member

**Query Parameters:**
- `business_id` - Filter staff by business

### 4. CustomersController
**Location:** `app/Http/Controllers/CustomersController.ts`

**Methods:**
- `index()` - List customers (filterable by business_id)
- `create()` - Show create form
- `store()` - Create new customer
- `show()` - Show single customer with appointments
- `edit()` - Show edit form
- `update()` - Update customer
- `destroy()` - Delete customer

**Query Parameters:**
- `business_id` - Filter customers by business

### 5. AppointmentsController
**Location:** `app/Http/Controllers/AppointmentsController.ts`

**Methods:**
- `index()` - List appointments with filters
- `create()` - Show create form with available services/staff/customers
- `store()` - Create new appointment
- `show()` - Show single appointment
- `edit()` - Show edit form
- `update()` - Update appointment
- `destroy()` - Delete appointment
- `cancel()` - Cancel an appointment (custom action)
- `confirm()` - Confirm an appointment (custom action)

**Query Parameters:**
- `business_id` - Filter by business
- `staff_id` - Filter by staff member
- `customer_id` - Filter by customer
- `status` - Filter by status (pending, confirmed, completed, cancelled, no_show)
- `start_date` - Filter appointments from this date
- `end_date` - Filter appointments until this date

## FormRequest Classes Created

### Business Requests
1. **StoreBusinessRequest** - `app/Http/Requests/StoreBusinessRequest.ts`
   - Validates: name, slug (unique), primary_phone, email (unique), etc.

2. **UpdateBusinessRequest** - `app/Http/Requests/UpdateBusinessRequest.ts`
   - Validates: all fields optional (sometimes), except unique constraints need manual handling

### Service Requests
3. **StoreServiceRequest** - `app/Http/Requests/StoreServiceRequest.ts`
   - Validates: business_id, name, duration_minutes, price, etc.

4. **UpdateServiceRequest** - `app/Http/Requests/UpdateServiceRequest.ts`
   - Validates: all fields optional (sometimes)

### Staff Requests
5. **StoreStaffRequest** - `app/Http/Requests/StoreStaffRequest.ts`
   - Validates: business_id, first_name, last_name, email, phone, etc.

6. **UpdateStaffRequest** - `app/Http/Requests/UpdateStaffRequest.ts`
   - Validates: all fields optional (sometimes)

### Customer Requests
7. **StoreCustomerRequest** - `app/Http/Requests/StoreCustomerRequest.ts`
   - Validates: business_id, first_name, last_name, phone (required), email, etc.

8. **UpdateCustomerRequest** - `app/Http/Requests/UpdateCustomerRequest.ts`
   - Validates: all fields optional (sometimes)

### Appointment Requests
9. **StoreAppointmentRequest** - `app/Http/Requests/StoreAppointmentRequest.ts`
   - Validates: business_id, service_id, customer_id, start_time, end_time, status, etc.

10. **UpdateAppointmentRequest** - `app/Http/Requests/UpdateAppointmentRequest.ts`
    - Validates: all fields optional (sometimes), includes cancellation_reason

## Usage Pattern

### In Controllers

```typescript
import { httpContext } from "jcc-express-mvc";
import { Inject, Method } from "jcc-express-mvc/Core/Dependency";
import { StoreBusinessRequest } from "@/Http/Requests/StoreBusinessRequest";

@Inject()
export class BusinessesController {
  async store(
    { req, res, next } = httpContext,
    request: StoreBusinessRequest
  ) {
    // Validation happens automatically
    await request.rules();
    const validated = await request.validated();

    // Create record
    const business = await Business.create(validated);

    // Redirect with flash message
    return res
      .with("success", "Business created successfully!")
      .inertiaRedirect(`/businesses/${business.id}`);
  }
}
```

### In Routes

```typescript
import { Route } from "jcc-express-mvc/Core";
import { BusinessesController } from "@/Http/Controllers/BusinessesController";

// Resource routes
Route.resource("/businesses", BusinessesController);

// Or individual routes
Route.get("/businesses", [BusinessesController, "index"]);
Route.post("/businesses", [BusinessesController, "store"]);
```

## Inertia Pages Expected

The controllers expect the following Inertia page components:

### Businesses
- `Businesses/Index` - List page
- `Businesses/Create` - Create form
- `Businesses/Show` - Detail page
- `Businesses/Edit` - Edit form

### Services
- `Services/Index` - List page
- `Services/Create` - Create form
- `Services/Show` - Detail page
- `Services/Edit` - Edit form

### Staff
- `Staff/Index` - List page
- `Staff/Create` - Create form
- `Staff/Show` - Detail page
- `Staff/Edit` - Edit form

### Customers
- `Customers/Index` - List page
- `Customers/Create` - Create form
- `Customers/Show` - Detail page
- `Customers/Edit` - Edit form

### Appointments
- `Appointments/Index` - List page with filters
- `Appointments/Create` - Create form
- `Appointments/Show` - Detail page
- `Appointments/Edit` - Edit form

### Errors
- `Errors/404` - 404 error page

## Flash Messages

All controllers use flash messages for user feedback:

```typescript
// Success messages
res.with("success", "Business created successfully!")
   .inertiaRedirect("/businesses");

// Available in Inertia via shared props (configured in kernel.ts)
// Access via: props.flash.success
```

## Validation Notes

1. **Unique Constraints on Updates**: The framework's `unique` rule doesn't support exclusion syntax (like Laravel's `unique:table,column,id`). For update operations, you may need to:
   - Handle uniqueness manually in the controller
   - Or skip validation if the value hasn't changed

2. **Exists Validation**: Use `exists:table,column` to validate foreign keys:
   ```typescript
   business_id: "required|integer|exists:businesses,id"
   ```

3. **Sometimes Rule**: Use `sometimes` for optional fields in updates:
   ```typescript
   name: "sometimes|string|max:255"
   ```

4. **Nullable Fields**: Use `nullable` for optional fields:
   ```typescript
   email: "nullable|email|max:255"
   ```

## Multi-Tenancy

All controllers support filtering by `business_id` via query parameters. Always ensure:
1. Users can only access businesses they belong to (via middleware)
2. All queries filter by `business_id` when applicable
3. Business context is passed to Inertia pages

## Next Steps

1. Create Inertia page components in `resources/js/Pages/`
2. Set up routes in `routes/web.ts`
3. Add authentication/authorization middleware
4. Implement business context middleware for multi-tenancy
5. Add pagination for index pages if needed

