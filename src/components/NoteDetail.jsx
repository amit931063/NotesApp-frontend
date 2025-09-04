// src/components/NoteDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNoteById, deleteNote } from '../api/notesApi';

const NoteDetail = () => {
  const [note, setNote] = useState(null);
  const { id } = useParams(); // Get the note's ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    fetchNote();
  }, [id]);

  const fetchNote = async () => {
    try {
      const response = await getNoteById(id);
      setNote(response.data);
    } catch (error) {
      console.error('Error fetching note:', error);
      // Handle case where note is not found
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this note?');
    if (isConfirmed) {
      try {
        await deleteNote(id);
        navigate('/'); // Redirect to the homepage after deletion
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  if (!note) {
    return <div className="p-4 text-center text-gray-500">Note not found or loading...</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-xl border border-gray-200">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-800">{note.title}</h1>
      <hr className="mb-6 border-gray-300" />
      <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">{note.content}</p>
      
      <div className="mt-8 flex justify-end space-x-4">
        <button 
          onClick={() => navigate(`/notes/edit/${note.id}`)}
          className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteDetail;