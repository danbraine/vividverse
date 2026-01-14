// Real API service for connecting to Node.js/Express backend
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('vividverse_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('vividverse_token');
      localStorage.removeItem('vividverse_user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (email: string, password: string, name?: string) => {
    const response = await api.post('/auth/register', { email, password, name });
    if (response.data.token) {
      localStorage.setItem('vividverse_token', response.data.token);
      localStorage.setItem('vividverse_user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('vividverse_token', response.data.token);
      localStorage.setItem('vividverse_user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('vividverse_token');
    localStorage.removeItem('vividverse_user');
  },
};

// Script API
export const scriptAPI = {
  submitScript: async (title: string, format: 'PDF' | 'Fountain' | 'Text', file: File, summary?: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('format', format);
    if (summary) formData.append('summary', summary);

    const response = await api.post('/scripts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getScript: async (scriptId: string) => {
    const response = await api.get(`/scripts/${scriptId}`);
    return response.data.script;
  },

  getPendingScripts: async () => {
    const response = await api.get('/scripts/pending');
    return response.data.scripts;
  },

  getAllScripts: async () => {
    const response = await api.get('/scripts/all');
    return response.data.scripts;
  },

  getTopScript: async () => {
    const response = await api.get('/scripts/top');
    return response.data;
  },
};

// Validation API
export const validationAPI = {
  registerValidator: async () => {
    const response = await api.post('/validations/register');
    return response.data;
  },

  isValidator: async () => {
    const response = await api.get('/validations/status');
    return response.data.isValidator;
  },

  submitValidation: async (scriptId: string, scores: Record<string, number>, comments?: string) => {
    const response = await api.post(`/validations/${scriptId}`, { scores, comments });
    return response.data;
  },

  getValidations: async (scriptId: string) => {
    const response = await api.get(`/validations/${scriptId}`);
    return response.data.validations;
  },
};

// Movie API
export const movieAPI = {
  startMovieGeneration: async (scriptId: string) => {
    const response = await api.post(`/movies/generate/${scriptId}`);
    return response.data;
  },

  getMovie: async (scriptId: string) => {
    const response = await api.get(`/movies/${scriptId}`);
    return response.data.movie;
  },

  getAggregatedScore: async (scriptId: string) => {
    const response = await api.get(`/movies/${scriptId}/score`);
    return response.data.score;
  },
};

export default api;
