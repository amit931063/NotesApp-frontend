// src/components/NoteList.js
import React, { useEffect, useState } from 'react';
import { getNotes, deleteNote } from '../api/notesApi';
import { Link } from 'react-router-dom';
import ShareModal from './ShareModal'; // Import the ShareModal component

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await getNotes();
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this note?');
    if (isConfirmed) {
      try {
        await deleteNote(id);
        fetchNotes(); // Refresh the list
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const handleShareClick = (id) => {
    setSelectedNoteId(id);
    setShowShareModal(true);
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <div key={note.id} className="bg-white p-4 rounded shadow-md border border-gray-200">
          <h2 className="text-xl font-bold mb-2">{note.title}</h2>
          <p className="text-gray-700 mb-4">{note.content.substring(0, 100)}...</p>
          <div className="flex space-x-2">
            <Link 
              to={`/notes/${note.id}`} 
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              View
            </Link>
            <Link to={`/notes/edit/${note.id}`} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</Link>
            <button 
              onClick={() => handleShareClick(note.id)} 
              className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
            >
              Share
            </button>
            <button onClick={() => handleDelete(note.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
          </div>
        </div>
      ))}

      {showShareModal && selectedNoteId && (
        <ShareModal noteId={selectedNoteId} onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
};

export default NoteList;