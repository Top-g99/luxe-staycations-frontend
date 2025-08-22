"use client";

import React, { useState } from 'react';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  FormControlLabel,
  Checkbox,
  Grid,
} from '@mui/material';
import {
  Person,
  Email,
  Lock,
  Phone,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.termsAccepted) {
      setError('Please accept the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      // In real app, this would be an API call to register the user
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful registration
      console.log('User registered:', formData);
      
      // Auto-login after registration
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Registration successful but login failed. Please try logging in.');
      } else {
        router.push("/");
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 4
    }}>
      <Card sx={{ maxWidth: 500, width: '100%', mx: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Create Your Account
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Join thousands of travelers discovering amazing villas
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                  InputProps={{
                    startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  InputProps={{
                    startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                  InputProps={{
                    startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  InputProps={{
                    startAdornment: <Lock sx={{ mr: 1, color: 'text.secondary' }} />,
                    endAdornment: (
                      <Button
                        onClick={() => setShowPassword(!showPassword)}
                        sx={{ minWidth: 'auto', p: 0.5 }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </Button>
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  required
                  InputProps={{
                    startAdornment: <Lock sx={{ mr: 1, color: 'text.secondary' }} />,
                    endAdornment: (
                      <Button
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        sx={{ minWidth: 'auto', p: 0.5 }}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </Button>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.termsAccepted}
                    onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                  />
                }
                label={
                  <Typography variant="body2">
                    I agree to the{' '}
                    <Link href="/terms" style={{ color: 'primary.main', textDecoration: 'none' }}>
                      Terms and Conditions
                    </Link>
                    {' '}and{' '}
                    <Link href="/privacy" style={{ color: 'primary.main', textDecoration: 'none' }}>
                      Privacy Policy
                    </Link>
                  </Typography>
                }
              />
            </Box>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link href="/auth/signin" style={{ color: 'primary.main', textDecoration: 'none' }}>
                Sign in here
              </Link>
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Want to list your property?{' '}
              <Link href="/auth/host-signup" style={{ color: 'primary.main', textDecoration: 'none' }}>
                Become a host
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
