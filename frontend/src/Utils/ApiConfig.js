import axios from 'axios';
import BASE_URL from './BaseUrl';

/**
 * Axios instance configuration
 * Centralizes API configuration including base URL, headers, and interceptors
 */
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 errors (unauthorized)
    if (error.response && error.response.status === 401) {
      // Clear auth tokens if they exist
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      
      // Could redirect to login page here if needed
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 