// src/services/sessionService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/sessions';

// Get all sessions for the logged-in user
const getSessions = () => {
  const token = localStorage.getItem('token');
  return axios.get(API_URL, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

// Save the current session
const saveSession = (sessionData) => {
  const token = localStorage.getItem('token');
  return axios.post(API_URL, sessionData, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

const sessionService = {
  getSessions,
  saveSession,
};

export default sessionService;