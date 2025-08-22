/*
  Warnings:

  - Added the required column `basePriceInCents` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guestCount` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "CommissionAgreement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "commissionType" TEXT NOT NULL,
    "commissionRate" REAL NOT NULL,
    "effectiveDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,
    "villaId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CommissionAgreement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CommissionAgreement_villaId_fkey" FOREIGN KEY ("villaId") REFERENCES "Villa" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LuxeJewelTransaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "jewels" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LuxeJewelTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Coupon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "couponType" TEXT NOT NULL,
    "discountValue" REAL NOT NULL,
    "scope" TEXT NOT NULL,
    "validFrom" DATETIME NOT NULL,
    "validUntil" DATETIME NOT NULL,
    "maxUses" INTEGER,
    "maxUsesPerUser" INTEGER NOT NULL DEFAULT 1,
    "minBookingValue" INTEGER,
    "applicableVillas" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "totalUses" INTEGER NOT NULL DEFAULT 0,
    "totalDiscount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CouponRedemption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "discountAmount" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "villaId" TEXT,
    "couponId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CouponRedemption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CouponRedemption_villaId_fkey" FOREIGN KEY ("villaId") REFERENCES "Villa" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "CouponRedemption_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Communication" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "subject" TEXT,
    "content" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'SENT',
    "externalId" TEXT,
    "userId" TEXT NOT NULL,
    "bookingId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Communication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Communication_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "action" TEXT NOT NULL,
    "targetType" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "oldValues" TEXT,
    "newValues" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT,
    "villaId" TEXT,
    "bookingId" TEXT,
    "couponId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "AuditLog_villaId_fkey" FOREIGN KEY ("villaId") REFERENCES "Villa" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "AuditLog_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "AuditLog_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "villaId" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "totalPriceInCents" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "paymentStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "specialRequests" TEXT,
    "conciergeAddons" TEXT,
    "basePriceInCents" INTEGER NOT NULL,
    "commissionInCents" INTEGER NOT NULL DEFAULT 0,
    "gstAmountInCents" INTEGER NOT NULL DEFAULT 0,
    "tdsAmountInCents" INTEGER NOT NULL DEFAULT 0,
    "discountInCents" INTEGER NOT NULL DEFAULT 0,
    "finalPayoutInCents" INTEGER NOT NULL DEFAULT 0,
    "guestCount" INTEGER NOT NULL,
    "guestNames" TEXT,
    "guestPhone" TEXT,
    "guestEmail" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "referralCode" TEXT,
    "couponCode" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Booking_villaId_fkey" FOREIGN KEY ("villaId") REFERENCES "Villa" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("conciergeAddons", "createdAt", "endDate", "id", "paymentStatus", "specialRequests", "startDate", "status", "totalPriceInCents", "updatedAt", "userId", "villaId") SELECT "conciergeAddons", "createdAt", "endDate", "id", "paymentStatus", "specialRequests", "startDate", "status", "totalPriceInCents", "updatedAt", "userId", "villaId" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
CREATE INDEX "Booking_villaId_startDate_idx" ON "Booking"("villaId", "startDate");
CREATE INDEX "Booking_userId_idx" ON "Booking"("userId");
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "amountInCents" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "description" TEXT,
    "transactionId" TEXT,
    "userId" TEXT,
    "villaId" TEXT,
    "bookingId" TEXT,
    "gstAmountInCents" INTEGER NOT NULL DEFAULT 0,
    "tdsAmountInCents" INTEGER NOT NULL DEFAULT 0,
    "invoiceNumber" TEXT,
    "invoiceUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Transaction_villaId_fkey" FOREIGN KEY ("villaId") REFERENCES "Villa" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Transaction_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("amountInCents", "bookingId", "createdAt", "description", "id", "status", "transactionId", "type", "updatedAt", "userId", "villaId") SELECT "amountInCents", "bookingId", "createdAt", "description", "id", "status", "transactionId", "type", "updatedAt", "userId", "villaId" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE INDEX "Transaction_userId_idx" ON "Transaction"("userId");
CREATE INDEX "Transaction_villaId_idx" ON "Transaction"("villaId");
CREATE INDEX "Transaction_bookingId_idx" ON "Transaction"("bookingId");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'CUSTOMER',
    "image" TEXT,
    "phone" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isSuspended" BOOLEAN NOT NULL DEFAULT false,
    "totalSpent" INTEGER NOT NULL DEFAULT 0,
    "totalEarnings" INTEGER NOT NULL DEFAULT 0,
    "payoutBalance" INTEGER NOT NULL DEFAULT 0,
    "gstin" TEXT,
    "panNumber" TEXT,
    "bankDetails" TEXT,
    "luxeJewels" INTEGER NOT NULL DEFAULT 0,
    "loyaltyTier" TEXT NOT NULL DEFAULT 'BRONZE',
    "whatsappOptIn" BOOLEAN NOT NULL DEFAULT false,
    "marketingOptIn" BOOLEAN NOT NULL DEFAULT true,
    "referralCode" TEXT,
    "referredBy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_referredBy_fkey" FOREIGN KEY ("referredBy") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "email", "id", "image", "isSuspended", "isVerified", "name", "passwordHash", "payoutBalance", "phone", "role", "totalEarnings", "totalSpent", "updatedAt") SELECT "createdAt", "email", "id", "image", "isSuspended", "isVerified", "name", "passwordHash", "payoutBalance", "phone", "role", "totalEarnings", "totalSpent", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_referralCode_key" ON "User"("referralCode");
CREATE TABLE "new_Villa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "pricePerNightInCents" INTEGER NOT NULL,
    "cleaningFeeInCents" INTEGER NOT NULL DEFAULT 0,
    "securityDepositInCents" INTEGER NOT NULL DEFAULT 0,
    "bedrooms" INTEGER NOT NULL DEFAULT 1,
    "bathrooms" INTEGER NOT NULL DEFAULT 1,
    "maxGuests" INTEGER NOT NULL DEFAULT 2,
    "imageUrl" TEXT,
    "vrTourUrl" TEXT,
    "isLuxeCertified" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'PENDING_REVIEW',
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "category" TEXT,
    "amenities" TEXT,
    "weekendPricingRules" TEXT,
    "occupancyRate" REAL NOT NULL DEFAULT 0,
    "averageRating" REAL NOT NULL DEFAULT 0,
    "totalBookings" INTEGER NOT NULL DEFAULT 0,
    "totalRevenue" INTEGER NOT NULL DEFAULT 0,
    "lastBookedAt" DATETIME,
    "tags" TEXT,
    "socialMediaLinks" TEXT,
    "featuredImages" TEXT,
    "hostId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Villa_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Villa" ("address", "amenities", "bathrooms", "bedrooms", "category", "city", "cleaningFeeInCents", "country", "createdAt", "description", "hostId", "id", "imageUrl", "isLuxeCertified", "isVisible", "maxGuests", "pricePerNightInCents", "securityDepositInCents", "status", "title", "updatedAt", "vrTourUrl", "weekendPricingRules") SELECT "address", "amenities", "bathrooms", "bedrooms", "category", "city", "cleaningFeeInCents", "country", "createdAt", "description", "hostId", "id", "imageUrl", "isLuxeCertified", "isVisible", "maxGuests", "pricePerNightInCents", "securityDepositInCents", "status", "title", "updatedAt", "vrTourUrl", "weekendPricingRules" FROM "Villa";
DROP TABLE "Villa";
ALTER TABLE "new_Villa" RENAME TO "Villa";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "CommissionAgreement_userId_idx" ON "CommissionAgreement"("userId");

-- CreateIndex
CREATE INDEX "CommissionAgreement_villaId_idx" ON "CommissionAgreement"("villaId");

-- CreateIndex
CREATE INDEX "LuxeJewelTransaction_userId_idx" ON "LuxeJewelTransaction"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_code_key" ON "Coupon"("code");

-- CreateIndex
CREATE INDEX "CouponRedemption_userId_idx" ON "CouponRedemption"("userId");

-- CreateIndex
CREATE INDEX "CouponRedemption_villaId_idx" ON "CouponRedemption"("villaId");

-- CreateIndex
CREATE INDEX "CouponRedemption_couponId_idx" ON "CouponRedemption"("couponId");

-- CreateIndex
CREATE INDEX "Communication_userId_idx" ON "Communication"("userId");

-- CreateIndex
CREATE INDEX "Communication_bookingId_idx" ON "Communication"("bookingId");

-- CreateIndex
CREATE INDEX "Communication_type_idx" ON "Communication"("type");

-- CreateIndex
CREATE INDEX "AuditLog_userId_idx" ON "AuditLog"("userId");

-- CreateIndex
CREATE INDEX "AuditLog_targetType_targetId_idx" ON "AuditLog"("targetType", "targetId");

-- CreateIndex
CREATE INDEX "AuditLog_action_idx" ON "AuditLog"("action");
