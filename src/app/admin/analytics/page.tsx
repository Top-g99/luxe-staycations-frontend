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
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { 
  TrendingUp, 
  TrendingDown,
  People, 
  Hotel, 
  AttachMoney, 
  MoreVert,
  CalendarToday,
  Visibility,
  Star,
  LocationOn
} from '@mui/icons-material';
import { useProperties } from '@/hooks/useApi';

interface AnalyticsData {
  totalProperties: number;
  totalBookings: number;
  totalRevenue: number;
  occupancyRate: number;
  averageRating: number;
  topDestinations: Array<{
    location: string;
    count: number;
    revenue: number;
  }>;
  monthlyTrends: Array<{
    month: string;
    bookings: number;
    revenue: number;
  }>;
}

export default function AdminAnalyticsPage() {
  const { getProperties, data, loading, error } = useProperties();
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalProperties: 0,
    totalBookings: 0,
    totalRevenue: 0,
    occupancyRate: 0,
    averageRating: 0,
    topDestinations: [],
    monthlyTrends: []
  });
  const [timeRange, setTimeRange] = useState('30');

  useEffect(() => {
    getProperties();
  }, [getProperties]);

  useEffect(() => {
    if (data?.data) {
      // Calculate analytics from properties data
      const totalProperties = data.data.length;
      const totalBookings = Math.floor(Math.random() * 1000) + 500; // Mock data for now
      const totalRevenue = totalBookings * 250; // Mock calculation
      const occupancyRate = Math.floor(Math.random() * 40) + 60; // Mock 60-100%
      const averageRating = data.data.reduce((acc, prop) => acc + (prop.averageRating || 0), 0) / totalProperties;

      // Generate mock top destinations
      const locationCounts = data.data.reduce((acc: any, prop) => {
        acc[prop.location] = (acc[prop.location] || 0) + 1;
        return acc;
      }, {});

      const topDestinations = Object.entries(locationCounts)
        .map(([location, count]) => ({
          location,
          count: count as number,
          revenue: (count as number) * 250
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Generate mock monthly trends
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      const monthlyTrends = months.map(month => ({
        month,
        bookings: Math.floor(Math.random() * 200) + 50,
        revenue: Math.floor(Math.random() * 50000) + 10000
      }));

      setAnalytics({
        totalProperties,
        totalBookings,
        totalRevenue,
        occupancyRate,
        averageRating: averageRating || 0,
        topDestinations,
        monthlyTrends
      });
    }
  }, [data]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Analytics Dashboard
        </Typography>
        <LinearProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h4" color="error" sx={{ mb: 2 }}>
          Error loading analytics
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
          Analytics Dashboard
        </Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="7">Last 7 days</MenuItem>
            <MenuItem value="30">Last 30 days</MenuItem>
            <MenuItem value="90">Last 90 days</MenuItem>
            <MenuItem value="365">Last year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" component="div">
                    {analytics.totalProperties}
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
                    {analytics.totalBookings}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Bookings
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                  <CalendarToday />
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
                    ${analytics.totalRevenue.toLocaleString()}
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
                    {analytics.occupancyRate}%
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

      {/* Charts and Detailed Analytics */}
      <Grid container spacing={4}>
        {/* Top Destinations */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader
              title="Top Destinations"
              action={
                <IconButton>
                  <MoreVert />
                </IconButton>
              }
            />
            <CardContent>
              <List>
                {analytics.topDestinations.map((destination, index) => (
                  <Box key={destination.location}>
                    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {index + 1}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={destination.location}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {destination.count} properties
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              ${destination.revenue.toLocaleString()} revenue
                            </Typography>
                          </Box>
                        }
                      />
                      <Chip 
                        label={`${Math.round((destination.count / analytics.totalProperties) * 100)}%`}
                        size="small"
                        color="primary"
                      />
                    </ListItem>
                    {index < analytics.topDestinations.length - 1 && <Divider variant="inset" component="li" />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Monthly Trends */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader
              title="Monthly Trends"
              action={
                <IconButton>
                  <MoreVert />
                </IconButton>
              }
            />
            <CardContent>
              <List>
                {analytics.monthlyTrends.map((trend, index) => (
                  <Box key={trend.month}>
                    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'secondary.main' }}>
                          <TrendingUp />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={trend.month}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {trend.bookings} bookings
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              ${trend.revenue.toLocaleString()} revenue
                            </Typography>
                          </Box>
                        }
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Star sx={{ color: 'warning.main', fontSize: 16 }} />
                        <Typography variant="body2">
                          {Math.round(trend.revenue / trend.bookings)}
                        </Typography>
                      </Box>
                    </ListItem>
                    {index < analytics.monthlyTrends.length - 1 && <Divider variant="inset" component="li" />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Performance Summary */}
      <Card sx={{ mt: 4 }}>
        <CardHeader title="Performance Summary" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="primary">
                  {analytics.averageRating.toFixed(1)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Average Rating
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      sx={{ 
                        color: star <= analytics.averageRating ? 'warning.main' : 'grey.300',
                        fontSize: 20 
                      }} 
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="secondary">
                  {Math.round(analytics.totalRevenue / analytics.totalBookings)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Average Booking Value
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="success.main">
                  {Math.round((analytics.totalBookings / analytics.totalProperties) * 100)}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Property Utilization
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
