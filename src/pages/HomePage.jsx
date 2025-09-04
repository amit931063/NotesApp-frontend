// src/pages/HomePage.js
import React from 'react';
import NoteList from '../components/NoteList';

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Your Notes</h1>
      <NoteList />
    </div>
  );
};

export default HomePage;