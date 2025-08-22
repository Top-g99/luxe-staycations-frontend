"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  LinearProgress,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  People,
  Villa,
  BookOnline,
  AttachMoney,
  CheckCircle,
  Schedule,
  Warning,
  Add as AddIcon,
  Support as SupportIcon,
  Assessment as ReportIcon,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Mock data - replace with actual API calls
const revenueData = [
  { date: '2024-01', revenue: 45000 },
  { date: '2024-02', revenue: 52000 },
  { date: '2024-03', revenue: 48000 },
  { date: '2024-04', revenue: 61000 },
  { date: '2024-05', revenue: 55000 },
  { date: '2024-06', revenue: 67000 },
];

const occupancyData = [
  { month: 'Jan', occupancy: 65 },
  { month: 'Feb', occupancy: 72 },
  { month: 'Mar', occupancy: 68 },
  { month: 'Apr', occupancy: 85 },
  { month: 'May', occupancy: 78 },
  { month: 'Jun', occupancy: 92 },
];

const bookingStatusData = [
  { name: 'Confirmed', value: 45, color: '#4caf50' },
  { name: 'Pending', value: 25, color: '#ff9800' },
  { name: 'Completed', value: 20, color: '#2196f3' },
  { name: 'Cancelled', value: 10, color: '#f44336' },
];

const recentActivity = [
  {
    id: 1,
    type: 'booking',
    message: 'New booking #1234 for Villa Azure',
    time: '2 minutes ago',
    user: 'John Doe',
  },
  {
    id: 2,
    type: 'property',
    message: 'Property "Sunset Haven" was verified',
    time: '15 minutes ago',
    user: 'Admin User',
  },
  {
    id: 3,
    type: 'user',
    message: 'New host "Sarah Jones" signed up',
    time: '1 hour ago',
    user: 'Sarah Jones',
  },
  {
    id: 4,
    type: 'payment',
    message: 'Payout processed for Host #567',
    time: '2 hours ago',
    user: 'Finance Team',
  },
];

const StatCard = ({ title, value, change, icon, color }: any) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography color="textSecondary" gutterBottom variant="body2">
            {title}
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
            {value}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            {change > 0 ? (
              <TrendingUp sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
            ) : (
              <TrendingDown sx={{ color: 'error.main', fontSize: 16, mr: 0.5 }} />
            )}
            <Typography
              variant="body2"
              color={change > 0 ? 'success.main' : 'error.main'}
            >
              {Math.abs(change)}% from last month
            </Typography>
          </Box>
        </Box>
        <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
          {icon}
        </Avatar>
      </Box>
    </CardContent>
  </Card>
);

const QuickActionCard = ({ title, description, icon, action, color }: any) => (
  <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={action}>
    <CardContent sx={{ textAlign: 'center', py: 3 }}>
      <Avatar sx={{ bgcolor: color, width: 64, height: 64, mx: 'auto', mb: 2 }}>
        {icon}
      </Avatar>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    totalProperties: 0,
    totalUsers: 0,
    checkIns: 0,
    checkOuts: 0,
    newBookings: 0,
    pendingInquiries: 0,
    occupancyRate: 0,
    averageBookingValue: 0,
  });

  useEffect(() => {
    // Fetch dashboard stats
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    // Mock data - replace with actual API call
    setStats({
      totalRevenue: 125000,
      totalBookings: 342,
      totalProperties: 156,
      totalUsers: 892,
      checkIns: 12,
      checkOuts: 8,
      newBookings: 23,
      pendingInquiries: 7,
      occupancyRate: 78,
      averageBookingValue: 365,
    });
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Welcome back! Here's what's happening with Luxe Staycations today.
        </Typography>
      </Box>

      {/* Today's Summary */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Today's Summary
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                Check-ins
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                {stats.checkIns}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                Check-outs
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'info.main' }}>
                {stats.checkOuts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                New Bookings
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {stats.newBookings}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                Pending Inquiries
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                {stats.pendingInquiries}
              </Typography>
          </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Total Revenue (MTD)"
            value={`$${(stats.totalRevenue / 1000).toFixed(0)}k`}
            change={12.5}
            icon={<AttachMoney />}
            color="success.main"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Total Bookings"
            value={stats.totalBookings}
            change={-2.3}
            icon={<BookOnline />}
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Total Properties"
            value={stats.totalProperties}
            change={8.7}
            icon={<Villa />}
            color="info.main"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            change={15.2}
            icon={<People />}
            color="warning.main"
          />
        </Grid>
      </Grid>

      {/* Charts and Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Revenue Chart */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Revenue Overview (Last 6 Months)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Line type="monotone" dataKey="revenue" stroke="#2196f3" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <QuickActionCard
                  title="Add New Property"
                  description="Create a new villa listing"
                  icon={<AddIcon />}
                  color="primary.main"
                  action={() => console.log('Add property')}
                />
                <QuickActionCard
                  title="View Support Tickets"
                  description="Check recent customer issues"
                  icon={<SupportIcon />}
                  color="warning.main"
                  action={() => console.log('View tickets')}
                />
                <QuickActionCard
                  title="Generate Report"
                  description="Download financial reports"
                  icon={<ReportIcon />}
                  color="success.main"
                  action={() => console.log('Generate report')}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Occupancy and Booking Status */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Occupancy Rate
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', mr: 2 }}>
                  {stats.occupancyRate}%
                </Typography>
                <Chip label="Current" color="success" size="small" />
              </Box>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={occupancyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="occupancy" fill="#4caf50" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Booking Status Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={bookingStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {bookingStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Recent Activity
              </Typography>
              <List>
                {recentActivity.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {activity.type === 'booking' && <BookOnline />}
                          {activity.type === 'property' && <Villa />}
                          {activity.type === 'user' && <People />}
                          {activity.type === 'payment' && <AttachMoney />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={activity.message}
                        secondary={
                          <React.Fragment>
                            <Typography component="span" variant="body2" color="textPrimary">
                              {activity.user}
                            </Typography>
                            {` — ${activity.time}`}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    {index < recentActivity.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
