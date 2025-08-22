"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Avatar,
  Alert,
  Snackbar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridToolbar,
} from '@mui/x-data-grid';
import {
  Edit as EditIcon,
  Visibility as ViewIcon,
  Cancel as CancelIcon,
  Refresh as RefundIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  Person as PersonIcon,
  Villa as VillaIcon,
} from '@mui/icons-material';

// Mock data - replace with actual API calls
const mockBookings = [
  {
    id: '1',
    bookingId: 'BK-2024-001',
    guestName: 'John Doe',
    guestEmail: 'john.doe@example.com',
    propertyName: 'Villa Azure',
    propertyLocation: 'Bali, Indonesia',
    startDate: '2024-04-15',
    endDate: '2024-04-20',
    nights: 5,
    totalAmount: 1250,
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    createdAt: '2024-03-10',
    specialRequests: 'Early check-in requested',
    conciergeAddons: 'Airport transfer, Chef service',
  },
  {
    id: '2',
    bookingId: 'BK-2024-002',
    guestName: 'Jane Smith',
    guestEmail: 'jane.smith@example.com',
    propertyName: 'Sunset Haven',
    propertyLocation: 'Maldives',
    startDate: '2024-05-01',
    endDate: '2024-05-07',
    nights: 6,
    totalAmount: 2700,
    status: 'PENDING',
    paymentStatus: 'PENDING',
    createdAt: '2024-03-12',
    specialRequests: '',
    conciergeAddons: '',
  },
  {
    id: '3',
    bookingId: 'BK-2024-003',
    guestName: 'Mike Wilson',
    guestEmail: 'mike.wilson@example.com',
    propertyName: 'Mountain Retreat',
    propertyLocation: 'Swiss Alps',
    startDate: '2024-03-20',
    endDate: '2024-03-25',
    nights: 5,
    totalAmount: 1750,
    status: 'COMPLETED',
    paymentStatus: 'PAID',
    createdAt: '2024-02-15',
    specialRequests: 'Late check-out requested',
    conciergeAddons: 'Ski equipment rental',
  },
];

const BookingDetailDialog = ({ open, onClose, booking }: any) => {
  if (!booking) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return 'success';
      case 'PENDING': return 'warning';
      case 'COMPLETED': return 'info';
      case 'CANCELLED': return 'error';
      case 'REFUNDED': return 'default';
      default: return 'default';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'PAID': return 'success';
      case 'PENDING': return 'warning';
      case 'REFUNDED': return 'info';
      case 'FAILED': return 'error';
      default: return 'default';
    }
  };

  const steps = [
    {
      label: 'Booking Created',
      description: `Booking ${booking.bookingId} was created on ${booking.createdAt}`,
      completed: true,
    },
    {
      label: 'Payment Processed',
      description: `Payment status: ${booking.paymentStatus}`,
      completed: booking.paymentStatus === 'PAID',
    },
    {
      label: 'Booking Confirmed',
      description: `Booking confirmed for ${booking.startDate} to ${booking.endDate}`,
      completed: booking.status === 'CONFIRMED' || booking.status === 'COMPLETED',
    },
    {
      label: 'Stay Completed',
      description: 'Guest has completed their stay',
      completed: booking.status === 'COMPLETED',
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6">Booking Details</Typography>
          <Chip label={booking.bookingId} color="primary" />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          {/* Guest Information */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonIcon />
                  Guest Information
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Name"
                      secondary={booking.guestName}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Email"
                      secondary={booking.guestEmail}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Property Information */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <VillaIcon />
                  Property Information
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Property"
                      secondary={booking.propertyName}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Location"
                      secondary={booking.propertyLocation}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Booking Details */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarIcon />
                  Booking Details
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Check-in"
                      secondary={booking.startDate}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Check-out"
                      secondary={booking.endDate}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Nights"
                      secondary={booking.nights}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Financial Information */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MoneyIcon />
                  Financial Information
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Total Amount"
                      secondary={`$${booking.totalAmount}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Status"
                      secondary={
                        <Chip
                          label={booking.status}
                          color={getStatusColor(booking.status) as any}
                          size="small"
                        />
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Payment Status"
                      secondary={
                        <Chip
                          label={booking.paymentStatus}
                          color={getPaymentStatusColor(booking.paymentStatus) as any}
                          size="small"
                        />
                      }
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Special Requests & Add-ons */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Special Requests & Add-ons
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Special Requests
                    </Typography>
                    <Typography variant="body2">
                      {booking.specialRequests || 'None'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Concierge Add-ons
                    </Typography>
                    <Typography variant="body2">
                      {booking.conciergeAddons || 'None'}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Booking Timeline */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Booking Timeline
                </Typography>
                <Stepper orientation="vertical">
                  {steps.map((step, index) => (
                    <Step key={index} active={step.completed} completed={step.completed}>
                      <StepLabel>{step.label}</StepLabel>
                      <StepContent>
                        <Typography variant="body2" color="textSecondary">
                          {step.description}
                        </Typography>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" startIcon={<EmailIcon />}>
          Contact Guest
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const BookingForm = ({ open, onClose, booking, onSave }: any) => {
  const [formData, setFormData] = useState({
    status: booking?.status || 'PENDING',
    paymentStatus: booking?.paymentStatus || 'PENDING',
    startDate: booking?.startDate || '',
    endDate: booking?.endDate || '',
    totalAmount: booking?.totalAmount || 0,
    specialRequests: booking?.specialRequests || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {booking ? 'Edit Booking' : 'Modify Booking'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Booking Status</InputLabel>
                <Select
                  value={formData.status}
                  label="Booking Status"
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <MenuItem value="PENDING">Pending</MenuItem>
                  <MenuItem value="CONFIRMED">Confirmed</MenuItem>
                  <MenuItem value="COMPLETED">Completed</MenuItem>
                  <MenuItem value="CANCELLED">Cancelled</MenuItem>
                  <MenuItem value="REFUNDED">Refunded</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Payment Status</InputLabel>
                <Select
                  value={formData.paymentStatus}
                  label="Payment Status"
                  onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
                >
                  <MenuItem value="PENDING">Pending</MenuItem>
                  <MenuItem value="PAID">Paid</MenuItem>
                  <MenuItem value="REFUNDED">Refunded</MenuItem>
                  <MenuItem value="FAILED">Failed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Total Amount ($)"
                type="number"
                value={formData.totalAmount}
                onChange={(e) => setFormData({ ...formData, totalAmount: Number(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Special Requests"
                multiline
                rows={3}
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Update Booking
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState(mockBookings);
  const [openDetail, setOpenDetail] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info',
  });

  const handleViewBooking = (booking: any) => {
    setSelectedBooking(booking);
    setOpenDetail(true);
  };

  const handleEditBooking = (booking: any) => {
    setSelectedBooking(booking);
    setOpenForm(true);
  };

  const handleSaveBooking = (formData: any) => {
    setBookings(prev => 
      prev.map(b => b.id === selectedBooking.id ? { ...b, ...formData } : b)
    );
    setSnackbar({
      open: true,
      message: 'Booking updated successfully',
      severity: 'success',
    });
  };

  const handleCancelBooking = (id: string) => {
    setBookings(prev => 
      prev.map(b => b.id === id ? { ...b, status: 'CANCELLED' } : b)
    );
    setSnackbar({
      open: true,
      message: 'Booking cancelled successfully',
      severity: 'warning',
    });
  };

  const handleRefundBooking = (id: string) => {
    setBookings(prev => 
      prev.map(b => b.id === id ? { ...b, status: 'REFUNDED', paymentStatus: 'REFUNDED' } : b)
    );
    setSnackbar({
      open: true,
      message: 'Refund processed successfully',
      severity: 'info',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return 'success';
      case 'PENDING': return 'warning';
      case 'COMPLETED': return 'info';
      case 'CANCELLED': return 'error';
      case 'REFUNDED': return 'default';
      default: return 'default';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'PAID': return 'success';
      case 'PENDING': return 'warning';
      case 'REFUNDED': return 'info';
      case 'FAILED': return 'error';
      default: return 'default';
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'bookingId',
      headerName: 'Booking ID',
      width: 150,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'primary.main' }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'guestName',
      headerName: 'Guest',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
            {params.value[0]}
          </Avatar>
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'propertyName',
      headerName: 'Property',
      width: 200,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            {params.value}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {params.row.propertyLocation}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'dates',
      headerName: 'Dates',
      width: 200,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2">
            {params.row.startDate} - {params.row.endDate}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {params.row.nights} nights
          </Typography>
        </Box>
      ),
    },
    {
      field: 'totalAmount',
      headerName: 'Amount',
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
          ${params.value}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value) as any}
          size="small"
        />
      ),
    },
    {
      field: 'paymentStatus',
      headerName: 'Payment',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getPaymentStatusColor(params.value) as any}
          size="small"
        />
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      width: 120,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 200,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ViewIcon />}
          label="View Details"
          onClick={() => handleViewBooking(params.row)}
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEditBooking(params.row)}
        />,
        <GridActionsCellItem
          icon={<CancelIcon />}
          label="Cancel"
          onClick={() => handleCancelBooking(params.id as string)}
          disabled={params.row.status === 'CANCELLED' || params.row.status === 'COMPLETED'}
        />,
        <GridActionsCellItem
          icon={<RefundIcon />}
          label="Refund"
          onClick={() => handleRefundBooking(params.id as string)}
          disabled={params.row.status === 'REFUNDED'}
        />,
      ],
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Booking Management
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Manage all bookings, track payments, and handle guest requests.
        </Typography>
      </Box>

      {/* Booking Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                Total Bookings
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {bookings.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                Confirmed
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                {bookings.filter(b => b.status === 'CONFIRMED').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                Pending
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                {bookings.filter(b => b.status === 'PENDING').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                Total Revenue
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'info.main' }}>
                ${bookings.reduce((sum, b) => sum + b.totalAmount, 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Bookings Data Grid */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <DataGrid
            rows={bookings}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            checkboxSelection
            disableSelectionOnClick
            autoHeight
            components={{
              Toolbar: GridToolbar,
            }}
            sx={{
              '& .MuiDataGrid-cell:focus': {
                outline: 'none',
              },
            }}
          />
        </CardContent>
      </Card>

      {/* Booking Detail Dialog */}
      <BookingDetailDialog
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        booking={selectedBooking}
      />

      {/* Booking Form Dialog */}
      <BookingForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        booking={selectedBooking}
        onSave={handleSaveBooking}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
