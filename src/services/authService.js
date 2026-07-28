import api from './api';

// Placeholder authentication service
// Will be connected to Java Spring Boot backend with JWT

const authService = {
  login: async (email, password) => {
    // Placeholder: POST /auth/login
    return api.post('/auth/login', { email, password });
  },

  signup: async (userData) => {
    // Placeholder: POST /auth/register
    return api.post('/auth/register', userData);
  },

  logout: async () => {
    // Placeholder: POST /auth/logout
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return api.post('/auth/logout');
  },

  refreshToken: async () => {
    // Placeholder: POST /auth/refresh
    const refreshToken = localStorage.getItem('refreshToken');
    return api.post('/auth/refresh', { refreshToken });
  },

  getCurrentUser: async () => {
    // Placeholder: GET /auth/me
    return api.get('/auth/me');
  },
};

export default authService;
