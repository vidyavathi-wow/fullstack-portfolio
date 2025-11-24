import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const res = error.response;
    if (res?.data?.errors && Array.isArray(res.data.errors)) {
      res.data.errors.forEach((err) => toast.error(err.msg));
    } else if (res?.data?.message) {
      toast.error(res.data.message);
    } else {
      toast.error('Something went wrong. Please try again.');
    }
    return Promise.reject(
      res?.data?.message || error.message || 'Unexpected error occurred'
    );
  }
);

export default api;
