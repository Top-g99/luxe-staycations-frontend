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
  Button,
  Divider,
  Alert,
  Tabs,
  Tab,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Person,
  Email,
  Lock,
  Phone,
  Visibility,
  VisibilityOff,
  Business,
  LocationOn,
  AccountBalance,
  Villa,
  TravelExplore,
} from '@mui/icons-material';

// Guest signup form component
function GuestSignupForm({ onSuccess }: { onSuccess: () => void }) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

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
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Guest registered:', formData);
      
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Registration successful but login failed. Please try logging in.');
      } else {
        onSuccess();
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
        sx={{ mt: 3 }}
      >
        {loading ? 'Creating Account...' : 'Create Guest Account'}
      </Button>
    </form>
  );
}

// Host signup form component
function HostSignupForm({ onSuccess }: { onSuccess: () => void }) {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    businessName: '',
    businessType: '',
    gstin: '',
    panNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    hostAgreementAccepted: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const steps = ['Personal Information', 'Business Details', 'Account Setup'];

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 0:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 1:
        return formData.businessName && formData.businessType && formData.address && formData.city;
      case 2:
        return formData.password && formData.confirmPassword && formData.termsAccepted && formData.hostAgreementAccepted;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.termsAccepted || !formData.hostAgreementAccepted) {
      setError('Please accept all terms and agreements');
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Host registered:', formData);
      
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Registration successful but login failed. Please try logging in.');
      } else {
        onSuccess();
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

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
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
            <Grid size={{ xs: 12, sm: 6 }}>
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
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Business Name"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                required
                InputProps={{
                  startAdornment: <Business sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth required>
                <InputLabel>Business Type</InputLabel>
                <Select
                  value={formData.businessType}
                  label="Business Type"
                  onChange={(e) => handleInputChange('businessType', e.target.value)}
                >
                  <MenuItem value="individual">Individual</MenuItem>
                  <MenuItem value="partnership">Partnership</MenuItem>
                  <MenuItem value="private_limited">Private Limited</MenuItem>
                  <MenuItem value="public_limited">Public Limited</MenuItem>
                  <MenuItem value="llp">LLP</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="GSTIN (Optional)"
                value={formData.gstin}
                onChange={(e) => handleInputChange('gstin', e.target.value)}
                InputProps={{
                  startAdornment: <AccountBalance sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="PAN Number"
                value={formData.panNumber}
                onChange={(e) => handleInputChange('panNumber', e.target.value)}
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={3}
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                required
                InputProps={{
                  startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                label="City"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                label="State"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                label="Pincode"
                value={formData.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                required
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={2}>
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
            <Grid size={{ xs: 12 }}>
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
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.hostAgreementAccepted}
                    onChange={(e) => handleInputChange('hostAgreementAccepted', e.target.checked)}
                  />
                }
                label={
                  <Typography variant="body2">
                    I agree to the{' '}
                    <Link href="/host-agreement" style={{ color: 'primary.main', textDecoration: 'none' }}>
                      Host Agreement
                    </Link>
                    {' '}and commission structure
                  </Typography>
                }
              />
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Box>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mb: 4 }}>
        {renderStepContent(activeStep)}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={!isStepValid(activeStep) || loading}
        >
          {loading ? 'Creating Account...' : activeStep === steps.length - 1 ? 'Create Host Account' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
}

export default function UnifiedSignupPage() {
  const [tabValue, setTabValue] = useState(0);
  const [success, setSuccess] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/");
    return null;
  }

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      router.push(tabValue === 0 ? "/" : "/host/dashboard");
    }, 2000);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (success) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4
      }}>
        <Card sx={{ maxWidth: 500, width: '100%', mx: 2, textAlign: 'center' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom color="success.main">
              🎉 Account Created Successfully!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Redirecting you to your dashboard...
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 4
    }}>
      <Card sx={{ maxWidth: 800, width: '100%', mx: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Join Luxe Staycations
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Choose your journey with us
            </Typography>
          </Box>

          <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 4 }}>
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TravelExplore />
                  Guest Account
                </Box>
              } 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Villa />
                  Host Account
                </Box>
              } 
            />
          </Tabs>

          {tabValue === 0 ? (
            <GuestSignupForm onSuccess={handleSuccess} />
          ) : (
            <HostSignupForm onSuccess={handleSuccess} />
          )}

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
        </CardContent>
      </Card>
    </Box>
  );
}
