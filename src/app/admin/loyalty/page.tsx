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
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Badge
} from '@mui/material';
import { 
  Search,
  FilterList,
  Edit,
  Delete,
  Visibility,
  CheckCircle,
  Cancel,
  Pending,
  AttachMoney,
  TrendingUp,
  Star,
  CardGiftcard,
  Loyalty,
  Person,
  Email,
  Phone,
  LocationOn,
  Add,
  Download
} from '@mui/icons-material';

interface LoyaltyMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  points: number;
  totalSpent: number;
  joinDate: string;
  lastActivity: string;
  status: 'active' | 'inactive' | 'suspended';
  benefits: string[];
  nextTierPoints: number;
}

interface LoyaltyTransaction {
  id: string;
  memberId: string;
  memberName: string;
  type: 'earned' | 'redeemed' | 'expired' | 'bonus';
  points: number;
  description: string;
  date: string;
  propertyId?: string;
  propertyTitle?: string;
  bookingAmount?: number;
}

interface LoyaltySummary {
  totalMembers: number;
  activeMembers: number;
  totalPointsIssued: number;
  totalPointsRedeemed: number;
  averagePointsPerMember: number;
  topTiers: Array<{
    tier: string;
    count: number;
    percentage: number;
  }>;
}

export default function AdminLoyaltyPage() {
  const [members, setMembers] = useState<LoyaltyMember[]>([]);
  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedMember, setSelectedMember] = useState<LoyaltyMember | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // Generate mock loyalty member data
    const mockMembers: LoyaltyMember[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, USA',
        tier: 'platinum',
        points: 12500,
        totalSpent: 8500,
        joinDate: '2022-03-15',
        lastActivity: '2024-08-22',
        status: 'active',
        benefits: ['Free upgrades', 'Priority booking', 'Late checkout', 'Welcome gift'],
        nextTierPoints: 0
      },
      {
        id: '2',
        name: 'Sarah Smith',
        email: 'sarah.smith@example.com',
        phone: '+1 (555) 234-5678',
        location: 'Los Angeles, USA',
        tier: 'gold',
        points: 7800,
        totalSpent: 5200,
        joinDate: '2023-01-20',
        lastActivity: '2024-08-21',
        status: 'active',
        benefits: ['Free upgrades', 'Priority booking'],
        nextTierPoints: 2200
      },
      {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        phone: '+1 (555) 345-6789',
        location: 'Chicago, USA',
        tier: 'silver',
        points: 4200,
        totalSpent: 2800,
        joinDate: '2023-06-10',
        lastActivity: '2024-08-15',
        status: 'active',
        benefits: ['Priority booking'],
        nextTierPoints: 800
      },
      {
        id: '4',
        name: 'Emily Brown',
        email: 'emily.brown@example.com',
        phone: '+1 (555) 456-7890',
        location: 'Miami, USA',
        tier: 'bronze',
        points: 1200,
        totalSpent: 800,
        joinDate: '2024-03-05',
        lastActivity: '2024-08-10',
        status: 'inactive',
        benefits: [],
        nextTierPoints: 800
      },
      {
        id: '5',
        name: 'David Wilson',
        email: 'david.wilson@example.com',
        phone: '+1 (555) 567-8901',
        location: 'Seattle, USA',
        tier: 'gold',
        points: 6500,
        totalSpent: 4300,
        joinDate: '2023-09-12',
        lastActivity: '2024-08-18',
        status: 'suspended',
        benefits: ['Free upgrades', 'Priority booking'],
        nextTierPoints: 1500
      }
    ];

    // Generate mock loyalty transactions
    const mockTransactions: LoyaltyTransaction[] = [
      {
        id: '1',
        memberId: '1',
        memberName: 'John Doe',
        type: 'earned',
        points: 500,
        description: 'Booking at Luxury Villa Bali',
        date: '2024-08-22',
        propertyId: 'prop1',
        propertyTitle: 'Luxury Villa in Bali',
        bookingAmount: 1250
      },
      {
        id: '2',
        memberId: '2',
        memberName: 'Sarah Smith',
        type: 'earned',
        points: 320,
        description: 'Booking at Marina Bay Sands',
        date: '2024-08-21',
        propertyId: 'prop2',
        propertyTitle: 'Marina Bay Sands Suite',
        bookingAmount: 800
      },
      {
        id: '3',
        memberId: '1',
        memberName: 'John Doe',
        type: 'redeemed',
        points: -200,
        description: 'Redeemed for late checkout',
        date: '2024-08-20'
      },
      {
        id: '4',
        memberId: '3',
        memberName: 'Mike Johnson',
        type: 'bonus',
        points: 100,
        description: 'Welcome bonus for new member',
        date: '2024-08-19'
      },
      {
        id: '5',
        memberId: '4',
        memberName: 'Emily Brown',
        type: 'expired',
        points: -150,
        description: 'Points expired after 12 months',
        date: '2024-08-18'
      }
    ];

    setMembers(mockMembers);
    setTransactions(mockTransactions);
  }, []);

  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = !tierFilter || member.tier === tierFilter;
    const matchesStatus = !statusFilter || member.status === statusFilter;
    return matchesSearch && matchesTier && matchesStatus;
  });

  const loyaltySummary: LoyaltySummary = {
    totalMembers: members.length,
    activeMembers: members.filter(m => m.status === 'active').length,
    totalPointsIssued: transactions
      .filter(t => t.type === 'earned' || t.type === 'bonus')
      .reduce((sum, t) => sum + t.points, 0),
    totalPointsRedeemed: Math.abs(transactions
      .filter(t => t.type === 'redeemed')
      .reduce((sum, t) => sum + t.points, 0)),
    averagePointsPerMember: Math.round(
      members.reduce((sum, m) => sum + m.points, 0) / members.length
    ),
    topTiers: [
      { tier: 'Platinum', count: members.filter(m => m.tier === 'platinum').length, percentage: 20 },
      { tier: 'Gold', count: members.filter(m => m.tier === 'gold').length, percentage: 40 },
      { tier: 'Silver', count: members.filter(m => m.tier === 'silver').length, percentage: 20 },
      { tier: 'Bronze', count: members.filter(m => m.tier === 'bronze').length, percentage: 20 }
    ]
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return 'error';
      case 'gold':
        return 'warning';
      case 'silver':
        return 'default';
      case 'bronze':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return <Star sx={{ color: 'error.main' }} />;
      case 'gold':
        return <Star sx={{ color: 'warning.main' }} />;
      case 'silver':
        return <Star sx={{ color: 'default' }} />;
      case 'bronze':
        return <Star sx={{ color: 'secondary.main' }} />;
      default:
        return <Star />;
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

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'earned':
        return 'success';
      case 'redeemed':
        return 'error';
      case 'expired':
        return 'warning';
      case 'bonus':
        return 'info';
      default:
        return 'default';
    }
  };

  const handleViewMember = (member: LoyaltyMember) => {
    setSelectedMember(member);
    setDialogOpen(true);
  };

  const handleTierUpgrade = (memberId: string, newTier: string) => {
    setMembers(prevMembers => 
      prevMembers.map(member => 
        member.id === memberId ? { ...member, tier: newTier as any } : member
      )
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Loyalty Program Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<Download />}>
            Export Report
          </Button>
          <Button variant="contained" startIcon={<Add />}>
            Add Member
          </Button>
        </Box>
      </Box>

      {/* Loyalty Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" component="div">
                    {loyaltySummary.totalMembers}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Members
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <Person />
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
                  <Typography variant="h4" component="div" color="success.main">
                    {loyaltySummary.activeMembers}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Members
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <CheckCircle />
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
                  <Typography variant="h4" component="div" color="info.main">
                    {loyaltySummary.totalPointsIssued.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Points Issued
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <TrendingUp />
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
                  <Typography variant="h4" component="div" color="warning.main">
                    {loyaltySummary.averagePointsPerMember.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg Points/Member
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <Star />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs for different views */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="Members" />
          <Tab label="Transactions" />
          <Tab label="Tier Distribution" />
          <Tab label="Benefits" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Box>
          {/* Search and Filters */}
          <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  placeholder="Search members..."
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
                  <InputLabel>Tier</InputLabel>
                  <Select
                    value={tierFilter}
                    label="Tier"
                    onChange={(e) => setTierFilter(e.target.value)}
                  >
                    <MenuItem value="">All Tiers</MenuItem>
                    <MenuItem value="bronze">Bronze</MenuItem>
                    <MenuItem value="silver">Silver</MenuItem>
                    <MenuItem value="gold">Gold</MenuItem>
                    <MenuItem value="platinum">Platinum</MenuItem>
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

          {/* Members List */}
          <Grid container spacing={3}>
            {filteredMembers.map((member) => (
              <Grid size={{ xs: 12, md: 6 }} key={member.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: `${getTierColor(member.tier)}.main`,
                          width: 56,
                          height: 56
                        }}
                      >
                        {getTierIcon(member.tier)}
                      </Avatar>
                      
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Typography variant="h6" component="h3">
                            {member.name}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Chip 
                              label={member.tier}
                              size="small"
                              color={getTierColor(member.tier) as any}
                              icon={getTierIcon(member.tier)}
                            />
                            <Chip 
                              label={member.status}
                              size="small"
                              color={getStatusColor(member.status) as any}
                            />
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Email sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                          <Typography variant="body2" color="text.secondary">
                            {member.email}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Phone sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                          <Typography variant="body2" color="text.secondary">
                            {member.phone}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                          <Typography variant="body2" color="text.secondary">
                            {member.location}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                          <Typography variant="body2">
                            <strong>Points:</strong> {member.points.toLocaleString()}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Spent:</strong> ${member.totalSpent}
                          </Typography>
                        </Box>

                        {member.nextTierPoints > 0 && (
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="warning.main">
                              {member.nextTierPoints} points to next tier
                            </Typography>
                          </Box>
                        )}

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton 
                              size="small" 
                              color="info"
                              onClick={() => handleViewMember(member)}
                            >
                              <Visibility />
                            </IconButton>
                            <IconButton size="small" color="primary">
                              <Edit />
                            </IconButton>
                            <IconButton size="small" color="error">
                              <Delete />
                            </IconButton>
                          </Box>
                          
                          {member.tier !== 'platinum' && (
                            <Button 
                              size="small" 
                              variant="outlined" 
                              color="success"
                              onClick={() => {
                                const nextTier = member.tier === 'bronze' ? 'silver' : 
                                               member.tier === 'silver' ? 'gold' : 'platinum';
                                handleTierUpgrade(member.id, nextTier);
                              }}
                            >
                              Upgrade
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
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 3 }}>Recent Transactions</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Member</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Points</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Property</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {transaction.memberName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={transaction.type}
                        size="small"
                        color={getTransactionTypeColor(transaction.type) as any}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography 
                        variant="body2" 
                        fontWeight="medium" 
                        color={transaction.points > 0 ? 'success.main' : 'error.main'}
                      >
                        {transaction.points > 0 ? '+' : ''}{transaction.points}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {transaction.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(transaction.date).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {transaction.propertyTitle || 'N/A'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {activeTab === 2 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 3 }}>Tier Distribution</Typography>
          <Grid container spacing={3}>
            {loyaltySummary.topTiers.map((tier) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={tier.tier}>
                <Card>
                  <CardContent>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" component="div" color="primary">
                        {tier.count}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {tier.tier} Members
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {tier.percentage}% of total
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {activeTab === 3 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 3 }}>Loyalty Benefits by Tier</Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardHeader title="Bronze Tier" />
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemText primary="Welcome bonus points" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Basic customer support" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardHeader title="Silver Tier" />
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemText primary="Priority booking" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Enhanced customer support" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Exclusive promotions" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardHeader title="Gold Tier" />
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemText primary="Free room upgrades" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Priority booking" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="VIP customer support" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Early check-in/late checkout" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardHeader title="Platinum Tier" />
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemText primary="All Gold benefits" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Welcome gift on arrival" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Personal concierge" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Exclusive events access" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* View Member Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Member Details</DialogTitle>
        <DialogContent>
          {selectedMember && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Member Information</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Name:</strong> {selectedMember.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Email:</strong> {selectedMember.email}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Phone:</strong> {selectedMember.phone}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Location:</strong> {selectedMember.location}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Loyalty Status</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Tier:</strong> {selectedMember.tier}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Points:</strong> {selectedMember.points.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Total Spent:</strong> ${selectedMember.totalSpent}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Status:</strong> {selectedMember.status}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Benefits</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedMember.benefits.map((benefit, index) => (
                      <Chip key={index} label={benefit} size="small" color="primary" />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
          <Button variant="contained">Edit Member</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
