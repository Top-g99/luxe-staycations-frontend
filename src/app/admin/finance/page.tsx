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
  Tab
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
  TrendingDown,
  AccountBalance,
  Receipt,
  Payment,
  KeyboardReturn,
  Download,
  Print
} from '@mui/icons-material';

interface Transaction {
  id: string;
  type: 'revenue' | 'expense' | 'refund' | 'commission';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  propertyId: string;
  propertyTitle: string;
  guestName: string;
  paymentMethod: string;
  reference: string;
}

interface FinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  pendingAmount: number;
  monthlyGrowth: number;
  topRevenueSources: Array<{
    property: string;
    revenue: number;
    percentage: number;
  }>;
}

export default function AdminFinancePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [dateRange, setDateRange] = useState('30');

  useEffect(() => {
    // Generate mock transaction data
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        type: 'revenue',
        amount: 1250,
        description: 'Booking payment - Luxury Villa Bali',
        date: '2024-08-22',
        status: 'completed',
        propertyId: 'prop1',
        propertyTitle: 'Luxury Villa in Bali',
        guestName: 'John Doe',
        paymentMethod: 'Credit Card',
        reference: 'TXN-001'
      },
      {
        id: '2',
        type: 'revenue',
        amount: 800,
        description: 'Booking payment - Marina Bay Sands',
        date: '2024-08-21',
        status: 'pending',
        propertyId: 'prop2',
        propertyTitle: 'Marina Bay Sands Suite',
        guestName: 'Sarah Smith',
        paymentMethod: 'PayPal',
        reference: 'TXN-002'
      },
      {
        id: '3',
        type: 'expense',
        amount: 150,
        description: 'Cleaning service fee',
        date: '2024-08-20',
        status: 'completed',
        propertyId: 'prop1',
        propertyTitle: 'Luxury Villa in Bali',
        guestName: 'N/A',
        paymentMethod: 'Bank Transfer',
        reference: 'EXP-001'
      },
      {
        id: '4',
        type: 'commission',
        amount: 125,
        description: 'Platform commission (10%)',
        date: '2024-08-22',
        status: 'completed',
        propertyId: 'prop1',
        propertyTitle: 'Luxury Villa in Bali',
        guestName: 'N/A',
        paymentMethod: 'Internal',
        reference: 'COM-001'
      },
      {
        id: '5',
        type: 'refund',
        amount: 600,
        description: 'Cancellation refund - Royal Orchid Suites',
        date: '2024-08-19',
        status: 'completed',
        propertyId: 'prop4',
        propertyTitle: 'Royal Orchid Suites',
        guestName: 'Emily Brown',
        paymentMethod: 'Credit Card',
        reference: 'REF-001'
      }
    ];
    setTransactions(mockTransactions);
  }, []);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.guestName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !typeFilter || transaction.type === typeFilter;
    const matchesStatus = !statusFilter || transaction.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const financialSummary: FinancialSummary = {
    totalRevenue: transactions
      .filter(t => t.type === 'revenue' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0),
    totalExpenses: transactions
      .filter(t => t.type === 'expense' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0),
    netProfit: 0,
    pendingAmount: transactions
      .filter(t => t.status === 'pending')
      .reduce((sum, t) => sum + t.amount, 0),
    monthlyGrowth: 15.5,
    topRevenueSources: [
      { property: 'Luxury Villa in Bali', revenue: 1250, percentage: 40 },
      { property: 'Marina Bay Sands Suite', revenue: 800, percentage: 25 },
      { property: 'Emerald Bay Resort', revenue: 600, percentage: 20 }
    ]
  };

  financialSummary.netProfit = financialSummary.totalRevenue - financialSummary.totalExpenses;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'revenue':
        return 'success';
      case 'expense':
        return 'error';
      case 'refund':
        return 'warning';
      case 'commission':
        return 'info';
      default:
        return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'revenue':
        return <TrendingUp />;
      case 'expense':
        return <TrendingDown />;
      case 'refund':
        return <KeyboardReturn />;
      case 'commission':
        return <AccountBalance />;
      default:
        return <AttachMoney />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleViewTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setDialogOpen(true);
  };

  const handleExportData = () => {
    // TODO: Implement export functionality
    console.log('Exporting financial data...');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Financial Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<Download />}>
            Export Report
          </Button>
          <Button variant="contained" startIcon={<Print />}>
            Print Report
          </Button>
        </Box>
      </Box>

      {/* Financial Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" component="div" color="success.main">
                    ${financialSummary.totalRevenue.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Revenue
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main' }}>
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
                  <Typography variant="h4" component="div" color="error.main">
                    ${financialSummary.totalExpenses.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Expenses
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'error.main' }}>
                  <TrendingDown />
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
                  <Typography variant="h4" component="div" color="primary.main">
                    ${financialSummary.netProfit.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Net Profit
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <AttachMoney />
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
                    ${financialSummary.pendingAmount.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pending Amount
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <Pending />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs for different views */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="Overview" />
          <Tab label="Transactions" />
          <Tab label="Revenue Analysis" />
          <Tab label="Expense Tracking" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Box>
          {/* Monthly Growth */}
          <Card sx={{ mb: 4 }}>
            <CardHeader title="Monthly Growth" />
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6" color="success.main">
                  +{financialSummary.monthlyGrowth}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  compared to last month
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Top Revenue Sources */}
          <Card>
            <CardHeader title="Top Revenue Sources" />
            <CardContent>
              <List>
                {financialSummary.topRevenueSources.map((source, index) => (
                  <Box key={source.property}>
                    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {index + 1}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={source.property}
                        secondary={`$${source.revenue.toLocaleString()} (${source.percentage}%)`}
                      />
                      <Chip 
                        label={`${source.percentage}%`}
                        size="small"
                        color="primary"
                      />
                    </ListItem>
                    {index < financialSummary.topRevenueSources.length - 1 && <Divider variant="inset" component="li" />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          {/* Search and Filters */}
          <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  placeholder="Search transactions..."
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
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={typeFilter}
                    label="Type"
                    onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    <MenuItem value="">All Types</MenuItem>
                    <MenuItem value="revenue">Revenue</MenuItem>
                    <MenuItem value="expense">Expense</MenuItem>
                    <MenuItem value="refund">Refund</MenuItem>
                    <MenuItem value="commission">Commission</MenuItem>
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
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="failed">Failed</MenuItem>
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

          {/* Transactions Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Property</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <Chip 
                        label={transaction.type}
                        size="small"
                        color={getTypeColor(transaction.type) as any}
                        icon={getTypeIcon(transaction.type)}
                      />
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {transaction.description}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Ref: {transaction.reference}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography 
                        variant="body2" 
                        fontWeight="medium" 
                        color={transaction.type === 'revenue' ? 'success.main' : 'error.main'}
                      >
                        ${transaction.amount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(transaction.date).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={transaction.status}
                        size="small"
                        color={getStatusColor(transaction.status) as any}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {transaction.propertyTitle}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton 
                          size="small" 
                          color="info"
                          onClick={() => handleViewTransaction(transaction)}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton size="small" color="primary">
                          <Edit />
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

      {activeTab === 2 && (
        <Card>
          <CardHeader title="Revenue Analysis" />
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              Detailed revenue analysis charts and insights will be displayed here.
            </Typography>
          </CardContent>
        </Card>
      )}

      {activeTab === 3 && (
        <Card>
          <CardHeader title="Expense Tracking" />
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              Expense tracking and budget management tools will be displayed here.
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* View Transaction Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Transaction Details</DialogTitle>
        <DialogContent>
          {selectedTransaction && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Transaction Information</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Type:</strong> {selectedTransaction.type}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Amount:</strong> ${selectedTransaction.amount}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Status:</strong> {selectedTransaction.status}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Reference:</strong> {selectedTransaction.reference}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Property Information</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Property:</strong> {selectedTransaction.propertyTitle}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Guest:</strong> {selectedTransaction.guestName}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Payment Method:</strong> {selectedTransaction.paymentMethod}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Description</Typography>
                  <Typography variant="body2">
                    {selectedTransaction.description}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
          <Button variant="contained">Edit Transaction</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
