import axios from 'axios';

const api = axios.create({
  baseURL: 'https://smediatek-solutions.onrender.com', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
