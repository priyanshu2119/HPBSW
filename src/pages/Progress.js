import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Tabs,
  Tab,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingIcon,
  EmojiEvents as TrophyIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useProgress } from '../context/ProgressContext';
import { strategyData } from '../data/strategyData';

const Progress = () => {
  const [activeTab, setActiveTab] = useState(0);
  const {
    currentWeek,
    getOverallProgress,
    getWeeklyProgress,
    completedSessions,
    milestones,
  } = useProgress();

  const overallProgress = getOverallProgress();

  // Sample data for charts
  const weeklyData = Array.from({ length: 12 }, (_, i) => ({
    week: i + 1,
    progress: getWeeklyProgress(i + 1).percentage,
    sessions: getWeeklyProgress(i + 1).completed,
  }));

  const phaseData = [
    { name: 'SQL Mastery', value: 25, color: '#4caf50' },
    { name: 'Python Mastery', value: 25, color: '#2196f3' },
    { name: 'Java Mastery', value: 25, color: '#ff9800' },
    { name: 'OS Mastery', value: 25, color: '#9c27b0' },
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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
              Your Progress Journey
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#8bb4f8',
                mb: 3,
              }}
            >
              Track your mastery across all four phases
            </Typography>
          </Box>
        </motion.div>

        {/* Overall Progress Card */}
        <motion.div variants={itemVariants}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #181c26 0%, #232a3b 100%)',
              border: '2px solid #7b8591',
              borderRadius: 3,
              mb: 4,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <TrendingIcon sx={{ fontSize: 32, color: '#8bb4f8', mr: 2 }} />
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      color: '#e3eafc',
                      fontFamily: '"Cinzel", serif',
                      fontWeight: 600,
                    }}
                  >
                    Overall Progress
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: '#8bb4f8' }}
                  >
                    {overallProgress.completed} of {overallProgress.total} sessions completed
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <LinearProgress
                  variant="determinate"
                  value={overallProgress.percentage}
                  sx={{
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: '#232a3b',
                    mb: 2,
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #8bb4f8 0%, #e3eafc 100%)',
                      borderRadius: 6,
                    },
                  }}
                />
                <Typography
                  variant="h4"
                  sx={{
                    color: '#e3eafc',
                    fontFamily: '"Cinzel", serif',
                    fontWeight: 700,
                    textAlign: 'center',
                  }}
                >
                  {overallProgress.percentage}%
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                <Chip
                  icon={<ScheduleIcon />}
                  label={`Week ${currentWeek} of 12`}
                  sx={{
                    backgroundColor: 'rgba(139, 180, 248, 0.2)',
                    color: '#8bb4f8',
                    border: '1px solid #7b8591',
                  }}
                />
                <Chip
                  icon={<CheckIcon />}
                  label={`${completedSessions.length} sessions completed`}
                  sx={{
                    backgroundColor: 'rgba(126, 214, 167, 0.2)',
                    color: '#7ed6a7',
                    border: '1px solid #7ed6a7',
                  }}
                />
                <Chip
                  icon={<TrophyIcon />}
                  label={`${milestones.filter(m => m.achieved).length} milestones achieved`}
                  sx={{
                    backgroundColor: 'rgba(139, 180, 248, 0.2)',
                    color: '#8bb4f8',
                    border: '1px solid #7b8591',
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants}>
          <Box sx={{ borderBottom: 1, borderColor: '#8b7355', mb: 3 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                '& .MuiTab-root': {
                  color: '#8b7355',
                  '&.Mui-selected': {
                    color: '#d4af37',
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#d4af37',
                },
              }}
            >
              <Tab label="Weekly Progress" />
              <Tab label="Phase Overview" />
              <Tab label="Milestones" />
              <Tab label="Analytics" />
            </Tabs>
          </Box>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 0 && (
            <motion.div
              key="weekly"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12} lg={8}>
                  <Card
                    sx={{
                      background: 'linear-gradient(135deg, #2c1810 0%, #3d2a1a 100%)',
                      border: '2px solid #8b7355',
                      borderRadius: 3,
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#d4af37',
                          fontFamily: '"Cinzel", serif',
                          fontWeight: 600,
                          mb: 3,
                        }}
                      >
                        Weekly Progress Chart
                      </Typography>
                      
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={weeklyData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#8b7355" />
                          <XAxis
                            dataKey="week"
                            stroke="#8b7355"
                            tick={{ fill: '#8b7355' }}
                          />
                          <YAxis
                            stroke="#8b7355"
                            tick={{ fill: '#8b7355' }}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#2c1810',
                              border: '1px solid #8b7355',
                              borderRadius: 8,
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="progress"
                            stroke="#d4af37"
                            strokeWidth={3}
                            dot={{ fill: '#d4af37', strokeWidth: 2, r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} lg={4}>
                  <Card
                    sx={{
                      background: 'linear-gradient(135deg, #2c1810 0%, #3d2a1a 100%)',
                      border: '2px solid #8b7355',
                      borderRadius: 3,
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#d4af37',
                          fontFamily: '"Cinzel", serif',
                          fontWeight: 600,
                          mb: 3,
                        }}
                      >
                        Current Week
                      </Typography>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" sx={{ color: '#8b7355', mb: 1 }}>
                          Week {currentWeek} Progress
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={getWeeklyProgress(currentWeek).percentage}
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
                          {getWeeklyProgress(currentWeek).completed}/{getWeeklyProgress(currentWeek).total} sessions
                        </Typography>
                      </Box>

                      <List sx={{ p: 0 }}>
                        {Array.from({ length: 7 }, (_, i) => {
                          const dayProgress = Math.random() * 100;
                          return (
                            <ListItem key={i} sx={{ px: 0 }}>
                              <ListItemIcon sx={{ color: '#8b7355', minWidth: 40 }}>
                                <ScheduleIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary={`Day ${i + 1}`}
                                secondary={`${Math.round(dayProgress)}% complete`}
                                sx={{
                                  '& .MuiListItemText-primary': {
                                    color: '#f4f1de',
                                    fontSize: '0.9rem',
                                  },
                                  '& .MuiListItemText-secondary': {
                                    color: '#8b7355',
                                    fontSize: '0.8rem',
                                  },
                                }}
                              />
                              <LinearProgress
                                variant="determinate"
                                value={dayProgress}
                                sx={{
                                  width: 60,
                                  height: 6,
                                  borderRadius: 3,
                                  backgroundColor: '#2c1810',
                                  '& .MuiLinearProgress-bar': {
                                    background: 'linear-gradient(90deg, #d4af37 0%, #f4e4bc 100%)',
                                    borderRadius: 3,
                                  },
                                }}
                              />
                            </ListItem>
                          );
                        })}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </motion.div>
          )}

          {activeTab === 1 && (
            <motion.div
              key="phases"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Grid container spacing={3}>
                {strategyData.phases.map((phase, index) => (
                  <Grid item xs={12} md={6} key={phase.id}>
                    <Card
                      sx={{
                        background: 'linear-gradient(135deg, #2c1810 0%, #3d2a1a 100%)',
                        border: '2px solid #8b7355',
                        borderRadius: 3,
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <SchoolIcon sx={{ fontSize: 32, color: phase.color, mr: 2 }} />
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{
                                color: '#d4af37',
                                fontFamily: '"Cinzel", serif',
                                fontWeight: 600,
                              }}
                            >
                              {phase.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: '#8b7355' }}
                            >
                              {phase.house} House
                            </Typography>
                          </Box>
                        </Box>

                        <Typography
                          variant="body1"
                          sx={{ color: '#8b7355', mb: 3 }}
                        >
                          {phase.description}
                        </Typography>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          {phase.spells.map((spell) => (
                            <Chip
                              key={spell}
                              label={spell}
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(212, 175, 55, 0.2)',
                                color: '#d4af37',
                                border: '1px solid #8b7355',
                              }}
                            />
                          ))}
                        </Box>

                        <LinearProgress
                          variant="determinate"
                          value={25 * (index + 1)}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: '#2c1810',
                            '& .MuiLinearProgress-bar': {
                              background: `linear-gradient(90deg, ${phase.color} 0%, ${phase.color}dd 100%)`,
                              borderRadius: 4,
                            },
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          )}

          {activeTab === 2 && (
            <motion.div
              key="milestones"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                  <Card
                    sx={{
                      background: 'linear-gradient(135deg, #2c1810 0%, #3d2a1a 100%)',
                      border: '2px solid #8b7355',
                      borderRadius: 3,
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#d4af37',
                          fontFamily: '"Cinzel", serif',
                          fontWeight: 600,
                          mb: 3,
                        }}
                      >
                        Milestones & Achievements
                      </Typography>

                      <List sx={{ p: 0 }}>
                        {Object.entries(strategyData.successMetrics).map(([week, metrics]) => (
                          <React.Fragment key={week}>
                            <ListItem sx={{ px: 0 }}>
                              <ListItemIcon sx={{ color: '#d4af37' }}>
                                <TrophyIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary={`Week ${week.replace('week', '')} Milestones`}
                                secondary={metrics.join(', ')}
                                sx={{
                                  '& .MuiListItemText-primary': {
                                    color: '#d4af37',
                                    fontWeight: 600,
                                  },
                                  '& .MuiListItemText-secondary': {
                                    color: '#8b7355',
                                  },
                                }}
                              />
                              <Chip
                                label="In Progress"
                                size="small"
                                sx={{
                                  backgroundColor: 'rgba(255, 152, 0, 0.2)',
                                  color: '#ff9800',
                                  border: '1px solid #ff9800',
                                }}
                              />
                            </ListItem>
                            <Divider sx={{ borderColor: '#8b7355', my: 1 }} />
                          </React.Fragment>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} lg={4}>
                  <Card
                    sx={{
                      background: 'linear-gradient(135deg, #2c1810 0%, #3d2a1a 100%)',
                      border: '2px solid #8b7355',
                      borderRadius: 3,
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#d4af37',
                          fontFamily: '"Cinzel", serif',
                          fontWeight: 600,
                          mb: 3,
                        }}
                      >
                        Achievement Stats
                      </Typography>

                      <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Typography
                          variant="h3"
                          sx={{
                            color: '#d4af37',
                            fontFamily: '"Cinzel", serif',
                            fontWeight: 700,
                          }}
                        >
                          {milestones.filter(m => m.achieved).length}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#8b7355' }}>
                          Milestones Achieved
                        </Typography>
                      </Box>

                      <Box sx={{ textAlign: 'center' }}>
                        <Typography
                          variant="h4"
                          sx={{
                            color: '#4caf50',
                            fontFamily: '"Cinzel", serif',
                            fontWeight: 700,
                          }}
                        >
                          {Math.round((milestones.filter(m => m.achieved).length / milestones.length) * 100)}%
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#8b7355' }}>
                          Completion Rate
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </motion.div>
          )}

          {activeTab === 3 && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <Card
                    sx={{
                      background: 'linear-gradient(135deg, #2c1810 0%, #3d2a1a 100%)',
                      border: '2px solid #8b7355',
                      borderRadius: 3,
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#d4af37',
                          fontFamily: '"Cinzel", serif',
                          fontWeight: 600,
                          mb: 3,
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
                              backgroundColor: '#2c1810',
                              border: '1px solid #8b7355',
                              borderRadius: 8,
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} lg={6}>
                  <Card
                    sx={{
                      background: 'linear-gradient(135deg, #2c1810 0%, #3d2a1a 100%)',
                      border: '2px solid #8b7355',
                      borderRadius: 3,
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#d4af37',
                          fontFamily: '"Cinzel", serif',
                          fontWeight: 600,
                          mb: 3,
                        }}
                      >
                        Session Completion Rate
                      </Typography>
                      
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={weeklyData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#8b7355" />
                          <XAxis
                            dataKey="week"
                            stroke="#8b7355"
                            tick={{ fill: '#8b7355' }}
                          />
                          <YAxis
                            stroke="#8b7355"
                            tick={{ fill: '#8b7355' }}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#2c1810',
                              border: '1px solid #8b7355',
                              borderRadius: 8,
                            }}
                          />
                          <Bar dataKey="sessions" fill="#d4af37" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Box>
  );
};

export default Progress; 