"use client";
import { Box, Typography } from '@mui/material';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Admin Section
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        This section is temporarily disabled for deployment. Will be re-enabled after successful deployment.
      </Typography>
      {children}
    </Box>
  );
}
