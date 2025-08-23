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
  Rating
} from '@mui/material';
import { 
  Add,
  Search,
  FilterList,
  Edit,
  Delete,
  Visibility,
  Hotel,
  Villa,
  Apartment,
  LocationOn,
  AttachMoney
} from '@mui/icons-material';
import { useProperties } from '@/hooks/useApi';

interface Property {
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
  status: string;
}

export default function AdminPropertiesPage() {
  const { getProperties, data, loading, error } = useProperties();
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    getProperties();
  }, [getProperties]);

  useEffect(() => {
    if (data?.data) {
      // Transform and add mock status data
      const transformedProperties: Property[] = data.data.map(property => ({
        ...property,
        averageRating: property.averageRating || 0,
        reviewCount: property.reviewCount || 0,
        status: Math.random() > 0.3 ? 'active' : 'inactive'
      }));
      setProperties(transformedProperties);
    }
  }, [data]);

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || property.category === categoryFilter;
    const matchesStatus = !statusFilter || property.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getPropertyTypeIcon = (category: string) => {
    switch (category) {
      case 'hotel':
        return <Hotel />;
      case 'villa':
        return <Villa />;
      case 'apartment':
        return <Apartment />;
      default:
        return <Hotel />;
    }
  };

  const getPropertyTypeColor = (category: string) => {
    switch (category) {
      case 'hotel':
        return 'primary';
      case 'villa':
        return 'secondary';
      case 'apartment':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleEditProperty = (property: Property) => {
    setSelectedProperty(property);
    setDialogOpen(true);
  };

  const handleDeleteProperty = (propertyId: string) => {
    // TODO: Implement delete functionality
    console.log('Delete property:', propertyId);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Properties Management
        </Typography>
        <LinearProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h4" color="error" sx={{ mb: 2 }}>
          Error loading properties
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Properties Management
        </Typography>
        <Button variant="contained" startIcon={<Add />}>
          Add New Property
        </Button>
      </Box>

      {/* Search and Filters */}
      <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              fullWidth
              placeholder="Search properties..."
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
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Category"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value="hotel">Hotels</MenuItem>
                <MenuItem value="villa">Villas</MenuItem>
                <MenuItem value="apartment">Apartments</MenuItem>
              </Select>
            </FormControl>
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
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
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
        Found {filteredProperties.length} properties
      </Typography>

      {/* Properties List */}
      <Grid container spacing={3}>
        {filteredProperties.map((property) => (
          <Grid size={{ xs: 12, md: 6 }} key={property.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: `${getPropertyTypeColor(property.category)}.main`,
                      width: 56,
                      height: 56
                    }}
                  >
                    {getPropertyTypeIcon(property.category)}
                  </Avatar>
                  
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="h6" component="h3">
                        {property.title}
                      </Typography>
                      <Chip 
                        label={property.status}
                        size="small"
                        color={getStatusColor(property.status) as any}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        {property.location}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ mr: 0.5 }}>
                          {property.max_guests} guests
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ mr: 0.5 }}>
                          {property.bedrooms} beds
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ mr: 0.5 }}>
                          {property.bathrooms} baths
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Rating value={property.averageRating} precision={0.1} readOnly size="small" />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        ({property.reviewCount} reviews)
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" color="primary">
                        ${property.price_per_night}/night
                      </Typography>
                      
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleEditProperty(property)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleDeleteProperty(property.id)}
                        >
                          <Delete />
                        </IconButton>
                        <IconButton size="small" color="info">
                          <Visibility />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredProperties.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No properties found matching your criteria
          </Typography>
          <Button 
            variant="outlined" 
            sx={{ mt: 2 }}
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('');
              setStatusFilter('');
            }}
          >
            Clear Filters
          </Button>
        </Box>
      )}

      {/* Edit Property Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Property</DialogTitle>
        <DialogContent>
          {selectedProperty && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="h6">{selectedProperty.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedProperty.location}
              </Typography>
              <Typography variant="body1">
                This is where the edit form would go. For now, it's just a placeholder.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained">Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
