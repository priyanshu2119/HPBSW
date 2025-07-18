import React, { createContext, useContext, useState } from 'react';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  // Placeholder state and functions
  const [currentWeek] = useState(1);
  const [currentDay] = useState(1);
  const [tasks, setTasks] = useState([]);
  const [milestones] = useState([]);
  const [completedSessions] = useState([]);

  const getOverallProgress = () => ({ percentage: 0 });
  const getWeeklyProgress = () => ({ percentage: 0, completed: 0 });
  const getCurrentPhase = () => ({});
  const getTodaySessions = () => ([]);
  const markSessionComplete = () => {};
  const addTask = (task) => setTasks((prev) => [...prev, { ...task, id: Date.now() }]);
  const completeTask = (taskId) => setTasks((prev) => prev.map(t => t.id === taskId ? { ...t, completed: true } : t));
  const deleteTask = (taskId) => setTasks((prev) => prev.filter(t => t.id !== taskId));

  return (
    <ProgressContext.Provider value={{
      currentWeek,
      currentDay,
      getOverallProgress,
      getWeeklyProgress,
      getCurrentPhase,
      getTodaySessions,
      markSessionComplete,
      tasks,
      addTask,
      completeTask,
      deleteTask,
      milestones,
      completedSessions,
    }}>
      {children}
    </ProgressContext.Provider>
  );
}; 