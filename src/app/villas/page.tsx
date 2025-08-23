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
  Skeleton
} from '@mui/material';
import { LocationOn, People, Bed, Shower } from '@mui/icons-material';
import { useProperties } from '@/hooks/useApi';

interface Villa {
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

export default function VillasPage() {
  const { getProperties, data, loading, error } = useProperties();
  const [villas, setVillas] = useState<Villa[]>([]);

  useEffect(() => {
    getProperties();
  }, [getProperties]);

  useEffect(() => {
    if (data?.data) {
      // Transform Property data to Villa format
      const transformedVillas: Villa[] = data.data.map(property => ({
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
      setVillas(transformedVillas);
    }
  }, [data]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" sx={{ mb: 4, textAlign: 'center' }}>
          Luxury Villas
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
          Error loading villas
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
        Luxury Villas
      </Typography>
      
      <Grid container spacing={4}>
        {villas.map((villa) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={villa.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={villa.image_urls[0] || '/placeholder-villa.jpg'}
                alt={villa.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                  {villa.title}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    {villa.location}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <People sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                    <Typography variant="body2">{villa.max_guests}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Bed sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                    <Typography variant="body2">{villa.bedrooms}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Shower sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                    <Typography variant="body2">{villa.bathrooms}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating value={villa.averageRating} precision={0.1} readOnly size="small" />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({villa.reviewCount} reviews)
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                  {villa.description}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                  <Typography variant="h6" color="primary">
                    ${villa.price_per_night}/night
                  </Typography>
                  <Button variant="contained" size="small">
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
