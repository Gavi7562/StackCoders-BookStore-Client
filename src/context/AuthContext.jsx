import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('accessToken')));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const clearAuthData = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    localStorage.removeItem('loginTime');
    // Ensure any leftover refresh token is cleared
    localStorage.removeItem('refreshToken');
  };

  const loadCurrentUser = async () => {
    if (!localStorage.getItem('accessToken')) {
      clearAuthData();
      setUser(null);
      setIsAuthenticated(false);
      return;
    }
    try {
      const response = await authService.getCurrentUser();
      const fetchedUser = response.data ?? response;
      setUser(fetchedUser);
      setIsAuthenticated(true);
      if (fetchedUser) {
        localStorage.setItem('currentUser', JSON.stringify({
          id: fetchedUser.id || fetchedUser.userId,
          username: fetchedUser.username,
          email: fetchedUser.email
        }));
        localStorage.setItem('userRole', fetchedUser.role || 'USER');
      }
    } catch {
      clearAuthData();
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

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('loginTime', new Date().toISOString());
      }

      const userPayload = payload?.user ?? payload?.authUserSummary ?? null;
      if (userPayload) {
        localStorage.setItem('currentUser', JSON.stringify({
          id: userPayload.id || userPayload.userId,
          username: userPayload.username,
          email: userPayload.email
        }));
        localStorage.setItem('userRole', userPayload.role || 'USER');
        setUser(userPayload);
      }

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
      if (localStorage.getItem('accessToken')) {
        await authService.logout();
      }
    } catch (err) {
      console.warn("Logout API call failed, but clearing local session", err);
    } finally {
      clearAuthData();
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      window.location.href = '/login';
    }
  };

  const updateUserLocal = (updatedData) => {
    setUser(prevUser => {
      const newUser = { ...prevUser, ...updatedData };
      localStorage.setItem('currentUser', JSON.stringify({
        id: newUser.id || newUser.userId,
        username: newUser.username,
        email: newUser.email
      }));
      return newUser;
    });
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
    updateUserLocal,
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
