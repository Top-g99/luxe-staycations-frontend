"use client";

import React from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import {
  TravelExplore,
  Villa,
  Business,
  ArrowForward,
  Star,
  Security,
  Support,
} from '@mui/icons-material';

export default function SignupOptionsPage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/");
    return null;
  }

  const guestBenefits = [
    "Access to luxury villas worldwide",
    "Exclusive member discounts",
    "24/7 concierge support",
    "Flexible booking options",
    "Loyalty rewards program",
    "Secure payment processing"
  ];

  const hostBenefits = [
    "Earn up to 85% of booking value",
    "Professional property management",
    "Automated booking system",
    "Marketing and promotion support",
    "Analytics and insights dashboard",
    "Dedicated host support team"
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 4,
      px: 2
    }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" gutterBottom fontWeight="bold" color="white">
            Welcome to Luxe Staycations
          </Typography>
          <Typography variant="h6" color="white" sx={{ opacity: 0.9 }}>
            Choose how you'd like to experience luxury travel
          </Typography>
        </Box>

        {/* Signup Options */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Guest Option */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ 
              height: '100%', 
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }
            }}>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Box sx={{ mb: 3 }}>
                  <TravelExplore sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h4" gutterBottom fontWeight="bold">
                    I'm a Traveler
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Discover and book amazing luxury villas for your next vacation
                  </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom fontWeight="bold" color="primary.main">
                    What you'll get:
                  </Typography>
                  <Box sx={{ textAlign: 'left' }}>
                    {guestBenefits.map((benefit, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Star sx={{ fontSize: 16, color: 'primary.main', mr: 1 }} />
                        <Typography variant="body2">{benefit}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Button
                  component={Link}
                  href="/auth/signup"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #5a6fd8 0%, #6a4190 100%)'
                    }
                  }}
                >
                  Create Guest Account
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Host Option */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ 
              height: '100%', 
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }
            }}>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Box sx={{ mb: 3 }}>
                  <Villa sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h4" gutterBottom fontWeight="bold">
                    I'm a Property Owner
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    List your luxury property and start earning from bookings
                  </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom fontWeight="bold" color="primary.main">
                    What you'll get:
                  </Typography>
                  <Box sx={{ textAlign: 'left' }}>
                    {hostBenefits.map((benefit, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Star sx={{ fontSize: 16, color: 'primary.main', mr: 1 }} />
                        <Typography variant="body2">{benefit}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Button
                  component={Link}
                  href="/auth/host-signup"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #5a6fd8 0%, #6a4190 100%)'
                    }
                  }}
                >
                  Become a Host
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Unified Option */}
        <Card sx={{ 
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          mb: 4
        }}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Not sure which one to choose?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Try our unified signup process and choose your path later
            </Typography>
            <Button
              component={Link}
              href="/auth/signup-unified"
              variant="outlined"
              size="large"
              endIcon={<ArrowForward />}
              sx={{ px: 4, py: 1.5 }}
            >
              Start Unified Signup
            </Button>
          </CardContent>
        </Card>

        {/* Features */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, textAlign: 'center', background: 'rgba(255, 255, 255, 0.9)' }}>
              <Security sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Secure & Safe
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bank-level security for all transactions and personal data
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, textAlign: 'center', background: 'rgba(255, 255, 255, 0.9)' }}>
              <Support sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom fontWeight="bold">
                24/7 Support
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Round-the-clock customer support for all your needs
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, textAlign: 'center', background: 'rgba(255, 255, 255, 0.9)' }}>
              <Business sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Professional
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Industry-leading platform with proven business model
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="white" sx={{ opacity: 0.8 }}>
            Already have an account?{' '}
            <Link href="/auth/signin" style={{ color: 'white', textDecoration: 'underline' }}>
              Sign in here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
