// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import NoteDetail from './components/NoteDetail'; // Import the new component
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import SharedNotePage from './components/SharedNotePage';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/create-note" element={<PrivateRoute><NoteForm /></PrivateRoute>} />
          <Route path="/notes/shared/:token" element={<SharedNotePage />} />
          <Route path="/notes/edit/:id" element={<PrivateRoute><NoteForm /></PrivateRoute>} />
          <Route path="/notes/:id" element={<PrivateRoute><NoteDetail /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;