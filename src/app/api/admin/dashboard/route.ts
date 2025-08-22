import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user?.role !== 'ADMIN' && session.user?.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get current date and calculate date ranges
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Fetch dashboard statistics
    const [
      totalUsers,
      totalProperties,
      totalBookings,
      totalRevenue,
      previousMonthRevenue,
      todayCheckIns,
      todayCheckOuts,
      newBookingsToday,
      pendingInquiries,
      occupancyRate,
    ] = await Promise.all([
      // Total users
      prisma.user.count(),
      
      // Total properties
      prisma.villa.count(),
      
      // Total bookings
      prisma.booking.count(),
      
      // Current month revenue
      prisma.transaction.aggregate({
        where: {
          type: 'BOOKING_PAYMENT',
          status: 'PAID',
          createdAt: {
            gte: startOfMonth,
          },
        },
        _sum: {
          amountInCents: true,
        },
      }),
      
      // Previous month revenue
      prisma.transaction.aggregate({
        where: {
          type: 'BOOKING_PAYMENT',
          status: 'PAID',
          createdAt: {
            gte: startOfPreviousMonth,
            lte: endOfPreviousMonth,
          },
        },
        _sum: {
          amountInCents: true,
        },
      }),
      
      // Today's check-ins
      prisma.booking.count({
        where: {
          startDate: {
            gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
            lt: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
          },
          status: 'CONFIRMED',
        },
      }),
      
      // Today's check-outs
      prisma.booking.count({
        where: {
          endDate: {
            gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
            lt: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
          },
          status: 'CONFIRMED',
        },
      }),
      
      // New bookings today
      prisma.booking.count({
        where: {
          createdAt: {
            gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
            lt: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
          },
        },
      }),
      
      // Pending inquiries (support tickets)
      prisma.supportTicket.count({
        where: {
          status: 'OPEN',
        },
      }),
      
      // Occupancy rate (simplified calculation)
      prisma.booking.count({
        where: {
          startDate: {
            lte: now,
          },
          endDate: {
            gte: now,
          },
          status: 'CONFIRMED',
        },
      }),
    ]);

    // Calculate revenue percentages
    const currentRevenue = totalRevenue._sum.amountInCents || 0;
    const previousRevenue = previousMonthRevenue._sum.amountInCents || 0;
    const revenueChange = previousRevenue > 0 
      ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 
      : 0;

    // Calculate average booking value
    const averageBookingValue = totalBookings > 0 
      ? Math.round(currentRevenue / totalBookings) 
      : 0;

    // Calculate occupancy rate (simplified)
    const totalAvailableProperties = totalProperties;
    const occupiedProperties = occupancyRate;
    const occupancyPercentage = totalAvailableProperties > 0 
      ? Math.round((occupiedProperties / totalAvailableProperties) * 100) 
      : 0;

    const dashboardStats = {
      totalRevenue: currentRevenue,
      totalBookings,
      totalProperties,
      totalUsers,
      checkIns: todayCheckIns,
      checkOuts: todayCheckOuts,
      newBookings: newBookingsToday,
      pendingInquiries,
      occupancyRate: occupancyPercentage,
      averageBookingValue,
      revenueChange: Math.round(revenueChange * 100) / 100, // Round to 2 decimal places
    };

    return NextResponse.json(dashboardStats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
}
