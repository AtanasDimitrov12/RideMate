import axios from 'axios';

const backEndClient = axios.create({
  baseURL: 'http://localhost:8090', // Replace with your backend's base URL
});

// Add an interceptor to include the token
backEndClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    console.log("Token from localStorage:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach the token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default backEndClient;
