// src/components/ShareModal.js
import React, { useState } from 'react';
import { shareNote } from '../api/notesApi';

const ShareModal = ({ noteId, onClose }) => {
  const [shareLink, setShareLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    setLoading(true);
    try {
      const response = await shareNote(noteId);
      setShareLink(response.data.shareUrl);
    } catch (error) {
      console.error('Error sharing note:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-4">Share Note</h2>
        {!shareLink ? (
          <div className="text-center">
            <button
              onClick={handleShare}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              {loading ? 'Generating...' : 'Generate Shareable Link'}
            </button>
          </div>
        ) : (
          <div>
            <p className="mb-2">Copy this link to share your note:</p>
            <input
              type="text"
              value={shareLink}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-100"
            />
            <button
              onClick={() => navigator.clipboard.writeText(shareLink)}
              className="mt-2 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Copy Link
            </button>
          </div>
        )}
        <button onClick={onClose} className="mt-4 text-gray-500 hover:text-gray-800">
          Close
        </button>
      </div>
    </div>
  );
};

export default ShareModal;