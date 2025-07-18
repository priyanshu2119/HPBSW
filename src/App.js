import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

// Components
import Navigation from './components/Navigation';
import MainContent from './components/MainContent';
import Dashboard from './pages/Dashboard';
import Progress from './pages/Progress';
import Schedule from './pages/Schedule';
import Tasks from './pages/Tasks';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import FogOverlay from './components/FogOverlay';

// Context
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { SidebarProvider } from './context/SidebarContext';



// Hogwarts Midnight Theme
const hogwartsMidnightTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3a4660', // Deep midnight blue
      light: '#5c6a92',
      dark: '#232a3b',
      contrastText: '#e3eafc',
    },
    secondary: {
      main: '#7b8591', // Slate grey
      light: '#aab4be',
      dark: '#525a65',
      contrastText: '#e3eafc',
    },
    background: {
      default: '#10131a', // Near black
      paper: 'rgba(24, 28, 38, 0.95)', // Slightly translucent for fog effect
    },
    text: {
      primary: '#e3eafc', // Silver/moonlight
      secondary: '#8bb4f8', // Moonlight blue
      disabled: '#7b8591',
    },
    success: {
      main: '#7ed6a7',
      contrastText: '#10131a',
    },
    warning: {
      main: '#f7c873',
      contrastText: '#10131a',
    },
    error: {
      main: '#e57373',
      contrastText: '#10131a',
    },
    info: {
      main: '#8bb4f8', // Moonlight blue
      contrastText: '#10131a',
    },
  },
  typography: {
    fontFamily: '"Crimson Text", serif',
    h1: {
      fontFamily: '"Cinzel", serif',
      fontWeight: 700,
      fontSize: '2.5rem',
      color: '#e3eafc',
      textShadow: '0 0 12px #8bb4f8, 0 0 2px #232a3b',
    },
    h2: {
      fontFamily: '"Cinzel", serif',
      fontWeight: 600,
      fontSize: '2rem',
      color: '#e3eafc',
    },
    h3: {
      fontFamily: '"Cinzel", serif',
      fontWeight: 500,
      fontSize: '1.75rem',
      color: '#e3eafc',
    },
    h4: {
      fontFamily: '"Cinzel", serif',
      fontWeight: 500,
      fontSize: '1.5rem',
      color: '#e3eafc',
    },
    h5: {
      fontFamily: '"Cinzel", serif',
      fontWeight: 500,
      fontSize: '1.25rem',
      color: '#e3eafc',
    },
    h6: {
      fontFamily: '"Cinzel", serif',
      fontWeight: 500,
      fontSize: '1rem',
      color: '#e3eafc',
    },
    body1: {
      fontFamily: '"Crimson Text", serif',
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#e3eafc',
    },
    body2: {
      fontFamily: '"Crimson Text", serif',
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#e3eafc',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontFamily: '"Cinzel", serif',
          fontWeight: 500,
          background: 'linear-gradient(90deg, #232a3b 0%, #3a4660 100%)',
          color: '#e3eafc',
          boxShadow: '0 0 8px #8bb4f8',
          '&:hover': {
            background: 'linear-gradient(90deg, #3a4660 0%, #232a3b 100%)',
            boxShadow: '0 0 16px #8bb4f8',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: 'linear-gradient(135deg, #181c26 0%, #232a3b 100%)',
          border: '1px solid #7b8591',
          boxShadow: '0 4px 32px 0 rgba(139,180,248,0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #181c26 0%, #232a3b 100%)',
          border: '1px solid #7b8591',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        bar: {
          background: 'linear-gradient(90deg, #8bb4f8 0%, #e3eafc 100%)',
          boxShadow: '0 0 8px #8bb4f8',
        },
        root: {
          background: '#232a3b',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #232a3b 0%, #3a4660 100%)',
          color: '#e3eafc',
          boxShadow: '0 0 8px #8bb4f8',
        },
      },
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('hogwarts_token');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(135deg, #1a0f0f 0%, #2c1810 50%, #3d2a1a 100%)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              border: '4px solid #8b7355',
              borderTop: '4px solid #d4af37',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            }}
          />
        </motion.div>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={hogwartsMidnightTheme}>
      <CssBaseline />
      <AuthProvider>
        <ProgressProvider>
          <SidebarProvider>
            {!isAuthenticated ? (
              <Login onLogin={() => setIsAuthenticated(true)} />
            ) : (
          <Box
            sx={{
              minHeight: '100vh',
              background: 'linear-gradient(135deg, #10131a 0%, #181c26 50%, #232a3b 100%)',
              position: 'relative',
            }}
          >
            <FogOverlay />
            {/* Magic Particles Background */}
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1,
                overflow: 'hidden',
              }}
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="particle"
                  style={{
                    position: 'absolute',
                    width: '4px',
                    height: '4px',
                    background: '#d4af37',
                    borderRadius: '50%',
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </Box>

            <Navigation />
            
            <MainContent>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/progress" element={<Progress />} />
                  <Route path="/schedule" element={<Schedule />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </AnimatePresence>
            </MainContent>
          </Box>
            )}
            
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#2c1810',
                  color: '#f4f1de',
                  border: '1px solid #8b7355',
                  borderRadius: '8px',
                  fontFamily: '"Crimson Text", serif',
                },
                success: {
                  iconTheme: {
                    primary: '#4caf50',
                    secondary: '#f4f1de',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#f44336',
                    secondary: '#f4f1de',
                  },
                },
              }}
            />
          </SidebarProvider>
        </ProgressProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 