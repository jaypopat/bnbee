import axios from "axios";

// Set up default configuration. 
const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 1000,
})

const token = localStorage.getItem('auth_token');
if (token) {
  api.defaults.headers.common['Authorization'] = "Bearer " + token;
}

export default api;
export * from './auth';


