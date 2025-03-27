import axios from 'axios';

// In production (Vercel), we'll use the proxy set up in vercel.json
// In development, we'll continue using localhost
const apiUrl = process.env.NODE_ENV === 'production' 
  ? '' // Empty string for relative URLs - this will use Vercel's proxy
  : 'http://localhost:5001';

console.log('API URL mode:', process.env.NODE_ENV === 'production' ? 'production (proxy)' : 'development');

// Set up default config
const instance = axios.create({
  baseURL: apiUrl,
  timeout: 15000, // Increased timeout for slow cold starts on Render
  withCredentials: true
});

// Add request interceptor for debugging
instance.interceptors.request.use(function (config) {
  console.log('Making request to:', config.baseURL + config.url);
  return config;
}, function (error) {
  return Promise.reject(error);
});

// Add response interceptor for debugging
instance.interceptors.response.use(function (response) {
  console.log('Received response from:', response.config.url, 'with status:', response.status);
  return response;
}, function (error) {
  console.error('Request failed:', error.config?.url);
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Response status:', error.response.status);
    console.error('Response data:', error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('No response received from server');
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error message:', error.message);
  }
  return Promise.reject(error);
});

export default instance; 