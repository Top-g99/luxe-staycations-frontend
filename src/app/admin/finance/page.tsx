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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridToolbar,
} from '@mui/x-data-grid';
import {
  AttachMoney as MoneyIcon,
  AccountBalance as BankIcon,
  Receipt as ReceiptIcon,
  Download as DownloadIcon,
  CheckCircle as ProcessIcon,
  Visibility as ViewIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Mock data - replace with actual API calls
const mockTransactions = [
  {
    id: '1',
    date: '2024-03-15',
    type: 'BOOKING_PAYMENT',
    guestHost: 'John Doe',
    amount: 1250,
    status: 'PAID',
    bookingId: 'BK-2024-001',
    description: 'Payment for Villa Azure booking',
  },
  {
    id: '2',
    date: '2024-03-14',
    type: 'HOST_PAYOUT',
    guestHost: 'Mike Wilson',
    amount: 850,
    status: 'PENDING',
    bookingId: 'BK-2024-002',
    description: 'Payout for Villa Azure booking',
  },
  {
    id: '3',
    date: '2024-03-13',
    type: 'SERVICE_FEE',
    guestHost: 'Platform',
    amount: 125,
    status: 'PAID',
    bookingId: 'BK-2024-001',
    description: 'Service fee for Villa Azure booking',
  },
  {
    id: '4',
    date: '2024-03-12',
    type: 'REFUND',
    guestHost: 'Jane Smith',
    amount: -500,
    status: 'PAID',
    bookingId: 'BK-2024-003',
    description: 'Refund for cancelled booking',
  },
];

const mockPayouts = [
  {
    id: '1',
    hostName: 'Mike Wilson',
    hostEmail: 'mike.wilson@example.com',
    amount: 850,
    status: 'PENDING',
    requestDate: '2024-03-14',
    processedDate: null,
    transactionId: null,
  },
  {
    id: '2',
    hostName: 'Sarah Johnson',
    hostEmail: 'sarah.johnson@example.com',
    amount: 1200,
    status: 'PROCESSED',
    requestDate: '2024-03-10',
    processedDate: '2024-03-12',
    transactionId: 'TXN-2024-001',
  },
  {
    id: '3',
    hostName: 'David Brown',
    hostEmail: 'david.brown@example.com',
    amount: 650,
    status: 'PENDING',
    requestDate: '2024-03-13',
    processedDate: null,
    transactionId: null,
  },
];

const revenueData = [
  { month: 'Jan', revenue: 45000, expenses: 12000, profit: 33000 },
  { month: 'Feb', revenue: 52000, expenses: 15000, profit: 37000 },
  { month: 'Mar', revenue: 48000, expenses: 13000, profit: 35000 },
  { month: 'Apr', revenue: 61000, expenses: 18000, profit: 43000 },
  { month: 'May', revenue: 55000, expenses: 16000, profit: 39000 },
  { month: 'Jun', revenue: 67000, expenses: 20000, profit: 47000 },
];

const transactionTypeData = [
  { name: 'Booking Payments', value: 65, color: '#4caf50' },
  { name: 'Host Payouts', value: 20, color: '#2196f3' },
  { name: 'Service Fees', value: 10, color: '#ff9800' },
  { name: 'Refunds', value: 5, color: '#f44336' },
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
      id={`finance-tabpanel-${index}`}
      aria-labelledby={`finance-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const PayoutDialog = ({ open, onClose, payout, onProcess }: any) => {
  const [transactionId, setTransactionId] = useState('');

  const handleProcess = () => {
    onProcess(payout.id, transactionId);
    setTransactionId('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Process Payout</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Host: {payout?.hostName}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Amount: ${payout?.amount}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Transaction ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Enter bank transfer or payment reference"
                required
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleProcess} variant="contained" disabled={!transactionId}>
          Mark as Processed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default function FinancePage() {
  const [tabValue, setTabValue] = useState(0);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [payouts, setPayouts] = useState(mockPayouts);
  const [openPayoutDialog, setOpenPayoutDialog] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    dateRange: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleProcessPayout = (payoutId: string, transactionId: string) => {
    setPayouts(prev => 
      prev.map(p => p.id === payoutId ? {
        ...p,
        status: 'PROCESSED',
        processedDate: new Date().toISOString().split('T')[0],
        transactionId,
      } : p)
    );
    setSnackbar({
      open: true,
      message: 'Payout processed successfully',
      severity: 'success',
    });
  };

  const handleGenerateReport = (type: string) => {
    // Mock report generation
    setSnackbar({
      open: true,
      message: `${type} report generated and downloaded`,
      severity: 'info',
    });
  };

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'BOOKING_PAYMENT': return 'success';
      case 'HOST_PAYOUT': return 'info';
      case 'SERVICE_FEE': return 'warning';
      case 'REFUND': return 'error';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID': return 'success';
      case 'PENDING': return 'warning';
      case 'PROCESSED': return 'success';
      case 'FAILED': return 'error';
      default: return 'default';
    }
  };

  const transactionColumns: GridColDef[] = [
    {
      field: 'date',
      headerName: 'Date',
      width: 120,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value.replace('_', ' ')}
          color={getTransactionTypeColor(params.value) as any}
          size="small"
        />
      ),
    },
    {
      field: 'guestHost',
      headerName: 'Guest/Host',
      width: 150,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 120,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 'medium',
            color: params.value >= 0 ? 'success.main' : 'error.main',
          }}
        >
          ${Math.abs(params.value)}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value) as any}
          size="small"
        />
      ),
    },
    {
      field: 'bookingId',
      headerName: 'Booking ID',
      width: 150,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 200,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ViewIcon />}
          label="View Details"
          onClick={() => console.log('View transaction', params.id)}
        />,
      ],
    },
  ];

  const payoutColumns: GridColDef[] = [
    {
      field: 'hostName',
      headerName: 'Host',
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
    {
      field: 'hostEmail',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
          ${params.value}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value) as any}
          size="small"
        />
      ),
    },
    {
      field: 'requestDate',
      headerName: 'Request Date',
      width: 150,
    },
    {
      field: 'processedDate',
      headerName: 'Processed Date',
      width: 150,
    },
    {
      field: 'transactionId',
      headerName: 'Transaction ID',
      width: 150,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ProcessIcon />}
          label="Process Payout"
          onClick={() => {
            setSelectedPayout(params.row);
            setOpenPayoutDialog(true);
          }}
          disabled={params.row.status === 'PROCESSED'}
        />,
        <GridActionsCellItem
          icon={<ViewIcon />}
          label="View Details"
          onClick={() => console.log('View payout', params.id)}
        />,
      ],
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Finance Center
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Manage transactions, process payouts, and generate financial reports.
        </Typography>
      </Box>

      {/* Financial Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                Total Revenue (MTD)
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                $67,000
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                <TrendingUpIcon sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" color="success.main">
                  +12.5%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                Total Expenses (MTD)
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                $20,000
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                <TrendingDownIcon sx={{ color: 'error.main', fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" color="error.main">
                  -5.2%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                Net Profit (MTD)
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'info.main' }}>
                $47,000
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                <TrendingUpIcon sx={{ color: 'info.main', fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" color="info.main">
                  +18.3%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                Pending Payouts
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                $2,700
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {payouts.filter(p => p.status === 'PENDING').length} hosts
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="finance tabs">
              <Tab label="Transactions" />
              <Tab label="Payouts" />
              <Tab label="Reports" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            {/* Transaction Filters */}
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Transaction Type</InputLabel>
                    <Select
                      value={filters.type}
                      label="Transaction Type"
                      onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="BOOKING_PAYMENT">Booking Payment</MenuItem>
                      <MenuItem value="HOST_PAYOUT">Host Payout</MenuItem>
                      <MenuItem value="SERVICE_FEE">Service Fee</MenuItem>
                      <MenuItem value="REFUND">Refund</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={filters.status}
                      label="Status"
                      onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="PAID">Paid</MenuItem>
                      <MenuItem value="PENDING">Pending</MenuItem>
                      <MenuItem value="FAILED">Failed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Date Range"
                    placeholder="MM/DD/YYYY - MM/DD/YYYY"
                    value={filters.dateRange}
                    onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => setFilters({ type: '', status: '', dateRange: '' })}
                  >
                    Clear Filters
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <DataGrid
              rows={transactions}
              columns={transactionColumns}
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
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6" gutterBottom>
                Host Payouts Management
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Process pending payouts and track payment status.
              </Typography>
            </Box>
            <DataGrid
              rows={payouts}
              columns={payoutColumns}
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
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Financial Reports
              </Typography>
              
              {/* Revenue Chart */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={8}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Revenue vs Expenses (Last 6 Months)
                      </Typography>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                          <Bar dataKey="revenue" fill="#4caf50" name="Revenue" />
                          <Bar dataKey="expenses" fill="#f44336" name="Expenses" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Transaction Types
                      </Typography>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={transactionTypeData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {transactionTypeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Report Generation Buttons */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    onClick={() => handleGenerateReport('Revenue')}
                  >
                    Revenue Report
                  </Button>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    onClick={() => handleGenerateReport('Host Payout')}
                  >
                    Payout Report
                  </Button>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    onClick={() => handleGenerateReport('Occupancy')}
                  >
                    Occupancy Report
                  </Button>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    onClick={() => handleGenerateReport('Tax')}
                  >
                    Tax Report
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
        </CardContent>
      </Card>

      {/* Payout Dialog */}
      <PayoutDialog
        open={openPayoutDialog}
        onClose={() => setOpenPayoutDialog(false)}
        payout={selectedPayout}
        onProcess={handleProcessPayout}
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
