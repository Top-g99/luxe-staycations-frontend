"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
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
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Badge,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridToolbar,
} from '@mui/x-data-grid';
import {
  Support as SupportIcon,
  PriorityHigh as PriorityHighIcon,
  CheckCircle as ResolveIcon,
  Reply as ReplyIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Close as CloseIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';

// Mock data - replace with actual API calls
const mockTickets = [
  {
    id: '1',
    ticketId: 'TKT-2024-001',
    title: 'Booking modification request',
    description: 'I need to change my booking dates from April 15-20 to April 18-25',
    user: 'John Doe',
    userEmail: 'john.doe@example.com',
    status: 'OPEN',
    priority: 'MEDIUM',
    category: 'Booking',
    assignedTo: 'Support Team',
    createdAt: '2024-03-15 10:30',
    updatedAt: '2024-03-15 10:30',
    lastResponse: null,
  },
  {
    id: '2',
    ticketId: 'TKT-2024-002',
    title: 'Payment issue - transaction failed',
    description: 'I tried to pay for my booking but the payment keeps failing. Error code: PAY-001',
    user: 'Jane Smith',
    userEmail: 'jane.smith@example.com',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    category: 'Payment',
    assignedTo: 'Finance Team',
    createdAt: '2024-03-14 15:45',
    updatedAt: '2024-03-15 09:20',
    lastResponse: 'We are investigating the payment issue. Please try again in 30 minutes.',
  },
  {
    id: '3',
    ticketId: 'TKT-2024-003',
    title: 'Property listing verification',
    description: 'I submitted my villa for verification 3 days ago but haven\'t heard back',
    user: 'Mike Wilson',
    userEmail: 'mike.wilson@example.com',
    status: 'RESOLVED',
    priority: 'LOW',
    category: 'Host',
    assignedTo: 'Admin Team',
    createdAt: '2024-03-12 11:15',
    updatedAt: '2024-03-14 16:30',
    lastResponse: 'Your property has been verified and is now live on our platform.',
  },
  {
    id: '4',
    ticketId: 'TKT-2024-004',
    title: 'Refund request - cancelled booking',
    description: 'I cancelled my booking due to emergency. Need refund processed ASAP',
    user: 'Sarah Johnson',
    userEmail: 'sarah.johnson@example.com',
    status: 'OPEN',
    priority: 'URGENT',
    category: 'Refund',
    assignedTo: 'Finance Team',
    createdAt: '2024-03-15 08:00',
    updatedAt: '2024-03-15 08:00',
    lastResponse: null,
  },
];

const TicketDetailDialog = ({ open, onClose, ticket }: any) => {
  const [reply, setReply] = useState('');
  const [status, setStatus] = useState(ticket?.status || 'OPEN');
  const [priority, setPriority] = useState(ticket?.priority || 'MEDIUM');

  const handleReply = () => {
    // Handle reply logic
    console.log('Sending reply:', reply);
    onClose();
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    // Update ticket status logic
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'error';
      case 'HIGH': return 'warning';
      case 'MEDIUM': return 'info';
      case 'LOW': return 'default';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'error';
      case 'IN_PROGRESS': return 'warning';
      case 'RESOLVED': return 'success';
      case 'CLOSED': return 'default';
      default: return 'default';
    }
  };

  if (!ticket) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6">Support Ticket</Typography>
          <Chip label={ticket.ticketId} color="primary" />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          {/* Ticket Information */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {ticket.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {ticket.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Chip
                    label={ticket.priority}
                    color={getPriorityColor(ticket.priority) as any}
                    size="small"
                  />
                  <Chip
                    label={ticket.status}
                    color={getStatusColor(ticket.status) as any}
                    size="small"
                  />
                  <Chip
                    label={ticket.category}
                    variant="outlined"
                    size="small"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* User Information */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  User Information
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>{ticket.user[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={ticket.user}
                      secondary={ticket.userEmail}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Ticket Details */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Ticket Details
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Assigned To"
                      secondary={ticket.assignedTo}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Created"
                      secondary={ticket.createdAt}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Last Updated"
                      secondary={ticket.updatedAt}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Status Management */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Update Ticket
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={status}
                        label="Status"
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <MenuItem value="OPEN">Open</MenuItem>
                        <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                        <MenuItem value="RESOLVED">Resolved</MenuItem>
                        <MenuItem value="CLOSED">Closed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Priority</InputLabel>
                      <Select
                        value={priority}
                        label="Priority"
                        onChange={(e) => setPriority(e.target.value)}
                      >
                        <MenuItem value="URGENT">Urgent</MenuItem>
                        <MenuItem value="HIGH">High</MenuItem>
                        <MenuItem value="MEDIUM">Medium</MenuItem>
                        <MenuItem value="LOW">Low</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Reply Section */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Add Response
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Your response"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type your response to the user..."
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Previous Responses */}
          {ticket.lastResponse && (
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Last Response
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {ticket.lastResponse}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleReply} variant="contained" disabled={!reply.trim()}>
          Send Response
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default function SupportPage() {
  const [tickets, setTickets] = useState(mockTickets);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    category: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info',
  });

  const handleViewTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    setOpenDetail(true);
  };

  const handleResolveTicket = (id: string) => {
    setTickets(prev => 
      prev.map(t => t.id === id ? { ...t, status: 'RESOLVED' } : t)
    );
    setSnackbar({
      open: true,
      message: 'Ticket resolved successfully',
      severity: 'success',
    });
  };

  const handleCloseTicket = (id: string) => {
    setTickets(prev => 
      prev.map(t => t.id === id ? { ...t, status: 'CLOSED' } : t)
    );
    setSnackbar({
      open: true,
      message: 'Ticket closed successfully',
      severity: 'info',
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'error';
      case 'HIGH': return 'warning';
      case 'MEDIUM': return 'info';
      case 'LOW': return 'default';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'error';
      case 'IN_PROGRESS': return 'warning';
      case 'RESOLVED': return 'success';
      case 'CLOSED': return 'default';
      default: return 'default';
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'ticketId',
      headerName: 'Ticket ID',
      width: 150,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'primary.main' }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 250,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            {params.value}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {params.row.category}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'user',
      headerName: 'User',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
            {params.value[0]}
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              {params.value}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {params.row.userEmail}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getPriorityColor(params.value) as any}
          size="small"
          icon={params.value === 'URGENT' || params.value === 'HIGH' ? <PriorityHighIcon /> : undefined}
        />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value.replace('_', ' ')}
          color={getStatusColor(params.value) as any}
          size="small"
        />
      ),
    },
    {
      field: 'assignedTo',
      headerName: 'Assigned To',
      width: 150,
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      width: 150,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 200,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ViewIcon />}
          label="View Details"
          onClick={() => handleViewTicket(params.row)}
        />,
        <GridActionsCellItem
          icon={<ReplyIcon />}
          label="Reply"
          onClick={() => handleViewTicket(params.row)}
        />,
        <GridActionsCellItem
          icon={<ResolveIcon />}
          label="Resolve"
          onClick={() => handleResolveTicket(params.id as string)}
          disabled={params.row.status === 'RESOLVED' || params.row.status === 'CLOSED'}
        />,
        <GridActionsCellItem
          icon={<CloseIcon />}
          label="Close"
          onClick={() => handleCloseTicket(params.id as string)}
          disabled={params.row.status === 'CLOSED'}
        />,
      ],
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Support Management
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Manage customer support tickets and provide timely assistance.
        </Typography>
      </Box>

      {/* Support Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                Open Tickets
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                {tickets.filter(t => t.status === 'OPEN').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                In Progress
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                {tickets.filter(t => t.status === 'IN_PROGRESS').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                Resolved Today
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                {tickets.filter(t => t.status === 'RESOLVED').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                Average Response Time
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'info.main' }}>
                2.5h
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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
                  <MenuItem value="OPEN">Open</MenuItem>
                  <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                  <MenuItem value="RESOLVED">Resolved</MenuItem>
                  <MenuItem value="CLOSED">Closed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Priority</InputLabel>
                <Select
                  value={filters.priority}
                  label="Priority"
                  onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="URGENT">Urgent</MenuItem>
                  <MenuItem value="HIGH">High</MenuItem>
                  <MenuItem value="MEDIUM">Medium</MenuItem>
                  <MenuItem value="LOW">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  value={filters.category}
                  label="Category"
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Booking">Booking</MenuItem>
                  <MenuItem value="Payment">Payment</MenuItem>
                  <MenuItem value="Host">Host</MenuItem>
                  <MenuItem value="Refund">Refund</MenuItem>
                  <MenuItem value="Technical">Technical</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setFilters({ status: '', priority: '', category: '' })}
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tickets Data Grid */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <DataGrid
            rows={tickets}
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

      {/* Ticket Detail Dialog */}
      <TicketDetailDialog
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        ticket={selectedTicket}
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
