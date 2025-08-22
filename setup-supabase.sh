#!/bin/bash

# Luxe Staycations - Supabase Setup Script
# This script helps you set up Supabase for your project

echo "🚀 Luxe Staycations - Supabase Setup"
echo "====================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the luxe directory"
    exit 1
fi

echo "📋 Prerequisites:"
echo "1. Create a Supabase project at https://supabase.com"
echo "2. Get your database connection details"
echo "3. Have your project reference and password ready"
echo ""

# Ask for Supabase details
read -p "Enter your Supabase project reference (e.g., abcdefghijklmnop): " PROJECT_REF
read -p "Enter your Supabase database password: " DB_PASSWORD
read -p "Enter your Supabase anon key: " ANON_KEY
read -p "Enter your Supabase service role key: " SERVICE_ROLE_KEY

# Create backup of current .env
if [ -f ".env" ]; then
    cp .env .env.backup
    echo "✅ Backed up existing .env file"
fi

# Create new .env file
cat > .env << EOF
# Database
DATABASE_URL="postgresql://postgres:${DB_PASSWORD}@db.${PROJECT_REF}.supabase.co:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://${PROJECT_REF}.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="${ANON_KEY}"
SUPABASE_SERVICE_ROLE_KEY="${SERVICE_ROLE_KEY}"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="changeme-in-prod"
EOF

echo "✅ Created new .env file with Supabase credentials"

# Update Prisma schema for PostgreSQL
echo "🔄 Updating Prisma schema for PostgreSQL..."

# Create a temporary schema file
cat > prisma/schema_postgresql.prisma << 'EOF'
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  CUSTOMER
  HOST
  ADMIN
  SUPER_ADMIN
}

enum BookingStatus {
  PENDING
  CONFIRMED
  COMPLETED
  CANCELLED
  REFUNDED
}

enum PaymentStatus {
  PENDING
  PAID
  REFUNDED
  FAILED
}

enum VillaStatus {
  PENDING_REVIEW
  VERIFIED
  REJECTED
  SUSPENDED
  OFFLINE
}

enum TransactionType {
  BOOKING_PAYMENT
  HOST_PAYOUT
  REFUND
  SERVICE_FEE
  CLEANING_FEE
  SECURITY_DEPOSIT
  COMMISSION
  GST
  TDS
  LOYALTY_EARNED
  LOYALTY_REDEEMED
  COUPON_DISCOUNT
}

enum SupportTicketStatus {
  OPEN
  IN_PROGRESS
  RESOLVED
  CLOSED
}

enum SupportTicketPriority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

enum PropertyTag {
  FAST_SELLER
  HIGH_DEMAND
  RECENTLY_LISTED
  LUXE_PREMIER
  TRENDING
  BEST_VALUE
}

enum CommissionType {
  PERCENTAGE
  FIXED_AMOUNT
}

enum CouponType {
  PERCENTAGE
  FIXED_AMOUNT
}

enum CouponScope {
  SITE_WIDE
  PROPERTY_SPECIFIC
  FIRST_TIME_ONLY
}

enum CommunicationType {
  EMAIL
  WHATSAPP
  SMS
  IN_APP
}

enum AuditAction {
  CREATE
  UPDATE
  DELETE
  LOGIN
  LOGOUT
  APPROVE
  REJECT
  SUSPEND
  ACTIVATE
  PAYOUT
  REFUND
}

model User {
  id            String    @id @default(uuid())
  name          String
  email         String    @unique
  passwordHash  String
  role          Role      @default(CUSTOMER)
  image         String?
  phone         String?
  isVerified    Boolean   @default(false)
  isSuspended   Boolean   @default(false)
  totalSpent    Decimal   @default(0) @db.Decimal(10,2)
  totalEarnings Decimal   @default(0) @db.Decimal(10,2)
  payoutBalance Decimal   @default(0) @db.Decimal(10,2)
  
  // Phase 2: Financial & Tax Info
  gstin         String?
  panNumber     String?
  bankDetails   String?
  
  // Phase 2: Loyalty Program
  luxeJewels    Int       @default(0)
  loyaltyTier   String    @default("BRONZE")
  
  // Phase 2: Marketing & Communication
  whatsappOptIn Boolean   @default(false)
  marketingOptIn Boolean  @default(true)
  referralCode  String?   @unique
  referredBy    String?

  villas        Villa[]
  bookings      Booking[]
  transactions  Transaction[]
  supportTickets SupportTicket[]
  adminActions  AdminAction[]
  
  // Phase 2: New Relations
  commissionAgreements CommissionAgreement[]
  luxeJewelTransactions LuxeJewelTransaction[]
  couponRedemptions CouponRedemption[]
  communications Communication[]
  auditLogs     AuditLog[]
  referrals     User[]    @relation("UserReferrals")
  referredByUser User?    @relation("UserReferrals", fields: [referredBy], references: [id])

  accounts      Account[]
  sessions      Session[]

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Villa {
  id                    String      @id @default(uuid())
  title                 String
  description           String
  city                  String
  country               String
  address               String
  pricePerNightInCents  Decimal     @db.Decimal(10,2)
  cleaningFeeInCents    Decimal     @db.Decimal(10,2) @default(0)
  securityDepositInCents Decimal    @db.Decimal(10,2) @default(0)
  bedrooms              Int         @default(1)
  bathrooms             Int         @default(1)
  maxGuests             Int         @default(2)
  imageUrl              String?
  vrTourUrl             String?
  isLuxeCertified       Boolean     @default(false)
  status                VillaStatus @default(PENDING_REVIEW)
  isVisible             Boolean     @default(true)
  category              String?
  amenities             String?
  weekendPricingRules   String?
  
  // Phase 2: Performance Metrics
  occupancyRate         Float       @default(0)
  averageRating         Float       @default(0)
  totalBookings         Int         @default(0)
  totalRevenue          Decimal     @default(0) @db.Decimal(10,2)
  lastBookedAt          DateTime?
  
  // Phase 2: Property Tags
  tags                  String?
  
  // Phase 2: Social Media
  socialMediaLinks      String?
  featuredImages        String?

  host        User      @relation(fields: [hostId], references: [id], onDelete: Cascade)
  hostId      String

  bookings    Booking[]
  blocks      Block[]
  transactions Transaction[]
  
  // Phase 2: New Relations
  commissionAgreements CommissionAgreement[]
  couponRedemptions CouponRedemption[]
  auditLogs   AuditLog[]

  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Booking {
  id                  String         @id @default(uuid())
  user        User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId      String
  villa       Villa   @relation(fields: [villaId], references: [id], onDelete: Cascade)
  villaId     String

  startDate   DateTime
  endDate     DateTime
  totalPriceInCents Decimal @db.Decimal(10,2)
  status      BookingStatus @default(PENDING)
  paymentStatus PaymentStatus @default(PENDING)
  specialRequests String?
  conciergeAddons String?
  
  // Phase 2: Financial Breakdown
  basePriceInCents     Decimal @db.Decimal(10,2)
  commissionInCents    Decimal @db.Decimal(10,2) @default(0)
  gstAmountInCents     Decimal @db.Decimal(10,2) @default(0)
  tdsAmountInCents     Decimal @db.Decimal(10,2) @default(0)
  discountInCents      Decimal @db.Decimal(10,2) @default(0)
  finalPayoutInCents   Decimal @db.Decimal(10,2) @default(0)
  
  // Phase 2: Guest Info
  guestCount           Int
  guestNames           String?
  guestPhone           String?
  guestEmail           String?
  
  // Phase 2: Marketing & Tracking
  utmSource            String?
  utmMedium            String?
  utmCampaign          String?
  referralCode         String?
  couponCode           String?

  transactions Transaction[]
  
  // Phase 2: New Relations
  communications Communication[]
  auditLogs     AuditLog[]

  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([villaId, startDate])
  @@index([userId])
}

model Transaction {
  id            String          @id @default(uuid())
  type          TransactionType
  amountInCents Decimal         @db.Decimal(10,2)
  status        PaymentStatus   @default(PENDING)
  description   String?
  transactionId String?
  
  user          User?           @relation(fields: [userId], references: [id], onDelete: SetNull)
  userId        String?
  villa         Villa?          @relation(fields: [villaId], references: [id], onDelete: SetNull)
  villaId       String?
  booking       Booking?        @relation(fields: [bookingId], references: [id], onDelete: SetNull)
  bookingId     String?
  
  // Phase 2: Tax & Compliance
  gstAmountInCents     Decimal @db.Decimal(10,2) @default(0)
  tdsAmountInCents     Decimal @db.Decimal(10,2) @default(0)
  invoiceNumber        String?
  invoiceUrl           String?

  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt

  @@index([userId])
  @@index([villaId])
  @@index([bookingId])
}

// Phase 2: Commission Agreements
model CommissionAgreement {
  id              String          @id @default(uuid())
  commissionType  CommissionType
  commissionRate  Float
  effectiveDate   DateTime
  endDate         DateTime?
  isActive        Boolean         @default(true)
  
  user            User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId          String
  villa           Villa?          @relation(fields: [villaId], references: [id], onDelete: Cascade)
  villaId         String?
  
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt

  @@index([userId])
  @@index([villaId])
}

// Phase 2: Loyalty Program
model LuxeJewelTransaction {
  id            String    @id @default(uuid())
  jewels        Int
  description   String
  
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId        String
  
  createdAt     DateTime  @default(now())

  @@index([userId])
}

// Phase 2: Coupon System
model Coupon {
  id              String        @id @default(uuid())
  code            String        @unique
  name            String
  description     String?
  couponType      CouponType
  discountValue   Float
  scope           CouponScope
  validFrom       DateTime
  validUntil      DateTime
  maxUses         Int?
  maxUsesPerUser  Int           @default(1)
  minBookingValue Decimal?      @db.Decimal(10,2)
  applicableVillas String?
  
  isActive        Boolean       @default(true)
  totalUses       Int           @default(0)
  totalDiscount   Decimal       @default(0) @db.Decimal(10,2)
  
  redemptions     CouponRedemption[]
  auditLogs       AuditLog[]

  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

model CouponRedemption {
  id            String    @id @default(uuid())
  discountAmount Decimal  @db.Decimal(10,2)
  
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId        String
  villa         Villa?    @relation(fields: [villaId], references: [id], onDelete: SetNull)
  villaId       String?
  coupon        Coupon    @relation(fields: [couponId], references: [id], onDelete: Cascade)
  couponId      String
  
  createdAt     DateTime  @default(now())

  @@index([userId])
  @@index([villaId])
  @@index([couponId])
}

// Phase 2: Communication System
model Communication {
  id              String            @id @default(uuid())
  type            CommunicationType
  subject         String?
  content         String
  status          String            @default("SENT")
  externalId      String?
  
  user            User              @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId          String
  booking         Booking?          @relation(fields: [bookingId], references: [id], onDelete: SetNull)
  bookingId       String?
  
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt

  @@index([userId])
  @@index([bookingId])
  @@index([type])
}

// Phase 2: Audit Logging
model AuditLog {
  id          String      @id @default(uuid())
  action      AuditAction
  targetType  String
  targetId    String
  oldValues   String?
  newValues   String?
  ipAddress   String?
  userAgent   String?
  
  user        User?       @relation(fields: [userId], references: [id], onDelete: SetNull)
  userId      String?
  villa       Villa?      @relation(fields: [villaId], references: [id], onDelete: SetNull)
  villaId     String?
  booking     Booking?    @relation(fields: [bookingId], references: [id], onDelete: SetNull)
  bookingId   String?
  coupon      Coupon?     @relation(fields: [couponId], references: [id], onDelete: SetNull)
  couponId    String?
  
  createdAt   DateTime    @default(now())

  @@index([userId])
  @@index([targetType, targetId])
  @@index([action])
}

model Block {
  id        String   @id @default(uuid())
  villa     Villa    @relation(fields: [villaId], references: [id], onDelete: Cascade)
  villaId   String
  startDate DateTime
  endDate   DateTime
  reason    String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([villaId, startDate])
}

model SupportTicket {
  id          String                @id @default(uuid())
  title       String
  description String
  status      SupportTicketStatus   @default(OPEN)
  priority    SupportTicketPriority @default(MEDIUM)
  
  user        User                  @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId      String

  createdAt   DateTime              @default(now())
  updatedAt   DateTime              @updatedAt

  @@index([userId])
  @@index([status])
}

model AdminAction {
  id          String   @id @default(uuid())
  action      String
  details     String
  targetType  String
  targetId    String
  
  admin       User     @relation(fields: [adminId], references: [id], onDelete: Cascade)
  adminId     String

  createdAt   DateTime @default(now())

  @@index([adminId])
  @@index([targetType, targetId])
}

model SiteSettings {
  id          String   @id @default(uuid())
  key         String   @unique
  value       String
  description String?
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// NextAuth models
model Account {
  id                String  @id @default(uuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(uuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
EOF

echo "✅ Created PostgreSQL-compatible Prisma schema"

echo ""
echo "📝 Next Steps:"
echo "1. Go to your Supabase dashboard"
echo "2. Navigate to SQL Editor"
echo "3. Copy and paste the contents of 'execute-supabase-schema.sql'"
echo "4. Click 'Run' to execute the schema"
echo "5. Run the following commands:"
echo "   - mv prisma/schema_postgresql.prisma prisma/schema.prisma"
echo "   - npx prisma generate"
echo "   - npx prisma db push"
echo ""

echo "🎉 Setup complete! Your project is now configured for Supabase."
