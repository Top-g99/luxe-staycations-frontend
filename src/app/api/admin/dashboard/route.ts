import { NextRequest, NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import { PrismaClient } from '@/generated/prisma';

// const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  // Temporarily disabled for deployment
  return NextResponse.json({ 
    message: 'Admin dashboard API temporarily disabled',
    status: 'maintenance'
  });
  
  // TODO: Re-enable when Prisma is properly configured
  /*
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
      
      // Pending inquiries
      prisma.inquiry.count({
        where: {
          status: 'PENDING',
        },
      }),
      
      // Occupancy rate calculation
      prisma.booking.aggregate({
        where: {
          status: 'CONFIRMED',
          startDate: {
            lte: now,
          },
          endDate: {
            gte: now,
          },
        },
        _count: true,
      }),
    ]);

    // Calculate revenue
    const currentMonthRevenue = totalRevenue._sum.amountInCents || 0;
    const prevMonthRevenue = previousMonthRevenue._sum.amountInCents || 0;
    const revenueChange = prevMonthRevenue > 0 
      ? ((currentMonthRevenue - prevMonthRevenue) / prevMonthRevenue) * 100 
      : 0;

    // Calculate occupancy rate
    const totalRooms = await prisma.villa.count();
    const occupancyRate = totalRooms > 0 ? (occupancyRate._count / totalRooms) * 100 : 0;

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalProperties,
          totalBookings,
          totalRevenue: currentMonthRevenue / 100, // Convert cents to dollars
          revenueChange: Math.round(revenueChange * 100) / 100,
          occupancyRate: Math.round(occupancyRate * 100) / 100,
        },
        today: {
          checkIns: todayCheckIns,
          checkOuts: todayCheckOuts,
          newBookings: newBookingsToday,
        },
        pending: {
          inquiries: pendingInquiries,
        },
      },
    });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
  */
}
