"use client";
import { Box, Typography } from '@mui/material';

export default function AdminUsersPage() {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Admin Users
      </Typography>
      <Typography variant="body1" color="text.secondary">
        This page is temporarily disabled for deployment. Will be re-enabled after successful deployment.
      </Typography>
    </Box>
  );
}
