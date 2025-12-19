import axios from 'axios';

const api = axios.create({
  baseURL: 'https://smediatek-solutions.onrender.com', // Default backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
