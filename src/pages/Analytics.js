import React from 'react';
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
} from '@mui/material';
import {
  TrendingUp as TrendingIcon,
  Schedule as ScheduleIcon,
  Star as StarIcon,
  Psychology as BrainIcon,
  EmojiEvents as TrophyIcon,
  Timeline as TimelineIcon,
  Speed as SpeedIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';

const Analytics = () => {
  const { user } = useAuth();
  const { getOverallProgress, getWeeklyProgress, currentWeek } = useProgress();

  const overallProgress = getOverallProgress();

  // Sample data for charts
  const weeklyProgressData = Array.from({ length: 12 }, (_, i) => ({
    week: i + 1,
    progress: getWeeklyProgress(i + 1).percentage,
    sessions: getWeeklyProgress(i + 1).completed,
    hours: getWeeklyProgress(i + 1).completed * 2.5,
  }));

  const dailyActivityData = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    hours: Math.floor(Math.random() * 8) + 2,
    sessions: Math.floor(Math.random() * 4) + 1,
    efficiency: Math.floor(Math.random() * 30) + 70,
  }));

  const phaseData = [
    { name: 'SQL Mastery', value: 25, color: '#4caf50' },
    { name: 'Python Mastery', value: 25, color: '#2196f3' },
    { name: 'Java Mastery', value: 25, color: '#ff9800' },
    { name: 'OS Mastery', value: 25, color: '#9c27b0' },
  ];

  const studyTechniquesData = [
    { name: 'Feynman Technique', value: 85, color: '#d4af37' },
    { name: 'Spaced Repetition', value: 72, color: '#4caf50' },
    { name: 'Active Practice', value: 90, color: '#2196f3' },
    { name: 'Teaching Method', value: 68, color: '#ff9800' },
  ];

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
              Analytics & Insights
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#8bb4f8',
                mb: 3,
              }}
            >
              Track your performance and optimize your study strategy
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {/* Key Metrics */}
          <Grid item xs={12} md={6} lg={3}>
            <motion.div variants={itemVariants}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #181c26 0%, #232a3b 100%)',
                  border: '2px solid #7b8591',
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <TrendingIcon sx={{ fontSize: 48, color: '#8bb4f8', mb: 2 }} />
                  <Typography
                    variant="h3"
                    sx={{
                      color: '#e3eafc',
                      fontFamily: '"Cinzel", serif',
                      fontWeight: 700,
                      mb: 1,
                    }}
                  >
                    {overallProgress.percentage}%
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#8bb4f8' }}>
                    Overall Progress
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <motion.div variants={itemVariants}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #181c26 0%, #232a3b 100%)',
                  border: '2px solid #7b8591',
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <ScheduleIcon sx={{ fontSize: 48, color: '#7ed6a7', mb: 2 }} />
                  <Typography
                    variant="h3"
                    sx={{
                      color: '#7ed6a7',
                      fontFamily: '"Cinzel", serif',
                      fontWeight: 700,
                      mb: 1,
                    }}
                  >
                    {overallProgress.completed}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#8bb4f8' }}>
                    Sessions Completed
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <motion.div variants={itemVariants}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #181c26 0%, #232a3b 100%)',
                  border: '2px solid #7b8591',
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <StarIcon sx={{ fontSize: 48, color: '#f7c873', mb: 2 }} />
                  <Typography
                    variant="h3"
                    sx={{
                      color: '#f7c873',
                      fontFamily: '"Cinzel", serif',
                      fontWeight: 700,
                      mb: 1,
                    }}
                  >
                    {user?.level || 1}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#8bb4f8' }}>
                    Current Level
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <motion.div variants={itemVariants}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #181c26 0%, #232a3b 100%)',
                  border: '2px solid #7b8591',
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <TrophyIcon sx={{ fontSize: 48, color: '#8bb4f8', mb: 2 }} />
                  <Typography
                    variant="h3"
                    sx={{
                      color: '#8bb4f8',
                      fontFamily: '"Cinzel", serif',
                      fontWeight: 700,
                      mb: 1,
                    }}
                  >
                    {currentWeek}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#8bb4f8' }}>
                    Current Week
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Weekly Progress Chart */}
          <Grid item xs={12} lg={8}>
            <motion.div variants={itemVariants}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #181c26 0%, #232a3b 100%)',
                  border: '2px solid #7b8591',
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: '#e3eafc',
                      fontFamily: '"Cinzel", serif',
                      fontWeight: 600,
                      mb: 4,
                    }}
                  >
                    Weekly Progress Trend
                  </Typography>
                  
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={weeklyProgressData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#7b8591" />
                      <XAxis
                        dataKey="week"
                        stroke="#8bb4f8"
                        tick={{ fill: '#8bb4f8' }}
                      />
                      <YAxis
                        stroke="#8bb4f8"
                        tick={{ fill: '#8bb4f8' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#181c26',
                          border: '1px solid #7b8591',
                          borderRadius: 8,
                          color: '#e3eafc',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="progress"
                        stroke="#8bb4f8"
                        fill="#8bb4f8"
                        fillOpacity={0.3}
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Daily Activity */}
          <Grid item xs={12} lg={4}>
            <motion.div variants={itemVariants}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #181c26 0%, #232a3b 100%)',
                  border: '2px solid #7b8591',
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: '#e3eafc',
                      fontFamily: '"Cinzel", serif',
                      fontWeight: 600,
                      mb: 4,
                    }}
                  >
                    Daily Activity
                  </Typography>
                  
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dailyActivityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#7b8591" />
                      <XAxis
                        dataKey="day"
                        stroke="#8bb4f8"
                        tick={{ fill: '#8bb4f8' }}
                      />
                      <YAxis
                        stroke="#8bb4f8"
                        tick={{ fill: '#8bb4f8' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#181c26',
                          border: '1px solid #7b8591',
                          borderRadius: 8,
                          color: '#e3eafc',
                        }}
                      />
                      <Bar dataKey="hours" fill="#8bb4f8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Phase Distribution */}
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #181c26 0%, #232a3b 100%)',
                  border: '2px solid #7b8591',
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: '#e3eafc',
                      fontFamily: '"Cinzel", serif',
                      fontWeight: 600,
                      mb: 4,
                    }}
                  >
                    Phase Distribution
                  </Typography>
                  
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={phaseData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {phaseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#181c26',
                          border: '1px solid #7b8591',
                          borderRadius: 8,
                          color: '#e3eafc',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Study Techniques Performance */}
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #181c26 0%, #232a3b 100%)',
                  border: '2px solid #7b8591',
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: '#e3eafc',
                      fontFamily: '"Cinzel", serif',
                      fontWeight: 600,
                      mb: 4,
                    }}
                  >
                    Study Techniques Performance
                  </Typography>
                  
                  <List sx={{ p: 0 }}>
                    {studyTechniquesData.map((technique, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 1 }}>
                        <ListItemIcon sx={{ color: technique.color }}>
                          <BrainIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={technique.name}
                          secondary={`${technique.value}% effectiveness`}
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
                        <Box
                          sx={{
                            width: 60,
                            height: 8,
                            backgroundColor: '#232a3b',
                            borderRadius: 4,
                            overflow: 'hidden',
                            border: '1px solid #7b8591',
                          }}
                        >
                          <Box
                            sx={{
                              width: `${technique.value}%`,
                              height: '100%',
                              backgroundColor: technique.color,
                              borderRadius: 4,
                            }}
                          />
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Performance Insights */}
          <Grid item xs={12}>
            <motion.div variants={itemVariants}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #181c26 0%, #232a3b 100%)',
                  border: '2px solid #7b8591',
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: '#e3eafc',
                      fontFamily: '"Cinzel", serif',
                      fontWeight: 600,
                      mb: 4,
                    }}
                  >
                    Performance Insights
                  </Typography>

                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ p: 3, borderRadius: 3, backgroundColor: 'rgba(126, 214, 167, 0.1)', border: '1px solid #7ed6a7' }}>
                        <Typography variant="h6" sx={{ color: '#7ed6a7', mb: 3 }}>
                          Strengths
                        </Typography>
                        <List sx={{ p: 0 }}>
                          <ListItem sx={{ px: 0, py: 1 }}>
                            <ListItemIcon sx={{ color: '#7ed6a7' }}>
                              <SpeedIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary="Consistent Study Schedule"
                              secondary="You maintain a regular 6-hour daily routine"
                              sx={{
                                '& .MuiListItemText-primary': {
                                  color: '#7ed6a7',
                                  fontWeight: 600,
                                },
                                '& .MuiListItemText-secondary': {
                                  color: '#8bb4f8',
                                },
                              }}
                            />
                          </ListItem>
                          <ListItem sx={{ px: 0, py: 1 }}>
                            <ListItemIcon sx={{ color: '#7ed6a7' }}>
                              <AssessmentIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary="Strong Progress Rate"
                              secondary="Above average completion rate for your level"
                              sx={{
                                '& .MuiListItemText-primary': {
                                  color: '#7ed6a7',
                                  fontWeight: 600,
                                },
                                '& .MuiListItemText-secondary': {
                                  color: '#8bb4f8',
                                },
                              }}
                            />
                          </ListItem>
                        </List>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box sx={{ p: 3, borderRadius: 3, backgroundColor: 'rgba(247, 200, 115, 0.1)', border: '1px solid #f7c873' }}>
                        <Typography variant="h6" sx={{ color: '#f7c873', mb: 3 }}>
                          Areas for Improvement
                        </Typography>
                        <List sx={{ p: 0 }}>
                          <ListItem sx={{ px: 0, py: 1 }}>
                            <ListItemIcon sx={{ color: '#f7c873' }}>
                              <TimelineIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary="Session Duration"
                              secondary="Consider longer focused sessions for complex topics"
                              sx={{
                                '& .MuiListItemText-primary': {
                                  color: '#f7c873',
                                  fontWeight: 600,
                                },
                                '& .MuiListItemText-secondary': {
                                  color: '#8bb4f8',
                                },
                              }}
                            />
                          </ListItem>
                          <ListItem sx={{ px: 0, py: 1 }}>
                            <ListItemIcon sx={{ color: '#f7c873' }}>
                              <BrainIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary="Review Frequency"
                              secondary="Increase spaced repetition for better retention"
                              sx={{
                                '& .MuiListItemText-primary': {
                                  color: '#f7c873',
                                  fontWeight: 600,
                                },
                                '& .MuiListItemText-secondary': {
                                  color: '#8bb4f8',
                                },
                              }}
                            />
                          </ListItem>
                        </List>
                      </Box>
                    </Grid>
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

export default Analytics; 