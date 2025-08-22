"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Avatar,
  Tooltip,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridActionsCellItem,
  GridToolbar,
} from '@mui/x-data-grid';
import {
  Edit as EditIcon,
  Visibility as ViewIcon,
  CheckCircle as VerifyIcon,
  Block as SuspendIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';

// Mock data - replace with actual API calls
const mockProperties = [
  {
    id: '1',
    name: 'Villa Azure',
    hostName: 'John Smith',
    location: 'Bali, Indonesia',
    status: 'VERIFIED',
    isLuxeCertified: true,
    pricePerNight: 250,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Sunset Haven',
    hostName: 'Sarah Johnson',
    location: 'Maldives',
    status: 'PENDING_REVIEW',
    isLuxeCertified: false,
    pricePerNight: 450,
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    name: 'Mountain Retreat',
    hostName: 'Mike Wilson',
    location: 'Swiss Alps',
    status: 'SUSPENDED',
    isLuxeCertified: true,
    pricePerNight: 350,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    createdAt: '2024-01-10',
  },
];

const PropertyForm = ({ open, onClose, property, onSave }: any) => {
  const [formData, setFormData] = useState({
    name: property?.name || '',
    description: property?.description || '',
    city: property?.city || '',
    country: property?.country || '',
    address: property?.address || '',
    pricePerNight: property?.pricePerNight || 0,
    cleaningFee: property?.cleaningFee || 0,
    securityDeposit: property?.securityDeposit || 0,
    bedrooms: property?.bedrooms || 1,
    bathrooms: property?.bathrooms || 1,
    maxGuests: property?.maxGuests || 2,
    category: property?.category || '',
    isLuxeCertified: property?.isLuxeCertified || false,
    isVisible: property?.isVisible !== false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {property ? 'Edit Property' : 'Add New Property'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Property Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Price per Night ($)"
                type="number"
                value={formData.pricePerNight}
                onChange={(e) => setFormData({ ...formData, pricePerNight: Number(e.target.value) })}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Cleaning Fee ($)"
                type="number"
                value={formData.cleaningFee}
                onChange={(e) => setFormData({ ...formData, cleaningFee: Number(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Security Deposit ($)"
                type="number"
                value={formData.securityDeposit}
                onChange={(e) => setFormData({ ...formData, securityDeposit: Number(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                required
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                required
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Max Guests"
                type="number"
                value={formData.maxGuests}
                onChange={(e) => setFormData({ ...formData, maxGuests: Number(e.target.value) })}
                required
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  label="Category"
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <MenuItem value="Beachfront">Beachfront</MenuItem>
                  <MenuItem value="Mountain">Mountain</MenuItem>
                  <MenuItem value="Heritage">Heritage</MenuItem>
                  <MenuItem value="Urban">Urban</MenuItem>
                  <MenuItem value="Rural">Rural</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {property ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default function PropertiesPage() {
  const [properties, setProperties] = useState(mockProperties);
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  const [openForm, setOpenForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    location: '',
    luxeCertified: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info',
  });

  useEffect(() => {
    // Apply filters
    let filtered = properties;
    
    if (filters.status) {
      filtered = filtered.filter(p => p.status === filters.status);
    }
    
    if (filters.location) {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.luxeCertified) {
      filtered = filtered.filter(p => 
        filters.luxeCertified === 'true' ? p.isLuxeCertified : !p.isLuxeCertified
      );
    }
    
    setFilteredProperties(filtered);
  }, [properties, filters]);

  const handleAddProperty = () => {
    setSelectedProperty(null);
    setOpenForm(true);
  };

  const handleEditProperty = (property: any) => {
    setSelectedProperty(property);
    setOpenForm(true);
  };

  const handleSaveProperty = (formData: any) => {
    if (selectedProperty) {
      // Update existing property
      setProperties(prev => 
        prev.map(p => p.id === selectedProperty.id ? { ...p, ...formData } : p)
      );
      setSnackbar({
        open: true,
        message: 'Property updated successfully',
        severity: 'success',
      });
    } else {
      // Add new property
      const newProperty = {
        id: Date.now().toString(),
        ...formData,
        hostName: 'Current User', // Replace with actual host
        createdAt: new Date().toISOString().split('T')[0],
      };
      setProperties(prev => [...prev, newProperty]);
      setSnackbar({
        open: true,
        message: 'Property created successfully',
        severity: 'success',
      });
    }
  };

  const handleVerifyProperty = (id: string) => {
    setProperties(prev => 
      prev.map(p => p.id === id ? { ...p, status: 'VERIFIED' } : p)
    );
    setSnackbar({
      open: true,
      message: 'Property verified successfully',
      severity: 'success',
    });
  };

  const handleSuspendProperty = (id: string) => {
    setProperties(prev => 
      prev.map(p => p.id === id ? { ...p, status: 'SUSPENDED' } : p)
    );
    setSnackbar({
      open: true,
      message: 'Property suspended successfully',
      severity: 'warning',
    });
  };

  const handleDeleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
    setSnackbar({
      open: true,
      message: 'Property deleted successfully',
      severity: 'success',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VERIFIED': return 'success';
      case 'PENDING_REVIEW': return 'warning';
      case 'SUSPENDED': return 'error';
      case 'REJECTED': return 'error';
      default: return 'default';
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Property Name',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
            {params.value[0]}
          </Avatar>
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'hostName',
      headerName: 'Host',
      width: 150,
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 150,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value.replace('_', ' ')}
          color={getStatusColor(params.value) as any}
          size="small"
        />
      ),
    },
    {
      field: 'isLuxeCertified',
      headerName: 'Luxe Certified',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Yes' : 'No'}
          color={params.value ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      field: 'pricePerNight',
      headerName: 'Price/Night',
      width: 120,
      renderCell: (params) => `$${params.value}`,
    },
    {
      field: 'bedrooms',
      headerName: 'Bedrooms',
      width: 100,
    },
    {
      field: 'bathrooms',
      headerName: 'Bathrooms',
      width: 100,
    },
    {
      field: 'maxGuests',
      headerName: 'Max Guests',
      width: 120,
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      width: 120,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 200,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ViewIcon />}
          label="View"
          onClick={() => console.log('View property', params.id)}
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEditProperty(params.row)}
        />,
        <GridActionsCellItem
          icon={<VerifyIcon />}
          label="Verify"
          onClick={() => handleVerifyProperty(params.id as string)}
          disabled={params.row.status === 'VERIFIED'}
        />,
        <GridActionsCellItem
          icon={<SuspendIcon />}
          label="Suspend"
          onClick={() => handleSuspendProperty(params.id as string)}
          disabled={params.row.status === 'SUSPENDED'}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteProperty(params.id as string)}
        />,
      ],
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Property Management
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage all properties, verify listings, and monitor performance.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddProperty}
        >
          Add Property
        </Button>
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Filters
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  label="Status"
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="PENDING_REVIEW">Pending Review</MenuItem>
                  <MenuItem value="VERIFIED">Verified</MenuItem>
                  <MenuItem value="SUSPENDED">Suspended</MenuItem>
                  <MenuItem value="REJECTED">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Location"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                placeholder="Search by location..."
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Luxe Certified</InputLabel>
                <Select
                  value={filters.luxeCertified}
                  label="Luxe Certified"
                  onChange={(e) => setFilters({ ...filters, luxeCertified: e.target.value })}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="true">Certified Only</MenuItem>
                  <MenuItem value="false">Non-Certified Only</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={() => setFilters({ status: '', location: '', luxeCertified: '' })}
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Properties Data Grid */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <DataGrid
            rows={filteredProperties}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            checkboxSelection
            disableSelectionOnClick
            autoHeight
            components={{
              Toolbar: GridToolbar,
            }}
            sx={{
              '& .MuiDataGrid-cell:focus': {
                outline: 'none',
              },
            }}
          />
        </CardContent>
      </Card>

      {/* Property Form Dialog */}
      <PropertyForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        property={selectedProperty}
        onSave={handleSaveProperty}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
