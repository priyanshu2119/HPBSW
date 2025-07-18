import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  IconButton,
} from '@mui/material';
import {
  Person as PersonIcon,
  Palette as PaletteIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  School as SchoolIcon,
  Star as StarIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import toast from 'react-hot-toast';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const { getOverallProgress } = useProgress();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editUser, setEditUser] = useState({
    name: user?.name || '',
    email: user?.email || '',
    house: user?.house || 'Gryffindor',
  });

  const overallProgress = getOverallProgress();

  const [settings, setSettings] = useState({
    notifications: true,
    soundEffects: true,
    autoSave: true,
    darkMode: true,
    studyReminders: true,
    progressAlerts: true,
  });

  const [lectures, setLectures] = useState([
    { id: 1, title: 'SQL Fundamentals', duration: 2.5, totalLectures: 8, completed: 3 },
    { id: 2, title: 'Python Basics', duration: 2.5, totalLectures: 12, completed: 0 },
    { id: 3, title: 'Java Programming', duration: 2.5, totalLectures: 10, completed: 0 },
    { id: 4, title: 'Operating Systems', duration: 2.5, totalLectures: 6, completed: 0 },
  ]);

  const [openLectureDialog, setOpenLectureDialog] = useState(false);
  const [editingLecture, setEditingLecture] = useState(null);
  const [newLecture, setNewLecture] = useState({
    title: '',
    duration: 2.5,
    totalLectures: 1,
  });

  const handleSettingChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
    toast.success(`${setting.replace(/([A-Z])/g, ' $1').toLowerCase()} ${!settings[setting] ? 'enabled' : 'disabled'}`);
  };

  const handleSaveProfile = () => {
    updateUser(editUser);
    setOpenEditDialog(false);
    toast.success('Profile updated successfully!');
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
              Settings & Preferences
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#8bb4f8',
                mb: 3,
              }}
            >
              Customize your Hogwarts Study Tracker experience
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {/* Profile Settings */}
          <Grid item xs={12} lg={6}>
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
                    <PersonIcon sx={{ fontSize: 32, color: '#8bb4f8', mr: 2 }} />
                    <Typography
                      variant="h5"
                      sx={{
                        color: '#e3eafc',
                        fontFamily: '"Cinzel", serif',
                        fontWeight: 600,
                      }}
                    >
                      Profile Settings
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar
                      src={user?.avatar}
                      sx={{
                        width: 80,
                        height: 80,
                        mr: 3,
                        border: `3px solid ${getHouseColor(user?.house)}`,
                      }}
                    />
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#e3eafc',
                          fontWeight: 600,
                          mb: 1,
                        }}
                      >
                        {user?.name}
                      </Typography>
                      <Chip
                        label={user?.house}
                        sx={{
                          backgroundColor: getHouseColor(user?.house),
                          color: '#e3eafc',
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ color: '#8bb4f8', mb: 1 }}>
                      Account Information
                    </Typography>
                    <List sx={{ p: 0 }}>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ color: '#8bb4f8' }}>
                          <PersonIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Username"
                          secondary={user?.username}
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
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ color: '#8bb4f8' }}>
                          <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="House"
                          secondary={user?.house}
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
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ color: '#8bb4f8' }}>
                          <StarIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Level"
                          secondary={`Level ${user?.level || 1} • ${user?.experience || 0} XP`}
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
                      </ListItem>
                    </List>
                  </Box>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => setOpenEditDialog(true)}
                      fullWidth
                      sx={{
                        borderColor: '#8bb4f8',
                        color: '#8bb4f8',
                        '&:hover': {
                          borderColor: '#e3eafc',
                          color: '#e3eafc',
                          backgroundColor: 'rgba(139, 180, 248, 0.1)',
                        },
                      }}
                    >
                      Edit Profile
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Notification Settings */}
          <Grid item xs={12} lg={6}>
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
                    <NotificationsIcon sx={{ fontSize: 32, color: '#8bb4f8', mr: 2 }} />
                    <Typography
                      variant="h5"
                      sx={{
                        color: '#e3eafc',
                        fontFamily: '"Cinzel", serif',
                        fontWeight: 600,
                      }}
                    >
                      Notification Settings
                    </Typography>
                  </Box>

                  <List sx={{ p: 0 }}>
                    {Object.entries(settings).map(([key, value]) => (
                      <ListItem key={key} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ color: '#8bb4f8' }}>
                          <NotificationsIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          secondary={`${value ? 'Enabled' : 'Disabled'}`}
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
                        <Switch
                          checked={value}
                          onChange={() => handleSettingChange(key)}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: '#8bb4f8',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: '#8bb4f8',
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

          {/* Study Preferences */}
          <Grid item xs={12} lg={6}>
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
                    <PaletteIcon sx={{ fontSize: 32, color: '#8bb4f8', mr: 2 }} />
                    <Typography
                      variant="h5"
                      sx={{
                        color: '#e3eafc',
                        fontFamily: '"Cinzel", serif',
                        fontWeight: 600,
                      }}
                    >
                      Study Preferences
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ color: '#8bb4f8', mb: 2 }}>
                      Session Duration
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                      {[1, 2, 2.5, 3].map((hours) => (
                        <Chip
                          key={hours}
                          label={`${hours}h`}
                          variant={hours === 2.5 ? 'filled' : 'outlined'}
                          sx={{
                            backgroundColor: hours === 2.5 ? '#8bb4f8' : 'transparent',
                            color: hours === 2.5 ? '#1a0f0f' : '#8bb4f8',
                            border: '1px solid #8bb4f8',
                            '&:hover': {
                              backgroundColor: 'rgba(139, 180, 248, 0.1)',
                              border: '1px solid #8bb4f8',
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ color: '#8bb4f8', mb: 2 }}>
                      Break Duration
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                      {[15, 30, 45, 60].map((minutes) => (
                        <Chip
                          key={minutes}
                          label={`${minutes}m`}
                          variant={minutes === 30 ? 'filled' : 'outlined'}
                          sx={{
                            backgroundColor: minutes === 30 ? '#8bb4f8' : 'transparent',
                            color: minutes === 30 ? '#1a0f0f' : '#8bb4f8',
                            border: '1px solid #8bb4f8',
                            '&:hover': {
                              backgroundColor: 'rgba(139, 180, 248, 0.1)',
                              border: '1px solid #8bb4f8',
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="body2" sx={{ color: '#8bb4f8', mb: 2 }}>
                      Study Techniques
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {['Feynman', 'Spaced Repetition', 'Active Practice', 'Teaching Method'].map((technique) => (
                        <Chip
                          key={technique}
                          label={technique}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(139, 180, 248, 0.2)',
                            color: '#8bb4f8',
                            border: '1px solid #8bb4f8',
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Lecture Management */}
          <Grid item xs={12} lg={6}>
            <motion.div variants={itemVariants}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #181c26 0%, #232a3b 100%)',
                  border: '2px solid #7b8591',
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ScheduleIcon sx={{ fontSize: 32, color: '#8bb4f8', mr: 2 }} />
                      <Typography
                        variant="h5"
                        sx={{
                          color: '#e3eafc',
                          fontFamily: '"Cinzel", serif',
                          fontWeight: 600,
                        }}
                      >
                        Lecture Management
                      </Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={() => {
                        setEditingLecture(null);
                        setNewLecture({ title: '', duration: 2.5, totalLectures: 1 });
                        setOpenLectureDialog(true);
                      }}
                      sx={{
                        borderColor: '#8bb4f8',
                        color: '#8bb4f8',
                        '&:hover': {
                          borderColor: '#e3eafc',
                          color: '#e3eafc',
                          backgroundColor: 'rgba(139, 180, 248, 0.1)',
                        },
                      }}
                    >
                      Add Lecture
                    </Button>
                  </Box>

                  <List sx={{ p: 0 }}>
                    {lectures.map((lecture) => (
                      <ListItem
                        key={lecture.id}
                        sx={{
                          px: 0,
                          py: 2,
                          mb: 2,
                          borderRadius: 2,
                          border: '1px solid #7b8591',
                          backgroundColor: 'rgba(139, 180, 248, 0.05)',
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              color: '#e3eafc',
                              fontWeight: 600,
                              mb: 1,
                            }}
                          >
                            {lecture.title}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                            <Chip
                              label={`${lecture.duration}h duration`}
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(139, 180, 248, 0.2)',
                                color: '#8bb4f8',
                                border: '1px solid #7b8591',
                              }}
                            />
                            <Chip
                              label={`${lecture.completed}/${lecture.totalLectures} completed`}
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(126, 214, 167, 0.2)',
                                color: '#7ed6a7',
                                border: '1px solid #7ed6a7',
                              }}
                            />
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={(lecture.completed / lecture.totalLectures) * 100}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: '#232a3b',
                              '& .MuiLinearProgress-bar': {
                                background: 'linear-gradient(90deg, #8bb4f8 0%, #e3eafc 100%)',
                                borderRadius: 4,
                              },
                            }}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => {
                              setEditingLecture(lecture);
                              setNewLecture({ ...lecture });
                              setOpenLectureDialog(true);
                            }}
                            sx={{ color: '#8bb4f8' }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => {
                              setLectures(lectures.filter(l => l.id !== lecture.id));
                              toast.success('Lecture removed');
                            }}
                            sx={{ color: '#e57373' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Progress Summary */}
          <Grid item xs={12} lg={6}>
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
                    <SecurityIcon sx={{ fontSize: 32, color: '#8bb4f8', mr: 2 }} />
                    <Typography
                      variant="h5"
                      sx={{
                        color: '#e3eafc',
                        fontFamily: '"Cinzel", serif',
                        fontWeight: 600,
                      }}
                    >
                      Progress Summary
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ color: '#8bb4f8', mb: 1 }}>
                      Overall Progress
                    </Typography>
                    <Box
                      sx={{
                        width: '100%',
                        height: 12,
                        backgroundColor: '#181c26',
                        borderRadius: 6,
                        overflow: 'hidden',
                        border: '1px solid #8bb4f8',
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: `${overallProgress.percentage}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, #8bb4f8 0%, #e3eafc 100%)',
                          borderRadius: 6,
                        }}
                      />
                    </Box>
                    <Typography variant="caption" sx={{ color: '#8bb4f8' }}>
                      {overallProgress.percentage}% Complete
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ color: '#8bb4f8', mb: 2 }}>
                      Study Statistics
                    </Typography>
                    <List sx={{ p: 0 }}>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ color: '#8bb4f8' }}>
                          <StarIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Total Sessions"
                          secondary={overallProgress.completed}
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
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ color: '#8bb4f8' }}>
                          <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Study Hours"
                          secondary={`${overallProgress.completed * 2.5} hours`}
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
                      </ListItem>
                    </List>
                  </Box>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        background: 'linear-gradient(135deg, #8bb4f8 0%, #e3eafc 100%)',
                        color: '#1a0f0f',
                        fontWeight: 600,
                        '&:hover': {
                          background: 'linear-gradient(135deg, #e3eafc 0%, #8bb4f8 100%)',
                        },
                      }}
                    >
                      Export Progress Report
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Edit Profile Dialog */}
        <Dialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              background: 'linear-gradient(135deg, #181c26 0%, #232a3b 100%)',
              border: '2px solid #7b8591',
              borderRadius: 3,
            },
          }}
        >
          <DialogTitle
            sx={{
              color: '#e3eafc',
              fontFamily: '"Cinzel", serif',
              fontWeight: 600,
            }}
          >
            Edit Profile
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Name"
                value={editUser.name}
                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#e3eafc',
                    '& fieldset': {
                      borderColor: '#8bb4f8',
                    },
                    '&:hover fieldset': {
                      borderColor: '#e3eafc',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#e3eafc',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#8bb4f8',
                    '&.Mui-focused': {
                      color: '#e3eafc',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Email"
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#e3eafc',
                    '& fieldset': {
                      borderColor: '#8bb4f8',
                    },
                    '&:hover fieldset': {
                      borderColor: '#e3eafc',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#e3eafc',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#8bb4f8',
                    '&.Mui-focused': {
                      color: '#e3eafc',
                    },
                  },
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={() => setOpenEditDialog(false)}
              sx={{
                color: '#8bb4f8',
                border: '1px solid #8bb4f8',
                '&:hover': {
                  border: '1px solid #e3eafc',
                  color: '#e3eafc',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveProfile}
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{
                background: 'linear-gradient(135deg, #8bb4f8 0%, #e3eafc 100%)',
                color: '#1a0f0f',
                '&:hover': {
                  background: 'linear-gradient(135deg, #e3eafc 0%, #8bb4f8 100%)',
                },
              }}
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>

        {/* Lecture Management Dialog */}
        <Dialog
          open={openLectureDialog}
          onClose={() => setOpenLectureDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              background: 'linear-gradient(135deg, #181c26 0%, #232a3b 100%)',
              border: '2px solid #7b8591',
              borderRadius: 3,
            },
          }}
        >
          <DialogTitle
            sx={{
              color: '#e3eafc',
              fontFamily: '"Cinzel", serif',
              fontWeight: 600,
            }}
          >
            {editingLecture ? 'Edit Lecture' : 'Add New Lecture'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Lecture Title"
                value={newLecture.title}
                onChange={(e) => setNewLecture({ ...newLecture, title: e.target.value })}
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#e3eafc',
                    '& fieldset': {
                      borderColor: '#8bb4f8',
                    },
                    '&:hover fieldset': {
                      borderColor: '#e3eafc',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#e3eafc',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#8bb4f8',
                    '&.Mui-focused': {
                      color: '#e3eafc',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Duration (hours)"
                type="number"
                value={newLecture.duration}
                onChange={(e) => setNewLecture({ ...newLecture, duration: parseFloat(e.target.value) })}
                margin="normal"
                inputProps={{ min: 0.5, max: 8, step: 0.5 }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#e3eafc',
                    '& fieldset': {
                      borderColor: '#8bb4f8',
                    },
                    '&:hover fieldset': {
                      borderColor: '#e3eafc',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#e3eafc',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#8bb4f8',
                    '&.Mui-focused': {
                      color: '#e3eafc',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Total Lectures"
                type="number"
                value={newLecture.totalLectures}
                onChange={(e) => setNewLecture({ ...newLecture, totalLectures: parseInt(e.target.value) })}
                margin="normal"
                inputProps={{ min: 1, max: 50 }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#e3eafc',
                    '& fieldset': {
                      borderColor: '#8bb4f8',
                    },
                    '&:hover fieldset': {
                      borderColor: '#e3eafc',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#e3eafc',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#8bb4f8',
                    '&.Mui-focused': {
                      color: '#e3eafc',
                    },
                  },
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={() => setOpenLectureDialog(false)}
              sx={{
                color: '#8bb4f8',
                border: '1px solid #8bb4f8',
                '&:hover': {
                  border: '1px solid #e3eafc',
                  color: '#e3eafc',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (!newLecture.title.trim()) {
                  toast.error('Please enter a lecture title');
                  return;
                }
                if (editingLecture) {
                  setLectures(lectures.map(l => l.id === editingLecture.id ? { ...newLecture, id: l.id, completed: l.completed } : l));
                  toast.success('Lecture updated successfully!');
                } else {
                  setLectures([...lectures, { ...newLecture, id: Date.now(), completed: 0 }]);
                  toast.success('Lecture added successfully!');
                }
                setOpenLectureDialog(false);
              }}
              startIcon={<SaveIcon />}
              sx={{
                background: 'linear-gradient(135deg, #8bb4f8 0%, #e3eafc 100%)',
                color: '#1a0f0f',
                '&:hover': {
                  background: 'linear-gradient(135deg, #e3eafc 0%, #8bb4f8 100%)',
                },
              }}
            >
              {editingLecture ? 'Update' : 'Add'} Lecture
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Box>
  );
};

export default Settings; 