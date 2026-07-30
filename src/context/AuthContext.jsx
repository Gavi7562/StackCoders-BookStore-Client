import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('accessToken')));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadCurrentUser = async () => {
    if (!localStorage.getItem('accessToken')) return;
    try {
      const response = await authService.getCurrentUser();
      setUser(response.data ?? response);
      setIsAuthenticated(true);
    } catch {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const response = await authService.login(email, password);
      const payload = response.data;
      const accessToken = payload?.accessToken ?? payload?.token;
      const refreshToken = payload?.refreshToken;
      if (accessToken) localStorage.setItem('accessToken', accessToken);
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
      setUser(payload?.user ?? payload?.authUserSummary ?? null);
      setIsAuthenticated(true);
      await loadCurrentUser();
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    setError('');
    try {
      await authService.signup(userData);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  const value = useMemo(() => ({
    user,
    isAuthenticated,
    loading,
    error,
    login,
    signup,
    logout,
    loadCurrentUser,
  }), [user, isAuthenticated, loading, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
