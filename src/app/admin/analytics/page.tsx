"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Visibility,
  People,
  ShoppingCart,
  AttachMoney,
  Campaign,
  Analytics as AnalyticsIcon,
  Download as DownloadIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

// Mock data - replace with actual API calls
const websiteTrafficData = [
  { date: '2024-03-01', users: 1250, sessions: 1800, pageviews: 4500, bounceRate: 35 },
  { date: '2024-03-02', users: 1320, sessions: 1950, pageviews: 4800, bounceRate: 32 },
  { date: '2024-03-03', users: 1180, sessions: 1700, pageviews: 4200, bounceRate: 38 },
  { date: '2024-03-04', users: 1450, sessions: 2100, pageviews: 5200, bounceRate: 30 },
  { date: '2024-03-05', users: 1520, sessions: 2200, pageviews: 5500, bounceRate: 28 },
  { date: '2024-03-06', users: 1380, sessions: 2000, pageviews: 4900, bounceRate: 33 },
  { date: '2024-03-07', users: 1620, sessions: 2350, pageviews: 5800, bounceRate: 25 },
];

const conversionData = [
  { step: 'Page View', visitors: 10000, conversions: 10000, rate: 100 },
  { step: 'Property View', visitors: 3500, conversions: 3500, rate: 35 },
  { step: 'Inquiry', visitors: 1200, conversions: 1200, rate: 12 },
  { step: 'Booking', visitors: 450, conversions: 450, rate: 4.5 },
];

const marketingData = [
  { source: 'Google Ads', visitors: 2500, conversions: 180, revenue: 45000, cpa: 25 },
  { source: 'Facebook Ads', visitors: 1800, conversions: 120, revenue: 32000, cpa: 30 },
  { source: 'Instagram Ads', visitors: 1200, conversions: 90, revenue: 28000, cpa: 35 },
  { source: 'Organic Search', visitors: 3500, conversions: 200, revenue: 55000, cpa: 0 },
  { source: 'Direct Traffic', visitors: 2000, conversions: 150, revenue: 40000, cpa: 0 },
  { source: 'Referral', visitors: 800, conversions: 60, revenue: 18000, cpa: 15 },
];

const propertyPerformanceData = [
  { property: 'Villa Azure', views: 850, bookings: 12, revenue: 15000, conversionRate: 1.4 },
  { property: 'Sunset Haven', views: 720, bookings: 8, revenue: 21600, conversionRate: 1.1 },
  { property: 'Mountain Retreat', views: 650, bookings: 10, revenue: 17500, conversionRate: 1.5 },
  { property: 'Ocean View Villa', views: 580, bookings: 6, revenue: 12000, conversionRate: 1.0 },
  { property: 'City Penthouse', views: 420, bookings: 4, revenue: 8000, conversionRate: 0.9 },
];

const utmCampaignData = [
  { campaign: 'Summer2024', visitors: 1200, conversions: 85, revenue: 25000, cpa: 20 },
  { campaign: 'LuxuryWeekend', visitors: 800, conversions: 65, revenue: 18000, cpa: 25 },
  { campaign: 'BeachHoliday', visitors: 950, conversions: 70, revenue: 22000, cpa: 22 },
  { campaign: 'MountainEscape', visitors: 600, conversions: 45, revenue: 15000, cpa: 28 },
];

const StatCard = ({ title, value, change, icon, color, subtitle }: any) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography color="textSecondary" gutterBottom variant="body2">
            {title}
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              {subtitle}
            </Typography>
          )}
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
              {Math.abs(change)}% from last week
            </Typography>
          </Box>
        </Box>
        <Box sx={{ color, fontSize: 40 }}>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('users');

  const handleExportData = (type: string) => {
    // Mock export functionality
    console.log(`Exporting ${type} data`);
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Analytics & Reporting
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Track website performance, conversion rates, and marketing effectiveness.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small">
            <InputLabel>Date Range</InputLabel>
            <Select
              value={dateRange}
              label="Date Range"
              onChange={(e) => setDateRange(e.target.value)}
            >
              <MenuItem value="7d">Last 7 days</MenuItem>
              <MenuItem value="30d">Last 30 days</MenuItem>
              <MenuItem value="90d">Last 90 days</MenuItem>
              <MenuItem value="1y">Last year</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => handleExportData('analytics')}
          >
            Export Data
          </Button>
        </Box>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value="8,420"
            change={12.5}
            icon={<People />}
            color="primary.main"
            subtitle="Unique visitors"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Sessions"
            value="12,150"
            change={8.3}
            icon={<Visibility />}
            color="info.main"
            subtitle="Page visits"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Conversion Rate"
            value="4.5%"
            change={-2.1}
            icon={<ShoppingCart />}
            color="success.main"
            subtitle="Bookings per visitor"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Revenue"
            value="$180,000"
            change={15.7}
            icon={<AttachMoney />}
            color="warning.main"
            subtitle="Total bookings"
          />
        </Grid>
      </Grid>

      {/* Website Traffic Chart */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Website Traffic
                </Typography>
                <FormControl size="small">
                  <InputLabel>Metric</InputLabel>
                  <Select
                    value={selectedMetric}
                    label="Metric"
                    onChange={(e) => setSelectedMetric(e.target.value)}
                  >
                    <MenuItem value="users">Users</MenuItem>
                    <MenuItem value="sessions">Sessions</MenuItem>
                    <MenuItem value="pageviews">Pageviews</MenuItem>
                    <MenuItem value="bounceRate">Bounce Rate</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={websiteTrafficData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey={selectedMetric} 
                    stroke="#2196f3" 
                    strokeWidth={3}
                    fill="#2196f3"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Conversion Funnel
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={conversionData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="step" type="category" width={80} />
                  <Tooltip formatter={(value) => [`${value}`, 'Visitors']} />
                  <Bar dataKey="visitors" fill="#4caf50" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Marketing Performance */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Marketing Channel Performance
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => handleExportData('marketing')}
                >
                  Export Report
                </Button>
              </Box>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Source</TableCell>
                      <TableCell align="right">Visitors</TableCell>
                      <TableCell align="right">Conversions</TableCell>
                      <TableCell align="right">Revenue</TableCell>
                      <TableCell align="right">CPA</TableCell>
                      <TableCell align="right">Conversion Rate</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {marketingData.map((row) => (
                      <TableRow key={row.source}>
                        <TableCell component="th" scope="row">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Campaign sx={{ color: 'primary.main' }} />
                            {row.source}
                          </Box>
                        </TableCell>
                        <TableCell align="right">{row.visitors.toLocaleString()}</TableCell>
                        <TableCell align="right">{row.conversions}</TableCell>
                        <TableCell align="right">${row.revenue.toLocaleString()}</TableCell>
                        <TableCell align="right">
                          {row.cpa > 0 ? `$${row.cpa}` : 'Organic'}
                        </TableCell>
                        <TableCell align="right">
                          {((row.conversions / row.visitors) * 100).toFixed(1)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Property Performance & UTM Campaigns */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Property Performance
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Property</TableCell>
                      <TableCell align="right">Views</TableCell>
                      <TableCell align="right">Bookings</TableCell>
                      <TableCell align="right">Revenue</TableCell>
                      <TableCell align="right">Conv. Rate</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {propertyPerformanceData.map((row) => (
                      <TableRow key={row.property}>
                        <TableCell component="th" scope="row">
                          {row.property}
                        </TableCell>
                        <TableCell align="right">{row.views}</TableCell>
                        <TableCell align="right">{row.bookings}</TableCell>
                        <TableCell align="right">${row.revenue.toLocaleString()}</TableCell>
                        <TableCell align="right">{row.conversionRate}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                UTM Campaign Performance
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Campaign</TableCell>
                      <TableCell align="right">Visitors</TableCell>
                      <TableCell align="right">Conversions</TableCell>
                      <TableCell align="right">Revenue</TableCell>
                      <TableCell align="right">CPA</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {utmCampaignData.map((row) => (
                      <TableRow key={row.campaign}>
                        <TableCell component="th" scope="row">
                          <Chip label={row.campaign} size="small" color="primary" variant="outlined" />
                        </TableCell>
                        <TableCell align="right">{row.visitors}</TableCell>
                        <TableCell align="right">{row.conversions}</TableCell>
                        <TableCell align="right">${row.revenue.toLocaleString()}</TableCell>
                        <TableCell align="right">${row.cpa}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Additional Analytics */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Traffic Sources Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={marketingData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ source, percent }) => `${source} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="visitors"
                  >
                    {marketingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#4caf50', '#2196f3', '#ff9800', '#9c27b0', '#f44336', '#607d8b'][index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Revenue by Channel
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={marketingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="source" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Area type="monotone" dataKey="revenue" stroke="#4caf50" fill="#4caf50" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
