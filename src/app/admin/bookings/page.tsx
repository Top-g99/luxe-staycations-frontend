"use client";

import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader,
  IconButton,
  Button,
  Chip,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { 
  Search,
  FilterList,
  Edit,
  Delete,
  Visibility,
  CheckCircle,
  Cancel,
  Pending,
  Hotel,
  Person,
  CalendarToday,
  AttachMoney,
  LocationOn
} from '@mui/icons-material';

interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  propertyTitle: string;
  propertyLocation: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  bookingDate: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
  specialRequests?: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    // Generate mock booking data
    const mockBookings: Booking[] = [
      {
        id: '1',
        guestName: 'John Doe',
        guestEmail: 'john.doe@example.com',
        propertyTitle: 'Luxury Villa in Bali',
        propertyLocation: 'Bali, Indonesia',
        checkIn: '2024-09-15',
        checkOut: '2024-09-20',
        guests: 4,
        totalAmount: 1250,
        status: 'confirmed',
        bookingDate: '2024-08-20',
        paymentStatus: 'paid',
        specialRequests: 'Early check-in preferred'
      },
      {
        id: '2',
        guestName: 'Sarah Smith',
        guestEmail: 'sarah.smith@example.com',
        propertyTitle: 'Marina Bay Sands Suite',
        propertyLocation: 'Singapore',
        checkIn: '2024-09-10',
        checkOut: '2024-09-12',
        guests: 2,
        totalAmount: 800,
        status: 'pending',
        bookingDate: '2024-08-22',
        paymentStatus: 'pending'
      },
      {
        id: '3',
        guestName: 'Mike Johnson',
        guestEmail: 'mike.johnson@example.com',
        propertyTitle: 'Emerald Bay Resort',
        propertyLocation: 'Maldives',
        checkIn: '2024-08-25',
        checkOut: '2024-08-30',
        guests: 6,
        totalAmount: 2100,
        status: 'completed',
        bookingDate: '2024-08-15',
        paymentStatus: 'paid'
      },
      {
        id: '4',
        guestName: 'Emily Brown',
        guestEmail: 'emily.brown@example.com',
        propertyTitle: 'Royal Orchid Suites',
        propertyLocation: 'Bangkok, Thailand',
        checkIn: '2024-09-05',
        checkOut: '2024-09-08',
        guests: 3,
        totalAmount: 600,
        status: 'cancelled',
        bookingDate: '2024-08-18',
        paymentStatus: 'paid'
      },
      {
        id: '5',
        guestName: 'David Wilson',
        guestEmail: 'david.wilson@example.com',
        propertyTitle: 'Atalaya Villas Nusa Penida',
        propertyLocation: 'Nusa Penida, Indonesia',
        checkIn: '2024-09-20',
        checkOut: '2024-09-25',
        guests: 5,
        totalAmount: 1500,
        status: 'confirmed',
        bookingDate: '2024-08-21',
        paymentStatus: 'paid',
        specialRequests: 'Airport transfer needed'
      }
    ];
    setBookings(mockBookings);
  }, []);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guestEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || booking.status === statusFilter;
    const matchesPayment = !paymentFilter || booking.paymentStatus === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      case 'completed':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle />;
      case 'pending':
        return <Pending />;
      case 'cancelled':
        return <Cancel />;
      case 'completed':
        return <CheckCircle />;
      default:
        return <Pending />;
    }
  };

  const getPaymentColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setDialogOpen(true);
  };

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    setBookings(prevBookings => 
      prevBookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: newStatus as any } : booking
      )
    );
  };

  const calculateTotalRevenue = () => {
    return bookings
      .filter(booking => booking.status === 'confirmed' || booking.status === 'completed')
      .reduce((total, booking) => total + booking.totalAmount, 0);
  };

  const calculatePendingRevenue = () => {
    return bookings
      .filter(booking => booking.status === 'pending')
      .reduce((total, booking) => total + booking.totalAmount, 0);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Bookings Management
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" component="div">
                    {bookings.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Bookings
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <CalendarToday />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" component="div">
                    {bookings.filter(b => b.status === 'confirmed').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Confirmed
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <CheckCircle />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" component="div">
                    ${calculateTotalRevenue().toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Revenue
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <AttachMoney />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" component="div">
                    ${calculatePendingRevenue().toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pending Revenue
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <Pending />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filters */}
      <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              fullWidth
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="confirmed">Confirmed</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Payment</InputLabel>
              <Select
                value={paymentFilter}
                label="Payment"
                onChange={(e) => setPaymentFilter(e.target.value)}
              >
                <MenuItem value="">All Payments</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="failed">Failed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Button variant="outlined" startIcon={<FilterList />} fullWidth>
              Apply Filters
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Results Count */}
      <Typography variant="body1" sx={{ mb: 3 }}>
        Found {filteredBookings.length} bookings
      </Typography>

      {/* Bookings Table */}
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Guest</TableCell>
              <TableCell>Property</TableCell>
              <TableCell>Dates</TableCell>
              <TableCell>Guests</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      {booking.guestName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {booking.guestEmail}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      {booking.propertyTitle}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {booking.propertyLocation}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2">
                      {new Date(booking.checkIn).toLocaleDateString()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      to {new Date(booking.checkOut).toLocaleDateString()}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {booking.guests} guests
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium" color="primary">
                    ${booking.totalAmount}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={booking.status}
                    size="small"
                    color={getStatusColor(booking.status) as any}
                    icon={getStatusIcon(booking.status)}
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={booking.paymentStatus}
                    size="small"
                    color={getPaymentColor(booking.paymentStatus) as any}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton 
                      size="small" 
                      color="info"
                      onClick={() => handleViewBooking(booking)}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton size="small" color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <Delete />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredBookings.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No bookings found matching your criteria
          </Typography>
          <Button 
            variant="outlined" 
            sx={{ mt: 2 }}
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('');
              setPaymentFilter('');
            }}
          >
            Clear Filters
          </Button>
        </Box>
      )}

      {/* View Booking Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Booking Details</DialogTitle>
        <DialogContent>
          {selectedBooking && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Guest Information</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Name:</strong> {selectedBooking.guestName}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Email:</strong> {selectedBooking.guestEmail}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Guests:</strong> {selectedBooking.guests}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Property Information</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Property:</strong> {selectedBooking.propertyTitle}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Location:</strong> {selectedBooking.propertyLocation}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Amount:</strong> ${selectedBooking.totalAmount}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Booking Details</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Check-in:</strong> {new Date(selectedBooking.checkIn).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Check-out:</strong> {new Date(selectedBooking.checkOut).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Status:</strong> {selectedBooking.status}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Payment:</strong> {selectedBooking.paymentStatus}
                  </Typography>
                  {selectedBooking.specialRequests && (
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Special Requests:</strong> {selectedBooking.specialRequests}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
          <Button variant="contained">Edit Booking</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
