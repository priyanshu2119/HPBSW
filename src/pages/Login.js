import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Chip,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  School as SchoolIcon,
  Star as StarIcon,
  Lock as LockIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = login(username, password);
      
      if (result.success) {
        toast.success('Welcome to Hogwarts Study Tracker!');
        onLogin();
      } else {
        setError(result.error || 'Login failed');
        toast.error('Login failed. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred');
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setUsername('demo_student');
    setPassword('password123');
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} });
    }, 500);
  };

  const houses = [
    { name: 'Gryffindor', color: '#740001', traits: 'Bravery, Courage' },
    { name: 'Slytherin', color: '#1a472a', traits: 'Ambition, Cunning' },
    { name: 'Ravenclaw', color: '#0e1a40', traits: 'Wisdom, Learning' },
    { name: 'Hufflepuff', color: '#ecb939', traits: 'Loyalty, Hard Work' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a0f0f 0%, #2c1810 50%, #3d2a1a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Magic Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="particle"
          style={{
            position: 'absolute',
            width: '6px',
            height: '6px',
            background: '#d4af37',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Card
          sx={{
            width: { xs: 320, sm: 400 },
            background: 'linear-gradient(135deg, #2c1810 0%, #3d2a1a 100%)',
            border: '2px solid #8b7355',
            borderRadius: 4,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Magic Glow Effect */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <motion.div
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <SchoolIcon
                  sx={{
                    fontSize: 64,
                    color: '#d4af37',
                    mb: 2,
                    filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))',
                  }}
                />
              </motion.div>
              
              <Typography
                variant="h4"
                sx={{
                  color: '#d4af37',
                  fontFamily: '"Cinzel", serif',
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                Hogwarts Study Tracker
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  color: '#8b7355',
                  mb: 3,
                }}
              >
                Master Your Programming Journey
              </Typography>

              {/* House Selection Preview */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
                {houses.map((house) => (
                  <motion.div
                    key={house.name}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Chip
                      label={house.name}
                      size="small"
                      sx={{
                        backgroundColor: house.color,
                        color: '#f4f1de',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        border: '1px solid #8b7355',
                      }}
                    />
                  </motion.div>
                ))}
              </Box>
            </Box>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
                margin="normal"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: '#8b7355' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#f4f1de',
                    '& fieldset': {
                      borderColor: '#8b7355',
                    },
                    '&:hover fieldset': {
                      borderColor: '#d4af37',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#d4af37',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#8b7355',
                    '&.Mui-focused': {
                      color: '#d4af37',
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                margin="normal"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: '#8b7355' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: '#8b7355' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#f4f1de',
                    '& fieldset': {
                      borderColor: '#8b7355',
                    },
                    '&:hover fieldset': {
                      borderColor: '#d4af37',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#d4af37',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#8b7355',
                    '&.Mui-focused': {
                      color: '#d4af37',
                    },
                  },
                }}
              />

              {error && (
                <Alert severity="error" sx={{ mt: 2, backgroundColor: 'rgba(244, 67, 54, 0.1)', border: '1px solid #f44336' }}>
                  {error}
                </Alert>
              )}

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    background: 'linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%)',
                    color: '#1a0f0f',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #f4e4bc 0%, #d4af37 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(212, 175, 55, 0.3)',
                    },
                    '&:disabled': {
                      background: '#8b7355',
                      color: '#2c1810',
                    },
                  }}
                >
                  {isLoading ? 'Entering Hogwarts...' : 'Enter Hogwarts'}
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                  sx={{
                    py: 1.5,
                    borderColor: '#8b7355',
                    color: '#8b7355',
                    '&:hover': {
                      borderColor: '#d4af37',
                      color: '#d4af37',
                      backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    },
                  }}
                >
                  Try Demo
                </Button>
              </motion.div>
            </form>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography
                variant="caption"
                sx={{
                  color: '#8b7355',
                  display: 'block',
                  mb: 1,
                }}
              >
                Your journey to programming mastery begins here
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                <StarIcon sx={{ fontSize: 16, color: '#d4af37' }} />
                <Typography
                  variant="caption"
                  sx={{
                    color: '#8b7355',
                    fontStyle: 'italic',
                  }}
                >
                  "It does not do to dwell on dreams and forget to live"
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Login; 