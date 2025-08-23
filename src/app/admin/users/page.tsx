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
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  Add,
  Search,
  FilterList,
  Edit,
  Delete,
  Visibility,
  Person,
  AdminPanelSettings,
  Hotel,
  Block,
  CheckCircle,
  Email,
  Phone,
  LocationOn
} from '@mui/icons-material';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  role: 'guest' | 'host' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastLogin: string;
  totalBookings: number;
  totalSpent: number;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    // Generate mock user data
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, USA',
        role: 'guest',
        status: 'active',
        joinDate: '2024-01-15',
        lastLogin: '2024-08-22',
        totalBookings: 12,
        totalSpent: 3500
      },
      {
        id: '2',
        name: 'Sarah Smith',
        email: 'sarah.smith@example.com',
        phone: '+1 (555) 234-5678',
        location: 'Los Angeles, USA',
        role: 'host',
        status: 'active',
        joinDate: '2023-11-20',
        lastLogin: '2024-08-21',
        totalBookings: 0,
        totalSpent: 0
      },
      {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        phone: '+1 (555) 345-6789',
        location: 'Chicago, USA',
        role: 'admin',
        status: 'active',
        joinDate: '2023-06-10',
        lastLogin: '2024-08-22',
        totalBookings: 0,
        totalSpent: 0
      },
      {
        id: '4',
        name: 'Emily Brown',
        email: 'emily.brown@example.com',
        phone: '+1 (555) 456-7890',
        location: 'Miami, USA',
        role: 'guest',
        status: 'inactive',
        joinDate: '2024-03-05',
        lastLogin: '2024-07-15',
        totalBookings: 3,
        totalSpent: 800
      },
      {
        id: '5',
        name: 'David Wilson',
        email: 'david.wilson@example.com',
        phone: '+1 (555) 567-8901',
        location: 'Seattle, USA',
        role: 'host',
        status: 'suspended',
        joinDate: '2023-09-12',
        lastLogin: '2024-08-10',
        totalBookings: 0,
        totalSpent: 0
      }
    ];
    setUsers(mockUsers);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    const matchesStatus = !statusFilter || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <AdminPanelSettings />;
      case 'host':
        return <Hotel />;
      case 'guest':
        return <Person />;
      default:
        return <Person />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'error';
      case 'host':
        return 'secondary';
      case 'guest':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'warning';
      case 'suspended':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle />;
      case 'inactive':
        return <Block />;
      case 'suspended':
        return <Block />;
      default:
        return <Block />;
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    // TODO: Implement delete functionality
    console.log('Delete user:', userId);
  };

  const handleStatusChange = (userId: string, newStatus: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, status: newStatus as any } : user
      )
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Users Management
        </Typography>
        <Button variant="contained" startIcon={<Add />}>
          Add New User
        </Button>
      </Box>

      {/* Search and Filters */}
      <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              fullWidth
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={roleFilter}
                label="Role"
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <MenuItem value="">All Roles</MenuItem>
                <MenuItem value="guest">Guests</MenuItem>
                <MenuItem value="host">Hosts</MenuItem>
                <MenuItem value="admin">Admins</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="suspended">Suspended</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Button variant="outlined" startIcon={<FilterList />} fullWidth>
              Apply Filters
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Results Count */}
      <Typography variant="body1" sx={{ mb: 3 }}>
        Found {filteredUsers.length} users
      </Typography>

      {/* Users List */}
      <Grid container spacing={3}>
        {filteredUsers.map((user) => (
          <Grid size={{ xs: 12, md: 6 }} key={user.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: `${getRoleColor(user.role)}.main`,
                      width: 56,
                      height: 56
                    }}
                  >
                    {getRoleIcon(user.role)}
                  </Avatar>
                  
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="h6" component="h3">
                        {user.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip 
                          label={user.role}
                          size="small"
                          color={getRoleColor(user.role) as any}
                        />
                        <Chip 
                          label={user.status}
                          size="small"
                          color={getStatusColor(user.status) as any}
                          icon={getStatusIcon(user.status)}
                        />
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Email sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Phone sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        {user.phone}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        {user.location}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                      <Typography variant="body2">
                        <strong>Joined:</strong> {new Date(user.joinDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Last Login:</strong> {new Date(user.lastLogin).toLocaleDateString()}
                      </Typography>
                    </Box>

                    {user.role === 'guest' && (
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                        <Typography variant="body2">
                          <strong>Bookings:</strong> {user.totalBookings}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Total Spent:</strong> ${user.totalSpent}
                        </Typography>
                      </Box>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Delete />
                        </IconButton>
                        <IconButton size="small" color="info">
                          <Visibility />
                        </IconButton>
                      </Box>
                      
                      {user.status !== 'active' && (
                        <Button 
                          size="small" 
                          variant="outlined" 
                          color="success"
                          onClick={() => handleStatusChange(user.id, 'active')}
                        >
                          Activate
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredUsers.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No users found matching your criteria
          </Typography>
          <Button 
            variant="outlined" 
            sx={{ mt: 2 }}
            onClick={() => {
              setSearchTerm('');
              setRoleFilter('');
              setStatusFilter('');
            }}
          >
            Clear Filters
          </Button>
        </Box>
      )}

      {/* Edit User Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="h6">{selectedUser.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedUser.email}
              </Typography>
              <Typography variant="body1">
                This is where the edit form would go. For now, it's just a placeholder.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained">Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
