// src/components/SharedNotePage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSharedNote } from '../api/notesApi';

const SharedNotePage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useParams(); // Get the token from the URL

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await getSharedNote(token);
        console.log(response);
        
        setNote(response.data);
      } catch (err) {
        setError("This shared note does not exist or has been deleted.");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [token]);

  if (loading) {
    return <div className="p-4 text-center">Loading note...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-xl border border-gray-200">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-800">{note.title}</h1>
      <hr className="mb-6 border-gray-300" />
      <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">{note.content}</p>
    </div>
  );
};

export default SharedNotePage;