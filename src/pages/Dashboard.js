import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingIcon,
  School as SchoolIcon,
  Timer as TimerIcon,
  Assignment as AssignmentIcon,
  Psychology as BrainIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, updateExperience } = useAuth();
  const {
    currentWeek,
    currentDay,
    getOverallProgress,
    getWeeklyProgress,
    getCurrentPhase,
    getTodaySessions,
    markSessionComplete,
    tasks,
  } = useProgress();

  const [currentSession, setCurrentSession] = useState(null);
  const [sessionTimer, setSessionTimer] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);

  const overallProgress = getOverallProgress();
  const weeklyProgress = getWeeklyProgress(currentWeek);
  const currentPhase = getCurrentPhase();
  const todaySessions = getTodaySessions();

  useEffect(() => {
    let interval;
    if (isSessionActive && sessionStartTime) {
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
        setSessionTimer(elapsed);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive, sessionStartTime]);

  const startSession = (session) => {
    setCurrentSession(session);
    setIsSessionActive(true);
    setSessionStartTime(Date.now());
    setSessionTimer(0);
    toast.success(`Started ${session.title}`);
  };

  const pauseSession = () => {
    setIsSessionActive(false);
    toast.info('Session paused');
  };

  const resumeSession = () => {
    setIsSessionActive(true);
    toast.success('Session resumed');
  };

  const completeSession = () => {
    if (currentSession) {
      markSessionComplete(currentSession.id, currentWeek, currentDay);
      updateExperience(10);
      setIsSessionActive(false);
      setCurrentSession(null);
      setSessionTimer(0);
      setSessionStartTime(null);
      toast.success('Session completed! +10 XP');
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants}>
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h3"
              sx={{
                color: '#e3eafc',
                fontFamily: '"Cinzel", serif',
                fontWeight: 700,
                mb: 2,
              }}
            >
              Welcome back, {user?.name}!
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#8bb4f8',
                mb: 3,
              }}
            >
              Week {currentWeek} • Day {currentDay} • {currentPhase?.name}
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
              <Chip
                icon={<SchoolIcon />}
                label={user?.house}
                sx={{
                  backgroundColor: getHouseColor(user?.house),
                  color: '#e3eafc',
                  fontWeight: 600,
                }}
              />
              <Chip
                icon={<StarIcon />}
                label={`Level ${user?.level || 1}`}
                sx={{
                  backgroundColor: 'rgba(139, 180, 248, 0.2)',
                  color: '#8bb4f8',
                  border: '1px solid #7b8591',
                }}
              />
              <Chip
                icon={<TrendingIcon />}
                label={`${overallProgress.percentage}% Complete`}
                sx={{
                  backgroundColor: 'rgba(126, 214, 167, 0.2)',
                  color: '#7ed6a7',
                  border: '1px solid #7ed6a7',
                }}
              />
            </Box>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {/* Current Session Card */}
          <Grid item xs={12} lg={8}>
            <motion.div variants={itemVariants}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #2c1810 0%, #3d2a1a 100%)',
                  border: '2px solid #8b7355',
                  borderRadius: 3,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <TimerIcon sx={{ fontSize: 32, color: '#d4af37', mr: 2 }} />
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          color: '#d4af37',
                          fontFamily: '"Cinzel", serif',
                          fontWeight: 600,
                        }}
                      >
                        {currentSession ? currentSession.title : 'No Active Session'}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: '#8b7355' }}
                      >
                        {currentSession ? `${currentSession.duration} hours planned` : 'Start a session to begin'}
                      </Typography>
                    </Box>
                  </Box>

                  {currentSession ? (
                    <>
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="h3"
                          sx={{
                            color: '#d4af37',
                            fontFamily: '"Cinzel", serif',
                            fontWeight: 700,
                            textAlign: 'center',
                            mb: 1,
                          }}
                        >
                          {formatTime(sessionTimer)}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={(sessionTimer / (currentSession.duration * 3600)) * 100}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: '#2c1810',
                            '& .MuiLinearProgress-bar': {
                              background: 'linear-gradient(90deg, #d4af37 0%, #f4e4bc 100%)',
                              borderRadius: 4,
                            },
                          }}
                        />
                      </Box>

                      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        {!isSessionActive ? (
                          <Button
                            variant="contained"
                            startIcon={<PlayIcon />}
                            onClick={resumeSession}
                            sx={{
                              background: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
                              color: '#f4f1de',
                              '&:hover': {
                                background: 'linear-gradient(135deg, #81c784 0%, #4caf50 100%)',
                              },
                            }}
                          >
                            Resume
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            startIcon={<PauseIcon />}
                            onClick={pauseSession}
                            sx={{
                              borderColor: '#ff9800',
                              color: '#ff9800',
                              '&:hover': {
                                borderColor: '#f57c00',
                                color: '#f57c00',
                                backgroundColor: 'rgba(255, 152, 0, 0.1)',
                              },
                            }}
                          >
                            Pause
                          </Button>
                        )}
                        
                        <Button
                          variant="contained"
                          startIcon={<CheckIcon />}
                          onClick={completeSession}
                          sx={{
                            background: 'linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%)',
                            color: '#1a0f0f',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #f4e4bc 0%, #d4af37 100%)',
                            },
                          }}
                        >
                          Complete Session
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography
                        variant="body1"
                        sx={{ color: '#8b7355', mb: 3 }}
                      >
                        Select a session to begin your study journey
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Progress Overview */}
          <Grid item xs={12} lg={4}>
            <motion.div variants={itemVariants}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #181c26 0%, #232a3b 100%)',
                  border: '2px solid #7b8591',
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#e3eafc',
                      fontFamily: '"Cinzel", serif',
                      fontWeight: 600,
                      mb: 3,
                    }}
                  >
                    Progress Overview
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ color: '#8bb4f8', mb: 1 }}>
                      Overall Progress
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={overallProgress.percentage}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#232a3b',
                        mb: 1,
                        '& .MuiLinearProgress-bar': {
                          background: 'linear-gradient(90deg, #8bb4f8 0%, #e3eafc 100%)',
                          borderRadius: 5,
                        },
                      }}
                    />
                    <Typography variant="caption" sx={{ color: '#8bb4f8' }}>
                      {overallProgress.completed}/{overallProgress.total} sessions
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ color: '#8b7355', mb: 1 }}>
                      Week {currentWeek} Progress
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={weeklyProgress.percentage}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#2c1810',
                        mb: 1,
                        '& .MuiLinearProgress-bar': {
                          background: 'linear-gradient(90deg, #4caf50 0%, #81c784 100%)',
                          borderRadius: 5,
                        },
                      }}
                    />
                    <Typography variant="caption" sx={{ color: '#8b7355' }}>
                      {weeklyProgress.completed}/{weeklyProgress.total} sessions
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      variant="h4"
                      sx={{
                        color: '#d4af37',
                        fontFamily: '"Cinzel", serif',
                        fontWeight: 700,
                      }}
                    >
                      {user?.experience || 0}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#8b7355' }}>
                      Experience Points
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Today's Sessions */}
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #181c26 0%, #232a3b 100%)',
                  border: '2px solid #7b8591',
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#e3eafc',
                      fontFamily: '"Cinzel", serif',
                      fontWeight: 600,
                      mb: 3,
                    }}
                  >
                    Today's Sessions
                  </Typography>

                  <List sx={{ p: 0 }}>
                    {todaySessions.map((session, index) => (
                      <motion.div
                        key={session.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ListItem
                          button
                          onClick={() => startSession(session)}
                          sx={{
                            mb: 1,
                            borderRadius: 2,
                            border: '1px solid #7b8591',
                            backgroundColor: currentSession?.id === session.id ? 'rgba(139, 180, 248, 0.2)' : 'transparent',
                            '&:hover': {
                              backgroundColor: 'rgba(139, 180, 248, 0.1)',
                              border: '1px solid #8bb4f8',
                            },
                          }}
                        >
                          <ListItemIcon sx={{ color: '#8bb4f8' }}>
                            <ScheduleIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={session.title}
                            secondary={`${session.duration} hours • ${session.topics.join(', ')}`}
                            sx={{
                              '& .MuiListItemText-primary': {
                                color: '#e3eafc',
                                fontWeight: 600,
                              },
                              '& .MuiListItemText-secondary': {
                                color: '#8bb4f8',
                              },
                            }}
                          />
                          <IconButton
                            size="small"
                            sx={{ color: '#8bb4f8' }}
                          >
                            <PlayIcon />
                          </IconButton>
                        </ListItem>
                      </motion.div>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Quick Tasks */}
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #181c26 0%, #232a3b 100%)',
                  border: '2px solid #7b8591',
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#e3eafc',
                      fontFamily: '"Cinzel", serif',
                      fontWeight: 600,
                      mb: 3,
                    }}
                  >
                    Quick Tasks
                  </Typography>

                  <List sx={{ p: 0 }}>
                    {tasks.slice(0, 5).map((task) => (
                      <motion.div
                        key={task.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ListItem
                          sx={{
                            mb: 1,
                            borderRadius: 2,
                            border: '1px solid #7b8591',
                            backgroundColor: task.completed ? 'rgba(126, 214, 167, 0.1)' : 'transparent',
                            '&:hover': {
                              backgroundColor: 'rgba(139, 180, 248, 0.1)',
                            },
                          }}
                        >
                          <ListItemIcon sx={{ color: task.completed ? '#7ed6a7' : '#8bb4f8' }}>
                            <AssignmentIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={task.title}
                            secondary={task.description}
                            sx={{
                              '& .MuiListItemText-primary': {
                                color: task.completed ? '#7ed6a7' : '#e3eafc',
                                textDecoration: task.completed ? 'line-through' : 'none',
                              },
                              '& .MuiListItemText-secondary': {
                                color: '#8bb4f8',
                              },
                            }}
                          />
                        </ListItem>
                      </motion.div>
                    ))}
                  </List>

                  {tasks.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 3 }}>
                      <Typography variant="body2" sx={{ color: '#8bb4f8' }}>
                        No tasks yet. Add some to get started!
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Current Phase Info */}
          <Grid item xs={12}>
            <motion.div variants={itemVariants}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #181c26 0%, #232a3b 100%)',
                  border: '2px solid #7b8591',
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <BrainIcon sx={{ fontSize: 32, color: '#8bb4f8', mr: 2 }} />
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          color: '#e3eafc',
                          fontFamily: '"Cinzel", serif',
                          fontWeight: 600,
                        }}
                      >
                        {currentPhase?.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: '#8bb4f8' }}
                      >
                        {currentPhase?.description}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {currentPhase?.spells?.map((spell) => (
                      <Chip
                        key={spell}
                        label={spell}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(139, 180, 248, 0.2)',
                          color: '#8bb4f8',
                          border: '1px solid #7b8591',
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
};

export default Dashboard; 