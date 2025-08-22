"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import {
  Dashboard as DashboardIcon,
  Villa as VillaIcon,
  BookOnline as BookingIcon,
  AccountBalance as FinanceIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  Message as MessageIcon,
  TrendingUp,
  TrendingDown,
  Star,
  CalendarToday,
  People,
  Payment,
  Notifications,
  Settings,
  Analytics,
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

// Mock data for host dashboard
const mockHostData = {
  name: "John Smith",
  email: "john.smith@example.com",
  phone: "+91 98765 43210",
  totalProperties: 3,
  totalBookings: 45,
  totalEarnings: 1250000,
  averageRating: 4.8,
  responseRate: 98,
  responseTime: "1 hour",
};

const mockProperties = [
  {
    id: 1,
    title: "Luxury Beach Villa",
    location: "Goa, India",
    status: "ACTIVE",
    price: 15000,
    occupancy: 85,
    rating: 4.8,
    totalBookings: 25,
    totalEarnings: 675000,
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Mountain Retreat",
    location: "Manali, India",
    status: "ACTIVE",
    price: 12000,
    occupancy: 72,
    rating: 4.6,
    totalBookings: 15,
    totalEarnings: 384000,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Heritage Palace Suite",
    location: "Udaipur, India",
    status: "PENDING_REVIEW",
    price: 25000,
    occupancy: 0,
    rating: 0,
    totalBookings: 0,
    totalEarnings: 0,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop",
  },
];

const mockBookings = [
  {
    id: 1,
    propertyTitle: "Luxury Beach Villa",
    guestName: "Sarah Johnson",
    checkIn: "2024-02-15",
    checkOut: "2024-02-18",
    guests: 4,
    totalAmount: 52000,
    status: "CONFIRMED",
    paymentStatus: "PAID",
  },
  {
    id: 2,
    propertyTitle: "Mountain Retreat",
    guestName: "Mike Wilson",
    checkIn: "2024-02-20",
    checkOut: "2024-02-22",
    guests: 2,
    totalAmount: 24000,
    status: "PENDING",
    paymentStatus: "PENDING",
  },
  {
    id: 3,
    propertyTitle: "Luxury Beach Villa",
    guestName: "David Brown",
    checkIn: "2024-03-01",
    checkOut: "2024-03-05",
    guests: 6,
    totalAmount: 78000,
    status: "CONFIRMED",
    paymentStatus: "PAID",
  },
];

const mockEarnings = [
  { month: 'Jan', earnings: 85000, bookings: 8 },
  { month: 'Feb', earnings: 92000, bookings: 9 },
  { month: 'Mar', earnings: 78000, bookings: 7 },
  { month: 'Apr', earnings: 105000, bookings: 10 },
  { month: 'May', earnings: 98000, bookings: 9 },
  { month: 'Jun', earnings: 112000, bookings: 11 },
];

const mockPayouts = [
  {
    id: 1,
    amount: 67500,
    status: "PROCESSED",
    date: "2024-01-20",
    method: "Bank Transfer",
  },
  {
    id: 2,
    amount: 38400,
    status: "PENDING",
    date: "2024-02-15",
    method: "Bank Transfer",
  },
];

export default function HostDashboardPage() {
  const [tabValue, setTabValue] = useState(0);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [propertyDialog, setPropertyDialog] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handlePropertyEdit = (property: any) => {
    setSelectedProperty(property);
    setPropertyDialog(true);
  };

  const propertyColumns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Property',
      width: 250,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={params.row.image}
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {params.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.location}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value.replace('_', ' ')}
          color={params.value === 'ACTIVE' ? 'success' : 'warning'}
          size="small"
        />
      ),
    },
    {
      field: 'price',
      headerName: 'Price/Night',
      width: 120,
      renderCell: (params) => `₹${params.value.toLocaleString()}`,
    },
    {
      field: 'occupancy',
      headerName: 'Occupancy',
      width: 100,
      renderCell: (params) => `${params.value}%`,
    },
    {
      field: 'rating',
      headerName: 'Rating',
      width: 100,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Star sx={{ color: 'warning.main', fontSize: 16, mr: 0.5 }} />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'totalBookings',
      headerName: 'Bookings',
      width: 100,
    },
    {
      field: 'totalEarnings',
      headerName: 'Earnings',
      width: 120,
      renderCell: (params) => `₹${params.value.toLocaleString()}`,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ViewIcon />}
          label="View Details"
          onClick={() => {}}
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit Property"
          onClick={() => handlePropertyEdit(params.row)}
        />,
        <GridActionsCellItem
          icon={<MessageIcon />}
          label="View Messages"
          onClick={() => {}}
        />,
      ],
    },
  ];

  const bookingColumns: GridColDef[] = [
    {
      field: 'propertyTitle',
      headerName: 'Property',
      width: 200,
    },
    {
      field: 'guestName',
      headerName: 'Guest',
      width: 150,
    },
    {
      field: 'checkIn',
      headerName: 'Check-in',
      width: 120,
    },
    {
      field: 'checkOut',
      headerName: 'Check-out',
      width: 120,
    },
    {
      field: 'guests',
      headerName: 'Guests',
      width: 80,
    },
    {
      field: 'totalAmount',
      headerName: 'Amount',
      width: 120,
      renderCell: (params) => `₹${params.value.toLocaleString()}`,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'CONFIRMED' ? 'success' : 'warning'}
          size="small"
        />
      ),
    },
    {
      field: 'paymentStatus',
      headerName: 'Payment',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'PAID' ? 'success' : 'warning'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ViewIcon />}
          label="View Details"
          onClick={() => {}}
        />,
        <GridActionsCellItem
          icon={<MessageIcon />}
          label="Message Guest"
          onClick={() => {}}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Host Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back, {mockHostData.name}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setPropertyDialog(true)}
        >
          Add Property
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Total Properties
                  </Typography>
                  <Typography variant="h4">{mockHostData.totalProperties}</Typography>
                </Box>
                <VillaIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Total Bookings
                  </Typography>
                  <Typography variant="h4">{mockHostData.totalBookings}</Typography>
                </Box>
                <BookingIcon sx={{ fontSize: 40, color: 'success.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Total Earnings
                  </Typography>
                  <Typography variant="h4">₹{(mockHostData.totalEarnings / 100000).toFixed(1)}L</Typography>
                </Box>
                <FinanceIcon sx={{ fontSize: 40, color: 'warning.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Average Rating
                  </Typography>
                  <Typography variant="h4">{mockHostData.averageRating}</Typography>
                </Box>
                <Star sx={{ fontSize: 40, color: 'warning.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Earnings Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockEarnings}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Line type="monotone" dataKey="earnings" stroke="#8884d8" name="Earnings (₹)" />
                  <Line type="monotone" dataKey="bookings" stroke="#82ca9d" name="Bookings" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Property Performance
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={mockProperties.map(p => ({ name: p.title, value: p.totalEarnings }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mockProperties.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28'][index]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Card>
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Properties" />
              <Tab label="Bookings" />
              <Tab label="Earnings" />
              <Tab label="Messages" />
            </Tabs>
          </Box>

          {/* Properties Tab */}
          {tabValue === 0 && (
            <Box sx={{ height: 500 }}>
              <DataGrid
                rows={mockProperties}
                columns={propertyColumns}
                pageSize={10}
                rowsPerPageOptions={[10, 25, 50]}
                checkboxSelection
                disableSelectionOnClick
              />
            </Box>
          )}

          {/* Bookings Tab */}
          {tabValue === 1 && (
            <Box sx={{ height: 500 }}>
              <DataGrid
                rows={mockBookings}
                columns={bookingColumns}
                pageSize={10}
                rowsPerPageOptions={[10, 25, 50]}
                checkboxSelection
                disableSelectionOnClick
              />
            </Box>
          )}

          {/* Earnings Tab */}
          {tabValue === 2 && (
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Recent Payouts
                      </Typography>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Date</TableCell>
                              <TableCell>Amount</TableCell>
                              <TableCell>Status</TableCell>
                              <TableCell>Method</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {mockPayouts.map((payout) => (
                              <TableRow key={payout.id}>
                                <TableCell>{payout.date}</TableCell>
                                <TableCell>₹{payout.amount.toLocaleString()}</TableCell>
                                <TableCell>
                                  <Chip
                                    label={payout.status}
                                    color={payout.status === 'PROCESSED' ? 'success' : 'warning'}
                                    size="small"
                                  />
                                </TableCell>
                                <TableCell>{payout.method}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Earnings Summary
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemText
                            primary="This Month"
                            secondary="₹125,000"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Last Month"
                            secondary="₹98,000"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Pending Payout"
                            secondary="₹38,400"
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Messages Tab */}
          {tabValue === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Recent Messages
              </Typography>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>G</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Guest inquiry for Luxury Beach Villa"
                    secondary="Sarah Johnson • 2 hours ago"
                  />
                  <Button variant="outlined" size="small">
                    Reply
                  </Button>
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>M</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Check-in details for Mountain Retreat"
                    secondary="Mike Wilson • 1 day ago"
                  />
                  <Button variant="outlined" size="small">
                    Reply
                  </Button>
                </ListItem>
              </List>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Property Dialog */}
      <Dialog open={propertyDialog} onClose={() => setPropertyDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedProperty ? 'Edit Property' : 'Add New Property'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Property Title"
                defaultValue={selectedProperty?.title || ''}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                defaultValue={selectedProperty?.location || ''}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price per Night"
                type="number"
                defaultValue={selectedProperty?.price || ''}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Status</InputLabel>
                <Select defaultValue={selectedProperty?.status || 'PENDING_REVIEW'}>
                  <MenuItem value="ACTIVE">Active</MenuItem>
                  <MenuItem value="PENDING_REVIEW">Pending Review</MenuItem>
                  <MenuItem value="SUSPENDED">Suspended</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                defaultValue=""
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPropertyDialog(false)}>Cancel</Button>
          <Button variant="contained">
            {selectedProperty ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
