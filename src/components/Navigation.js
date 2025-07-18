import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Badge,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Timeline as ProgressIcon,
  Schedule as ScheduleIcon,
  Task as TaskIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountIcon,
  School as SchoolIcon,
  Star as StarIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { useSidebar } from '../context/SidebarContext';

const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { getOverallProgress } = useProgress();
  const { sidebarCollapsed, toggleSidebar } = useSidebar();

  const overallProgress = getOverallProgress();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Progress', icon: <ProgressIcon />, path: '/progress' },
    { text: 'Schedule', icon: <ScheduleIcon />, path: '/schedule' },
    { text: 'Tasks', icon: <TaskIcon />, path: '/tasks' },
    { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getHouseColor = (house) => {
    const houseColors = {
      Gryffindor: '#740001',
      Slytherin: '#1a472a',
      Ravenclaw: '#0e1a40',
      Hufflepuff: '#ecb939',
    };
    return houseColors[house] || '#8b7355';
  };

  const drawer = (
    <Box
      sx={{
        width: sidebarCollapsed ? 80 : 280,
        height: '100%',
        background: 'linear-gradient(135deg, #181c26 0%, #232a3b 100%)',
        borderRight: '1px solid #7b8591',
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header Section - Fixed */}
      <Box
        sx={{
          p: 3,
          textAlign: 'center',
          borderBottom: '1px solid #7b8591',
          flexShrink: 0,
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SchoolIcon
            sx={{
              fontSize: sidebarCollapsed ? 32 : 48,
              color: '#8bb4f8',
              mb: 1,
            }}
          />
        </motion.div>
        {!sidebarCollapsed && (
          <>
            <Typography
              variant="h6"
              sx={{
                color: '#e3eafc',
                fontFamily: '"Cinzel", serif',
                fontWeight: 600,
              }}
            >
              Hogwarts Study Tracker
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#8bb4f8',
                mt: 1,
              }}
            >
              Master Your Programming Journey
            </Typography>
          </>
        )}
      </Box>

      {/* Scrollable Content Section */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(139, 180, 248, 0.1)',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(139, 180, 248, 0.3)',
            borderRadius: '3px',
            '&:hover': {
              background: 'rgba(139, 180, 248, 0.5)',
            },
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          {/* User Profile Section */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
              p: 2,
              borderRadius: 2,
              background: 'rgba(139, 180, 248, 0.1)',
              border: '1px solid #7b8591',
              justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
            }}
          >
            <Avatar
              src={user?.avatar}
              sx={{
                width: sidebarCollapsed ? 32 : 48,
                height: sidebarCollapsed ? 32 : 48,
                mr: sidebarCollapsed ? 0 : 2,
                border: `2px solid ${getHouseColor(user?.house)}`,
              }}
            />
            {!sidebarCollapsed && (
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: '#e3eafc',
                    fontWeight: 600,
                  }}
                >
                  {user?.name}
                </Typography>
                <Chip
                  label={user?.house}
                  size="small"
                  sx={{
                    backgroundColor: getHouseColor(user?.house),
                    color: '#e3eafc',
                    fontSize: '0.75rem',
                  }}
                />
              </Box>
            )}
          </Box>

          {/* Progress Section */}
          {!sidebarCollapsed && (
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  color: '#8bb4f8',
                  mb: 1,
                }}
              >
                Overall Progress
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  height: 8,
                  backgroundColor: '#232a3b',
                  borderRadius: 4,
                  overflow: 'hidden',
                  border: '1px solid #7b8591',
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgress.percentage}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #8bb4f8 0%, #7ed6a7 100%)',
                    borderRadius: 4,
                  }}
                />
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: '#8bb4f8',
                  mt: 0.5,
                  display: 'block',
                }}
              >
                {overallProgress.percentage}% Complete
              </Typography>
            </Box>
          )}

          {/* Navigation Menu */}
          <List sx={{ px: 0 }}>
            {menuItems.map((item) => (
              <motion.div
                key={item.text}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ListItem
                  button
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    mb: 1,
                    borderRadius: 2,
                    backgroundColor: location.pathname === item.path ? 'rgba(139, 180, 248, 0.2)' : 'transparent',
                    border: location.pathname === item.path ? '1px solid #8bb4f8' : '1px solid transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(139, 180, 248, 0.1)',
                      border: '1px solid #7b8591',
                    },
                    justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                    minHeight: sidebarCollapsed ? 48 : 'auto',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: location.pathname === item.path ? '#8bb4f8' : '#7b8591',
                      minWidth: sidebarCollapsed ? 0 : 40,
                      mr: sidebarCollapsed ? 0 : 1,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!sidebarCollapsed && (
                    <ListItemText
                      primary={item.text}
                      sx={{
                        '& .MuiListItemText-primary': {
                          color: location.pathname === item.path ? '#8bb4f8' : '#e3eafc',
                          fontWeight: location.pathname === item.path ? 600 : 400,
                        },
                      }}
                    />
                  )}
                </ListItem>
              </motion.div>
            ))}
          </List>
        </Box>
      </Box>

      {/* Logout Section - Fixed at Bottom */}
      <Box sx={{ p: 2, borderTop: '1px solid #7b8591', flexShrink: 0 }}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ListItem
            button
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              border: '1px solid #7b8591',
              '&:hover': {
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                border: '1px solid #f44336',
              },
              justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
              minHeight: sidebarCollapsed ? 48 : 'auto',
            }}
          >
            <ListItemIcon sx={{ 
              color: '#7b8591', 
              minWidth: sidebarCollapsed ? 0 : 40,
              mr: sidebarCollapsed ? 0 : 1,
            }}>
              <AccountIcon />
            </ListItemIcon>
            {!sidebarCollapsed && (
              <ListItemText
                primary="Logout"
                sx={{
                  '& .MuiListItemText-primary': {
                    color: '#7b8591',
                  },
                }}
              />
            )}
          </ListItem>
        </motion.div>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: 'linear-gradient(135deg, #181c26 0%, #232a3b 100%)',
          borderBottom: '1px solid #7b8591',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setDrawerOpen(!drawerOpen)}
            sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon sx={{ color: '#8bb4f8' }} />
          </IconButton>
          
          <IconButton
            color="inherit"
            aria-label="toggle sidebar"
            edge="start"
            onClick={toggleSidebar}
            sx={{ mr: 2, display: { xs: 'none', md: 'block' } }}
          >
            {sidebarCollapsed ? (
              <ChevronRightIcon sx={{ color: '#8bb4f8' }} />
            ) : (
              <ChevronLeftIcon sx={{ color: '#8bb4f8' }} />
            )}
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SchoolIcon
                  sx={{
                    fontSize: 32,
                    color: '#8bb4f8',
                    mr: 1,
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: '#e3eafc',
                    fontFamily: '"Cinzel", serif',
                    fontWeight: 600,
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  Hogwarts Study Tracker
                </Typography>
              </Box>
            </motion.div>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Chip
              icon={<StarIcon />}
              label={`Level ${user?.level || 1}`}
              sx={{
                backgroundColor: 'rgba(139, 180, 248, 0.2)',
                color: '#8bb4f8',
                border: '1px solid #7b8591',
                mr: 2,
              }}
            />
            <Badge
              badgeContent={overallProgress.percentage}
              color="primary"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#8bb4f8',
                  color: '#181c26',
                },
              }}
            >
              <Avatar
                src={user?.avatar}
                sx={{
                  width: 40,
                  height: 40,
                  border: `2px solid ${getHouseColor(user?.house)}`,
                }}
              />
            </Badge>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { md: sidebarCollapsed ? 80 : 280 },
          flexShrink: { md: 0 },
          transition: 'width 0.3s ease',
        }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: 280,
                background: 'linear-gradient(135deg, #181c26 0%, #232a3b 100%)',
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: sidebarCollapsed ? 80 : 280,
                background: 'linear-gradient(135deg, #181c26 0%, #232a3b 100%)',
                borderRight: '1px solid #7b8591',
                transition: 'width 0.3s ease',
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>
    </>
  );
};

export default Navigation; 