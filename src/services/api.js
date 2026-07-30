import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

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
    const message = payload?.message ?? (
      status === 401 ? 'Please login to continue.' :
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
