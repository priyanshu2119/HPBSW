import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import './index.css';

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={hogwartsMidnightTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
); 