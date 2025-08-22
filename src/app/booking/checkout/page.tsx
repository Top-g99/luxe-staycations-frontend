"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Divider,
  Alert,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  CalendarToday,
  People,
  Payment,
  CheckCircle,
  ArrowBack,
  ArrowForward,
  CreditCard,
  AccountBalance,
  LocalOffer,
  Info,
  Warning,
} from '@mui/icons-material';

// Mock data - in real app, this would come from API
const mockProperty = {
  id: 1,
  title: "Luxury Beach Villa",
  location: "Goa, India",
  images: ["https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200&auto=format&fit=crop"],
  basePrice: 15000,
  cleaningFee: 2000,
  securityDeposit: 5000,
  amenities: ["Private Pool", "Ocean View", "Chef Service", "Concierge"],
  hostName: "John Smith",
  hostRating: 4.8,
  hostResponseTime: "1 hour",
};

const mockConciergeServices = [
  { id: 1, name: "Airport Transfer", price: 2500, description: "Private car from airport to villa" },
  { id: 2, name: "Chef Service", price: 3000, description: "Personal chef for your stay" },
  { id: 3, name: "Spa Treatment", price: 1500, description: "In-villa spa service" },
  { id: 4, name: "Yoga Instructor", price: 1000, description: "Private yoga sessions" },
];

const steps = ['Select Dates', 'Guest Details', 'Add Services', 'Review & Pay'];

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeStep, setActiveStep] = useState(0);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1,
    guestDetails: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      specialRequests: '',
    },
    selectedServices: [],
    paymentMethod: 'card',
    termsAccepted: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Calculate booking details
  const checkInDate = new Date(bookingData.checkIn);
  const checkOutDate = new Date(bookingData.checkOut);
  const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const baseAmount = mockProperty.basePrice * nights;
  const cleaningFee = mockProperty.cleaningFee;
  const servicesTotal = bookingData.selectedServices.reduce((sum, serviceId) => {
    const service = mockConciergeServices.find(s => s.id === serviceId);
    return sum + (service?.price || 0);
  }, 0);
  const totalAmount = baseAmount + cleaningFee + servicesTotal;

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleBooking();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleServiceToggle = (serviceId: number) => {
    setBookingData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter(id => id !== serviceId)
        : [...prev.selectedServices, serviceId]
    }));
  };

  const handleBooking = async () => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app, this would be an API call to create booking
      const bookingId = Math.random().toString(36).substr(2, 9).toUpperCase();
      
      // Redirect to confirmation page
      router.push(`/booking/confirmation/${bookingId}`);
    } catch (err) {
      setError('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 0:
        return bookingData.checkIn && bookingData.checkOut && bookingData.guests > 0;
      case 1:
        return bookingData.guestDetails.firstName && 
               bookingData.guestDetails.lastName && 
               bookingData.guestDetails.email && 
               bookingData.guestDetails.phone;
      case 2:
        return true; // Services are optional
      case 3:
        return bookingData.termsAccepted;
      default:
        return false;
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Select Your Dates
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Check-in Date"
                        type="date"
                        value={bookingData.checkIn}
                        onChange={(e) => setBookingData(prev => ({ ...prev, checkIn: e.target.value }))}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Check-out Date"
                        type="date"
                        value={bookingData.checkOut}
                        onChange={(e) => setBookingData(prev => ({ ...prev, checkOut: e.target.value }))}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Number of Guests</InputLabel>
                        <Select
                          value={bookingData.guests}
                          label="Number of Guests"
                          onChange={(e) => setBookingData(prev => ({ ...prev, guests: Number(e.target.value) }))}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                            <MenuItem key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Number of Rooms</InputLabel>
                        <Select
                          value={bookingData.rooms}
                          label="Number of Rooms"
                          onChange={(e) => setBookingData(prev => ({ ...prev, rooms: Number(e.target.value) }))}
                        >
                          {[1, 2, 3, 4].map(num => (
                            <MenuItem key={num} value={num}>{num} {num === 1 ? 'Room' : 'Rooms'}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Booking Summary
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      {nights} {nights === 1 ? 'night' : 'nights'}
                    </Typography>
                    <Typography variant="h6">
                      ₹{baseAmount.toLocaleString()}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    Cleaning fee: ₹{cleaningFee.toLocaleString()}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    Total: ₹{(baseAmount + cleaningFee).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Guest Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        value={bookingData.guestDetails.firstName}
                        onChange={(e) => setBookingData(prev => ({
                          ...prev,
                          guestDetails: { ...prev.guestDetails, firstName: e.target.value }
                        }))}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        value={bookingData.guestDetails.lastName}
                        onChange={(e) => setBookingData(prev => ({
                          ...prev,
                          guestDetails: { ...prev.guestDetails, lastName: e.target.value }
                        }))}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={bookingData.guestDetails.email}
                        onChange={(e) => setBookingData(prev => ({
                          ...prev,
                          guestDetails: { ...prev.guestDetails, email: e.target.value }
                        }))}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        value={bookingData.guestDetails.phone}
                        onChange={(e) => setBookingData(prev => ({
                          ...prev,
                          guestDetails: { ...prev.guestDetails, phone: e.target.value }
                        }))}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Special Requests (Optional)"
                        multiline
                        rows={3}
                        value={bookingData.guestDetails.specialRequests}
                        onChange={(e) => setBookingData(prev => ({
                          ...prev,
                          guestDetails: { ...prev.guestDetails, specialRequests: e.target.value }
                        }))}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Property Details
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      src={mockProperty.images[0]}
                      sx={{ width: 60, height: 60, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {mockProperty.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {mockProperty.location}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    Host: {mockProperty.hostName}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Typography variant="body2" sx={{ mr: 1 }}>
                      ⭐ {mockProperty.hostRating}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Responds in {mockProperty.hostResponseTime}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Add Concierge Services (Optional)
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Enhance your stay with premium services
                  </Typography>
                  <Grid container spacing={2}>
                    {mockConciergeServices.map((service) => (
                      <Grid item xs={12} key={service.id}>
                        <Card variant="outlined">
                          <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox
                                  checked={bookingData.selectedServices.includes(service.id)}
                                  onChange={() => handleServiceToggle(service.id)}
                                />
                                <Box sx={{ ml: 2 }}>
                                  <Typography variant="subtitle1" fontWeight="bold">
                                    {service.name}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {service.description}
                                  </Typography>
                                </Box>
                              </Box>
                              <Typography variant="h6" color="primary">
                                ₹{service.price.toLocaleString()}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Services Summary
                  </Typography>
                  {bookingData.selectedServices.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      No services selected
                    </Typography>
                  ) : (
                    <List dense>
                      {bookingData.selectedServices.map((serviceId) => {
                        const service = mockConciergeServices.find(s => s.id === serviceId);
                        return service ? (
                          <ListItem key={service.id} sx={{ px: 0 }}>
                            <ListItemText
                              primary={service.name}
                              secondary={service.description}
                            />
                            <Typography variant="body2">
                              ₹{service.price.toLocaleString()}
                            </Typography>
                          </ListItem>
                        ) : null;
                      })}
                    </List>
                  )}
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6">
                    Services Total: ₹{servicesTotal.toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Review & Payment
                  </Typography>
                  
                  {/* Booking Summary */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Booking Summary
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Check-in</Typography>
                        <Typography variant="body1">{bookingData.checkIn}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Check-out</Typography>
                        <Typography variant="body1">{bookingData.checkOut}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Guests</Typography>
                        <Typography variant="body1">{bookingData.guests} guests</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Rooms</Typography>
                        <Typography variant="body1">{bookingData.rooms} rooms</Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Payment Method */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Payment Method
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        value={bookingData.paymentMethod}
                        onChange={(e) => setBookingData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                      >
                        <MenuItem value="card">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CreditCard sx={{ mr: 1 }} />
                            Credit/Debit Card
                          </Box>
                        </MenuItem>
                        <MenuItem value="upi">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AccountBalance sx={{ mr: 1 }} />
                            UPI
                          </Box>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Terms */}
                  <Box sx={{ mb: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={bookingData.termsAccepted}
                          onChange={(e) => setBookingData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                        />
                      }
                      label="I agree to the terms and conditions and cancellation policy"
                    />
                  </Box>

                  {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Price Breakdown
                  </Typography>
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText
                        primary={`₹${mockProperty.basePrice.toLocaleString()} × ${nights} nights`}
                      />
                      <Typography variant="body2">
                        ₹{baseAmount.toLocaleString()}
                      </Typography>
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText primary="Cleaning fee" />
                      <Typography variant="body2">
                        ₹{cleaningFee.toLocaleString()}
                      </Typography>
                    </ListItem>
                    {servicesTotal > 0 && (
                      <ListItem sx={{ px: 0 }}>
                        <ListItemText primary="Concierge services" />
                        <Typography variant="body2">
                          ₹{servicesTotal.toLocaleString()}
                        </Typography>
                      </ListItem>
                    )}
                  </List>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">Total</Typography>
                    <Typography variant="h5" color="primary" fontWeight="bold">
                      ₹{totalAmount.toLocaleString()}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    You won't be charged yet
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Complete Your Booking
      </Typography>

      {/* Stepper */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      {/* Step Content */}
      {renderStepContent(activeStep)}

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          startIcon={<ArrowBack />}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={!isStepValid(activeStep) || loading}
          endIcon={activeStep === steps.length - 1 ? <CheckCircle /> : <ArrowForward />}
        >
          {loading ? 'Processing...' : activeStep === steps.length - 1 ? 'Confirm Booking' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
}
