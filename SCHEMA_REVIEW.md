# Database Schema Review - Multi-Tenant Booking SaaS

## First: What is Missing and Why

### Critical Missing Tables

1. **`staff` table** - **CRITICAL**
   - **Why**: Service providers (staff) are different from business_users (admins/managers)
   - **Impact**: Cannot assign services to specific staff members
   - **Use case**: "Book with John" vs "Book with Sarah"

2. **`service_staff` pivot table** - **CRITICAL**
   - **Why**: Many-to-many relationship between services and staff
   - **Impact**: Cannot determine which staff can provide which services
   - **Use case**: Only certain staff are certified for specific services

3. **`staff_availability` table** - **CRITICAL**
   - **Why**: Staff have recurring weekly schedules (e.g., Mon-Fri 9am-5pm)
   - **Impact**: Cannot check if staff are available for bookings
   - **Use case**: Staff work different hours, some part-time

4. **`staff_time_off` table** - **IMPORTANT**
   - **Why**: Staff take vacations, sick days, holidays
   - **Impact**: System will allow bookings during unavailable times
   - **Use case**: Block out dates when staff are on leave

5. **`customers` table** - **CRITICAL**
   - **Why**: Public bookings don't require user accounts
   - **Impact**: Cannot track customer history, preferences, or contact info
   - **Use case**: Walk-in customers, phone bookings, guest checkouts

6. **`appointments` table** - **CRITICAL**
   - **Why**: Core entity of the booking system
   - **Impact**: System cannot function without this
   - **Use case**: All bookings are stored here

### Issues in Existing Schemas

1. **`business_users.password`** - **SECURITY RISK**
   - **Issue**: Passwords should be in `users` table, not pivot table
   - **Fix**: Removed (users authenticate via `users` table)

2. **`business_users` missing unique constraint** - **DATA INTEGRITY**
   - **Issue**: Same user can be added to same business multiple times
   - **Fix**: Added composite unique constraint on `(business_id, user_id)`

3. **`services.price` wrong data type** - **DATA PRECISION**
   - **Issue**: `bigInteger` cannot store decimal prices (e.g., $19.99)
   - **Fix**: Changed to `decimal(10, 2)`

4. **`services` missing business logic fields** - **FUNCTIONALITY**
   - **Issue**: No buffer time between appointments, no advance notice requirement
   - **Fix**: Added `buffer_time_minutes` and `booking_advance_notice_minutes`

5. **`services` missing indexes** - **PERFORMANCE**
   - **Issue**: Queries filtering by `business_id` or `is_active` will be slow
   - **Fix**: Added indexes on `business_id` and `is_active`

6. **`businesses.currency` invalid default** - **DATA QUALITY**
   - **Issue**: "D" is not a valid ISO currency code
   - **Fix**: Changed to "USD" (can be updated per business)

### Optional but Recommended Tables (Future Scalability)

1. **`appointment_status_history`** - For audit trail of status changes
2. **`payments`** - For payment processing integration
3. **`notifications`** - For email/SMS reminders
4. **`business_settings`** - For business-specific configuration
5. **`reviews`** - For customer feedback

---

## Second: Corrected and Additional Schemas

### Fixed Existing Migrations

✅ **business_users** - Removed password, added unique constraint
✅ **services** - Fixed price type, added buffer/advance notice, added indexes
✅ **businesses** - Fixed currency default

### New Migrations Created

✅ **staff** - Service providers table
✅ **service_staff** - Pivot table for service-staff relationships
✅ **staff_availability** - Recurring weekly schedules
✅ **staff_time_off** - Vacation/sick leave blocking
✅ **customers** - Customer information (supports public bookings)
✅ **appointments** - Core booking table

---

## Third: Architectural Notes

### Multi-Tenancy Strategy

- **Tenant Isolation**: All tables include `business_id` foreign key
- **Data Segregation**: Queries must always filter by `business_id`
- **Cascade Deletes**: Business deletion cascades to all related data
- **Recommendation**: Add middleware to automatically scope queries by `business_id`

### Staff vs Business Users

- **`business_users`**: Admins, managers, owners (access to dashboard)
- **`staff`**: Service providers (can be linked to `users` table for login, or standalone for public-facing staff)
- **Separation**: Allows staff to exist without user accounts (public profiles)

### Availability System

- **Recurring Schedule**: `staff_availability` stores weekly patterns (day_of_week + time)
- **Exceptions**: `staff_time_off` blocks specific date ranges
- **Query Pattern**: Check availability = (weekly schedule) AND NOT (time off) AND NOT (existing appointments)

### Public Bookings Support

- **`customers.user_id`**: Nullable - allows guest bookings
- **Customer Creation**: Auto-create on first booking if email/phone provided
- **Future Login**: Link `user_id` when customer creates account

### Appointment Status Flow

```
pending → confirmed → completed
    ↓         ↓
cancelled  cancelled
    ↓
no_show (if completed but customer didn't show)
```

### Indexing Strategy

**High-frequency queries:**
- `appointments`: `(staff_id, start_time, end_time)` - availability checks
- `appointments`: `(business_id, start_time)` - business calendar views
- `customers`: `(business_id, email)`, `(business_id, phone)` - customer lookup

**Foreign keys**: All automatically indexed by database

### Data Integrity

- **Soft Deletes**: Used on all main tables for audit trail
- **Cascade Rules**: 
  - Business deletion → cascade all
  - Staff deletion → null appointments (or restrict if preferred)
  - Service deletion → restrict (prevent if appointments exist)

### Scalability Considerations

1. **Partitioning**: Consider partitioning `appointments` by date range for large businesses
2. **Archiving**: Move old appointments to archive table after 2+ years
3. **Caching**: Cache staff availability, service lists per business
4. **Timezones**: Store all datetimes in UTC, convert in application layer using `businesses.timezone`

### Security Notes

- **Password Storage**: Only in `users` table (hashed)
- **Business Isolation**: Enforce at application layer (never trust client `business_id`)
- **Customer Data**: GDPR compliance - allow data deletion/export

### Future Enhancements

1. **Recurring Appointments**: Add `recurring_appointment_id` to `appointments`
2. **Waitlist**: Add `waitlist` table for fully booked slots
3. **Resources**: Add `resources` table (rooms, equipment) if needed
4. **Packages**: Add `service_packages` for bundled services
5. **Loyalty**: Add `customer_points` or `customer_tier` for rewards

---

## Migration Order

Run migrations in this order:

1. `2024_09_02_16_16_37_create_user_table.ts` (already exists)
2. `2026_02_07_21_02_46_create_businesses_table.ts` (fixed)
3. `2026_02_07_21_10_52_create_business_user_table.ts` (fixed)
4. `2026_02_07_21_15_22_create_services_table.ts` (fixed)
5. `2026_02_07_21_20_00_create_staff_table.ts` (new)
6. `2026_02_07_21_25_00_create_service_staff_table.ts` (new)
7. `2026_02_07_21_30_00_create_staff_availability_table.ts` (new)
8. `2026_02_07_21_35_00_create_staff_time_off_table.ts` (new)
9. `2026_02_07_21_40_00_create_customers_table.ts` (new)
10. `2026_02_07_21_45_00_create_appointments_table.ts` (new)

---

## Notes on Composite Unique Constraints

The framework's `unique()` method appears to work on single columns only. For composite unique constraints like `(service_id, staff_id)`, you may need to:

1. **Verify**: Test if `table.unique(["col1", "col2"])` works (it's used in `business_users`)
2. **Alternative**: If not supported, add raw SQL constraint:
   ```typescript
   // After table creation, add:
   table.raw("UNIQUE KEY unique_service_staff (service_id, staff_id)");
   ```
3. **Application-level**: Enforce uniqueness in application logic as fallback

---

## Testing Checklist

- [ ] Verify composite unique constraints work
- [ ] Test cascade deletes (delete business → all related data)
- [ ] Test soft deletes (deleted records hidden but preserved)
- [ ] Verify timezone handling (UTC storage, business timezone display)
- [ ] Test availability queries (weekly schedule + time off + existing appointments)
- [ ] Verify customer creation on first booking
- [ ] Test appointment status transitions

