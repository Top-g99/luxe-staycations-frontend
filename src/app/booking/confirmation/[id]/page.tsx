"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Divider,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  CheckCircle,
  CalendarToday,
  People,
  LocationOn,
  Payment,
  Email,
  Phone,
  Download,
  Share,
  Home,
} from '@mui/icons-material';

// Mock booking data - in real app, this would come from API
const mockBooking = {
  id: 'BK123456789',
  property: {
    title: "Luxury Beach Villa",
    location: "Goa, India",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200&auto=format&fit=crop",
    hostName: "John Smith",
    hostPhone: "+91 98765 43210",
    hostEmail: "john.smith@example.com",
  },
  dates: {
    checkIn: "2024-02-15",
    checkOut: "2024-02-18",
    nights: 3,
  },
  guests: {
    count: 4,
    rooms: 2,
    names: ["John Doe", "Jane Doe", "Mike Smith", "Sarah Johnson"],
  },
  payment: {
    total: 52000,
    status: "PAID",
    method: "Credit Card",
    breakdown: {
      basePrice: 45000,
      cleaningFee: 2000,
      services: 5000,
    },
  },
  services: [
    { name: "Airport Transfer", price: 2500 },
    { name: "Chef Service", price: 2500 },
  ],
  status: "CONFIRMED",
  confirmationDate: "2024-01-20",
};

export default function BookingConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.id as string;

  const handleDownloadInvoice = () => {
    // In real app, this would generate and download a PDF invoice
    console.log('Downloading invoice for booking:', bookingId);
  };

  const handleShareBooking = () => {
    // In real app, this would share booking details
    console.log('Sharing booking:', bookingId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      {/* Success Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Booking Confirmed!
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Your booking has been successfully confirmed
        </Typography>
        <Chip
          label={`Booking ID: ${bookingId}`}
          variant="outlined"
          sx={{ mt: 2 }}
        />
      </Box>

      <Grid container spacing={3}>
        {/* Property Details */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Property Details
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  src={mockBooking.property.image}
                  sx={{ width: 80, height: 80, mr: 3 }}
                />
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {mockBooking.property.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <LocationOn sx={{ fontSize: 16, mr: 0.5 }} />
                    {mockBooking.property.location}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Booking Details */}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CalendarToday sx={{ mr: 1, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Check-in
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {formatDate(mockBooking.dates.checkIn)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CalendarToday sx={{ mr: 1, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Check-out
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {formatDate(mockBooking.dates.checkOut)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <People sx={{ mr: 1, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Guests
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {mockBooking.guests.count} guests, {mockBooking.guests.rooms} rooms
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Payment sx={{ mr: 1, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Payment Status
                      </Typography>
                      <Chip
                        label={mockBooking.payment.status}
                        color="success"
                        size="small"
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {/* Guest Names */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Guest Names
                </Typography>
                <List dense>
                  {mockBooking.guests.names.map((name, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemText primary={name} />
                    </ListItem>
                  ))}
                </List>
              </Box>

              {/* Concierge Services */}
              {mockBooking.services.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Concierge Services
                  </Typography>
                  <List dense>
                    {mockBooking.services.map((service, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemText
                          primary={service.name}
                          secondary={`₹${service.price.toLocaleString()}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Host Contact & Actions */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Host Contact
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {mockBooking.property.hostName}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Phone sx={{ fontSize: 16, mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">
                      {mockBooking.property.hostPhone}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Email sx={{ fontSize: 16, mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">
                      {mockBooking.property.hostEmail}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                Payment Summary
              </Typography>
              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary={`₹${mockBooking.payment.breakdown.basePrice.toLocaleString()} × ${mockBooking.dates.nights} nights`}
                  />
                  <Typography variant="body2">
                    ₹{mockBooking.payment.breakdown.basePrice.toLocaleString()}
                  </Typography>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="Cleaning fee" />
                  <Typography variant="body2">
                    ₹{mockBooking.payment.breakdown.cleaningFee.toLocaleString()}
                  </Typography>
                </ListItem>
                {mockBooking.payment.breakdown.services > 0 && (
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText primary="Concierge services" />
                    <Typography variant="body2">
                      ₹{mockBooking.payment.breakdown.services.toLocaleString()}
                    </Typography>
                  </ListItem>
                )}
              </List>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Total Paid</Typography>
                <Typography variant="h5" color="primary" fontWeight="bold">
                  ₹{mockBooking.payment.total.toLocaleString()}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Next Steps
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  onClick={handleDownloadInvoice}
                  fullWidth
                >
                  Download Invoice
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Share />}
                  onClick={handleShareBooking}
                  fullWidth
                >
                  Share Booking
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Home />}
                  onClick={() => router.push('/')}
                  fullWidth
                >
                  Back to Home
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Important Information */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Important Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Check-in Instructions
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                • Check-in time: 3:00 PM<br/>
                • Please bring a valid ID for verification<br/>
                • Contact your host 1 hour before arrival<br/>
                • Parking is available on-site
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Cancellation Policy
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                • Free cancellation up to 7 days before check-in<br/>
                • 50% refund for cancellations 3-7 days before<br/>
                • No refund for cancellations within 3 days<br/>
                • Contact support for any issues
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
