import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8081';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;
    const payload = error.response?.data;

    if (status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userRole');
      localStorage.removeItem('loginTime');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login?expired=true';
    }

    const message = payload?.message ?? (
      status === 401 ? 'Your session has expired. Please log in again.' :
        status === 404 ? 'Requested resource was not found.' :
          status === 500 ? 'Server error. Please try again later.' :
            'Something went wrong. Please try again.'
    );

    return Promise.reject({
      status,
      message,
      errors: payload?.errors ?? [],
    });
  }
);

export default api;
