
import React, { createContext, useContext, useReducer, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = (user, pass) => {
    setUsername(user);
    setPassword(pass);
  };

  const logout = () => {
    setUsername('');
    setPassword('');
  };

  const authState = { username, password, login, logout };

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
