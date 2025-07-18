import React from 'react';
import { Box } from '@mui/material';
import { useSidebar } from '../context/SidebarContext';

const MainContent = ({ children }) => {
  const { sidebarCollapsed } = useSidebar();

  return (
    <Box
      component="main"
      sx={{
        pt: 8,
        px: 2,
        pb: 2,
        position: 'relative',
        zIndex: 2,
        ml: { md: sidebarCollapsed ? '80px' : '280px' },
        transition: 'margin-left 0.3s ease',
      }}
    >
      {children}
    </Box>
  );
};

export default MainContent; 