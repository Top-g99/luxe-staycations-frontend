"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  Snackbar,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Payment as PaymentIcon,
  Email as EmailIcon,
  Article as ArticleIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

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
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const EmailTemplateDialog = ({ open, onClose, template, onSave }: any) => {
  const [formData, setFormData] = useState({
    name: template?.name || '',
    subject: template?.subject || '',
    body: template?.body || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {template ? 'Edit Email Template' : 'Add Email Template'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Template Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Body"
                multiline
                rows={10}
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                required
                helperText="Use {{variable}} syntax for dynamic content"
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {template ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ContentDialog = ({ open, onClose, content, onSave }: any) => {
  const [formData, setFormData] = useState({
    title: content?.title || '',
    slug: content?.slug || '',
    content: content?.content || '',
    metaDescription: content?.metaDescription || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {content ? 'Edit Content' : 'Add Content'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Page Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="URL Slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
                helperText="e.g., about-us, terms-of-service"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Meta Description"
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Page Content"
                multiline
                rows={15}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                helperText="Use HTML tags for formatting"
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {content ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default function SettingsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [siteSettings, setSiteSettings] = useState({
    siteTitle: 'Luxe Staycations',
    siteDescription: 'Luxury villa rentals worldwide',
    contactEmail: 'contact@luxestaycations.com',
    supportPhone: '+1-555-0123',
    supportEmail: 'support@luxestaycations.com',
    address: '123 Luxury Lane, Beverly Hills, CA 90210',
    timezone: 'America/Los_Angeles',
    currency: 'USD',
    language: 'en',
    maintenanceMode: false,
  });

  const [paymentSettings, setPaymentSettings] = useState({
    stripePublishableKey: 'pk_test_...',
    stripeSecretKey: 'sk_test_...',
    razorpayKeyId: 'rzp_test_...',
    razorpayKeySecret: '...',
    commissionPercentage: 15,
    autoPayoutEnabled: true,
    payoutSchedule: 'weekly',
  });

  const [emailTemplates, setEmailTemplates] = useState([
    {
      id: '1',
      name: 'Booking Confirmation',
      subject: 'Your booking has been confirmed',
      body: 'Dear {{guestName}},\n\nYour booking for {{propertyName}} has been confirmed...',
    },
    {
      id: '2',
      name: 'Host Notification',
      subject: 'New booking for your property',
      body: 'Dear {{hostName}},\n\nYou have received a new booking for {{propertyName}}...',
    },
    {
      id: '3',
      name: 'Welcome Email',
      subject: 'Welcome to Luxe Staycations',
      body: 'Dear {{userName}},\n\nWelcome to Luxe Staycations! We\'re excited to have you...',
    },
  ]);

  const [contentPages, setContentPages] = useState([
    {
      id: '1',
      title: 'About Us',
      slug: 'about-us',
      content: '<h1>About Luxe Staycations</h1><p>We are a luxury villa rental platform...</p>',
      metaDescription: 'Learn about Luxe Staycations and our mission to provide luxury villa experiences.',
    },
    {
      id: '2',
      title: 'Terms of Service',
      slug: 'terms-of-service',
      content: '<h1>Terms of Service</h1><p>By using our platform, you agree to...</p>',
      metaDescription: 'Terms and conditions for using Luxe Staycations platform.',
    },
    {
      id: '3',
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      content: '<h1>Privacy Policy</h1><p>We respect your privacy and are committed to...</p>',
      metaDescription: 'How we collect, use, and protect your personal information.',
    },
  ]);

  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [openContentDialog, setOpenContentDialog] = useState(false);
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSaveSiteSettings = () => {
    setSnackbar({
      open: true,
      message: 'Site settings saved successfully',
      severity: 'success',
    });
  };

  const handleSavePaymentSettings = () => {
    setSnackbar({
      open: true,
      message: 'Payment settings saved successfully',
      severity: 'success',
    });
  };

  const handleSaveEmailTemplate = (templateData: any) => {
    if (selectedEmailTemplate) {
      setEmailTemplates(prev => 
        prev.map(t => t.id === selectedEmailTemplate.id ? { ...t, ...templateData } : t)
      );
    } else {
      setEmailTemplates(prev => [...prev, { id: Date.now().toString(), ...templateData }]);
    }
    setSnackbar({
      open: true,
      message: 'Email template saved successfully',
      severity: 'success',
    });
  };

  const handleSaveContent = (contentData: any) => {
    if (selectedContent) {
      setContentPages(prev => 
        prev.map(c => c.id === selectedContent.id ? { ...c, ...contentData } : c)
      );
    } else {
      setContentPages(prev => [...prev, { id: Date.now().toString(), ...contentData }]);
    }
    setSnackbar({
      open: true,
      message: 'Content saved successfully',
      severity: 'success',
    });
  };

  const handleDeleteEmailTemplate = (id: string) => {
    setEmailTemplates(prev => prev.filter(t => t.id !== id));
    setSnackbar({
      open: true,
      message: 'Email template deleted successfully',
      severity: 'success',
    });
  };

  const handleDeleteContent = (id: string) => {
    setContentPages(prev => prev.filter(c => c.id !== id));
    setSnackbar({
      open: true,
      message: 'Content deleted successfully',
      severity: 'success',
    });
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Settings & Configuration
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Configure global site settings, payment gateways, email templates, and content management.
        </Typography>
      </Box>

      <Card>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="settings tabs">
              <Tab label="Site Settings" />
              <Tab label="Payment" />
              <Tab label="Email Templates" />
              <Tab label="Content Management" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Global Site Settings
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Site Title"
                    value={siteSettings.siteTitle}
                    onChange={(e) => setSiteSettings({ ...siteSettings, siteTitle: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Site Description"
                    value={siteSettings.siteDescription}
                    onChange={(e) => setSiteSettings({ ...siteSettings, siteDescription: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Contact Email"
                    type="email"
                    value={siteSettings.contactEmail}
                    onChange={(e) => setSiteSettings({ ...siteSettings, contactEmail: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Support Phone"
                    value={siteSettings.supportPhone}
                    onChange={(e) => setSiteSettings({ ...siteSettings, supportPhone: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Support Email"
                    type="email"
                    value={siteSettings.supportEmail}
                    onChange={(e) => setSiteSettings({ ...siteSettings, supportEmail: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={siteSettings.address}
                    onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Timezone</InputLabel>
                    <Select
                      value={siteSettings.timezone}
                      label="Timezone"
                      onChange={(e) => setSiteSettings({ ...siteSettings, timezone: e.target.value })}
                    >
                      <MenuItem value="America/Los_Angeles">Pacific Time</MenuItem>
                      <MenuItem value="America/New_York">Eastern Time</MenuItem>
                      <MenuItem value="Europe/London">London</MenuItem>
                      <MenuItem value="Asia/Tokyo">Tokyo</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Currency</InputLabel>
                    <Select
                      value={siteSettings.currency}
                      label="Currency"
                      onChange={(e) => setSiteSettings({ ...siteSettings, currency: e.target.value })}
                    >
                      <MenuItem value="USD">USD ($)</MenuItem>
                      <MenuItem value="EUR">EUR (€)</MenuItem>
                      <MenuItem value="GBP">GBP (£)</MenuItem>
                      <MenuItem value="JPY">JPY (¥)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Language</InputLabel>
                    <Select
                      value={siteSettings.language}
                      label="Language"
                      onChange={(e) => setSiteSettings({ ...siteSettings, language: e.target.value })}
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Spanish</MenuItem>
                      <MenuItem value="fr">French</MenuItem>
                      <MenuItem value="de">German</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={siteSettings.maintenanceMode}
                        onChange={(e) => setSiteSettings({ ...siteSettings, maintenanceMode: e.target.checked })}
                      />
                    }
                    label="Maintenance Mode"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveSiteSettings}
                  >
                    Save Site Settings
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Payment Gateway Configuration
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Stripe Configuration
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Stripe Publishable Key"
                    value={paymentSettings.stripePublishableKey}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, stripePublishableKey: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Stripe Secret Key"
                    type="password"
                    value={paymentSettings.stripeSecretKey}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, stripeSecretKey: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1" gutterBottom>
                    Razorpay Configuration
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Razorpay Key ID"
                    value={paymentSettings.razorpayKeyId}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, razorpayKeyId: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Razorpay Key Secret"
                    type="password"
                    value={paymentSettings.razorpayKeySecret}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, razorpayKeySecret: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1" gutterBottom>
                    Commission & Payout Settings
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Commission Percentage"
                    type="number"
                    value={paymentSettings.commissionPercentage}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, commissionPercentage: Number(e.target.value) })}
                    InputProps={{ endAdornment: '%' }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Payout Schedule</InputLabel>
                    <Select
                      value={paymentSettings.payoutSchedule}
                      label="Payout Schedule"
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, payoutSchedule: e.target.value })}
                    >
                      <MenuItem value="daily">Daily</MenuItem>
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={paymentSettings.autoPayoutEnabled}
                        onChange={(e) => setPaymentSettings({ ...paymentSettings, autoPayoutEnabled: e.target.checked })}
                      />
                    }
                    label="Auto Payout Enabled"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSavePaymentSettings}
                  >
                    Save Payment Settings
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Email Templates
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    setSelectedEmailTemplate(null);
                    setOpenEmailDialog(true);
                  }}
                >
                  Add Template
                </Button>
              </Box>
              <List>
                {emailTemplates.map((template) => (
                  <ListItem key={template.id} divider>
                    <ListItemText
                      primary={template.name}
                      secondary={template.subject}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => {
                          setSelectedEmailTemplate(template);
                          setOpenEmailDialog(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => handleDeleteEmailTemplate(template.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Content Management
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    setSelectedContent(null);
                    setOpenContentDialog(true);
                  }}
                >
                  Add Page
                </Button>
              </Box>
              <List>
                {contentPages.map((content) => (
                  <ListItem key={content.id} divider>
                    <ListItemText
                      primary={content.title}
                      secondary={`/${content.slug}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => {
                          setSelectedContent(content);
                          setOpenContentDialog(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => handleDeleteContent(content.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Box>
          </TabPanel>
        </CardContent>
      </Card>

      {/* Email Template Dialog */}
      <EmailTemplateDialog
        open={openEmailDialog}
        onClose={() => setOpenEmailDialog(false)}
        template={selectedEmailTemplate}
        onSave={handleSaveEmailTemplate}
      />

      {/* Content Dialog */}
      <ContentDialog
        open={openContentDialog}
        onClose={() => setOpenContentDialog(false)}
        content={selectedContent}
        onSave={handleSaveContent}
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
