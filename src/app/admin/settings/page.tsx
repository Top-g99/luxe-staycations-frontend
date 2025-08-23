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
  DialogActions
} from '@mui/material';
import { 
  Save,
  Refresh,
  Security,
  Notifications,
  Payment,
  Business,
  Language,
  Palette,
  Backup,
  Restore,
  Download,
  Upload,
  CheckCircle,
  Warning,
  Error,
  Info
} from '@mui/icons-material';

interface SystemSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  supportPhone: string;
  timezone: string;
  currency: string;
  language: string;
  maintenanceMode: boolean;
  allowRegistrations: boolean;
  requireEmailVerification: boolean;
  maxFileUploadSize: number;
  sessionTimeout: number;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  bookingConfirmations: boolean;
  paymentReminders: boolean;
  promotionalEmails: boolean;
  systemAlerts: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  passwordMinLength: number;
  requireStrongPasswords: boolean;
  maxLoginAttempts: number;
  sessionTimeout: number;
  ipWhitelist: string[];
  sslRequired: boolean;
}

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    siteName: 'Luxe Staycations',
    siteDescription: 'Premium vacation rentals and luxury accommodations',
    contactEmail: 'admin@luxestaycations.com',
    supportPhone: '+1 (555) 123-4567',
    timezone: 'UTC',
    currency: 'USD',
    language: 'en',
    maintenanceMode: false,
    allowRegistrations: true,
    requireEmailVerification: true,
    maxFileUploadSize: 10,
    sessionTimeout: 30
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    bookingConfirmations: true,
    paymentReminders: true,
    promotionalEmails: false,
    systemAlerts: true
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: false,
    passwordMinLength: 8,
    requireStrongPasswords: true,
    maxLoginAttempts: 5,
    sessionTimeout: 30,
    ipWhitelist: ['192.168.1.1', '10.0.0.1'],
    sslRequired: true
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info'
  });

  const [backupDialog, setBackupDialog] = useState(false);

  const handleSaveSettings = () => {
    // TODO: Implement actual save functionality
    console.log('Saving settings...', { systemSettings, notificationSettings, securitySettings });
    setSnackbar({
      open: true,
      message: 'Settings saved successfully!',
      severity: 'success'
    });
  };

  const handleResetSettings = () => {
    // TODO: Implement reset functionality
    setSnackbar({
      open: true,
      message: 'Settings reset to defaults',
      severity: 'info'
    });
  };

  const handleBackup = () => {
    setSnackbar({
      open: true,
      message: 'Backup started successfully',
      severity: 'success'
    });
    setBackupDialog(false);
  };

  const handleRestore = () => {
    setSnackbar({
      open: true,
      message: 'Restore completed successfully',
      severity: 'success'
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          System Settings
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<Refresh />} onClick={handleResetSettings}>
            Reset to Defaults
          </Button>
          <Button variant="contained" startIcon={<Save />} onClick={handleSaveSettings}>
            Save Changes
          </Button>
        </Box>
      </Box>

      {/* Tabs for different settings */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="General" />
          <Tab label="Notifications" />
          <Tab label="Security" />
          <Tab label="Backup & Restore" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 3 }}>General System Settings</Typography>
          
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardHeader title="Site Information" />
                <CardContent>
                  <TextField
                    fullWidth
                    label="Site Name"
                    value={systemSettings.siteName}
                    onChange={(e) => setSystemSettings({ ...systemSettings, siteName: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Site Description"
                    value={systemSettings.siteDescription}
                    onChange={(e) => setSystemSettings({ ...systemSettings, siteDescription: e.target.value })}
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Contact Email"
                    value={systemSettings.contactEmail}
                    onChange={(e) => setSystemSettings({ ...systemSettings, contactEmail: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Support Phone"
                    value={systemSettings.supportPhone}
                    onChange={(e) => setSystemSettings({ ...systemSettings, supportPhone: e.target.value })}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardHeader title="System Configuration" />
                <CardContent>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Timezone</InputLabel>
                    <Select
                      value={systemSettings.timezone}
                      label="Timezone"
                      onChange={(e) => setSystemSettings({ ...systemSettings, timezone: e.target.value })}
                    >
                      <MenuItem value="UTC">UTC</MenuItem>
                      <MenuItem value="America/New_York">Eastern Time</MenuItem>
                      <MenuItem value="America/Chicago">Central Time</MenuItem>
                      <MenuItem value="America/Denver">Mountain Time</MenuItem>
                      <MenuItem value="America/Los_Angeles">Pacific Time</MenuItem>
                      <MenuItem value="Europe/London">London</MenuItem>
                      <MenuItem value="Asia/Tokyo">Tokyo</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Currency</InputLabel>
                    <Select
                      value={systemSettings.currency}
                      label="Currency"
                      onChange={(e) => setSystemSettings({ ...systemSettings, currency: e.target.value })}
                    >
                      <MenuItem value="USD">USD ($)</MenuItem>
                      <MenuItem value="EUR">EUR (€)</MenuItem>
                      <MenuItem value="GBP">GBP (£)</MenuItem>
                      <MenuItem value="JPY">JPY (¥)</MenuItem>
                      <MenuItem value="CAD">CAD (C$)</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Language</InputLabel>
                    <Select
                      value={systemSettings.language}
                      label="Language"
                      onChange={(e) => setSystemSettings({ ...systemSettings, language: e.target.value })}
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Spanish</MenuItem>
                      <MenuItem value="fr">French</MenuItem>
                      <MenuItem value="de">German</MenuItem>
                      <MenuItem value="ja">Japanese</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    label="Max File Upload Size (MB)"
                    type="number"
                    value={systemSettings.maxFileUploadSize}
                    onChange={(e) => setSystemSettings({ ...systemSettings, maxFileUploadSize: parseInt(e.target.value) })}
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    label="Session Timeout (minutes)"
                    type="number"
                    value={systemSettings.sessionTimeout}
                    onChange={(e) => setSystemSettings({ ...systemSettings, sessionTimeout: parseInt(e.target.value) })}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Card>
                <CardHeader title="System Features" />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={systemSettings.maintenanceMode}
                            onChange={(e) => setSystemSettings({ ...systemSettings, maintenanceMode: e.target.checked })}
                          />
                        }
                        label="Maintenance Mode"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={systemSettings.allowRegistrations}
                            onChange={(e) => setSystemSettings({ ...systemSettings, allowRegistrations: e.target.checked })}
                          />
                        }
                        label="Allow New Registrations"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={systemSettings.requireEmailVerification}
                            onChange={(e) => setSystemSettings({ ...systemSettings, requireEmailVerification: e.target.checked })}
                          />
                        }
                        label="Require Email Verification"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 3 }}>Notification Settings</Typography>
          
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardHeader title="Notification Channels" />
                <CardContent>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.emailNotifications}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })}
                      />
                    }
                    label="Email Notifications"
                    sx={{ mb: 2, display: 'block' }}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.smsNotifications}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, smsNotifications: e.target.checked })}
                      />
                    }
                    label="SMS Notifications"
                    sx={{ mb: 2, display: 'block' }}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.pushNotifications}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, pushNotifications: e.target.checked })}
                      />
                    }
                    label="Push Notifications"
                    sx={{ mb: 2, display: 'block' }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardHeader title="Notification Types" />
                <CardContent>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.bookingConfirmations}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, bookingConfirmations: e.target.checked })}
                      />
                    }
                    label="Booking Confirmations"
                    sx={{ mb: 2, display: 'block' }}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.paymentReminders}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, paymentReminders: e.target.checked })}
                      />
                    }
                    label="Payment Reminders"
                    sx={{ mb: 2, display: 'block' }}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.promotionalEmails}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, promotionalEmails: e.target.checked })}
                      />
                    }
                    label="Promotional Emails"
                    sx={{ mb: 2, display: 'block' }}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.systemAlerts}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, systemAlerts: e.target.checked })}
                      />
                    }
                    label="System Alerts"
                    sx={{ mb: 2, display: 'block' }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {activeTab === 2 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 3 }}>Security Settings</Typography>
          
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardHeader title="Authentication" />
                <CardContent>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={securitySettings.twoFactorAuth}
                        onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactorAuth: e.target.checked })}
                      />
                    }
                    label="Two-Factor Authentication"
                    sx={{ mb: 2, display: 'block' }}
                  />
                  <TextField
                    fullWidth
                    label="Password Minimum Length"
                    type="number"
                    value={securitySettings.passwordMinLength}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, passwordMinLength: parseInt(e.target.value) })}
                    sx={{ mb: 2 }}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={securitySettings.requireStrongPasswords}
                        onChange={(e) => setSecuritySettings({ ...securitySettings, requireStrongPasswords: e.target.checked })}
                      />
                    }
                    label="Require Strong Passwords"
                    sx={{ mb: 2, display: 'block' }}
                  />
                  <TextField
                    fullWidth
                    label="Max Login Attempts"
                    type="number"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, maxLoginAttempts: parseInt(e.target.value) })}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Session Timeout (minutes)"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: parseInt(e.target.value) })}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardHeader title="Network Security" />
                <CardContent>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={securitySettings.sslRequired}
                        onChange={(e) => setSecuritySettings({ ...securitySettings, sslRequired: e.target.checked })}
                      />
                    }
                    label="Require SSL/HTTPS"
                    sx={{ mb: 2, display: 'block' }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    IP Whitelist (one per line)
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={securitySettings.ipWhitelist.join('\n')}
                    onChange={(e) => setSecuritySettings({ 
                      ...securitySettings, 
                      ipWhitelist: e.target.value.split('\n').filter(ip => ip.trim()) 
                    })}
                    placeholder="192.168.1.1&#10;10.0.0.1"
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {activeTab === 3 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 3 }}>Backup & Restore</Typography>
          
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardHeader title="Backup Operations" />
                <CardContent>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Create a complete backup of your system including database, files, and configurations.
                  </Typography>
                  <Button 
                    variant="contained" 
                    startIcon={<Backup />} 
                    onClick={() => setBackupDialog(true)}
                    sx={{ mb: 2 }}
                    fullWidth
                  >
                    Create Backup
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<Download />} 
                    sx={{ mb: 2 }}
                    fullWidth
                  >
                    Download Latest Backup
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardHeader title="Restore Operations" />
                <CardContent>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Restore your system from a previous backup. This will overwrite current data.
                  </Typography>
                  <Button 
                    variant="outlined" 
                    startIcon={<Upload />} 
                    sx={{ mb: 2 }}
                    fullWidth
                  >
                    Choose Backup File
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<Restore />} 
                    onClick={handleRestore}
                    color="warning"
                    fullWidth
                  >
                    Restore from Backup
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Card>
                <CardHeader title="Backup History" />
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Full System Backup - 2024-08-22 14:30"
                        secondary="Size: 2.4 GB | Status: Completed"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Database Backup - 2024-08-21 02:00"
                        secondary="Size: 156 MB | Status: Completed"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemIcon>
                        <Warning color="warning" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Full System Backup - 2024-08-20 14:30"
                        secondary="Size: 2.3 GB | Status: Partial (some files skipped)"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Backup Dialog */}
      <Dialog open={backupDialog} onClose={() => setBackupDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create System Backup</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            This will create a complete backup of your system including:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Database (all tables and data)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Uploaded files and images" />
            </ListItem>
            <ListItem>
              <ListItemText primary="System configuration files" />
            </ListItem>
            <ListItem>
              <ListItemText primary="User data and preferences" />
            </ListItem>
          </List>
          <Typography variant="body2" color="warning.main" sx={{ mt: 2 }}>
            Estimated time: 5-10 minutes depending on data size
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBackupDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleBackup}>Start Backup</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
