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
  Divider
} from '@mui/material';
import { 
  TrendingUp, 
  People, 
  Hotel, 
  AttachMoney, 
  MoreVert,
  Hotel as HotelIcon,
  Villa as VillaIcon,
  Apartment as ApartmentIcon
} from '@mui/icons-material';
import { useProperties } from '@/hooks/useApi';

interface DashboardStats {
  totalProperties: number;
  totalBookings: number;
  totalRevenue: number;
  occupancyRate: number;
}

interface RecentActivity {
  id: string;
  type: 'booking' | 'property' | 'user';
  message: string;
  timestamp: string;
  user: string;
}

export default function AdminDashboardPage() {
  const { getProperties, data, loading, error } = useProperties();
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 0,
    totalBookings: 0,
    totalRevenue: 0,
    occupancyRate: 0
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);

  useEffect(() => {
    getProperties();
  }, [getProperties]);

  useEffect(() => {
    if (data?.data) {
      // Calculate stats from properties data
      const totalProperties = data.data.length;
      const totalBookings = Math.floor(Math.random() * 1000) + 500; // Mock data for now
      const totalRevenue = totalBookings * 250; // Mock calculation
      const occupancyRate = Math.floor(Math.random() * 40) + 60; // Mock 60-100%

      setStats({
        totalProperties,
        totalBookings,
        totalRevenue,
        occupancyRate
      });

      // Generate mock recent activity
      const mockActivity: RecentActivity[] = [
        {
          id: '1',
          type: 'booking',
          message: 'New booking for Marina Bay Sands',
          timestamp: '2 hours ago',
          user: 'John Doe'
        },
        {
          id: '2',
          type: 'property',
          message: 'New property added: Luxury Villa Bali',
          timestamp: '4 hours ago',
          user: 'Admin'
        },
        {
          id: '3',
          type: 'user',
          message: 'New user registration: Sarah Smith',
          timestamp: '6 hours ago',
          user: 'System'
        }
      ];
      setRecentActivity(mockActivity);
    }
  }, [data]);

  const getPropertyTypeIcon = (category: string) => {
    switch (category) {
      case 'hotel':
        return <HotelIcon />;
      case 'villa':
        return <VillaIcon />;
      case 'apartment':
        return <ApartmentIcon />;
      default:
        return <HotelIcon />;
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

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Admin Dashboard
        </Typography>
        <LinearProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h4" color="error" sx={{ mb: 2 }}>
          Error loading dashboard
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
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Admin Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.totalProperties}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Properties
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <Hotel />
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
                    {stats.totalBookings}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Bookings
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                  <TrendingUp />
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
                    ${stats.totalRevenue.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Revenue
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <AttachMoney />
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
                    {stats.occupancyRate}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Occupancy Rate
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <People />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Properties Overview and Recent Activity */}
      <Grid container spacing={4}>
        {/* Properties Overview */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardHeader
              title="Properties Overview"
              action={
                <IconButton>
                  <MoreVert />
                </IconButton>
              }
            />
            <CardContent>
              <Grid container spacing={2}>
                {data?.data?.slice(0, 6).map((property) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={property.id}>
                    <Box sx={{ 
                      p: 2, 
                      border: '1px solid', 
                      borderColor: 'divider', 
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2
                    }}>
                      <Avatar sx={{ bgcolor: `${getPropertyTypeColor(property.category)}.main` }}>
                        {getPropertyTypeIcon(property.category)}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle2" noWrap>
                          {property.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {property.location}
                        </Typography>
                      </Box>
                      <Chip 
                        label={property.category} 
                        size="small" 
                        color={getPropertyTypeColor(property.category) as any}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardHeader
              title="Recent Activity"
              action={
                <IconButton>
                  <MoreVert />
                </IconButton>
              }
            />
            <CardContent>
              <List>
                {recentActivity.map((activity, index) => (
                  <Box key={activity.id}>
                    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ 
                          bgcolor: activity.type === 'booking' ? 'primary.main' : 
                                   activity.type === 'property' ? 'secondary.main' : 'success.main' 
                        }}>
                          {activity.type === 'booking' ? <TrendingUp /> :
                           activity.type === 'property' ? <Hotel /> : <People />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={activity.message}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {activity.user}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {activity.timestamp}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentActivity.length - 1 && <Divider variant="inset" component="li" />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
