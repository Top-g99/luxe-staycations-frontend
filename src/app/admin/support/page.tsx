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
  Switch,
  FormControlLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  Snackbar,
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
  Avatar,
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
  Support,
  Person,
  Email,
  Phone,
  LocationOn,
  Add,
  Download,
  Reply,
  Close,
  PriorityHigh,
  Schedule,
  Done
} from '@mui/icons-material';

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'general' | 'feature_request';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  lastResponse: string;
  responseCount: number;
}

interface SupportSummary {
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  averageResponseTime: string;
  customerSatisfaction: number;
  topCategories: Array<{
    category: string;
    count: number;
    percentage: number;
  }>;
}

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [replyDialog, setReplyDialog] = useState(false);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    // Generate mock support ticket data
    const mockTickets: SupportTicket[] = [
      {
        id: '1',
        title: 'Cannot complete booking payment',
        description: 'I\'m trying to book a villa but the payment keeps failing. I\'ve tried multiple cards.',
        status: 'open',
        priority: 'high',
        category: 'technical',
        customerName: 'John Doe',
        customerEmail: 'john.doe@example.com',
        customerPhone: '+1 (555) 123-4567',
        assignedTo: 'Support Team',
        createdAt: '2024-08-22 10:30',
        updatedAt: '2024-08-22 14:15',
        lastResponse: 'We are investigating this issue. Please try again in a few minutes.',
        responseCount: 2
      },
      {
        id: '2',
        title: 'Refund request for cancelled booking',
        description: 'I had to cancel my trip due to an emergency. Need help with refund process.',
        status: 'in_progress',
        priority: 'medium',
        category: 'billing',
        customerName: 'Sarah Smith',
        customerEmail: 'sarah.smith@example.com',
        customerPhone: '+1 (555) 234-5678',
        assignedTo: 'Billing Team',
        createdAt: '2024-08-21 16:45',
        updatedAt: '2024-08-22 09:20',
        lastResponse: 'We have processed your refund request. It will appear in 3-5 business days.',
        responseCount: 3
      },
      {
        id: '3',
        title: 'Feature request: Mobile app',
        description: 'Would love to see a mobile app for easier booking and management.',
        status: 'open',
        priority: 'low',
        category: 'feature_request',
        customerName: 'Mike Johnson',
        customerEmail: 'mike.johnson@example.com',
        customerPhone: '+1 (555) 345-6789',
        assignedTo: 'Product Team',
        createdAt: '2024-08-20 11:15',
        updatedAt: '2024-08-20 11:15',
        lastResponse: 'Thank you for your suggestion. We\'ll review this for future development.',
        responseCount: 1
      },
      {
        id: '4',
        title: 'Website loading very slowly',
        description: 'The website takes forever to load, especially the property search page.',
        status: 'resolved',
        priority: 'high',
        category: 'technical',
        customerName: 'Emily Brown',
        customerEmail: 'emily.brown@example.com',
        customerPhone: '+1 (555) 456-7890',
        assignedTo: 'Tech Team',
        createdAt: '2024-08-19 14:20',
        updatedAt: '2024-08-21 10:30',
        lastResponse: 'We have optimized the website performance. Please try again.',
        responseCount: 4
      },
      {
        id: '5',
        title: 'Account verification issue',
        description: 'I can\'t verify my email address. The verification link doesn\'t work.',
        status: 'closed',
        priority: 'medium',
        category: 'technical',
        customerName: 'David Wilson',
        customerEmail: 'david.wilson@example.com',
        customerPhone: '+1 (555) 567-8901',
        assignedTo: 'Support Team',
        createdAt: '2024-08-18 09:45',
        updatedAt: '2024-08-20 16:00',
        lastResponse: 'Your account has been verified. You can now access all features.',
        responseCount: 5
      }
    ];
    setTickets(mockTickets);
  }, []);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || ticket.status === statusFilter;
    const matchesPriority = !priorityFilter || ticket.priority === priorityFilter;
    const matchesCategory = !categoryFilter || ticket.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const supportSummary: SupportSummary = {
    totalTickets: tickets.length,
    openTickets: tickets.filter(t => t.status === 'open').length,
    resolvedTickets: tickets.filter(t => t.status === 'resolved').length,
    averageResponseTime: '2.5 hours',
    customerSatisfaction: 4.2,
    topCategories: [
      { category: 'Technical', count: tickets.filter(t => t.category === 'technical').length, percentage: 40 },
      { category: 'Billing', count: tickets.filter(t => t.category === 'billing').length, percentage: 20 },
      { category: 'General', count: tickets.filter(t => t.category === 'general').length, percentage: 20 },
      { category: 'Feature Request', count: tickets.filter(t => t.category === 'feature_request').length, percentage: 20 }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'error';
      case 'in_progress':
        return 'warning';
      case 'resolved':
        return 'success';
      case 'closed':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <Schedule />;
      case 'in_progress':
        return <Pending />;
      case 'resolved':
        return <CheckCircle />;
      case 'closed':
        return <Done />;
      default:
        return <Schedule />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'error';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <PriorityHigh />;
      case 'high':
        return <PriorityHigh />;
      case 'medium':
        return <PriorityHigh />;
      case 'low':
        return <PriorityHigh />;
      default:
        return <PriorityHigh />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical':
        return 'error';
      case 'billing':
        return 'warning';
      case 'general':
        return 'info';
      case 'feature_request':
        return 'success';
      default:
        return 'default';
    }
  };

  const handleViewTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setDialogOpen(true);
  };

  const handleReply = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setReplyDialog(true);
  };

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    setTickets(prevTickets => 
      prevTickets.map(ticket => 
        ticket.id === ticketId ? { ...ticket, status: newStatus as any } : ticket
      )
    );
  };

  const handlePriorityChange = (ticketId: string, newPriority: string) => {
    setTickets(prevTickets => 
      prevTickets.map(ticket => 
        ticket.id === ticketId ? { ...ticket, priority: newPriority as any } : ticket
      )
    );
  };

  const handleSendReply = () => {
    if (selectedTicket && replyText.trim()) {
      // TODO: Implement actual reply functionality
      console.log('Sending reply:', replyText);
      setReplyText('');
      setReplyDialog(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Support Ticket Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<Download />}>
            Export Report
          </Button>
          <Button variant="contained" startIcon={<Add />}>
            Create Ticket
          </Button>
        </Box>
      </Box>

      {/* Support Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" component="div">
                    {supportSummary.totalTickets}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Tickets
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <Support />
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
                  <Typography variant="h4" component="div" color="error.main">
                    {supportSummary.openTickets}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Open Tickets
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'error.main' }}>
                  <Schedule />
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
                    {supportSummary.resolvedTickets}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Resolved
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
                    {supportSummary.averageResponseTime}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg Response Time
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <TrendingUp />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs for different views */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="All Tickets" />
          <Tab label="Open Tickets" />
          <Tab label="Resolved Tickets" />
          <Tab label="Analytics" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Box>
          {/* Search and Filters */}
          <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <TextField
                  fullWidth
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <Search />
                    ),
                  }}
                />
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
                    <MenuItem value="open">Open</MenuItem>
                    <MenuItem value="in_progress">In Progress</MenuItem>
                    <MenuItem value="resolved">Resolved</MenuItem>
                    <MenuItem value="closed">Closed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={priorityFilter}
                    label="Priority"
                    onChange={(e) => setPriorityFilter(e.target.value)}
                  >
                    <MenuItem value="">All Priorities</MenuItem>
                    <MenuItem value="urgent">Urgent</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={categoryFilter}
                    label="Category"
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    <MenuItem value="technical">Technical</MenuItem>
                    <MenuItem value="billing">Billing</MenuItem>
                    <MenuItem value="general">General</MenuItem>
                    <MenuItem value="feature_request">Feature Request</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          {/* Results Count */}
          <Typography variant="body1" sx={{ mb: 3 }}>
            Found {filteredTickets.length} tickets
          </Typography>

          {/* Tickets Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ticket</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Assigned To</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {ticket.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {ticket.description.substring(0, 50)}...
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {ticket.customerName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {ticket.customerEmail}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={ticket.status.replace('_', ' ')}
                        size="small"
                        color={getStatusColor(ticket.status) as any}
                        icon={getStatusIcon(ticket.status)}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={ticket.priority}
                        size="small"
                        color={getPriorityColor(ticket.priority) as any}
                        icon={getPriorityIcon(ticket.priority)}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={ticket.category.replace('_', ' ')}
                        size="small"
                        color={getCategoryColor(ticket.category) as any}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {ticket.assignedTo}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton 
                          size="small" 
                          color="info"
                          onClick={() => handleViewTicket(ticket)}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleReply(ticket)}
                        >
                          <Reply />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <Close />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 3 }}>Open Tickets</Typography>
          <Grid container spacing={3}>
            {tickets.filter(t => t.status === 'open').map((ticket) => (
              <Grid size={{ xs: 12, md: 6 }} key={ticket.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" component="h3">
                        {ticket.title}
                      </Typography>
                      <Chip 
                        label={ticket.priority}
                        size="small"
                        color={getPriorityColor(ticket.priority) as any}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {ticket.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption">
                        {ticket.customerName} • {new Date(ticket.createdAt).toLocaleDateString()}
                      </Typography>
                      <Button size="small" variant="outlined" onClick={() => handleReply(ticket)}>
                        Reply
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {activeTab === 2 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 3 }}>Resolved Tickets</Typography>
          <Grid container spacing={3}>
            {tickets.filter(t => t.status === 'resolved').map((ticket) => (
              <Grid size={{ xs: 12, md: 6 }} key={ticket.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" component="h3">
                        {ticket.title}
                      </Typography>
                      <Chip 
                        label="Resolved"
                        size="small"
                        color="success"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {ticket.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption">
                        {ticket.customerName} • Resolved {new Date(ticket.updatedAt).toLocaleDateString()}
                      </Typography>
                      <Button size="small" variant="outlined" onClick={() => handleViewTicket(ticket)}>
                        View Details
                      </Button>
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
          <Typography variant="h6" sx={{ mb: 3 }}>Support Analytics</Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardHeader title="Ticket Categories" />
                <CardContent>
                  <List>
                    {supportSummary.topCategories.map((category) => (
                      <Box key={category.category}>
                        <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                          <ListItemText
                            primary={category.category}
                            secondary={`${category.count} tickets (${category.percentage}%)`}
                          />
                          <Chip 
                            label={category.count}
                            size="small"
                            color="primary"
                          />
                        </ListItem>
                        {category.category !== supportSummary.topCategories[supportSummary.topCategories.length - 1].category && <Divider variant="inset" component="li" />}
                      </Box>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardHeader title="Performance Metrics" />
                <CardContent>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary" sx={{ mb: 1 }}>
                      {supportSummary.customerSatisfaction}/5
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Customer Satisfaction
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          sx={{ 
                            color: star <= supportSummary.customerSatisfaction ? 'warning.main' : 'grey.300',
                            fontSize: 24 
                          }} 
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* View Ticket Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Ticket Details</DialogTitle>
        <DialogContent>
          {selectedTicket && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Ticket Information</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Title:</strong> {selectedTicket.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Status:</strong> {selectedTicket.status}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Priority:</strong> {selectedTicket.priority}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Category:</strong> {selectedTicket.category}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Assigned To:</strong> {selectedTicket.assignedTo}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Customer Information</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Name:</strong> {selectedTicket.customerName}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Email:</strong> {selectedTicket.customerEmail}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Phone:</strong> {selectedTicket.customerPhone}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Description</Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedTicket.description}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 2 }}>Last Response</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {selectedTicket.lastResponse}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {selectedTicket.responseCount} responses • Last updated: {new Date(selectedTicket.updatedAt).toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
          <Button variant="contained" onClick={() => selectedTicket && handleReply(selectedTicket)}>
            Reply
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={replyDialog} onClose={() => setReplyDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Reply to Ticket</DialogTitle>
        <DialogContent>
          {selectedTicket && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Replying to: {selectedTicket.title}
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                placeholder="Type your response here..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReplyDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSendReply}>
            Send Reply
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
