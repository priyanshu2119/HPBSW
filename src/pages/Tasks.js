import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckIcon,
  Assignment as AssignmentIcon,
  PriorityHigh as PriorityHighIcon,
  Schedule as ScheduleIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '../context/ProgressContext';
import toast from 'react-hot-toast';

const Tasks = () => {
  const { tasks, addTask, completeTask, deleteTask } = useProgress();
  const [openDialog, setOpenDialog] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'study',
    dueDate: '',
  });

  const handleAddTask = () => {
    if (!newTask.title.trim()) {
      toast.error('Please enter a task title');
      return;
    }

    addTask(newTask);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      category: 'study',
      dueDate: '',
    });
    setOpenDialog(false);
    toast.success('Task added successfully!');
  };

  const handleCompleteTask = (taskId) => {
    completeTask(taskId);
    toast.success('Task completed!');
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
    toast.success('Task deleted');
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: '#f44336',
      medium: '#ff9800',
      low: '#4caf50',
    };
    return colors[priority] || '#8b7355';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      study: <AssignmentIcon />,
      practice: <ScheduleIcon />,
      review: <StarIcon />,
      project: <PriorityHighIcon />,
    };
    return icons[category] || <AssignmentIcon />;
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

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
            <Box>
              <Typography
                variant="h3"
                sx={{
                  color: '#e3eafc',
                  fontFamily: '"Cinzel", serif',
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Task Management
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: '#8bb4f8',
                }}
              >
                Organize your study tasks and track progress
              </Typography>
            </Box>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog(true)}
                sx={{
                  background: 'linear-gradient(135deg, #3a4660 0%, #8bb4f8 100%)',
                  color: '#e3eafc',
                  fontWeight: 600,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #8bb4f8 0%, #3a4660 100%)',
                  },
                }}
              >
                Add Task
              </Button>
            </motion.div>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {/* Pending Tasks */}
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
                  <Typography
                    variant="h5"
                    sx={{
                      color: '#e3eafc',
                      fontFamily: '"Cinzel", serif',
                      fontWeight: 600,
                      mb: 3,
                    }}
                  >
                    Pending Tasks ({pendingTasks.length})
                  </Typography>

                  <List sx={{ p: 0 }}>
                    <AnimatePresence>
                      {pendingTasks.map((task) => (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          layout
                        >
                          <ListItem
                            sx={{
                              mb: 2,
                              borderRadius: 2,
                              border: '1px solid #8b7355',
                              backgroundColor: 'rgba(212, 175, 55, 0.05)',
                              '&:hover': {
                                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                                border: '1px solid #d4af37',
                              },
                            }}
                          >
                            <ListItemIcon sx={{ color: getPriorityColor(task.priority) }}>
                              {getCategoryIcon(task.category)}
                            </ListItemIcon>
                            <ListItemText
                              primary={task.title}
                              secondary={
                                <Box>
                                  <Typography variant="body2" sx={{ color: '#8b7355', mb: 1 }}>
                                    {task.description}
                                  </Typography>
                                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    <Chip
                                      label={task.priority}
                                      size="small"
                                      sx={{
                                        backgroundColor: `${getPriorityColor(task.priority)}20`,
                                        color: getPriorityColor(task.priority),
                                        border: `1px solid ${getPriorityColor(task.priority)}`,
                                      }}
                                    />
                                    <Chip
                                      label={task.category}
                                      size="small"
                                      sx={{
                                        backgroundColor: 'rgba(212, 175, 55, 0.2)',
                                        color: '#d4af37',
                                        border: '1px solid #8b7355',
                                      }}
                                    />
                                    {task.dueDate && (
                                      <Chip
                                        label={new Date(task.dueDate).toLocaleDateString()}
                                        size="small"
                                        sx={{
                                          backgroundColor: 'rgba(255, 152, 0, 0.2)',
                                          color: '#ff9800',
                                          border: '1px solid #ff9800',
                                        }}
                                      />
                                    )}
                                  </Box>
                                </Box>
                              }
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
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <IconButton
                                size="small"
                                onClick={() => handleCompleteTask(task.id)}
                                sx={{
                                  color: '#4caf50',
                                  '&:hover': {
                                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                                  },
                                }}
                              >
                                <CheckIcon />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => handleDeleteTask(task.id)}
                                sx={{
                                  color: '#f44336',
                                  '&:hover': {
                                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                                  },
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </ListItem>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {pendingTasks.length === 0 && (
                      <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body1" sx={{ color: '#8b7355' }}>
                          No pending tasks. Add some to get started!
                        </Typography>
                      </Box>
                    )}
                  </List>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Completed Tasks */}
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
                  <Typography
                    variant="h5"
                    sx={{
                      color: '#e3eafc',
                      fontFamily: '"Cinzel", serif',
                      fontWeight: 600,
                      mb: 3,
                    }}
                  >
                    Completed Tasks ({completedTasks.length})
                  </Typography>

                  <List sx={{ p: 0 }}>
                    <AnimatePresence>
                      {completedTasks.map((task) => (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          layout
                        >
                          <ListItem
                            sx={{
                              mb: 2,
                              borderRadius: 2,
                              border: '1px solid #4caf50',
                              backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            }}
                          >
                            <ListItemIcon sx={{ color: '#4caf50' }}>
                              <CheckIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={task.title}
                              secondary={
                                <Box>
                                  <Typography variant="body2" sx={{ color: '#8b7355', mb: 1 }}>
                                    {task.description}
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: '#4caf50' }}>
                                    Completed on {new Date(task.completedAt).toLocaleDateString()}
                                  </Typography>
                                </Box>
                              }
                              sx={{
                                '& .MuiListItemText-primary': {
                                  color: '#4caf50',
                                  fontWeight: 600,
                                  textDecoration: 'line-through',
                                },
                                '& .MuiListItemText-secondary': {
                                  color: '#8b7355',
                                },
                              }}
                            />
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteTask(task.id)}
                              sx={{
                                color: '#f44336',
                                '&:hover': {
                                  backgroundColor: 'rgba(244, 67, 54, 0.1)',
                                },
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItem>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {completedTasks.length === 0 && (
                      <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body1" sx={{ color: '#8b7355' }}>
                          No completed tasks yet. Keep working!
                        </Typography>
                      </Box>
                    )}
                  </List>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Add Task Dialog */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              background: 'linear-gradient(135deg, #2c1810 0%, #3d2a1a 100%)',
              border: '2px solid #8b7355',
              borderRadius: 3,
            },
          }}
        >
          <DialogTitle
            sx={{
              color: '#d4af37',
              fontFamily: '"Cinzel", serif',
              fontWeight: 600,
            }}
          >
            Add New Task
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Task Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                margin="normal"
                required
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
                label="Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                margin="normal"
                multiline
                rows={3}
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

              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: '#8b7355' }}>Priority</InputLabel>
                    <Select
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                      sx={{
                        color: '#f4f1de',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#8b7355',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d4af37',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d4af37',
                        },
                      }}
                    >
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: '#8b7355' }}>Category</InputLabel>
                    <Select
                      value={newTask.category}
                      onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                      sx={{
                        color: '#f4f1de',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#8b7355',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d4af37',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d4af37',
                        },
                      }}
                    >
                      <MenuItem value="study">Study</MenuItem>
                      <MenuItem value="practice">Practice</MenuItem>
                      <MenuItem value="review">Review</MenuItem>
                      <MenuItem value="project">Project</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <TextField
                fullWidth
                label="Due Date"
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
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
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={() => setOpenDialog(false)}
              sx={{
                color: '#8b7355',
                border: '1px solid #8b7355',
                '&:hover': {
                  border: '1px solid #d4af37',
                  color: '#d4af37',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddTask}
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%)',
                color: '#1a0f0f',
                '&:hover': {
                  background: 'linear-gradient(135deg, #f4e4bc 0%, #d4af37 100%)',
                },
              }}
            >
              Add Task
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Box>
  );
};

export default Tasks; 