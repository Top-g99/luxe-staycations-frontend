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
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  IconButton,
  Badge
} from '@mui/material';
import { 
  Add,
  Hotel,
  CalendarToday,
  People,
  AttachMoney,
  TrendingUp,
  TrendingDown,
  Star,
  LocationOn,
  Edit,
  Delete,
  Visibility,
  CheckCircle,
  Pending,
  Cancel,
  MoreVert,
  Dashboard,
  Home,
  CalendarMonth,
  MonetizationOn,
  RateReview
} from '@mui/icons-material';

interface Property {
  id: string;
  title: string;
  location: string;
  image_urls: string[];
  price_per_night: number;
  category: string;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  averageRating: number;
  reviewCount: number;
  status: 'active' | 'inactive' | 'maintenance';
  totalBookings: number;
  totalRevenue: number;
  occupancyRate: number;
}

interface Booking {
  id: string;
  propertyTitle: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  createdAt: string;
}

interface HostStats {
  totalProperties: number;
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
  occupancyRate: number;
  monthlyGrowth: number;
  topPerformingProperty: Property | null;
}

export default function HostDashboardPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // Generate mock data
    const mockProperties: Property[] = [
      {
        id: '1',
        title: 'Luxury Villa in Bali',
        location: 'Bali, Indonesia',
        image_urls: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'],
        price_per_night: 250,
        category: 'villa',
        max_guests: 6,
        bedrooms: 3,
        bathrooms: 2,
        averageRating: 4.8,
        reviewCount: 12,
        status: 'active',
        totalBookings: 24,
        totalRevenue: 6000,
        occupancyRate: 85
      },
      {
        id: '2',
        title: 'Beachfront Apartment',
        location: 'Maldives',
        image_urls: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'],
        price_per_night: 180,
        category: 'apartment',
        max_guests: 4,
        bedrooms: 2,
        bathrooms: 1,
        averageRating: 4.6,
        reviewCount: 8,
        status: 'active',
        totalBookings: 18,
        totalRevenue: 3240,
        occupancyRate: 72
      },
      {
        id: '3',
        title: 'Mountain Cabin',
        location: 'Swiss Alps',
        image_urls: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'],
        price_per_night: 120,
        category: 'cabin',
        max_guests: 4,
        bedrooms: 2,
        bathrooms: 1,
        averageRating: 4.9,
        reviewCount: 15,
        status: 'maintenance',
        totalBookings: 12,
        totalRevenue: 1440,
        occupancyRate: 45
      }
    ];

    const mockBookings: Booking[] = [
      {
        id: '1',
        propertyTitle: 'Luxury Villa in Bali',
        guestName: 'John Doe',
        checkIn: '2024-09-15',
        checkOut: '2024-09-18',
        guests: 4,
        totalAmount: 750,
        status: 'confirmed',
        createdAt: '2024-08-20'
      },
      {
        id: '2',
        propertyTitle: 'Beachfront Apartment',
        guestName: 'Sarah Smith',
        checkIn: '2024-09-10',
        checkOut: '2024-09-12',
        guests: 2,
        totalAmount: 360,
        status: 'pending',
        createdAt: '2024-08-22'
      },
      {
        id: '3',
        propertyTitle: 'Luxury Villa in Bali',
        guestName: 'Mike Johnson',
        checkIn: '2024-08-25',
        checkOut: '2024-08-30',
        guests: 6,
        totalAmount: 1250,
        status: 'completed',
        createdAt: '2024-08-15'
      }
    ];

    setProperties(mockProperties);
    setBookings(mockBookings);
  }, []);

  const hostStats: HostStats = {
    totalProperties: properties.length,
    totalBookings: bookings.length,
    totalRevenue: properties.reduce((sum, prop) => sum + prop.totalRevenue, 0),
    averageRating: properties.length > 0 ? properties.reduce((sum, prop) => sum + prop.averageRating, 0) / properties.length : 0,
    occupancyRate: properties.length > 0 ? properties.reduce((sum, prop) => sum + prop.occupancyRate, 0) / properties.length : 0,
    monthlyGrowth: 15.5,
    topPerformingProperty: properties.reduce((top, current) => 
      current.totalRevenue > (top?.totalRevenue || 0) ? current : top, null as Property | null
    )
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'maintenance':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle />;
      case 'inactive':
        return <Cancel />;
      case 'maintenance':
        return <Pending />;
      default:
        return <Pending />;
    }
  };

  const getBookingStatusColor = (status: string) => {
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

  const handleAddProperty = () => {
    // TODO: Implement add property functionality
    console.log('Add new property');
  };

  const handleEditProperty = (propertyId: string) => {
    // TODO: Implement edit property functionality
    console.log('Edit property:', propertyId);
  };

  const handleViewProperty = (propertyId: string) => {
    // TODO: Implement view property functionality
    console.log('View property:', propertyId);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Host Dashboard
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleAddProperty}>
          Add New Property
        </Button>
      </Box>

      {/* Key Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" component="div">
                    {hostStats.totalProperties}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Properties
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <Home />
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
                    {hostStats.totalBookings}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Bookings
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                  <CalendarMonth />
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
                    ${hostStats.totalRevenue.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Revenue
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <MonetizationOn />
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
                    {hostStats.averageRating.toFixed(1)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Average Rating
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <Star />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Performance Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader title="Performance Overview" />
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" color="success.main" sx={{ mb: 1 }}>
                  +{hostStats.monthlyGrowth}% Monthly Growth
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Compared to last month
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Overall Occupancy Rate
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={hostStats.occupancyRate} 
                    sx={{ flexGrow: 1 }}
                  />
                  <Typography variant="body2">
                    {hostStats.occupancyRate}%
                  </Typography>
                </Box>
              </Box>

              {hostStats.topPerformingProperty && (
                <Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Top Performing Property
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {hostStats.topPerformingProperty.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${hostStats.topPerformingProperty.totalRevenue} revenue
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader title="Recent Activity" />
            <CardContent>
              <List dense>
                {bookings.slice(0, 3).map((booking) => (
                  <Box key={booking.id}>
                    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <CalendarToday />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${booking.guestName} - ${booking.propertyTitle}`}
                        secondary={`${new Date(booking.checkIn).toLocaleDateString()} - ${new Date(booking.checkOut).toLocaleDateString()}`}
                      />
                      <Chip 
                        label={booking.status}
                        size="small"
                        color={getBookingStatusColor(booking.status) as any}
                      />
                    </ListItem>
                    {booking.id !== bookings[2]?.id && <Divider variant="inset" component="li" />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs for different views */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="Properties" />
          <Tab label="Bookings" />
          <Tab label="Analytics" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 3 }}>Your Properties</Typography>
          <Grid container spacing={3}>
            {properties.map((property) => (
              <Grid size={{ xs: 12, md: 6 }} key={property.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <img 
                        src={property.image_urls[0]} 
                        alt={property.title}
                        style={{ 
                          width: '120px', 
                          height: '90px', 
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                      />
                      
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Typography variant="h6" component="h3">
                            {property.title}
                          </Typography>
                          <Chip 
                            label={property.status}
                            size="small"
                            color={getStatusColor(property.status) as any}
                            icon={getStatusIcon(property.status)}
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
                            <Star sx={{ color: 'warning.main', fontSize: 16, mr: 0.5 }} />
                            <Typography variant="body2">
                              {property.averageRating} ({property.reviewCount})
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AttachMoney sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                            <Typography variant="body2">
                              ${property.price_per_night}/night
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                          <Typography variant="body2">
                            <strong>Bookings:</strong> {property.totalBookings}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Revenue:</strong> ${property.totalRevenue}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Occupancy:</strong> {property.occupancyRate}%
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={() => handleViewProperty(property.id)}
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={() => handleEditProperty(property.id)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton size="small" color="error">
                            <Delete />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 3 }}>Recent Bookings</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Property</TableCell>
                  <TableCell>Guest</TableCell>
                  <TableCell>Dates</TableCell>
                  <TableCell>Guests</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {booking.propertyTitle}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {booking.guestName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {booking.guests}
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
                        color={getBookingStatusColor(booking.status) as any}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" color="primary">
                        <Visibility />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {activeTab === 2 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 3 }}>Analytics & Insights</Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardHeader title="Revenue Trends" />
                <CardContent>
                  <Typography variant="body1" color="text.secondary">
                    Revenue analytics and charts will be displayed here.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardHeader title="Occupancy Analysis" />
                <CardContent>
                  <Typography variant="body1" color="text.secondary">
                    Occupancy trends and analysis will be displayed here.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
}
