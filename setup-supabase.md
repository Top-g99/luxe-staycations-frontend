# Supabase Setup Guide for Luxe Staycations

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - Name: `luxe-staycations`
   - Database Password: Create a strong password
   - Region: Choose closest to your users
6. Click "Create new project"

## Step 2: Get Database Connection Details

1. In your Supabase dashboard, go to "Settings" → "Database"
2. Copy the following details:
   - Database URL
   - Anon Key
   - Service Role Key

## Step 3: Update Environment Variables

Update your `.env` file with Supabase credentials:

```env
# Database
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="changeme-in-prod"
```

## Step 4: Execute SQL Schema

1. In Supabase dashboard, go to "SQL Editor"
2. Click "New query"
3. Copy and paste the contents of `luxe_simplified_schema.sql`
4. Click "Run" to execute

## Step 5: Update Prisma Schema

The current Prisma schema needs to be updated for PostgreSQL. Run the migration commands after updating the schema.

## Step 6: Verify Setup

1. Check "Table Editor" to see all created tables
2. Verify sample data is inserted
3. Test the application connection
