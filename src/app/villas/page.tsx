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
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  FormControlLabel,
  Checkbox,
  Rating,
  Avatar,
  Pagination,
  Skeleton,
  Alert,
  IconButton
} from '@mui/material';
import { 
  Search,
  FilterList,
  LocationOn,
  Star,
  AttachMoney,
  People,
  Hotel,
  Favorite,
  FavoriteBorder,
  Sort,
  ViewList,
  ViewModule
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface Villa {
  id: string;
  title: string;
  location: string;
  description: string;
  image_urls: string[];
  price_per_night: number;
  cleaning_fee: number;
  security_deposit: number;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  averageRating: number;
  reviewCount: number;
  amenities: string[];
  category: string;
  isVerified: boolean;
  instantBookable: boolean;
}

interface Filters {
  search: string;
  location: string;
  priceRange: [number, number];
  guests: number;
  bedrooms: number;
  amenities: string[];
  rating: number;
  category: string;
}

export default function VillasPage() {
  const router = useRouter();
  const [villas, setVillas] = useState<Villa[]>([]);
  const [filteredVillas, setFilteredVillas] = useState<Villa[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState('recommended');

  const [filters, setFilters] = useState<Filters>({
    search: '',
    location: '',
    priceRange: [0, 1000],
    guests: 1,
    bedrooms: 1,
    amenities: [],
    rating: 0,
    category: ''
  });

  useEffect(() => {
    // Generate mock villa data
    const mockVillas: Villa[] = [
      {
        id: 'atalaya-villas',
        title: 'Atalaya Villas Nusa Penida',
        location: 'Nusa Penida, Bali, Indonesia',
        description: 'Experience the ultimate luxury escape at Atalaya Villas, perched on the stunning cliffs of Nusa Penida. This exclusive villa offers breathtaking ocean views, private infinity pools, and world-class amenities.',
        image_urls: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'],
        price_per_night: 450,
        cleaning_fee: 75,
        security_deposit: 800,
        max_guests: 8,
        bedrooms: 4,
        bathrooms: 4,
        averageRating: 4.9,
        reviewCount: 47,
        amenities: ['Private Pool', 'Ocean View', 'WiFi', 'Kitchen', 'Spa'],
        category: 'luxury',
        isVerified: true,
        instantBookable: true
      },
      {
        id: 'emerald-bay-resort',
        title: 'Emerald Bay Resort',
        location: 'Maldives',
        description: 'Overwater bungalows with glass floors, private decks, and direct access to the crystal-clear waters of the Indian Ocean. Perfect for romantic getaways and diving adventures.',
        image_urls: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'],
        price_per_night: 650,
        cleaning_fee: 100,
        security_deposit: 1200,
        max_guests: 4,
        bedrooms: 2,
        bathrooms: 2,
        averageRating: 4.8,
        reviewCount: 32,
        amenities: ['Overwater', 'Glass Floor', 'Private Deck', 'Diving', 'Spa'],
        category: 'luxury',
        isVerified: true,
        instantBookable: true
      },
      {
        id: 'marina-bay-sands',
        title: 'Marina Bay Sands Suite',
        location: 'Singapore',
        description: 'Iconic luxury suite with stunning city skyline views, infinity pool access, and world-class dining. Located in the heart of Singapore\'s most prestigious district.',
        image_urls: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'],
        price_per_night: 800,
        cleaning_fee: 150,
        security_deposit: 1500,
        max_guests: 6,
        bedrooms: 3,
        bathrooms: 3,
        averageRating: 4.7,
        reviewCount: 28,
        amenities: ['City View', 'Infinity Pool', 'Fine Dining', 'Gym', 'Concierge'],
        category: 'luxury',
        isVerified: true,
        instantBookable: false
      },
      {
        id: 'royal-orchid-suites',
        title: 'Royal Orchid Suites',
        location: 'Bangkok, Thailand',
        description: 'Elegant suites in the heart of Bangkok, featuring traditional Thai design elements, modern amenities, and easy access to cultural attractions and shopping districts.',
        image_urls: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'],
        price_per_night: 280,
        cleaning_fee: 50,
        security_deposit: 400,
        max_guests: 4,
        bedrooms: 2,
        bathrooms: 2,
        averageRating: 4.6,
        reviewCount: 41,
        amenities: ['City Center', 'Traditional Design', 'Cultural Tours', 'Shopping', 'Spa'],
        category: 'boutique',
        isVerified: true,
        instantBookable: true
      },
      {
        id: 'mountain-cabin',
        title: 'Alpine Mountain Cabin',
        location: 'Swiss Alps',
        description: 'Cozy wooden cabin surrounded by snow-capped peaks, offering stunning mountain views, hiking trails, and traditional Swiss hospitality in a peaceful alpine setting.',
        image_urls: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'],
        price_per_night: 180,
        cleaning_fee: 40,
        security_deposit: 300,
        max_guests: 6,
        bedrooms: 3,
        bathrooms: 2,
        averageRating: 4.9,
        reviewCount: 23,
        amenities: ['Mountain View', 'Hiking Trails', 'Fireplace', 'Skiing', 'Traditional'],
        category: 'rustic',
        isVerified: true,
        instantBookable: true
      },
      {
        id: 'beach-house',
        title: 'Tropical Beach House',
        location: 'Tulum, Mexico',
        description: 'Modern beachfront house with direct access to pristine beaches, featuring open-air living spaces, rooftop terrace, and authentic Mexican charm.',
        image_urls: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'],
        price_per_night: 320,
        cleaning_fee: 60,
        security_deposit: 500,
        max_guests: 8,
        bedrooms: 4,
        bathrooms: 3,
        averageRating: 4.8,
        reviewCount: 35,
        amenities: ['Beachfront', 'Rooftop Terrace', 'Ocean View', 'Local Cuisine', 'Yoga'],
        category: 'beach',
        isVerified: true,
        instantBookable: true
      }
    ];

    setVillas(mockVillas);
    setFilteredVillas(mockVillas);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = villas.filter(villa => {
      const matchesSearch = villa.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                           villa.location.toLowerCase().includes(filters.search.toLowerCase()) ||
                           villa.description.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesLocation = !filters.location || villa.location.includes(filters.location);
      
      const matchesPrice = villa.price_per_night >= filters.priceRange[0] && 
                          villa.price_per_night <= filters.priceRange[1];
      
      const matchesGuests = villa.max_guests >= filters.guests;
      
      const matchesBedrooms = villa.bedrooms >= filters.bedrooms;
      
      const matchesAmenities = filters.amenities.length === 0 || 
                              filters.amenities.some(amenity => 
                                villa.amenities.some(villaAmenity => 
                                  villaAmenity.toLowerCase().includes(amenity.toLowerCase())
                                )
                              );
      
      const matchesRating = villa.averageRating >= filters.rating;
      
      const matchesCategory = !filters.category || villa.category === filters.category;
      
      return matchesSearch && matchesLocation && matchesPrice && matchesGuests && 
             matchesBedrooms && matchesAmenities && matchesRating && matchesCategory;
    });

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price_per_night - b.price_per_night);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price_per_night - a.price_per_night);
        break;
      case 'rating':
        filtered.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // Recommended - keep original order
        break;
    }

    setFilteredVillas(filtered);
    setCurrentPage(1);
  }, [villas, filters, sortBy]);

  const handleVillaClick = (villaId: string) => {
    router.push(`/villas/${villaId}`);
  };

  const handleFavoriteToggle = (villaId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(villaId)) {
      newFavorites.delete(villaId);
    } else {
      newFavorites.add(villaId);
    }
    setFavorites(newFavorites);
  };

  const handleFilterChange = (key: keyof Filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      priceRange: [0, 1000],
      guests: 1,
      bedrooms: 1,
      amenities: [],
      rating: 0,
      category: ''
    });
  };

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredVillas.length / itemsPerPage);
  const paginatedVillas = filteredVillas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Discover Amazing Villas</Typography>
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card>
                <CardContent>
                  <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
                  <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
                  <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
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
          Discover Amazing Villas
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Find your perfect luxury getaway from our curated collection of exceptional properties
        </Typography>
        
        {/* Search Bar */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search villas, locations, or amenities..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant={showFilters ? 'contained' : 'outlined'}
            startIcon={<FilterList />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
        </Box>

        {/* Quick Stats */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            {filteredVillas.length} villas available
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sortBy}
                label="Sort by"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="recommended">Recommended</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
                <MenuItem value="rating">Highest Rated</MenuItem>
                <MenuItem value="reviews">Most Reviewed</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              onClick={() => setViewMode('grid')}
              color={viewMode === 'grid' ? 'primary' : 'default'}
            >
              <ViewModule />
            </IconButton>
            <IconButton
              onClick={() => setViewMode('list')}
              color={viewMode === 'list' ? 'primary' : 'default'}
            >
              <ViewList />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Filters Sidebar */}
        {showFilters && (
          <Grid size={{ xs: 12, md: 3 }}>
            <Card>
              <CardHeader 
                title="Filters" 
                action={
                  <Button size="small" onClick={clearFilters}>
                    Clear All
                  </Button>
                }
              />
              <CardContent>
                {/* Location */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Location</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Enter location"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                  />
                </Box>

                {/* Price Range */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  </Typography>
                  <Slider
                    value={filters.priceRange}
                    onChange={(_, value) => handleFilterChange('priceRange', value)}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                    step={50}
                  />
                </Box>

                {/* Guests */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Guests</Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      value={filters.guests}
                      onChange={(e) => handleFilterChange('guests', e.target.value)}
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                        <MenuItem key={num} value={num}>{num}+ guests</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* Bedrooms */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Bedrooms</Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      value={filters.bedrooms}
                      onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                    >
                      {Array.from({ length: 5 }, (_, i) => i + 1).map(num => (
                        <MenuItem key={num} value={num}>{num}+ bedrooms</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* Rating */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Minimum Rating</Typography>
                  <Rating
                    value={filters.rating}
                    onChange={(_, value) => handleFilterChange('rating', value || 0)}
                    precision={0.5}
                  />
                </Box>

                {/* Amenities */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Amenities</Typography>
                  {['Pool', 'WiFi', 'Kitchen', 'Ocean View', 'Spa', 'Gym'].map((amenity) => (
                    <FormControlLabel
                      key={amenity}
                      control={
                        <Checkbox
                          checked={filters.amenities.includes(amenity)}
                          onChange={(e) => {
                            const newAmenities = e.target.checked
                              ? [...filters.amenities, amenity]
                              : filters.amenities.filter(a => a !== amenity);
                            handleFilterChange('amenities', newAmenities);
                          }}
                        />
                      }
                      label={amenity}
                      sx={{ display: 'block', mb: 0.5 }}
                    />
                  ))}
                </Box>

                {/* Category */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Category</Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      value={filters.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                    >
                      <MenuItem value="">All Categories</MenuItem>
                      <MenuItem value="luxury">Luxury</MenuItem>
                      <MenuItem value="boutique">Boutique</MenuItem>
                      <MenuItem value="beach">Beach</MenuItem>
                      <MenuItem value="rustic">Rustic</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Villa Grid/List */}
        <Grid size={{ xs: 12, md: showFilters ? 9 : 12 }}>
          {filteredVillas.length === 0 ? (
            <Alert severity="info" sx={{ mb: 3 }}>
              No villas match your current filters. Try adjusting your search criteria.
            </Alert>
          ) : (
            <>
              <Grid container spacing={3}>
                {paginatedVillas.map((villa) => (
                  <Grid 
                    size={viewMode === 'grid' ? { xs: 12, sm: 6, lg: 4 } : { xs: 12 }} 
                    key={villa.id}
                  >
                    <Card 
                      sx={{ 
                        cursor: 'pointer',
                        height: viewMode === 'list' ? 'auto' : '100%',
                        '&:hover': { boxShadow: 4 }
                      }}
                      onClick={() => handleVillaClick(villa.id)}
                    >
                      <Box sx={{ position: 'relative' }}>
                        <img
                          src={villa.image_urls[0]}
                          alt={villa.title}
                          style={{
                            width: '100%',
                            height: viewMode === 'list' ? '200px' : '250px',
                            objectFit: 'cover'
                          }}
                        />
                        <IconButton
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            bgcolor: 'rgba(255, 255, 255, 0.9)',
                            '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' }
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFavoriteToggle(villa.id);
                          }}
                        >
                          {favorites.has(villa.id) ? (
                            <Favorite color="error" />
                          ) : (
                            <FavoriteBorder />
                          )}
                        </IconButton>
                        {villa.isVerified && (
                          <Chip
                            label="Verified"
                            size="small"
                            color="success"
                            sx={{
                              position: 'absolute',
                              top: 8,
                              left: 8
                            }}
                          />
                        )}
                        {villa.instantBookable && (
                          <Chip
                            label="Instant Book"
                            size="small"
                            color="primary"
                            sx={{
                              position: 'absolute',
                              bottom: 8,
                              left: 8
                            }}
                          />
                        )}
                      </Box>

                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
                            {villa.title}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                          <Typography variant="body2" color="text.secondary">
                            {villa.location}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Star sx={{ color: 'warning.main', fontSize: 16, mr: 0.5 }} />
                            <Typography variant="body2">
                              {villa.averageRating} ({villa.reviewCount})
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <People sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                            <Typography variant="body2">
                              {villa.max_guests} guests
                            </Typography>
                          </Box>
                        </Box>

                        {viewMode === 'list' && (
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {villa.description.substring(0, 150)}...
                          </Typography>
                        )}

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="h6" color="primary">
                              ${villa.price_per_night}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              per night
                            </Typography>
                          </Box>
                          <Button variant="contained" size="small">
                            View Details
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Pagination */}
              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(_, page) => setCurrentPage(page)}
                    color="primary"
                    size="large"
                  />
                </Box>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
