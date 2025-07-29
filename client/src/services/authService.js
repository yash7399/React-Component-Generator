// src/services/authService.js
import axios from 'axios';

const API_URL = 'https://react-component-generator-server.onrender.com/api/auth';

const register = (email, password) => {
  return axios.post(`${API_URL}/register`, { email, password });
};

// ## UPDATE THE LOGIN FUNCTION ##
const login = async(email, password) => {
  // It now just returns the full response for the context to handle.
  const x= await axios.post(`${API_URL}/login`, { email, password });
  console.log(x);
  return x;
};

const logout = () => {
  // The context handles this, but we have a placeholder here.
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
