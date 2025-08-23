"use client";

import { useState } from 'react';
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
  Rating,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Tabs,
  Tab,
  ImageList,
  ImageListItem,
  ImageListItemBar
} from '@mui/material';
import { 
  LocationOn,
  Star,
  People,
  Hotel,
  Wifi,
  Pool,
  Restaurant,
  Spa,
  FitnessCenter,
  LocalParking,
  Pets,
  SmokingRooms,
  CalendarToday,
  AttachMoney,
  Favorite,
  Share,
  BookOnline,
  Phone,
  Email,
  Directions,
  CheckCircle
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface VillaDetails {
  id: string;
  title: string;
  location: string;
  description: string;
  price_per_night: number;
  cleaning_fee: number;
  security_deposit: number;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  averageRating: number;
  reviewCount: number;
  amenities: string[];
  images: string[];
  host: {
    name: string;
    avatar: string;
    responseTime: string;
    responseRate: number;
    verified: boolean;
  };
  reviews: Array<{
    id: string;
    guestName: string;
    avatar: string;
    rating: number;
    comment: string;
    date: string;
  }>;
  availability: {
    checkIn: string;
    checkOut: string;
    guests: number;
    totalNights: number;
    subtotal: number;
    total: number;
  };
}

export default function AtalayaVillasPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDates, setSelectedDates] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2
  });

  const villa: VillaDetails = {
    id: 'atalaya-villas',
    title: 'Atalaya Villas Nusa Penida',
    location: 'Nusa Penida, Bali, Indonesia',
    description: 'Experience the ultimate luxury escape at Atalaya Villas, perched on the stunning cliffs of Nusa Penida. This exclusive villa offers breathtaking ocean views, private infinity pools, and world-class amenities in one of Bali\'s most pristine locations.',
    price_per_night: 450,
    cleaning_fee: 75,
    security_deposit: 800,
    max_guests: 8,
    bedrooms: 4,
    bathrooms: 4,
    averageRating: 4.9,
    reviewCount: 47,
    amenities: [
      'Private Infinity Pool',
      'Ocean View',
      'Air Conditioning',
      'Free WiFi',
      'Kitchen',
      'Private Bathroom',
      'Balcony/Terrace',
      'Garden',
      'BBQ Facilities',
      'Spa Services',
      'Airport Shuttle',
      'Concierge Service'
    ],
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
    ],
    host: {
      name: 'Maria Santos',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      responseTime: '1 hour',
      responseRate: 98,
      verified: true
    },
    reviews: [
      {
        id: '1',
        guestName: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        rating: 5,
        comment: 'Absolutely stunning villa with the most incredible ocean views. The infinity pool was perfect for sunset watching. Maria was an excellent host and made our stay unforgettable.',
        date: '2024-08-15'
      },
      {
        id: '2',
        guestName: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        rating: 5,
        comment: 'The villa exceeded all expectations. The location is perfect for exploring Nusa Penida, and the amenities are top-notch. Highly recommend for anyone looking for luxury in paradise.',
        date: '2024-08-10'
      },
      {
        id: '3',
        guestName: 'Emma Davis',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
        rating: 4,
        comment: 'Beautiful property with amazing views. The villa was clean and well-maintained. The only minor issue was the WiFi signal in the back bedroom, but everything else was perfect.',
        date: '2024-08-05'
      }
    ],
    availability: {
      checkIn: '2024-09-15',
      checkOut: '2024-09-18',
      guests: 2,
      totalNights: 3,
      subtotal: 1350,
      total: 1425
    }
  };

  const handleBookNow = () => {
    // TODO: Implement booking flow
    router.push('/booking/checkout');
  };

  const handleContactHost = () => {
    // TODO: Implement contact functionality
    console.log('Contact host');
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: villa.title,
        text: `Check out this amazing villa: ${villa.title}`,
        url: window.location.href
      });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 700 }}>
          {villa.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOn sx={{ color: 'text.secondary', mr: 0.5 }} />
            <Typography variant="body1" color="text.secondary">
              {villa.location}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Star sx={{ color: 'warning.main', mr: 0.5 }} />
            <Typography variant="body1">
              {villa.averageRating} ({villa.reviewCount} reviews)
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<BookOnline />}
            onClick={handleBookNow}
            sx={{ minWidth: 150 }}
          >
            Book Now
          </Button>
          <Button
            variant="outlined"
            startIcon={<Share />}
            onClick={handleShare}
          >
            Share
          </Button>
          <Button
            variant="outlined"
            startIcon={<Favorite />}
          >
            Save
          </Button>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Left Column - Villa Details */}
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Image Gallery */}
          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ p: 0 }}>
              <ImageList cols={2} rowHeight={300} gap={8}>
                {villa.images.map((image, index) => (
                  <ImageListItem 
                    key={index} 
                    cols={index === 0 ? 2 : 1}
                    rows={index === 0 ? 2 : 1}
                  >
                    <img
                      src={image}
                      alt={`${villa.title} - Image ${index + 1}`}
                      loading="lazy"
                      style={{ borderRadius: '8px' }}
                    />
                    {index === 0 && (
                      <ImageListItemBar
                        title="Main Villa View"
                        subtitle="Oceanfront luxury"
                        sx={{ borderRadius: '8px' }}
                      />
                    )}
                  </ImageListItem>
                ))}
              </ImageList>
            </CardContent>
          </Card>

          {/* Villa Information */}
          <Card sx={{ mb: 4 }}>
            <CardHeader title="About this villa" />
            <CardContent>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {villa.description}
              </Typography>
              
              <Grid container spacing={3}>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <People sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6">{villa.max_guests}</Typography>
                    <Typography variant="body2" color="text.secondary">Guests</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Hotel sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6">{villa.bedrooms}</Typography>
                    <Typography variant="body2" color="text.secondary">Bedrooms</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Hotel sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6">{villa.bathrooms}</Typography>
                    <Typography variant="body2" color="text.secondary">Bathrooms</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <AttachMoney sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6">${villa.price_per_night}</Typography>
                    <Typography variant="body2" color="text.secondary">Per Night</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Tabs for Details, Amenities, Reviews */}
          <Card>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                <Tab label="Details" />
                <Tab label="Amenities" />
                <Tab label="Reviews" />
              </Tabs>
            </Box>

            {/* Tab Content */}
            {activeTab === 0 && (
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Villa Features</Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  This stunning villa offers the perfect blend of luxury and natural beauty. 
                  Each bedroom features premium bedding and private balconies with ocean views. 
                  The open-concept living area seamlessly connects to the outdoor terrace and 
                  infinity pool, creating the perfect space for entertaining or relaxation.
                </Typography>
                
                <Typography variant="h6" sx={{ mb: 2 }}>Location Highlights</Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Located in the exclusive area of Nusa Penida, the villa is just minutes away 
                  from pristine beaches, world-class diving spots, and local attractions. 
                  The area offers a perfect balance of adventure and tranquility.
                </Typography>
              </CardContent>
            )}

            {activeTab === 1 && (
              <CardContent>
                <Grid container spacing={2}>
                  {villa.amenities.map((amenity, index) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CheckCircle sx={{ color: 'success.main', mr: 1 }} />
                        <Typography variant="body1">{amenity}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            )}

            {activeTab === 2 && (
              <CardContent>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ mr: 2 }}>
                      {villa.averageRating} out of 5
                    </Typography>
                    <Rating value={villa.averageRating} precision={0.1} readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      ({villa.reviewCount} reviews)
                    </Typography>
                  </Box>
                </Box>

                <List>
                  {villa.reviews.map((review) => (
                    <Box key={review.id}>
                      <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar src={review.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body1" fontWeight="medium">
                                {review.guestName}
                              </Typography>
                              <Rating value={review.rating} size="small" readOnly />
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" sx={{ mt: 1 }}>
                                {review.comment}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {new Date(review.date).toLocaleDateString()}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      {review.id !== villa.reviews[villa.reviews.length - 1]?.id && (
                        <Divider variant="inset" component="li" />
                      )}
                    </Box>
                  ))}
                </List>
              </CardContent>
            )}
          </Card>
        </Grid>

        {/* Right Column - Booking Card & Host Info */}
        <Grid size={{ xs: 12, md: 4 }}>
          {/* Booking Card */}
          <Card sx={{ mb: 4, position: 'sticky', top: 24 }}>
            <CardHeader title="Book your stay" />
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h4" color="primary" sx={{ mb: 1 }}>
                  ${villa.price_per_night}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  per night
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <TextField
                      fullWidth
                      label="Check-in"
                      type="date"
                      value={selectedDates.checkIn}
                      onChange={(e) => setSelectedDates({ ...selectedDates, checkIn: e.target.value })}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <TextField
                      fullWidth
                      label="Check-out"
                      type="date"
                      value={selectedDates.checkOut}
                      onChange={(e) => setSelectedDates({ ...selectedDates, checkOut: e.target.value })}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth>
                      <InputLabel>Guests</InputLabel>
                      <Select
                        value={selectedDates.guests}
                        label="Guests"
                        onChange={(e) => setSelectedDates({ ...selectedDates, guests: e.target.value as number })}
                      >
                        {Array.from({ length: villa.max_guests }, (_, i) => i + 1).map(num => (
                          <MenuItem key={num} value={num}>{num} guest{num > 1 ? 's' : ''}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 3 }}>
                <List dense>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText 
                      primary={`$${villa.price_per_night} × 3 nights`}
                      secondary="Accommodation"
                    />
                    <Typography variant="body2">
                      ${villa.price_per_night * 3}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText 
                      primary="Cleaning fee"
                      secondary="One-time fee"
                    />
                    <Typography variant="body2">
                      ${villa.cleaning_fee}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText 
                      primary="Service fee"
                      secondary="Platform fee"
                    />
                    <Typography variant="body2">
                      ${(villa.price_per_night * 3 * 0.1).toFixed(0)}
                    </Typography>
                  </ListItem>
                  <Divider sx={{ my: 1 }} />
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText 
                      primary="Total"
                      primaryTypographyProps={{ fontWeight: 'bold' }}
                    />
                    <Typography variant="h6" color="primary">
                      ${(villa.price_per_night * 3 + villa.cleaning_fee + (villa.price_per_night * 3 * 0.1)).toFixed(0)}
                    </Typography>
                  </ListItem>
                </List>
              </Box>

              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<BookOnline />}
                onClick={handleBookNow}
                sx={{ mb: 2 }}
              >
                Book Now
              </Button>

              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                You won't be charged yet
              </Typography>
            </CardContent>
          </Card>

          {/* Host Information */}
          <Card>
            <CardHeader title="About your host" />
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar src={villa.host.avatar} sx={{ width: 60, height: 60, mr: 2 }} />
                <Box>
                  <Typography variant="h6" sx={{ mb: 0.5 }}>
                    {villa.host.name}
                  </Typography>
                  <Chip 
                    label="Verified Host" 
                    size="small" 
                    color="success"
                    icon={<CheckCircle />}
                  />
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Response time</Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {villa.host.responseTime}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Response rate</Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {villa.host.responseRate}%
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="outlined"
                fullWidth
                startIcon={<Email />}
                onClick={handleContactHost}
                sx={{ mb: 1 }}
              >
                Contact Host
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
