import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    // Demo login logic
    if (username === 'demo_student' && password === 'password123') {
      setUser({ name: 'Demo Student', house: 'Gryffindor', email: 'demo@student.com' });
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hogwarts_token');
  };

  const updateUser = (newUser) => {
    setUser((prev) => ({ ...prev, ...newUser }));
  };

  const updateExperience = (xp) => {
    // Placeholder for XP logic
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, updateExperience }}>
      {children}
    </AuthContext.Provider>
  );
}; 