// src/api/notesApi.js
import axios from 'axios';

const API_URL = 'http://172.18.3.145:8080/api'; // Replace with your Spring Boot backend URL

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const auth = (credentials) => api.post('/auth/signin', credentials);
export const register = (user) => api.post('/auth/signup', user);
export const getNotes = () => api.get('/notes');
export const getNoteById = (id) => api.get(`/notes/${id}`);
export const createNote = (note) => api.post('/notes', note);
export const updateNote = (id, note) => api.put(`/notes/${id}`, note);
export const deleteNote = (id) => api.delete(`/notes/${id}`);
export const shareNote = (id) => api.post(`/notes/${id}/share`);
export const getSharedNote = (publicId) => api.get(`/notes/public/${publicId}`);