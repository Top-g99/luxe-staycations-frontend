# Update Prisma Schema for PostgreSQL

## Step 1: Update Prisma Schema

The current schema uses SQLite. We need to update it for PostgreSQL. Here are the key changes needed:

### 1. Update datasource provider

```prisma
datasource db {
  provider = "postgresql"  // Change from "sqlite"
  url      = env("DATABASE_URL")
}
```

### 2. Update ID fields to use UUID

```prisma
model User {
  id            String    @id @default(uuid())  // Change from @default(cuid())
  // ... rest of the model
}
```

### 3. Update field types for PostgreSQL

```prisma
model Villa {
  // Change price fields to use Decimal for better precision
  pricePerNightInCents  Decimal @db.Decimal(10,2)
  cleaningFeeInCents    Decimal @db.Decimal(10,2) @default(0)
  securityDepositInCents Decimal @db.Decimal(10,2) @default(0)
  // ... rest of the model
}
```

## Step 2: Generate and Apply Migration

After updating the schema:

```bash
# Generate migration
npx prisma migrate dev --name postgresql-migration

# Apply migration
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

## Step 3: Update Environment Variables

Make sure your `.env` file has the correct PostgreSQL URL:

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

## Step 4: Test Connection

```bash
# Test database connection
npx prisma db pull

# Check if tables exist
npx prisma studio
```

## Important Notes

1. **Backup Data**: If you have existing data in SQLite, export it before switching
2. **UUID vs CUID**: PostgreSQL works better with UUIDs for primary keys
3. **Decimal Precision**: Use Decimal type for monetary values instead of integers
4. **Indexes**: PostgreSQL has different indexing strategies than SQLite
