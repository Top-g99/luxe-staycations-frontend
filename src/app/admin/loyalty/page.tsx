"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Alert,
  IconButton,
  Tooltip,
  Badge,
  LinearProgress,
  Divider,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridActionsCellItem,
  GridToolbar,
} from '@mui/x-data-grid';
import {
  Diamond,
  Star,
  LocalOffer,
  Visibility,
  Edit,
  Delete,
  Add,
  FilterList,
  AutoAwesome,
  Speed,
  TrendingDown,
  NewReleases,
  Verified,
  AccountBalanceWallet,
  Redeem,
  EmojiEvents,
  Leaderboard,
  Campaign,
  Group,
  TrendingUp,
  MonetizationOn,
  CardGiftcard,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock data for loyalty program
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    luxeJewels: 2500,
    loyaltyTier: "GOLD",
    totalSpent: 150000,
    totalBookings: 8,
    lastBooking: "2024-01-15",
    referralCount: 3,
    referralEarnings: 1500,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    luxeJewels: 8500,
    loyaltyTier: "PLATINUM",
    totalSpent: 450000,
    totalBookings: 15,
    lastBooking: "2024-01-18",
    referralCount: 7,
    referralEarnings: 3500,
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    luxeJewels: 1200,
    loyaltyTier: "SILVER",
    totalSpent: 75000,
    totalBookings: 4,
    lastBooking: "2024-01-10",
    referralCount: 1,
    referralEarnings: 500,
  },
  {
    id: 4,
    name: "Maria Garcia",
    email: "maria@example.com",
    luxeJewels: 500,
    loyaltyTier: "BRONZE",
    totalSpent: 25000,
    totalBookings: 2,
    lastBooking: "2024-01-05",
    referralCount: 0,
    referralEarnings: 0,
  },
];

const mockCoupons = [
  {
    id: 1,
    code: "SUMMER24",
    name: "Summer Special Discount",
    description: "Get 20% off on summer bookings",
    couponType: "PERCENTAGE",
    discountValue: 20,
    scope: "SITE_WIDE",
    validFrom: "2024-06-01",
    validUntil: "2024-08-31",
    maxUses: 1000,
    maxUsesPerUser: 1,
    minBookingValue: 5000,
    totalUses: 245,
    totalDiscount: 125000,
    isActive: true,
  },
  {
    id: 2,
    code: "WELCOME50",
    name: "First Time User Discount",
    description: "₹500 off for first-time users",
    couponType: "FIXED_AMOUNT",
    discountValue: 500,
    scope: "FIRST_TIME_ONLY",
    validFrom: "2024-01-01",
    validUntil: "2024-12-31",
    maxUses: 5000,
    maxUsesPerUser: 1,
    minBookingValue: 2000,
    totalUses: 1890,
    totalDiscount: 945000,
    isActive: true,
  },
  {
    id: 3,
    code: "LUXEPREMIER",
    name: "Luxe Premier Properties",
    description: "15% off on Luxe Premier properties",
    couponType: "PERCENTAGE",
    discountValue: 15,
    scope: "PROPERTY_SPECIFIC",
    validFrom: "2024-01-01",
    validUntil: "2024-12-31",
    maxUses: 500,
    maxUsesPerUser: 2,
    minBookingValue: 10000,
    totalUses: 89,
    totalDiscount: 67500,
    isActive: true,
  },
];

const mockLoyaltyMetrics = {
  totalMembers: 1250,
  activeMembers: 890,
  totalJewelsIssued: 125000,
  totalJewelsRedeemed: 45000,
  totalReferrals: 340,
  totalReferralEarnings: 17000,
  averageTier: "SILVER",
  redemptionRate: 36,
  referralConversionRate: 28,
};

const tierBenefits = {
  BRONZE: {
    name: "Bronze",
    color: "#CD7F32",
    minSpent: 0,
    benefits: ["1 Jewel per ₹1000 spent", "Basic support"],
  },
  SILVER: {
    name: "Silver",
    color: "#C0C0C0",
    minSpent: 50000,
    benefits: ["1.2 Jewels per ₹1000 spent", "Priority support", "5% referral bonus"],
  },
  GOLD: {
    name: "Gold",
    color: "#FFD700",
    minSpent: 150000,
    benefits: ["1.5 Jewels per ₹1000 spent", "VIP support", "10% referral bonus", "Free cancellation"],
  },
  PLATINUM: {
    name: "Platinum",
    color: "#E5E4E2",
    minSpent: 300000,
    benefits: ["2 Jewels per ₹1000 spent", "24/7 concierge", "15% referral bonus", "Free upgrades", "Early access"],
  },
};

export default function LoyaltyPage() {
  const [tabValue, setTabValue] = useState(0);
  const [users, setUsers] = useState(mockUsers);
  const [coupons, setCoupons] = useState(mockCoupons);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [couponDialog, setCouponDialog] = useState(false);
  const [loyaltyDialog, setLoyaltyDialog] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCouponEdit = (coupon: any) => {
    setSelectedCoupon(coupon);
    setCouponDialog(true);
  };

  const getTierColor = (tier: string) => {
    return tierBenefits[tier]?.color || '#gray';
  };

  const getTierName = (tier: string) => {
    return tierBenefits[tier]?.name || tier;
  };

  const userColumns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Member',
      width: 200,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight="bold">
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.email}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'loyaltyTier',
      headerName: 'Tier',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={getTierName(params.value)}
          sx={{ 
            backgroundColor: getTierColor(params.value),
            color: 'white',
            fontWeight: 'bold'
          }}
          size="small"
        />
      ),
    },
    {
      field: 'luxeJewels',
      headerName: 'Luxe Jewels',
      width: 130,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Diamond sx={{ color: 'secondary.main', fontSize: 16, mr: 0.5 }} />
          <Typography variant="body2">{params.value.toLocaleString()}</Typography>
        </Box>
      ),
    },
    {
      field: 'totalSpent',
      headerName: 'Total Spent',
      width: 130,
      renderCell: (params) => `₹${params.value.toLocaleString()}`,
    },
    {
      field: 'totalBookings',
      headerName: 'Bookings',
      width: 100,
    },
    {
      field: 'referralCount',
      headerName: 'Referrals',
      width: 100,
    },
    {
      field: 'referralEarnings',
      headerName: 'Referral Earnings',
      width: 140,
      renderCell: (params) => `₹${params.value.toLocaleString()}`,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Visibility />}
          label="View Details"
          onClick={() => {}}
        />,
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit Jewels"
          onClick={() => {}}
        />,
      ],
    },
  ];

  const couponColumns: GridColDef[] = [
    {
      field: 'code',
      headerName: 'Code',
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="bold" fontFamily="monospace">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
    },
    {
      field: 'couponType',
      headerName: 'Type',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value === 'PERCENTAGE' ? 'Percentage' : 'Fixed'}
          color={params.value === 'PERCENTAGE' ? 'primary' : 'secondary'}
          size="small"
        />
      ),
    },
    {
      field: 'discountValue',
      headerName: 'Discount',
      width: 100,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.row.couponType === 'PERCENTAGE' 
            ? `${params.value}%` 
            : `₹${params.value}`
          }
        </Typography>
      ),
    },
    {
      field: 'scope',
      headerName: 'Scope',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value.replace('_', ' ')}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      field: 'totalUses',
      headerName: 'Uses',
      width: 80,
    },
    {
      field: 'totalDiscount',
      headerName: 'Total Discount',
      width: 130,
      renderCell: (params) => `₹${params.value.toLocaleString()}`,
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Active' : 'Inactive'}
          color={params.value ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit Coupon"
          onClick={() => handleCouponEdit(params.row)}
        />,
        <GridActionsCellItem
          icon={<Visibility />}
          label="View Performance"
          onClick={() => {}}
        />,
      ],
    },
  ];

  const chartData = [
    { name: 'Bronze', value: 450, color: '#CD7F32' },
    { name: 'Silver', value: 320, color: '#C0C0C0' },
    { name: 'Gold', value: 280, color: '#FFD700' },
    { name: 'Platinum', value: 200, color: '#E5E4E2' },
  ];

  const monthlyData = [
    { month: 'Jan', jewelsEarned: 8500, jewelsRedeemed: 3200, referrals: 45 },
    { month: 'Feb', jewelsEarned: 9200, jewelsRedeemed: 3800, referrals: 52 },
    { month: 'Mar', jewelsEarned: 7800, jewelsRedeemed: 2900, referrals: 38 },
    { month: 'Apr', jewelsEarned: 10500, jewelsRedeemed: 4200, referrals: 65 },
    { month: 'May', jewelsEarned: 9800, jewelsRedeemed: 3600, referrals: 58 },
    { month: 'Jun', jewelsEarned: 11200, jewelsRedeemed: 4500, referrals: 72 },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        The Luxe Circle - Loyalty Program
      </Typography>

      {/* Loyalty Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Members
              </Typography>
              <Typography variant="h4" color="primary.main">
                {mockLoyaltyMetrics.totalMembers.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Active Members
              </Typography>
              <Typography variant="h4" color="success.main">
                {mockLoyaltyMetrics.activeMembers.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Jewels Issued
              </Typography>
              <Typography variant="h4" color="secondary.main">
                {mockLoyaltyMetrics.totalJewelsIssued.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Jewels Redeemed
              </Typography>
              <Typography variant="h4" color="warning.main">
                {mockLoyaltyMetrics.totalJewelsRedeemed.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Referrals
              </Typography>
              <Typography variant="h4" color="info.main">
                {mockLoyaltyMetrics.totalReferrals.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Referral Earnings
              </Typography>
              <Typography variant="h4" color="success.main">
                ₹{mockLoyaltyMetrics.totalReferralEarnings.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Member Distribution by Tier
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monthly Loyalty Trends
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Line type="monotone" dataKey="jewelsEarned" stroke="#8884d8" name="Jewels Earned" />
                  <Line type="monotone" dataKey="jewelsRedeemed" stroke="#82ca9d" name="Jewels Redeemed" />
                  <Line type="monotone" dataKey="referrals" stroke="#ffc658" name="Referrals" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs for different sections */}
      <Card>
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Members" />
              <Tab label="Coupons & Campaigns" />
              <Tab label="Tier Benefits" />
              <Tab label="Referral Program" />
            </Tabs>
          </Box>

          {/* Members Tab */}
          {tabValue === 0 && (
            <Box sx={{ height: 500 }}>
              <DataGrid
                rows={users}
                columns={userColumns}
                pageSize={10}
                rowsPerPageOptions={[10, 25, 50]}
                checkboxSelection
                disableSelectionOnClick
                components={{
                  Toolbar: GridToolbar,
                }}
              />
            </Box>
          )}

          {/* Coupons Tab */}
          {tabValue === 1 && (
            <Box>
              <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Active Campaigns</Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setCouponDialog(true)}
                >
                  Create Campaign
                </Button>
              </Box>
              <Box sx={{ height: 500 }}>
                <DataGrid
                  rows={coupons}
                  columns={couponColumns}
                  pageSize={10}
                  rowsPerPageOptions={[10, 25, 50]}
                  checkboxSelection
                  disableSelectionOnClick
                  components={{
                    Toolbar: GridToolbar,
                  }}
                />
              </Box>
            </Box>
          )}

          {/* Tier Benefits Tab */}
          {tabValue === 2 && (
            <Box>
              <Grid container spacing={3}>
                {Object.entries(tierBenefits).map(([tier, benefits]) => (
                  <Grid item xs={12} md={6} lg={3} key={tier}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar
                            sx={{
                              backgroundColor: benefits.color,
                              color: 'white',
                              fontWeight: 'bold',
                              mr: 2,
                            }}
                          >
                            {tier[0]}
                          </Avatar>
                          <Box>
                            <Typography variant="h6">{benefits.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              Min. Spend: ₹{benefits.minSpent.toLocaleString()}
                            </Typography>
                          </Box>
                        </Box>
                        <List dense>
                          {benefits.benefits.map((benefit, index) => (
                            <ListItem key={index} sx={{ py: 0.5 }}>
                              <ListItemText
                                primary={benefit}
                                primaryTypographyProps={{ variant: 'body2' }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Referral Program Tab */}
          {tabValue === 3 && (
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Referral Program Stats
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Total Referrals
                          </Typography>
                          <Typography variant="h4" color="primary.main">
                            {mockLoyaltyMetrics.totalReferrals}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Conversion Rate
                          </Typography>
                          <Typography variant="h4" color="success.main">
                            {mockLoyaltyMetrics.referralConversionRate}%
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Total Earnings
                          </Typography>
                          <Typography variant="h4" color="warning.main">
                            ₹{mockLoyaltyMetrics.totalReferralEarnings.toLocaleString()}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Avg. per Referral
                          </Typography>
                          <Typography variant="h4" color="info.main">
                            ₹{Math.round(mockLoyaltyMetrics.totalReferralEarnings / mockLoyaltyMetrics.totalReferrals)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Referral Rewards by Tier
                      </Typography>
                      <List>
                        {Object.entries(tierBenefits).map(([tier, benefits]) => (
                          <ListItem key={tier}>
                            <ListItemAvatar>
                              <Avatar sx={{ backgroundColor: benefits.color, color: 'white' }}>
                                {tier[0]}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={`${benefits.name} Tier`}
                              secondary={`${benefits.benefits.find(b => b.includes('referral')) || 'No referral bonus'}`}
                            />
                            <ListItemSecondaryAction>
                              <Chip
                                label={benefits.benefits.find(b => b.includes('referral'))?.match(/\d+/)?.[0] + '%' || '0%'}
                                color="primary"
                                size="small"
                              />
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Coupon Dialog */}
      <Dialog open={couponDialog} onClose={() => setCouponDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedCoupon ? 'Edit Campaign' : 'Create New Campaign'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Coupon Code"
                defaultValue={selectedCoupon?.code || ''}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Campaign Name"
                defaultValue={selectedCoupon?.name || ''}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={2}
                defaultValue={selectedCoupon?.description || ''}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Discount Type</InputLabel>
                <Select defaultValue={selectedCoupon?.couponType || 'PERCENTAGE'}>
                  <MenuItem value="PERCENTAGE">Percentage</MenuItem>
                  <MenuItem value="FIXED_AMOUNT">Fixed Amount</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Discount Value"
                type="number"
                defaultValue={selectedCoupon?.discountValue || 0}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Scope</InputLabel>
                <Select defaultValue={selectedCoupon?.scope || 'SITE_WIDE'}>
                  <MenuItem value="SITE_WIDE">Site Wide</MenuItem>
                  <MenuItem value="PROPERTY_SPECIFIC">Property Specific</MenuItem>
                  <MenuItem value="FIRST_TIME_ONLY">First Time Only</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Minimum Booking Value"
                type="number"
                defaultValue={selectedCoupon?.minBookingValue || 0}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Valid From"
                type="date"
                defaultValue={selectedCoupon?.validFrom || ''}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Valid Until"
                type="date"
                defaultValue={selectedCoupon?.validUntil || ''}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Max Uses"
                type="number"
                defaultValue={selectedCoupon?.maxUses || 0}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Max Uses Per User"
                type="number"
                defaultValue={selectedCoupon?.maxUsesPerUser || 1}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCouponDialog(false)}>Cancel</Button>
          <Button variant="contained">
            {selectedCoupon ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
