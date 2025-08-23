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
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { 
  CheckCircle,
  Hotel,
  CalendarToday,
  People,
  LocationOn,
  Star,
  Email,
  Phone,
  CreditCard,
  Download,
  Print,
  Share,
  Home,
  ArrowBack
} from '@mui/icons-material';
import { useParams, useRouter } from 'next/navigation';

interface BookingConfirmation {
  id: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  property: {
    id: string;
    title: string;
    location: string;
    image_urls: string[];
    price_per_night: number;
    cleaning_fee: number;
    security_deposit: number;
    max_guests: number;
    bedrooms: number;
    bathrooms: number;
    averageRating: number;
    reviewCount: number;
  };
  guest: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    zipCode: string;
  };
  booking: {
    checkIn: string;
    checkOut: string;
    guests: number;
    totalNights: number;
    subtotal: number;
    cleaningFee: number;
    serviceFee: number;
    total: number;
    securityDeposit: number;
  };
  payment: {
    method: string;
    transactionId: string;
    status: string;
    last4: string;
  };
  createdAt: string;
  confirmationCode: string;
}

export default function BookingConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<BookingConfirmation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock booking confirmation data - in real app, this would come from API
    const mockBooking: BookingConfirmation = {
      id: params.id as string,
      status: 'confirmed',
      property: {
        id: '1',
        title: 'Luxury Villa in Bali',
        location: 'Bali, Indonesia',
        image_urls: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'],
        price_per_night: 250,
        cleaning_fee: 50,
        security_deposit: 500,
        max_guests: 6,
        bedrooms: 3,
        bathrooms: 2,
        averageRating: 4.8,
        reviewCount: 12
      },
      guest: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main Street',
        city: 'New York',
        country: 'USA',
        zipCode: '10001'
      },
      booking: {
        checkIn: '2024-09-15',
        checkOut: '2024-09-18',
        guests: 2,
        totalNights: 3,
        subtotal: 750,
        cleaningFee: 50,
        serviceFee: 75,
        total: 875,
        securityDeposit: 500
      },
      payment: {
        method: 'Credit Card',
        transactionId: 'TXN-123456789',
        status: 'Completed',
        last4: '1234'
      },
      createdAt: new Date().toISOString(),
      confirmationCode: 'LUXE-2024-001'
    };

    setBooking(mockBooking);
    setLoading(false);
  }, [params.id]);

  const handleDownloadReceipt = () => {
    // TODO: Implement receipt download
    console.log('Downloading receipt...');
  };

  const handlePrintConfirmation = () => {
    window.print();
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: 'My Luxe Staycation Booking',
        text: `I just booked ${booking?.property.title} for ${booking?.booking.totalNights} nights!`,
        url: window.location.href
      });
    }
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4">Loading confirmation...</Typography>
      </Container>
    );
  }

  if (!booking) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" color="error">Booking not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Success Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Avatar sx={{ 
          bgcolor: 'success.main', 
          width: 80, 
          height: 80, 
          mx: 'auto', 
          mb: 2 
        }}>
          <CheckCircle sx={{ fontSize: 40 }} />
        </Avatar>
        <Typography variant="h4" component="h1" sx={{ mb: 2, color: 'success.main' }}>
          Booking Confirmed!
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
          Confirmation Code: {booking.confirmationCode}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Thank you for choosing Luxe Staycations. Your booking has been confirmed and you will receive a confirmation email shortly.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Left Column - Property Details */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ mb: 3 }}>
            <CardHeader title="Property Details" />
            <CardContent>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <img 
                    src={booking.property.image_urls[0]} 
                    alt={booking.property.title}
                    style={{ 
                      width: '100%', 
                      height: '200px', 
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 8 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {booking.property.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {booking.property.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Star sx={{ color: 'warning.main', fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2">
                      {booking.property.averageRating} ({booking.property.reviewCount} reviews)
                    </Typography>
                  </Box>
                  
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 6 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <People sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                        <Typography variant="body2">
                          {booking.property.max_guests} guests max
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Hotel sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                        <Typography variant="body2">
                          {booking.property.bedrooms} bedrooms
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Guest Information */}
          <Card sx={{ mb: 3 }}>
            <CardHeader title="Guest Information" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Full Name
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {booking.guest.firstName} {booking.guest.lastName}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {booking.guest.email}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {booking.guest.phone}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Address
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {booking.guest.address}, {booking.guest.city}, {booking.guest.country} {booking.guest.zipCode}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader title="Payment Information" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Payment Method
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {booking.payment.method} ending in {booking.payment.last4}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Transaction ID
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {booking.payment.transactionId}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Payment Status
                  </Typography>
                  <Chip 
                    label={booking.payment.status} 
                    color="success" 
                    size="small"
                    sx={{ mb: 2 }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Booking Summary & Actions */}
        <Grid size={{ xs: 12, md: 4 }}>
          {/* Booking Summary */}
          <Card sx={{ mb: 3 }}>
            <CardHeader title="Booking Summary" />
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                    <Typography variant="body2">
                      {new Date(booking.booking.checkIn).toLocaleDateString()} - {new Date(booking.booking.checkOut).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <People sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2">
                    {booking.booking.guests} guests • {booking.booking.totalNights} nights
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>Accommodation</TableCell>
                      <TableCell align="right">
                        ${booking.property.price_per_night} × {booking.booking.totalNights}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Subtotal</TableCell>
                      <TableCell align="right">${booking.booking.subtotal}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cleaning Fee</TableCell>
                      <TableCell align="right">${booking.booking.cleaningFee}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Service Fee</TableCell>
                      <TableCell align="right">${booking.booking.serviceFee}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Total</strong></TableCell>
                      <TableCell align="right"><strong>${booking.booking.total}</strong></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Security Deposit:</strong> ${booking.booking.securityDeposit} (refundable)
                </Typography>
              </Alert>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardHeader title="Actions" />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  onClick={handleDownloadReceipt}
                  fullWidth
                >
                  Download Receipt
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Print />}
                  onClick={handlePrintConfirmation}
                  fullWidth
                >
                  Print Confirmation
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Share />}
                  onClick={handleShare}
                  fullWidth
                >
                  Share Booking
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Home />}
                  onClick={handleBackToHome}
                  fullWidth
                >
                  Back to Home
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Important Information */}
          <Card sx={{ mt: 3 }}>
            <CardHeader title="Important Information" />
            <CardContent>
              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Check-in: 3:00 PM"
                    secondary="Check-out: 11:00 AM"
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Free cancellation"
                    secondary="Cancel up to 24 hours before check-in"
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Contact host"
                    secondary="You'll receive host contact details 24h before arrival"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Footer Actions */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Need help? Contact our support team at support@luxestaycations.com
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={handleBackToHome}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}
