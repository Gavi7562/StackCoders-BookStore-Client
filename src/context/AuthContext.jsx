import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async (email, _password) => {
    setLoading(true);
    // Placeholder: will be replaced with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser({ email, name: 'User' });
        setIsAuthenticated(true);
        setLoading(false);
        resolve({ success: true });
      }, 1000);
    });
  };

  const signup = async (userData) => {
    setLoading(true);
    // Placeholder: will be replaced with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser({ email: userData.email, name: userData.username });
        setIsAuthenticated(true);
        setLoading(false);
        resolve({ success: true });
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, signup, logout }}>
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
