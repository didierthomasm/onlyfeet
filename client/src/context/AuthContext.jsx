import React, { createContext, useState, useContext, useEffect } from 'react';
import AuthService from '../utils/auth';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.loggedIn());

  useEffect(() => {
    // Update authentication state when component mounts
    setIsAuthenticated(AuthService.loggedIn());
  }, []);

  // You might also want to update the authentication state when the token changes
  // This can be done by adding an event listener or by other means

  const authContextValue = {
    isAuthenticated,
    setIsAuthenticated
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
