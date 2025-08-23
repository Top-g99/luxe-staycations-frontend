"use client";

import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button,
  Rating,
  Skeleton,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Search, LocationOn, People, Bed, Shower, Star } from '@mui/icons-material';
import { useProperties } from '@/hooks/useApi';

interface Hotel {
  id: string;
  title: string;
  description: string;
  location: string;
  price_per_night: number;
  image_urls: string[];
  category: string;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  averageRating: number;
  reviewCount: number;
}

export default function HotelsPage() {
  const { getProperties, data, loading, error } = useProperties();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [guests, setGuests] = useState('');
  const [sortBy, setSortBy] = useState('price');

  useEffect(() => {
    getProperties();
  }, [getProperties]);

  useEffect(() => {
    if (data?.data) {
      // Filter for hotels only and transform data
      const transformedHotels: Hotel[] = data.data
        .filter(property => property.category === 'hotel')
        .map(property => ({
          id: property.id,
          title: property.title,
          description: property.description,
          location: property.location,
          price_per_night: property.price_per_night,
          image_urls: property.image_urls,
          category: property.category,
          max_guests: property.max_guests,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          averageRating: property.averageRating || 0,
          reviewCount: property.reviewCount || 0
        }));
      setHotels(transformedHotels);
    }
  }, [data]);

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !location || hotel.location.toLowerCase().includes(location.toLowerCase());
    const matchesGuests = !guests || hotel.max_guests >= parseInt(guests);
    return matchesSearch && matchesLocation && matchesGuests;
  });

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price_per_night - b.price_per_night;
      case 'rating':
        return b.averageRating - a.averageRating;
      case 'reviews':
        return b.reviewCount - a.reviewCount;
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" sx={{ mb: 4, textAlign: 'center' }}>
          Luxury Hotels
        </Typography>
        <Grid container spacing={4}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item}>
              <Card>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" height={32} />
                  <Skeleton variant="text" height={24} />
                  <Skeleton variant="text" height={20} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h4" color="error" sx={{ mb: 2 }}>
          Error loading hotels
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {error}
        </Typography>
        <Button variant="contained" onClick={() => getProperties()}>
          Try Again
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" sx={{ mb: 4, textAlign: 'center' }}>
        Luxury Hotels
      </Typography>

      {/* Search and Filters */}
      <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              fullWidth
              placeholder="Search hotels..."
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
            <TextField
              fullWidth
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              fullWidth
              placeholder="Guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <People />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
                <MenuItem value="reviews">Reviews</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Button variant="contained" fullWidth>
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Results Count */}
      <Typography variant="body1" sx={{ mb: 3 }}>
        Found {sortedHotels.length} hotels
      </Typography>
      
      {/* Hotels Grid */}
      <Grid container spacing={4}>
        {sortedHotels.map((hotel) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={hotel.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={hotel.image_urls[0] || '/placeholder-hotel.jpg'}
                alt={hotel.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                  {hotel.title}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    {hotel.location}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <People sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                    <Typography variant="body2">{hotel.max_guests}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Bed sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                    <Typography variant="body2">{hotel.bedrooms}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Shower sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                    <Typography variant="body2">{hotel.bathrooms}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating value={hotel.averageRating} precision={0.1} readOnly size="small" />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({hotel.reviewCount} reviews)
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                  {hotel.description}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                  <Typography variant="h6" color="primary">
                    ${hotel.price_per_night}/night
                  </Typography>
                  <Button variant="contained" size="small">
                    Book Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {sortedHotels.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No hotels found matching your criteria
          </Typography>
          <Button 
            variant="outlined" 
            sx={{ mt: 2 }}
            onClick={() => {
              setSearchTerm('');
              setLocation('');
              setGuests('');
            }}
          >
            Clear Filters
          </Button>
        </Box>
      )}
    </Container>
  );
}
