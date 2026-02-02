import axios from 'axios';

// Service token for customer-facing app (no user login required)
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    // First check for user token in localStorage
    if (typeof window !== 'undefined') {
      const userToken = localStorage.getItem('access_token');
      if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
        return config;
      }
    }
    // Fall back to service token from env
    if (API_TOKEN) {
      config.headers.Authorization = `Bearer ${API_TOKEN}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
