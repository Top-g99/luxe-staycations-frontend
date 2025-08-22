"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Tabs,
  Tab,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  Snackbar,
  Badge,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridToolbar,
} from '@mui/x-data-grid';
import {
  Edit as EditIcon,
  Visibility as ViewIcon,
  Block as SuspendIcon,
  CheckCircle as VerifyIcon,
  Delete as DeleteIcon,
  AttachMoney as PayoutIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';

// Mock data - replace with actual API calls
const mockGuests = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1-555-0123',
    totalBookings: 5,
    totalSpent: 2500,
    signUpDate: '2024-01-15',
    isVerified: true,
    isSuspended: false,
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1-555-0124',
    totalBookings: 3,
    totalSpent: 1800,
    signUpDate: '2024-02-20',
    isVerified: true,
    isSuspended: false,
  },
];

const mockHosts = [
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'mike.wilson@example.com',
    phone: '+1-555-0125',
    listings: 2,
    totalEarnings: 8500,
    payoutBalance: 1200,
    status: 'ACTIVE',
    isVerified: true,
    signUpDate: '2024-01-10',
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1-555-0126',
    listings: 1,
    totalEarnings: 3200,
    payoutBalance: 500,
    status: 'ONBOARDING',
    isVerified: false,
    signUpDate: '2024-03-01',
  },
];

const mockAdmins = [
  {
    id: '5',
    name: 'Admin User',
    email: 'admin@luxe.com',
    phone: '+1-555-0127',
    role: 'ADMIN',
    isActive: true,
    lastLogin: '2024-03-15',
  },
  {
    id: '6',
    name: 'Super Admin',
    email: 'superadmin@luxe.com',
    phone: '+1-555-0128',
    role: 'SUPER_ADMIN',
    isActive: true,
    lastLogin: '2024-03-14',
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`user-tabpanel-${index}`}
      aria-labelledby={`user-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const UserForm = ({ open, onClose, user, onSave, userType }: any) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || 'CUSTOMER',
    isVerified: user?.isVerified || false,
    isSuspended: user?.isSuspended || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {user ? 'Edit User' : 'Add New User'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Grid>
            {userType === 'admin' && (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={formData.role}
                    label="Role"
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    <MenuItem value="ADMIN">Admin</MenuItem>
                    <MenuItem value="SUPER_ADMIN">Super Admin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Verified</InputLabel>
                <Select
                  value={formData.isVerified ? 'true' : 'false'}
                  label="Verified"
                  onChange={(e) => setFormData({ ...formData, isVerified: e.target.value === 'true' })}
                >
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Suspended</InputLabel>
                <Select
                  value={formData.isSuspended ? 'true' : 'false'}
                  label="Suspended"
                  onChange={(e) => setFormData({ ...formData, isSuspended: e.target.value === 'true' })}
                >
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {user ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default function UsersPage() {
  const [tabValue, setTabValue] = useState(0);
  const [guests, setGuests] = useState(mockGuests);
  const [hosts, setHosts] = useState(mockHosts);
  const [admins, setAdmins] = useState(mockAdmins);
  const [openForm, setOpenForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userType, setUserType] = useState('guest');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAddUser = (type: string) => {
    setSelectedUser(null);
    setUserType(type);
    setOpenForm(true);
  };

  const handleEditUser = (user: any, type: string) => {
    setSelectedUser(user);
    setUserType(type);
    setOpenForm(true);
  };

  const handleSaveUser = (formData: any) => {
    if (selectedUser) {
      // Update existing user
      if (userType === 'guest') {
        setGuests(prev => 
          prev.map(u => u.id === selectedUser.id ? { ...u, ...formData } : u)
        );
      } else if (userType === 'host') {
        setHosts(prev => 
          prev.map(u => u.id === selectedUser.id ? { ...u, ...formData } : u)
        );
      } else {
        setAdmins(prev => 
          prev.map(u => u.id === selectedUser.id ? { ...u, ...formData } : u)
        );
      }
      setSnackbar({
        open: true,
        message: 'User updated successfully',
        severity: 'success',
      });
    } else {
      // Add new user
      const newUser = {
        id: Date.now().toString(),
        ...formData,
        signUpDate: new Date().toISOString().split('T')[0],
      };
      
      if (userType === 'guest') {
        setGuests(prev => [...prev, newUser]);
      } else if (userType === 'host') {
        setHosts(prev => [...prev, { ...newUser, listings: 0, totalEarnings: 0, payoutBalance: 0, status: 'ONBOARDING' }]);
      } else {
        setAdmins(prev => [...prev, { ...newUser, isActive: true, lastLogin: new Date().toISOString().split('T')[0] }]);
      }
      
      setSnackbar({
        open: true,
        message: 'User created successfully',
        severity: 'success',
      });
    }
  };

  const handleSuspendUser = (id: string, type: string) => {
    if (type === 'guest') {
      setGuests(prev => 
        prev.map(u => u.id === id ? { ...u, isSuspended: !u.isSuspended } : u)
      );
    } else if (type === 'host') {
      setHosts(prev => 
        prev.map(u => u.id === id ? { ...u, status: u.status === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED' } : u)
      );
    }
    
    setSnackbar({
      open: true,
      message: 'User status updated successfully',
      severity: 'warning',
    });
  };

  const handleDeleteUser = (id: string, type: string) => {
    if (type === 'guest') {
      setGuests(prev => prev.filter(u => u.id !== id));
    } else if (type === 'host') {
      setHosts(prev => prev.filter(u => u.id !== id));
    } else {
      setAdmins(prev => prev.filter(u => u.id !== id));
    }
    
    setSnackbar({
      open: true,
      message: 'User deleted successfully',
      severity: 'success',
    });
  };

  const guestColumns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Guest Name',
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
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'totalBookings', headerName: 'Total Bookings', width: 150 },
    {
      field: 'totalSpent',
      headerName: 'Total Spend',
      width: 150,
      renderCell: (params) => `$${params.value}`,
    },
    { field: 'signUpDate', headerName: 'Sign-up Date', width: 150 },
    {
      field: 'isVerified',
      headerName: 'Verified',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Yes' : 'No'}
          color={params.value ? 'success' : 'default'}
          size="small"
        />
      ),
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
          onClick={() => console.log('View guest', params.id)}
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEditUser(params.row, 'guest')}
        />,
        <GridActionsCellItem
          icon={<SuspendIcon />}
          label="Suspend"
          onClick={() => handleSuspendUser(params.id as string, 'guest')}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteUser(params.id as string, 'guest')}
        />,
      ],
    },
  ];

  const hostColumns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Host Name',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'success.main' }}>
            {params.value[0]}
          </Avatar>
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            {params.value}
          </Typography>
        </Box>
      ),
    },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'listings', headerName: 'Listings', width: 100 },
    {
      field: 'totalEarnings',
      headerName: 'Total Earnings',
      width: 150,
      renderCell: (params) => `$${params.value}`,
    },
    {
      field: 'payoutBalance',
      headerName: 'Payout Balance',
      width: 150,
      renderCell: (params) => `$${params.value}`,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'ACTIVE' ? 'success' : params.value === 'SUSPENDED' ? 'error' : 'warning'}
          size="small"
        />
      ),
    },
    { field: 'signUpDate', headerName: 'Sign-up Date', width: 150 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 250,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ViewIcon />}
          label="View"
          onClick={() => console.log('View host', params.id)}
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEditUser(params.row, 'host')}
        />,
        <GridActionsCellItem
          icon={<PayoutIcon />}
          label="Payout"
          onClick={() => console.log('Process payout', params.id)}
        />,
        <GridActionsCellItem
          icon={<SuspendIcon />}
          label="Suspend"
          onClick={() => handleSuspendUser(params.id as string, 'host')}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteUser(params.id as string, 'host')}
        />,
      ],
    },
  ];

  const adminColumns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Admin Name',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'warning.main' }}>
            {params.value[0]}
          </Avatar>
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            {params.value}
          </Typography>
        </Box>
      ),
    },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    {
      field: 'role',
      headerName: 'Role',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value.replace('_', ' ')}
          color={params.value === 'SUPER_ADMIN' ? 'error' : 'primary'}
          size="small"
        />
      ),
    },
    {
      field: 'isActive',
      headerName: 'Active',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Yes' : 'No'}
          color={params.value ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    { field: 'lastLogin', headerName: 'Last Login', width: 150 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEditUser(params.row, 'admin')}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteUser(params.id as string, 'admin')}
        />,
      ],
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          User Management
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Manage guests, hosts, and administrators across the platform.
        </Typography>
      </Box>

      <Card>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="user management tabs">
              <Tab label={`Guests (${guests.length})`} />
              <Tab label={`Hosts (${hosts.length})`} />
              <Tab label={`Administrators (${admins.length})`} />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Guest Management</Typography>
              <Button
                variant="contained"
                onClick={() => handleAddUser('guest')}
              >
                Add Guest
              </Button>
            </Box>
            <DataGrid
              rows={guests}
              columns={guestColumns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              checkboxSelection
              disableSelectionOnClick
              autoHeight
              components={{
                Toolbar: GridToolbar,
              }}
            />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Host Management</Typography>
              <Button
                variant="contained"
                onClick={() => handleAddUser('host')}
              >
                Add Host
              </Button>
            </Box>
            <DataGrid
              rows={hosts}
              columns={hostColumns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              checkboxSelection
              disableSelectionOnClick
              autoHeight
              components={{
                Toolbar: GridToolbar,
              }}
            />
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Administrator Management</Typography>
              <Button
                variant="contained"
                onClick={() => handleAddUser('admin')}
              >
                Add Administrator
              </Button>
            </Box>
            <DataGrid
              rows={admins}
              columns={adminColumns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              checkboxSelection
              disableSelectionOnClick
              autoHeight
              components={{
                Toolbar: GridToolbar,
              }}
            />
          </TabPanel>
        </CardContent>
      </Card>

      {/* User Form Dialog */}
      <UserForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        user={selectedUser}
        onSave={handleSaveUser}
        userType={userType}
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
