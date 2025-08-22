"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminThemeProvider from '@/components/AdminThemeProvider';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Chip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Villa as VillaIcon,
  People as PeopleIcon,
  BookOnline as BookingIcon,
  AttachMoney as FinanceIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  Support as SupportIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountIcon,
  Logout as LogoutIcon,
  AutoAwesome,
  ReceiptLong,
  Diamond,
} from '@mui/icons-material';

const drawerWidth = 280;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
  { text: 'Properties', icon: <VillaIcon />, path: '/admin/properties' },
  { text: 'Enhanced Properties', icon: <AutoAwesome />, path: '/admin/properties/enhanced' },
  { text: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
  { text: 'Bookings', icon: <BookingIcon />, path: '/admin/bookings' },
  { text: 'Finance', icon: <FinanceIcon />, path: '/admin/finance' },
  { text: 'Advanced Finance', icon: <ReceiptLong />, path: '/admin/finance/advanced' },
  { text: 'Loyalty Program', icon: <Diamond />, path: '/admin/loyalty' },
  { text: 'Analytics', icon: <AnalyticsIcon />, path: '/admin/analytics' },
  { text: 'Support', icon: <SupportIcon />, path: '/admin/support' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    // Check if user has admin privileges
    if (session.user?.role !== 'ADMIN' && session.user?.role !== 'SUPER_ADMIN') {
      router.push('/');
      return;
    }
  }, [session, status, router]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    // Handle logout logic
    router.push('/auth/signin');
  };

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!session || (session.user?.role !== 'ADMIN' && session.user?.role !== 'SUPER_ADMIN')) {
    return null;
  }

  const drawer = (
    <Box>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          <VillaIcon />
        </Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Luxe Command Center
          </Typography>
          <Chip 
            label={session.user?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'} 
            size="small" 
            color="primary" 
            variant="outlined"
          />
        </Box>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => router.push(item.path)}
              sx={{
                '&:hover': {
                  backgroundColor: 'primary.light',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: 'text.secondary' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AdminThemeProvider>
      <Box sx={{ display: 'flex' }}>
        <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'white',
          color: 'text.primary',
          boxShadow: 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          <IconButton
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
              {session.user?.name?.[0] || 'A'}
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        {children}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
      >
        <MenuItem>
          <ListItemIcon>
            <AccountIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      </Box>
    </AdminThemeProvider>
  );
}
