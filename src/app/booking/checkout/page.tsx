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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Divider,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Alert,
  Snackbar
} from '@mui/material';
import { 
  Hotel,
  CalendarToday,
  People,
  AttachMoney,
  CreditCard,
  Security,
  CheckCircle,
  LocationOn,
  Star,
  Payment,
  ArrowBack,
  ArrowForward
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface Property {
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
}

interface BookingDetails {
  checkIn: string;
  checkOut: string;
  guests: number;
  totalNights: number;
  subtotal: number;
  cleaningFee: number;
  serviceFee: number;
  total: number;
}

interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
}

interface PaymentInfo {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export default function BookingCheckoutPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [property, setProperty] = useState<Property | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    checkIn: '',
    checkOut: '',
    guests: 2,
    totalNights: 0,
    subtotal: 0,
    cleaningFee: 0,
    serviceFee: 0,
    total: 0
  });
  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zipCode: ''
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info'
  });

  useEffect(() => {
    // Mock property data - in real app, this would come from URL params or context
    const mockProperty: Property = {
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
    };
    setProperty(mockProperty);

    // Set default dates (next week)
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const checkIn = nextWeek.toISOString().split('T')[0];
    
    const checkOut = new Date(nextWeek);
    checkOut.setDate(checkOut.getDate() + 3);
    const checkOutStr = checkOut.toISOString().split('T')[0];

    const totalNights = 3;
    const subtotal = mockProperty.price_per_night * totalNights;
    const serviceFee = subtotal * 0.1; // 10% service fee

    setBookingDetails({
      checkIn,
      checkOut: checkOutStr,
      guests: 2,
      totalNights,
      subtotal,
      cleaningFee: mockProperty.cleaning_fee,
      serviceFee,
      total: subtotal + mockProperty.cleaning_fee + serviceFee
    });
  }, []);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    // TODO: Implement actual booking submission
    console.log('Submitting booking:', { property, bookingDetails, guestInfo, paymentInfo });
    setSnackbar({
      open: true,
      message: 'Booking submitted successfully! Redirecting to confirmation...',
      severity: 'success'
    });
    
    // Simulate redirect to confirmation page
    setTimeout(() => {
      router.push('/booking/confirmation/123');
    }, 2000);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const steps = [
    {
      label: 'Review Property',
      description: 'Confirm your property selection and dates'
    },
    {
      label: 'Guest Information',
      description: 'Enter your contact and guest details'
    },
    {
      label: 'Payment',
      description: 'Complete your payment information'
    }
  ];

  if (!property) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Complete Your Booking
      </Typography>

      <Grid container spacing={4}>
        {/* Left Column - Booking Steps */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {step.description}
                    </Typography>

                    {/* Step 1: Review Property */}
                    {index === 0 && (
                      <Card>
                        <CardContent>
                          <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 4 }}>
                              <img 
                                src={property.image_urls[0]} 
                                alt={property.title}
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
                                {property.title}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                                <Typography variant="body2" color="text.secondary">
                                  {property.location}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Star sx={{ color: 'warning.main', fontSize: 16, mr: 0.5 }} />
                                <Typography variant="body2">
                                  {property.averageRating} ({property.reviewCount} reviews)
                                </Typography>
                              </Box>
                              
                              <Grid container spacing={2}>
                                <Grid size={{ xs: 6 }}>
                                  <TextField
                                    fullWidth
                                    label="Check-in Date"
                                    type="date"
                                    value={bookingDetails.checkIn}
                                    onChange={(e) => setBookingDetails({ ...bookingDetails, checkIn: e.target.value })}
                                    InputLabelProps={{ shrink: true }}
                                  />
                                </Grid>
                                <Grid size={{ xs: 6 }}>
                                  <TextField
                                    fullWidth
                                    label="Check-out Date"
                                    type="date"
                                    value={bookingDetails.checkOut}
                                    onChange={(e) => setBookingDetails({ ...bookingDetails, checkOut: e.target.value })}
                                    InputLabelProps={{ shrink: true }}
                                  />
                                </Grid>
                                <Grid size={{ xs: 6 }}>
                                  <TextField
                                    fullWidth
                                    label="Number of Guests"
                                    type="number"
                                    value={bookingDetails.guests}
                                    onChange={(e) => setBookingDetails({ ...bookingDetails, guests: parseInt(e.target.value) })}
                                    inputProps={{ min: 1, max: property.max_guests }}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    )}

                    {/* Step 2: Guest Information */}
                    {index === 1 && (
                      <Card>
                        <CardContent>
                          <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                              <TextField
                                fullWidth
                                label="First Name"
                                value={guestInfo.firstName}
                                onChange={(e) => setGuestInfo({ ...guestInfo, firstName: e.target.value })}
                                sx={{ mb: 2 }}
                              />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                              <TextField
                                fullWidth
                                label="Last Name"
                                value={guestInfo.lastName}
                                onChange={(e) => setGuestInfo({ ...guestInfo, lastName: e.target.value })}
                                sx={{ mb: 2 }}
                              />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                              <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={guestInfo.email}
                                onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                                sx={{ mb: 2 }}
                              />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                              <TextField
                                fullWidth
                                label="Phone"
                                value={guestInfo.phone}
                                onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                                sx={{ mb: 2 }}
                              />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                              <TextField
                                fullWidth
                                label="Address"
                                value={guestInfo.address}
                                onChange={(e) => setGuestInfo({ ...guestInfo, address: e.target.value })}
                                sx={{ mb: 2 }}
                              />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                              <TextField
                                fullWidth
                                label="City"
                                value={guestInfo.city}
                                onChange={(e) => setGuestInfo({ ...guestInfo, city: e.target.value })}
                                sx={{ mb: 2 }}
                              />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                              <TextField
                                fullWidth
                                label="Country"
                                value={guestInfo.country}
                                onChange={(e) => setGuestInfo({ ...guestInfo, country: e.target.value })}
                                sx={{ mb: 2 }}
                              />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                              <TextField
                                fullWidth
                                label="ZIP Code"
                                value={guestInfo.zipCode}
                                onChange={(e) => setGuestInfo({ ...guestInfo, zipCode: e.target.value })}
                                sx={{ mb: 2 }}
                              />
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    )}

                    {/* Step 3: Payment */}
                    {index === 2 && (
                      <Card>
                        <CardContent>
                          <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                              <TextField
                                fullWidth
                                label="Card Number"
                                value={paymentInfo.cardNumber}
                                onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                                placeholder="1234 5678 9012 3456"
                                sx={{ mb: 2 }}
                              />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                              <TextField
                                fullWidth
                                label="Cardholder Name"
                                value={paymentInfo.cardHolder}
                                onChange={(e) => setPaymentInfo({ ...paymentInfo, cardHolder: e.target.value })}
                                sx={{ mb: 2 }}
                              />
                            </Grid>
                            <Grid size={{ xs: 6 }}>
                              <TextField
                                fullWidth
                                label="Expiry Date"
                                value={paymentInfo.expiryDate}
                                onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                                placeholder="MM/YY"
                                sx={{ mb: 2 }}
                              />
                            </Grid>
                            <Grid size={{ xs: 6 }}>
                              <TextField
                                fullWidth
                                label="CVV"
                                value={paymentInfo.cvv}
                                onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                                placeholder="123"
                                sx={{ mb: 2 }}
                              />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                  />
                                }
                                label="I agree to the terms and conditions and privacy policy"
                              />
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    )}

                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mr: 1 }}
                        disabled={index === 2 && !termsAccepted}
                      >
                        {index === steps.length - 1 ? 'Complete Booking' : 'Continue'}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                    </Box>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Grid>

        {/* Right Column - Booking Summary */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardHeader title="Booking Summary" />
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <img 
                  src={property.image_urls[0]} 
                  alt={property.title}
                  style={{ 
                    width: '100%', 
                    height: '150px', 
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '16px'
                  }}
                />
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {property.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {property.location}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                    <Typography variant="body2">
                      {bookingDetails.totalNights} nights
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <People sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                    <Typography variant="body2">
                      {bookingDetails.guests} guests
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText 
                    primary={`$${property.price_per_night} × ${bookingDetails.totalNights} nights`}
                    secondary="Accommodation"
                  />
                  <Typography variant="body2">
                    ${bookingDetails.subtotal}
                  </Typography>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText 
                    primary="Cleaning fee"
                    secondary="One-time fee"
                  />
                  <Typography variant="body2">
                    ${property.cleaning_fee}
                  </Typography>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText 
                    primary="Service fee"
                    secondary="Platform fee"
                  />
                  <Typography variant="body2">
                    ${bookingDetails.serviceFee.toFixed(2)}
                  </Typography>
                </ListItem>
                <Divider sx={{ my: 1 }} />
                <ListItem sx={{ px: 0 }}>
                  <ListItemText 
                    primary="Total"
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                  <Typography variant="h6" color="primary">
                    ${bookingDetails.total.toFixed(2)}
                  </Typography>
                </ListItem>
              </List>

              <Box sx={{ mt: 3 }}>
                <Alert severity="info" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    <strong>Security Deposit:</strong> ${property.security_deposit} (refundable)
                  </Typography>
                </Alert>
                
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<Payment />}
                  onClick={handleSubmit}
                  disabled={activeStep !== 2 || !termsAccepted}
                >
                  Complete Booking
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
