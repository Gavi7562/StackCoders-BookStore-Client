import api from './api';

const authService = {
  login: async (email, password) => {
    return api.post('/auth/login', { email, password });
  },

  signup: async (userData) => {
    const { confirmPassword, ...request } = userData;
    return api.post('/auth/register', request);
  },

  logout: async () => {
    try {
      return await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },

  refreshToken: async () => {
    return api.post('/auth/refresh');
  },

  getCurrentUser: async () => {
    return api.get('/auth/me');
  },
};

export default authService;
