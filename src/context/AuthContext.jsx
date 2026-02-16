import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const CREDENTIALS = {
  email: import.meta.env.VITE_AUTH_EMAIL,
  password: import.meta.env.VITE_AUTH_PASSWORD
};

// Storage keys
const USER_KEY = 'user';
const REMEMBER_KEY = 'rememberMe';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rememberedUser = localStorage.getItem(USER_KEY);
    const sessionUser = sessionStorage.getItem(USER_KEY);
    
    const storedUser = rememberedUser || sessionUser;
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem(USER_KEY);
        sessionStorage.removeItem(USER_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password, rememberMe = false) => {
    const isEmailValid = email === CREDENTIALS.email;
    const isPasswordValid = password === CREDENTIALS.password;

    if (isEmailValid && isPasswordValid) {
      const userData = { email };
      
      localStorage.removeItem(USER_KEY);
      sessionStorage.removeItem(USER_KEY);
      
      if (rememberMe) {
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        localStorage.setItem(REMEMBER_KEY, 'true');
      } else {
        sessionStorage.setItem(USER_KEY, JSON.stringify(userData));
      }
      
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true };
    }
    
    if (!isEmailValid && !isPasswordValid) {
      return { success: false, message: 'Invalid email and password' };
    } else if (!isEmailValid) {
      return { success: false, message: 'Invalid email' };
    } else {
      return { success: false, message: 'Invalid password' };
    }
  };

  const logout = () => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(REMEMBER_KEY);
    sessionStorage.removeItem(USER_KEY);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
