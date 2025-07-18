import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  IconButton,
  LinearProgress,
} from '@mui/material';
import {
  Schedule as ScheduleIcon,
  PlayArrow as PlayIcon,
  CheckCircle as CheckIcon,
  School as SchoolIcon,
  Psychology as BrainIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useProgress } from '../context/ProgressContext';
import { strategyData } from '../data/strategyData';

const Schedule = () => {
  const { currentWeek, getTodaySessions, getCurrentPhase } = useProgress();
  const [selectedDate] = useState(new Date());

  const currentPhase = getCurrentPhase();
  const todaySessions = getTodaySessions();

  const getWeekDays = () => {
    const days = [];
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getDaySessions = (day) => {
    // This would be calculated based on the actual day and week
    return [
      {
        id: 1,
        title: "Morning Session",
        duration: 2.5,
        topics: ["Current week topics"],
        completed: Math.random() > 0.5,
      },
      {
        id: 2,
        title: "Afternoon Session",
        duration: 2.5,
        topics: ["Practice and implementation"],
        completed: Math.random() > 0.5,
      },
      {
        id: 3,
        title: "Evening Session",
        duration: 1,
        topics: ["Review and planning"],
        completed: Math.random() > 0.5,
      },
    ];
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
        {/* Header */}
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
              Study Schedule
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#8bb4f8',
                mb: 3,
              }}
            >
              Plan your 12-week mastery journey
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {/* Weekly Calendar */}
          <Grid item xs={12} lg={8}>
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
                    variant="h5"
                    sx={{
                      color: '#e3eafc',
                      fontFamily: '"Cinzel", serif',
                      fontWeight: 600,
                      mb: 3,
                    }}
                  >
                    Week {currentWeek} Schedule
                  </Typography>

                  <Grid container spacing={2}>
                    {getWeekDays().map((day, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card
                            sx={{
                              background: 'linear-gradient(135deg, #181c26 0%, #232a3b 100%)',
                              border: '1px solid #7b8591',
                              borderRadius: 2,
                              cursor: 'pointer',
                              '&:hover': {
                                border: '1px solid #8bb4f8',
                                backgroundColor: 'rgba(139, 180, 248, 0.05)',
                              },
                            }}
                          >
                            <CardContent sx={{ p: 2 }}>
                              <Typography
                                variant="h6"
                                sx={{
                                  color: '#e3eafc',
                                  fontFamily: '"Cinzel", serif',
                                  fontWeight: 600,
                                  mb: 1,
                                }}
                              >
                                {day.toLocaleDateString('en-US', { weekday: 'short' })}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: '#8bb4f8',
                                  mb: 2,
                                }}
                              >
                                {day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </Typography>

                              <List sx={{ p: 0 }}>
                                {getDaySessions(day).map((session) => (
                                  <ListItem
                                    key={session.id}
                                    sx={{
                                      px: 0,
                                      py: 0.5,
                                    }}
                                  >
                                    <ListItemIcon sx={{ color: session.completed ? '#4caf50' : '#8b7355', minWidth: 24 }}>
                                      {session.completed ? <CheckIcon /> : <ScheduleIcon />}
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={session.title}
                                      secondary={`${session.duration}h`}
                                      sx={{
                                        '& .MuiListItemText-primary': {
                                          color: session.completed ? '#4caf50' : '#f4f1de',
                                          fontSize: '0.8rem',
                                          fontWeight: session.completed ? 600 : 400,
                                        },
                                        '& .MuiListItemText-secondary': {
                                          color: '#8b7355',
                                          fontSize: '0.7rem',
                                        },
                                      }}
                                    />
                                  </ListItem>
                                ))}
                              </List>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Today's Schedule */}
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
                    variant="h5"
                    sx={{
                      color: '#e3eafc',
                      fontFamily: '"Cinzel", serif',
                      fontWeight: 600,
                      mb: 3,
                    }}
                  >
                    Today's Schedule
                  </Typography>

                  <List sx={{ p: 0 }}>
                    {todaySessions.map((session, index) => (
                      <motion.div
                        key={session.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ListItem
                          sx={{
                            mb: 2,
                            borderRadius: 2,
                            border: '1px solid #7b8591',
                            backgroundColor: 'rgba(139, 180, 248, 0.05)',
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
                                color: '#f4f1de',
                                fontWeight: 600,
                              },
                              '& .MuiListItemText-secondary': {
                                color: '#8b7355',
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

                  <Box sx={{ mt: 3, p: 2, borderRadius: 2, backgroundColor: 'rgba(139, 180, 248, 0.1)', border: '1px solid #7b8591' }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#e3eafc',
                        fontFamily: '"Cinzel", serif',
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      Daily Goal
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#8b7355', mb: 2 }}>
                      Complete 6 hours of focused study
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={65}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: '#2c1810',
                        '& .MuiLinearProgress-bar': {
                          background: 'linear-gradient(90deg, #8bb4f8 0%, #e3eafc 100%)',
                          borderRadius: 4,
                        },
                      }}
                    />
                    <Typography variant="caption" sx={{ color: '#8b7355', mt: 1, display: 'block' }}>
                      65% Complete
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Phase Overview */}
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
                    <BrainIcon sx={{ fontSize: 32, color: '#e3eafc', mr: 2 }} />
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
                        sx={{ color: '#8b7355' }}
                      >
                        {currentPhase?.description}
                      </Typography>
                    </Box>
                  </Box>

                  <Grid container spacing={3}>
                    {strategyData.phases.map((phase, index) => (
                      <Grid item xs={12} sm={6} md={3} key={phase.id}>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Card
                            sx={{
                              background: 'linear-gradient(135deg, #181c26 0%, #232a3b 100%)',
                              border: `2px solid ${phase.color}`,
                              borderRadius: 2,
                              cursor: 'pointer',
                              '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: `0 8px 25px ${phase.color}40`,
                              },
                            }}
                          >
                            <CardContent sx={{ p: 2, textAlign: 'center' }}>
                              <SchoolIcon sx={{ fontSize: 32, color: phase.color, mb: 1 }} />
                              <Typography
                                variant="h6"
                                sx={{
                                  color: '#e3eafc',
                                  fontFamily: '"Cinzel", serif',
                                  fontWeight: 600,
                                  mb: 1,
                                }}
                              >
                                {phase.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: '#8b7355', mb: 2 }}
                              >
                                {phase.house} House
                              </Typography>
                              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                                {phase.spells.slice(0, 2).map((spell) => (
                                  <Chip
                                    key={spell}
                                    label={spell}
                                    size="small"
                                    sx={{
                                      backgroundColor: `${phase.color}20`,
                                      color: phase.color,
                                      border: `1px solid ${phase.color}`,
                                      fontSize: '0.6rem',
                                    }}
                                  />
                                ))}
                              </Box>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
};

export default Schedule; 