"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Alert,
  IconButton,
  Tooltip,
  Badge,
  LinearProgress,
  Divider,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridActionsCellItem,
  GridToolbar,
} from '@mui/x-data-grid';
import {
  TrendingUp,
  Star,
  LocalOffer,
  Visibility,
  Edit,
  Delete,
  Add,
  FilterList,
  AutoAwesome,
  Speed,
  TrendingDown,
  NewReleases,
  Verified,
} from '@mui/icons-material';

// Mock data for enhanced property management
const mockProperties = [
  {
    id: 1,
    title: "Luxury Beach Villa",
    host: "John Smith",
    location: "Goa, India",
    status: "VERIFIED",
    isLuxeCertified: true,
    pricePerNight: 15000,
    occupancyRate: 85,
    averageRating: 4.8,
    totalBookings: 45,
    totalRevenue: 675000,
    lastBookedAt: "2024-01-15",
    tags: ["FAST_SELLER", "LUXE_PREMIER"],
    commissionType: "PERCENTAGE",
    commissionRate: 15,
    gstin: "22AAAAA0000A1Z5",
  },
  {
    id: 2,
    title: "Mountain Retreat",
    host: "Sarah Johnson",
    location: "Manali, India",
    status: "VERIFIED",
    isLuxeCertified: false,
    pricePerNight: 12000,
    occupancyRate: 72,
    averageRating: 4.6,
    totalBookings: 32,
    totalRevenue: 384000,
    lastBookedAt: "2024-01-10",
    tags: ["HIGH_DEMAND"],
    commissionType: "FIXED_AMOUNT",
    commissionRate: 1000,
    gstin: "33BBBBB0000B2Z6",
  },
  {
    id: 3,
    title: "Heritage Palace Suite",
    host: "Rajesh Kumar",
    location: "Udaipur, India",
    status: "PENDING_REVIEW",
    isLuxeCertified: true,
    pricePerNight: 25000,
    occupancyRate: 95,
    averageRating: 4.9,
    totalBookings: 28,
    totalRevenue: 700000,
    lastBookedAt: "2024-01-18",
    tags: ["FAST_SELLER", "LUXE_PREMIER", "TRENDING"],
    commissionType: "PERCENTAGE",
    commissionRate: 12,
    gstin: "08CCCCC0000C3Z7",
  },
  {
    id: 4,
    title: "Coastal Cottage",
    host: "Maria Garcia",
    location: "Kerala, India",
    status: "VERIFIED",
    isLuxeCertified: false,
    pricePerNight: 8000,
    occupancyRate: 45,
    averageRating: 4.2,
    totalBookings: 15,
    totalRevenue: 120000,
    lastBookedAt: "2024-01-05",
    tags: ["RECENTLY_LISTED"],
    commissionType: "PERCENTAGE",
    commissionRate: 18,
    gstin: "32DDDDD0000D4Z8",
  },
];

const tagColors = {
  FAST_SELLER: { color: 'success', icon: <Speed /> },
  HIGH_DEMAND: { color: 'warning', icon: <TrendingUp /> },
  RECENTLY_LISTED: { color: 'info', icon: <NewReleases /> },
  LUXE_PREMIER: { color: 'secondary', icon: <AutoAwesome /> },
  TRENDING: { color: 'error', icon: <TrendingUp /> },
  BEST_VALUE: { color: 'primary', icon: <LocalOffer /> },
};

export default function EnhancedPropertiesPage() {
  const [properties, setProperties] = useState(mockProperties);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [commissionDialog, setCommissionDialog] = useState(false);
  const [tagDialog, setTagDialog] = useState(false);
  const [performanceDialog, setPerformanceDialog] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    tags: 'all',
    luxeCertified: 'all',
  });

  const getTagChip = (tag: string) => {
    const config = tagColors[tag] || { color: 'default', icon: <LocalOffer /> };
    return (
      <Chip
        key={tag}
        label={tag.replace('_', ' ')}
        color={config.color as any}
        size="small"
        icon={config.icon}
        sx={{ mr: 0.5, mb: 0.5 }}
      />
    );
  };

  const getPerformanceColor = (rate: number) => {
    if (rate >= 80) return 'success';
    if (rate >= 60) return 'warning';
    return 'error';
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 80,
    },
    {
      field: 'title',
      headerName: 'Property Name',
      width: 250,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight="bold">
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.location}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'host',
      headerName: 'Host',
      width: 150,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value.replace('_', ' ')}
          color={params.value === 'VERIFIED' ? 'success' : 'warning'}
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
          icon={params.value ? <Verified /> : null}
          label={params.value ? 'Yes' : 'No'}
          color={params.value ? 'secondary' : 'default'}
          size="small"
        />
      ),
    },
    {
      field: 'pricePerNight',
      headerName: 'Price/Night',
      width: 120,
      renderCell: (params) => `₹${params.value.toLocaleString()}`,
    },
    {
      field: 'occupancyRate',
      headerName: 'Occupancy',
      width: 150,
      renderCell: (params) => (
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              {params.value}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={params.value}
              color={getPerformanceColor(params.value) as any}
              sx={{ flexGrow: 1, height: 6, borderRadius: 3 }}
            />
          </Box>
        </Box>
      ),
    },
    {
      field: 'averageRating',
      headerName: 'Rating',
      width: 100,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Star sx={{ color: 'warning.main', fontSize: 16, mr: 0.5 }} />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'tags',
      headerName: 'Tags',
      width: 200,
      renderCell: (params) => (
        <Box>
          {params.value.map((tag: string) => getTagChip(tag))}
        </Box>
      ),
    },
    {
      field: 'commissionRate',
      headerName: 'Commission',
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.row.commissionType === 'PERCENTAGE' 
            ? `${params.value}%` 
            : `₹${params.value}`
          }
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit Commission"
          onClick={() => handleCommissionEdit(params.row)}
        />,
        <GridActionsCellItem
          icon={<LocalOffer />}
          label="Manage Tags"
          onClick={() => handleTagEdit(params.row)}
        />,
        <GridActionsCellItem
          icon={<TrendingUp />}
          label="Performance"
          onClick={() => handlePerformanceView(params.row)}
        />,
      ],
    },
  ];

  const handleCommissionEdit = (property: any) => {
    setSelectedProperty(property);
    setCommissionDialog(true);
  };

  const handleTagEdit = (property: any) => {
    setSelectedProperty(property);
    setTagDialog(true);
  };

  const handlePerformanceView = (property: any) => {
    setSelectedProperty(property);
    setPerformanceDialog(true);
  };

  const handleCommissionSave = (commissionType: string, commissionRate: number) => {
    if (selectedProperty) {
      setProperties(properties.map(p => 
        p.id === selectedProperty.id 
          ? { ...p, commissionType, commissionRate }
          : p
      ));
    }
    setCommissionDialog(false);
  };

  const handleTagSave = (tags: string[]) => {
    if (selectedProperty) {
      setProperties(properties.map(p => 
        p.id === selectedProperty.id 
          ? { ...p, tags }
          : p
      ));
    }
    setTagDialog(false);
  };

  const getPerformanceMetrics = () => {
    const totalProperties = properties.length;
    const verifiedProperties = properties.filter(p => p.status === 'VERIFIED').length;
    const luxeCertified = properties.filter(p => p.isLuxeCertified).length;
    const fastSellers = properties.filter(p => p.tags.includes('FAST_SELLER')).length;
    const avgOccupancy = properties.reduce((sum, p) => sum + p.occupancyRate, 0) / totalProperties;
    const totalRevenue = properties.reduce((sum, p) => sum + p.totalRevenue, 0);

    return {
      totalProperties,
      verifiedProperties,
      luxeCertified,
      fastSellers,
      avgOccupancy: Math.round(avgOccupancy),
      totalRevenue,
    };
  };

  const metrics = getPerformanceMetrics();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Enhanced Property Management
      </Typography>
      
      {/* Performance Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Properties
              </Typography>
              <Typography variant="h4">{metrics.totalProperties}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Verified
              </Typography>
              <Typography variant="h4" color="success.main">
                {metrics.verifiedProperties}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Luxe Certified
              </Typography>
              <Typography variant="h4" color="secondary.main">
                {metrics.luxeCertified}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Fast Sellers
              </Typography>
              <Typography variant="h4" color="success.main">
                {metrics.fastSellers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Avg Occupancy
              </Typography>
              <Typography variant="h4" color="warning.main">
                {metrics.avgOccupancy}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Revenue
              </Typography>
              <Typography variant="h4" color="primary.main">
                ₹{(metrics.totalRevenue / 100000).toFixed(1)}L
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Enhanced DataGrid */}
      <Card>
        <CardContent>
          <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={properties}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              checkboxSelection
              disableSelectionOnClick
              components={{
                Toolbar: GridToolbar,
              }}
              componentsProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Commission Edit Dialog */}
      <Dialog open={commissionDialog} onClose={() => setCommissionDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Commission Agreement</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Property: {selectedProperty?.title}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Commission Type</InputLabel>
                <Select
                  value={selectedProperty?.commissionType || 'PERCENTAGE'}
                  label="Commission Type"
                >
                  <MenuItem value="PERCENTAGE">Percentage of Booking Value</MenuItem>
                  <MenuItem value="FIXED_AMOUNT">Fixed Amount per Night</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Commission Rate"
                type="number"
                defaultValue={selectedProperty?.commissionRate || 0}
                InputProps={{
                  endAdornment: selectedProperty?.commissionType === 'PERCENTAGE' ? '%' : '₹',
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCommissionDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={() => handleCommissionSave('PERCENTAGE', 15)}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Tag Management Dialog */}
      <Dialog open={tagDialog} onClose={() => setTagDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Manage Property Tags</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Property: {selectedProperty?.title}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Current Tags:
            </Typography>
            <Box>
              {selectedProperty?.tags.map((tag: string) => getTagChip(tag))}
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" gutterBottom>
            Available Tags:
          </Typography>
          <Grid container spacing={1}>
            {Object.keys(tagColors).map((tag) => (
              <Grid item key={tag}>
                <Chip
                  label={tag.replace('_', ' ')}
                  color={tagColors[tag].color as any}
                  icon={tagColors[tag].icon}
                  clickable
                  variant={selectedProperty?.tags.includes(tag) ? 'filled' : 'outlined'}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTagDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={() => handleTagSave(['FAST_SELLER', 'LUXE_PREMIER'])}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Performance View Dialog */}
      <Dialog open={performanceDialog} onClose={() => setPerformanceDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Property Performance Analysis</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            {selectedProperty?.title}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary">Occupancy Rate</Typography>
                  <Typography variant="h4" color="success.main">
                    {selectedProperty?.occupancyRate}%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary">Average Rating</Typography>
                  <Typography variant="h4" color="warning.main">
                    {selectedProperty?.averageRating}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary">Total Bookings</Typography>
                  <Typography variant="h4" color="primary.main">
                    {selectedProperty?.totalBookings}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary">Total Revenue</Typography>
                  <Typography variant="h4" color="secondary.main">
                    ₹{(selectedProperty?.totalRevenue / 1000).toFixed(0)}K
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPerformanceDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
