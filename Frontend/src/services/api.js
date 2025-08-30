import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://eaii.onrender.com/api', // http://localhost:8000/api  Correct base URL for API  https://eaii.onrender.com/api
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Automatically send cookies with each request
});

export const api = axiosInstance;
