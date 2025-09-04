// src/components/NoteForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createNote, getNoteById, updateNote } from '../api/notesApi';

const NoteForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchNote();
    }
  }, [id]);

  const fetchNote = async () => {
    try {
      const response = await getNoteById(id);
      setTitle(response.data.title);
      setContent(response.data.content);
    } catch (error) {
      console.error('Error fetching note:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noteData = { title, content };
    try {
      if (id) {
        await updateNote(id, noteData);
      } else {
          console.log("HI");   
        await createNote(noteData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Note' : 'Create Note'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded h-32 focus:outline-none focus:ring focus:border-blue-300"
            required
          ></textarea>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300">
          Save Note
        </button>
      </form>
    </div>
  );
};

export default NoteForm;