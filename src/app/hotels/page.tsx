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
  CardActions,
  Button,
  Chip,
  Rating,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Pagination,
  Skeleton,
  Alert,
  Snackbar
} from '@mui/material';
import { 
  Search,
  FilterList,
  Favorite,
  FavoriteBorder,
  ViewList,
  GridView,
  Star,
  LocationOn,
  AttachMoney,
  People,
  Hotel,
  ExpandMore,
  Sort,
  Tune
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  price_per_night: number;
  rating: number;
  reviewCount: number;
  image: string;
  amenities: string[];
  category: 'luxury' | 'boutique' | 'resort' | 'business';
  stars: number;
  maxGuests: number;
  rooms: number;
  isVerified: boolean;
  isFavorite: boolean;
  specialOffers: string[];
}

export default function HotelsPage() {
  const router = useRouter();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as const });

  // Mock data for hotels
  const mockHotels: Hotel[] = [
    {
      id: 'burj-al-arab',
      name: 'Burj Al Arab Jumeirah',
      location: 'Dubai, UAE',
      description: 'Iconic sail-shaped luxury hotel with world-class dining, spa, and private beach access.',
      price_per_night: 1800,
      rating: 4.9,
      reviewCount: 2847,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      amenities: ['Private Beach', 'Helipad', 'Butler Service', 'Infinity Pool', 'Michelin Star Dining'],
      category: 'luxury',
      stars: 7,
      maxGuests: 4,
      rooms: 202,
      isVerified: true,
      isFavorite: false,
      specialOffers: ['Free Upgrade', 'Spa Credit']
    },
    {
      id: 'ritz-paris',
      name: 'The Ritz Paris',
      location: 'Paris, France',
      description: 'Historic luxury hotel in the heart of Paris, offering timeless elegance and exceptional service.',
      price_per_night: 1200,
      rating: 4.8,
      reviewCount: 1892,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      amenities: ['Eiffel Tower View', 'Champagne Bar', 'Luxury Spa', 'Fine Dining', 'Concierge Service'],
      category: 'luxury',
      stars: 5,
      maxGuests: 3,
      rooms: 142,
      isVerified: true,
      isFavorite: false,
      specialOffers: ['Breakfast Included', 'Airport Transfer']
    },
    {
      id: 'aman-tokyo',
      name: 'Aman Tokyo',
      location: 'Tokyo, Japan',
      description: 'Zen-inspired luxury hotel with panoramic city views and traditional Japanese hospitality.',
      price_per_night: 950,
      rating: 4.9,
      reviewCount: 1247,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      amenities: ['City Views', 'Traditional Spa', 'Sushi Bar', 'Tea Ceremony', 'Zen Garden'],
      category: 'boutique',
      stars: 5,
      maxGuests: 2,
      rooms: 84,
      isVerified: true,
      isFavorite: false,
      specialOffers: ['Spa Treatment', 'Cultural Experience']
    },
    {
      id: 'beverly-hills-hotel',
      name: 'The Beverly Hills Hotel',
      location: 'Beverly Hills, California',
      description: 'Legendary pink palace offering Hollywood glamour, lush gardens, and world-famous Polo Lounge.',
      price_per_night: 850,
      rating: 4.7,
      reviewCount: 2156,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      amenities: ['Pink Palace', 'Polo Lounge', 'Garden Pool', 'Tennis Courts', 'Celebrity Service'],
      category: 'luxury',
      stars: 5,
      maxGuests: 4,
      rooms: 208,
      isVerified: true,
      isFavorite: false,
      specialOffers: ['Pool Access', 'Dining Credit']
    },
    {
      id: 'shangri-la-singapore',
      name: 'Shangri-La Singapore',
      location: 'Singapore',
      description: 'Tropical luxury resort with extensive gardens, multiple pools, and award-winning dining.',
      price_per_night: 750,
      rating: 4.8,
      reviewCount: 1893,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      amenities: ['Tropical Gardens', 'Multiple Pools', 'Golf Course', 'Kids Club', 'Spa Sanctuary'],
      category: 'resort',
      stars: 5,
      maxGuests: 6,
      rooms: 792,
      isVerified: true,
      isFavorite: false,
      specialOffers: ['Garden View', 'Family Package']
    },
    {
      id: 'mandarin-oriental-hong-kong',
      name: 'Mandarin Oriental Hong Kong',
      location: 'Hong Kong',
      description: 'Historic luxury hotel with Victoria Harbour views and legendary service standards.',
      price_per_night: 680,
      rating: 4.9,
      reviewCount: 2347,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      amenities: ['Harbour Views', 'Michelin Star Dining', 'Luxury Spa', 'Executive Lounge', 'Butler Service'],
      category: 'luxury',
      stars: 5,
      maxGuests: 3,
      rooms: 501,
      isVerified: true,
      isFavorite: false,
      specialOffers: ['Harbour View', 'Executive Access']
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setHotels(mockHotels);
      setFilteredHotels(mockHotels);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedCategory, priceRange, ratingFilter, sortBy, hotels]);

  const applyFilters = () => {
    let filtered = [...hotels];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(hotel =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(hotel => hotel.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(hotel =>
      hotel.price_per_night >= priceRange[0] && hotel.price_per_night <= priceRange[1]
    );

    // Rating filter
    if (ratingFilter > 0) {
      filtered = filtered.filter(hotel => hotel.rating >= ratingFilter);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price_per_night - b.price_per_night);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price_per_night - a.price_per_night);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // Recommended (default order)
        break;
    }

    setFilteredHotels(filtered);
    setCurrentPage(1);
  };

  const handleFavoriteToggle = (hotelId: string) => {
    setHotels(prev => prev.map(hotel =>
      hotel.id === hotelId ? { ...hotel, isFavorite: !hotel.isFavorite } : hotel
    ));
    
    const hotel = hotels.find(h => h.id === hotelId);
    if (hotel) {
      setSnackbar({
        open: true,
        message: hotel.isFavorite ? 'Removed from favorites' : 'Added to favorites',
        severity: 'success'
      });
    }
  };

  const handleHotelClick = (hotelId: string) => {
    // TODO: Navigate to hotel detail page
    console.log('Navigate to hotel:', hotelId);
  };

  const handleBookNow = (hotelId: string) => {
    // TODO: Navigate to booking page
    router.push('/booking/checkout');
  };

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);
  const paginatedHotels = filteredHotels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" sx={{ mb: 4, fontWeight: 700 }}>
          Luxury Hotels
        </Typography>
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 700 }}>
          Luxury Hotels
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Discover the world's most prestigious hotels and resorts, offering unparalleled luxury and exceptional experiences.
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                placeholder="Search hotels, locations..."
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
            
            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Category"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="luxury">Luxury</MenuItem>
                  <MenuItem value="boutique">Boutique</MenuItem>
                  <MenuItem value="resort">Resort</MenuItem>
                  <MenuItem value="business">Business</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="recommended">Recommended</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="rating">Highest Rated</MenuItem>
                  <MenuItem value="reviews">Most Reviewed</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 2 }}>
              <Button
                variant="outlined"
                startIcon={<Tune />}
                onClick={() => setShowFilters(!showFilters)}
                fullWidth
              >
                Filters
              </Button>
            </Grid>
          </Grid>

          {/* Advanced Filters */}
          {showFilters && (
            <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </Typography>
                  <Slider
                    value={priceRange}
                    onChange={(_, newValue) => setPriceRange(newValue as [number, number])}
                    valueLabelDisplay="auto"
                    min={0}
                    max={2000}
                    step={50}
                  />
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Minimum Rating: {ratingFilter > 0 ? `${ratingFilter}+` : 'Any'}
                  </Typography>
                  <Slider
                    value={ratingFilter}
                    onChange={(_, newValue) => setRatingFilter(newValue as number)}
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                    step={0.5}
                    marks={[
                      { value: 0, label: 'Any' },
                      { value: 3, label: '3+' },
                      { value: 4, label: '4+' },
                      { value: 5, label: '5' }
                    ]}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* View Toggle and Results Count */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          {filteredHotels.length} hotels found
        </Typography>
        
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(_, newMode) => newMode && setViewMode(newMode)}
          size="small"
        >
          <ToggleButton value="grid">
            <GridView />
          </ToggleButton>
          <ToggleButton value="list">
            <ViewList />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Hotels Grid/List */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {paginatedHotels.map((hotel) => (
          <Grid 
            size={viewMode === 'grid' ? { xs: 12, sm: 6, md: 4 } : { xs: 12 }}
            key={hotel.id}
          >
            <Card 
              sx={{ 
                height: viewMode === 'grid' ? 'auto' : 'auto',
                cursor: 'pointer',
                '&:hover': { boxShadow: 6 }
              }}
              onClick={() => handleHotelClick(hotel.id)}
            >
              <CardMedia
                component="img"
                height={viewMode === 'grid' ? 200 : 150}
                image={hotel.image}
                alt={hotel.name}
                sx={{ position: 'relative' }}
              />
              
              <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavoriteToggle(hotel.id);
                  }}
                  sx={{ 
                    bgcolor: 'background.paper',
                    '&:hover': { bgcolor: 'background.paper' }
                  }}
                >
                  {hotel.isFavorite ? (
                    <Favorite sx={{ color: 'error.main' }} />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>
              </Box>

              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 600, flex: 1 }}>
                    {hotel.name}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                    ${hotel.price_per_night}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    {hotel.location}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating value={hotel.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {hotel.rating} ({hotel.reviewCount} reviews)
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {hotel.description}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {hotel.specialOffers.slice(0, 2).map((offer, index) => (
                    <Chip
                      key={index}
                      label={offer}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <People sx={{ fontSize: 16, mr: 0.5 }} />
                      <Typography variant="body2">{hotel.maxGuests}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Hotel sx={{ fontSize: 16, mr: 0.5 }} />
                      <Typography variant="body2">{hotel.rooms}</Typography>
                    </Box>
                  </Box>
                  
                  <Button
                    variant="contained"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookNow(hotel.id);
                    }}
                  >
                    Book Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            color="primary"
            size="large"
          />
        </Box>
      )}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
