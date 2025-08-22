"use client";

import { Box, Container, Typography, Button } from '@mui/material';
import { Hotel, Villa, BeachAccess } from '@mui/icons-material';

export default function HomePage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: 12,
        textAlign: 'center'
      }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" sx={{ 
            fontWeight: 700, 
            mb: 3,
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            Welcome to Luxe Staycations
          </Typography>
          <Typography variant="h5" sx={{ 
            mb: 4, 
            opacity: 0.9,
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
          }}>
            Your gateway to luxury accommodations worldwide
          </Typography>
          
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              px: 6, 
              py: 2,
              background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
              '&:hover': {
                background: 'linear-gradient(45deg, #FF5252, #26A69A)',
              }
            }}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
            Why Choose Luxe Staycations?
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 4,
          textAlign: 'center'
        }}>
          <Box>
            <Hotel sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
              Premium Quality
            </Typography>
            <Typography color="text.secondary">
              Every property is carefully selected to ensure the highest standards of luxury and comfort.
            </Typography>
          </Box>

          <Box>
            <Villa sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
              Diverse Options
            </Typography>
            <Typography color="text.secondary">
              From beachfront villas to city apartments, find the perfect accommodation for your style.
            </Typography>
          </Box>

          <Box>
            <BeachAccess sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
              Best Locations
            </Typography>
            <Typography color="text.secondary">
              Prime locations in the world's most beautiful destinations.
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* CTA Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: 8,
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
            Ready to Start Your Journey?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of travelers who trust Luxe Staycations
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              px: 4, 
              py: 2,
              background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
              '&:hover': {
                background: 'linear-gradient(45deg, #FF5252, #26A69A)',
              }
            }}
          >
            Start Exploring
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
