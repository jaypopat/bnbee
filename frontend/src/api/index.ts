import axios from "axios";

// Set up default configuration. 
const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  timeout: 1000,
})

/** 
 * Interceptor for requests sent from the application: 
 * retrieve the Access Token from localStorage and 
 * add it to every API request made using the axios instance.
 */
api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
export * from './auth';


