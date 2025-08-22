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
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
  AccountBalance,
  Receipt,
  Payment,
  Calculate,
  Download,
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
  TaxiAlert,
  ReceiptLong,
  AccountBalanceWallet,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock data for advanced financial management
const mockTransactions = [
  {
    id: 1,
    bookingId: "BK001",
    guestName: "John Doe",
    propertyName: "Luxury Beach Villa",
    hostName: "John Smith",
    amount: 15000,
    commission: 2250,
    gstAmount: 2700,
    tdsAmount: 1500,
    finalPayout: 8550,
    status: "PAID",
    paymentDate: "2024-01-15",
    gstin: "22AAAAA0000A1Z5",
    panNumber: "ABCDE1234F",
  },
  {
    id: 2,
    bookingId: "BK002",
    guestName: "Sarah Johnson",
    propertyName: "Mountain Retreat",
    hostName: "Sarah Johnson",
    amount: 12000,
    commission: 1200,
    gstAmount: 2160,
    tdsAmount: 1200,
    finalPayout: 7440,
    status: "PENDING",
    paymentDate: "2024-01-16",
    gstin: "33BBBBB0000B2Z6",
    panNumber: "FGHIJ5678K",
  },
  {
    id: 3,
    bookingId: "BK003",
    guestName: "Rajesh Kumar",
    propertyName: "Heritage Palace Suite",
    hostName: "Rajesh Kumar",
    amount: 25000,
    commission: 3000,
    gstAmount: 4500,
    tdsAmount: 2500,
    finalPayout: 15000,
    status: "PAID",
    paymentDate: "2024-01-17",
    gstin: "08CCCCC0000C3Z7",
    panNumber: "LMNOP9012Q",
  },
];

const mockPayouts = [
  {
    id: 1,
    hostName: "John Smith",
    gstin: "22AAAAA0000A1Z5",
    panNumber: "ABCDE1234F",
    totalEarnings: 675000,
    totalCommission: 101250,
    totalGST: 121500,
    totalTDS: 67500,
    finalPayout: 384750,
    status: "PROCESSED",
    processedDate: "2024-01-20",
    bankDetails: "HDFC Bank - 1234567890",
  },
  {
    id: 2,
    hostName: "Sarah Johnson",
    gstin: "33BBBBB0000B2Z6",
    panNumber: "FGHIJ5678K",
    totalEarnings: 384000,
    totalCommission: 38400,
    totalGST: 69120,
    totalTDS: 38400,
    finalPayout: 238080,
    status: "PENDING",
    processedDate: null,
    bankDetails: "ICICI Bank - 0987654321",
  },
];

const mockFinancialMetrics = {
  totalRevenue: 1875000,
  totalCommission: 140850,
  totalGST: 169020,
  totalTDS: 94050,
  totalPayouts: 622830,
  pendingPayouts: 238080,
  gstRate: 18,
  tdsRate: 10,
  averageCommission: 15.2,
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function AdvancedFinancePage() {
  const [tabValue, setTabValue] = useState(0);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [payouts, setPayouts] = useState(mockPayouts);
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [payoutDialog, setPayoutDialog] = useState(false);
  const [gstDialog, setGstDialog] = useState(false);
  const [tdsDialog, setTdsDialog] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handlePayoutProcess = (payout: any) => {
    setSelectedPayout(payout);
    setPayoutDialog(true);
  };

  const processPayout = () => {
    if (selectedPayout) {
      setPayouts(payouts.map(p => 
        p.id === selectedPayout.id 
          ? { ...p, status: 'PROCESSED', processedDate: new Date().toISOString().split('T')[0] }
          : p
      ));
    }
    setPayoutDialog(false);
  };

  const transactionColumns: GridColDef[] = [
    {
      field: 'bookingId',
      headerName: 'Booking ID',
      width: 120,
    },
    {
      field: 'guestName',
      headerName: 'Guest',
      width: 150,
    },
    {
      field: 'propertyName',
      headerName: 'Property',
      width: 200,
    },
    {
      field: 'hostName',
      headerName: 'Host',
      width: 150,
    },
    {
      field: 'amount',
      headerName: 'Total Amount',
      width: 130,
      renderCell: (params) => `₹${params.value.toLocaleString()}`,
    },
    {
      field: 'commission',
      headerName: 'Commission',
      width: 120,
      renderCell: (params) => `₹${params.value.toLocaleString()}`,
    },
    {
      field: 'gstAmount',
      headerName: 'GST',
      width: 100,
      renderCell: (params) => `₹${params.value.toLocaleString()}`,
    },
    {
      field: 'tdsAmount',
      headerName: 'TDS',
      width: 100,
      renderCell: (params) => `₹${params.value.toLocaleString()}`,
    },
    {
      field: 'finalPayout',
      headerName: 'Final Payout',
      width: 130,
      renderCell: (params) => `₹${params.value.toLocaleString()}`,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'PAID' ? 'success' : 'warning'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Visibility />}
          label="View Details"
          onClick={() => {}}
        />,
        <GridActionsCellItem
          icon={<Download />}
          label="Download Invoice"
          onClick={() => {}}
        />,
      ],
    },
  ];

  const payoutColumns: GridColDef[] = [
    {
      field: 'hostName',
      headerName: 'Host Name',
      width: 150,
    },
    {
      field: 'gstin',
      headerName: 'GSTIN',
      width: 150,
    },
    {
      field: 'panNumber',
      headerName: 'PAN',
      width: 120,
    },
    {
      field: 'totalEarnings',
      headerName: 'Total Earnings',
      width: 140,
      renderCell: (params) => `₹${params.value.toLocaleString()}`,
    },
    {
      field: 'totalCommission',
      headerName: 'Commission',
      width: 120,
      renderCell: (params) => `₹${params.value.toLocaleString()}`,
    },
    {
      field: 'totalGST',
      headerName: 'GST',
      width: 100,
      renderCell: (params) => `₹${params.value.toLocaleString()}`,
    },
    {
      field: 'totalTDS',
      headerName: 'TDS',
      width: 100,
      renderCell: (params) => `₹${params.value.toLocaleString()}`,
    },
    {
      field: 'finalPayout',
      headerName: 'Final Payout',
      width: 130,
      renderCell: (params) => `₹${params.value.toLocaleString()}`,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'PROCESSED' ? 'success' : 'warning'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Payment />}
          label="Process Payout"
          onClick={() => handlePayoutProcess(params.row)}
          disabled={params.row.status === 'PROCESSED'}
        />,
        <GridActionsCellItem
          icon={<Download />}
          label="Download TDS Certificate"
          onClick={() => {}}
        />,
      ],
    },
  ];

  const chartData = [
    { name: 'Revenue', value: mockFinancialMetrics.totalRevenue, color: '#0088FE' },
    { name: 'Commission', value: mockFinancialMetrics.totalCommission, color: '#00C49F' },
    { name: 'GST', value: mockFinancialMetrics.totalGST, color: '#FFBB28' },
    { name: 'TDS', value: mockFinancialMetrics.totalTDS, color: '#FF8042' },
    { name: 'Payouts', value: mockFinancialMetrics.totalPayouts, color: '#8884D8' },
  ];

  const monthlyData = [
    { month: 'Jan', revenue: 450000, commission: 67500, payouts: 285000 },
    { month: 'Feb', revenue: 520000, commission: 78000, payouts: 330000 },
    { month: 'Mar', revenue: 480000, commission: 72000, payouts: 305000 },
    { month: 'Apr', revenue: 600000, commission: 90000, payouts: 380000 },
    { month: 'May', revenue: 550000, commission: 82500, payouts: 350000 },
    { month: 'Jun', revenue: 620000, commission: 93000, payouts: 395000 },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Advanced Financial Engine
      </Typography>

      {/* Financial Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Revenue
              </Typography>
              <Typography variant="h4" color="primary.main">
                ₹{(mockFinancialMetrics.totalRevenue / 100000).toFixed(1)}L
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Commission
              </Typography>
              <Typography variant="h4" color="success.main">
                ₹{(mockFinancialMetrics.totalCommission / 1000).toFixed(0)}K
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total GST
              </Typography>
              <Typography variant="h4" color="warning.main">
                ₹{(mockFinancialMetrics.totalGST / 1000).toFixed(0)}K
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total TDS
              </Typography>
              <Typography variant="h4" color="error.main">
                ₹{(mockFinancialMetrics.totalTDS / 1000).toFixed(0)}K
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Payouts
              </Typography>
              <Typography variant="h4" color="secondary.main">
                ₹{(mockFinancialMetrics.totalPayouts / 1000).toFixed(0)}K
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending Payouts
              </Typography>
              <Typography variant="h4" color="warning.main">
                ₹{(mockFinancialMetrics.pendingPayouts / 1000).toFixed(0)}K
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Financial Breakdown
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monthly Trends
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue" />
                  <Line type="monotone" dataKey="commission" stroke="#82ca9d" name="Commission" />
                  <Line type="monotone" dataKey="payouts" stroke="#ffc658" name="Payouts" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs for different sections */}
      <Card>
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Transactions" />
              <Tab label="Payouts" />
              <Tab label="GST Management" />
              <Tab label="TDS Management" />
            </Tabs>
          </Box>

          {/* Transactions Tab */}
          {tabValue === 0 && (
            <Box sx={{ height: 500 }}>
              <DataGrid
                rows={transactions}
                columns={transactionColumns}
                pageSize={10}
                rowsPerPageOptions={[10, 25, 50]}
                checkboxSelection
                disableSelectionOnClick
                components={{
                  Toolbar: GridToolbar,
                }}
              />
            </Box>
          )}

          {/* Payouts Tab */}
          {tabValue === 1 && (
            <Box sx={{ height: 500 }}>
              <DataGrid
                rows={payouts}
                columns={payoutColumns}
                pageSize={10}
                rowsPerPageOptions={[10, 25, 50]}
                checkboxSelection
                disableSelectionOnClick
                components={{
                  Toolbar: GridToolbar,
                }}
              />
            </Box>
          )}

          {/* GST Management Tab */}
          {tabValue === 2 && (
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        GST Configuration
                      </Typography>
                      <TextField
                        fullWidth
                        label="Platform GST Rate (%)"
                        type="number"
                        defaultValue={mockFinancialMetrics.gstRate}
                        sx={{ mb: 2 }}
                      />
                      <Button variant="contained" onClick={() => setGstDialog(true)}>
                        Generate GST Report
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        GST Summary
                      </Typography>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Month</TableCell>
                              <TableCell align="right">GST Collected</TableCell>
                              <TableCell align="right">GST Paid</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>January 2024</TableCell>
                              <TableCell align="right">₹45,000</TableCell>
                              <TableCell align="right">₹42,000</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>February 2024</TableCell>
                              <TableCell align="right">₹52,000</TableCell>
                              <TableCell align="right">₹48,000</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* TDS Management Tab */}
          {tabValue === 3 && (
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        TDS Configuration
                      </Typography>
                      <TextField
                        fullWidth
                        label="TDS Rate (%)"
                        type="number"
                        defaultValue={mockFinancialMetrics.tdsRate}
                        sx={{ mb: 2 }}
                      />
                      <Button variant="contained" onClick={() => setTdsDialog(true)}>
                        Generate TDS Report
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        TDS Summary
                      </Typography>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Quarter</TableCell>
                              <TableCell align="right">TDS Deducted</TableCell>
                              <TableCell align="right">TDS Deposited</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>Q1 2024</TableCell>
                              <TableCell align="right">₹25,000</TableCell>
                              <TableCell align="right">₹25,000</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Q2 2024</TableCell>
                              <TableCell align="right">₹30,000</TableCell>
                              <TableCell align="right">₹28,000</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Payout Processing Dialog */}
      <Dialog open={payoutDialog} onClose={() => setPayoutDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Process Payout</DialogTitle>
        <DialogContent>
          {selectedPayout && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  {selectedPayout.hostName}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  GSTIN: {selectedPayout.gstin}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  PAN: {selectedPayout.panNumber}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Total Earnings:</Typography>
                <Typography variant="h6">₹{selectedPayout.totalEarnings.toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Commission:</Typography>
                <Typography variant="h6" color="error.main">
                  -₹{selectedPayout.totalCommission.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">GST:</Typography>
                <Typography variant="h6" color="warning.main">
                  -₹{selectedPayout.totalGST.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">TDS:</Typography>
                <Typography variant="h6" color="error.main">
                  -₹{selectedPayout.totalTDS.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" color="success.main">
                  Final Payout: ₹{selectedPayout.finalPayout.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Bank Details: {selectedPayout.bankDetails}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPayoutDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={processPayout}>
            Process Payout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
