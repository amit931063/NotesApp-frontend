// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Add this line
  const token = localStorage.getItem('token');
  const [username, setUsername] = useState('');

  // Use useEffect to get the username from localStorage when the component mounts or the location changes
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [location]); // Add location as a dependency

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername('');
    navigate('/login');
  };

  const handleGetSharedNote = () => {
    const link = window.prompt("Paste the shared note link here:");
    if (link) {
      try {
        const url = new URL(link);
        const token = url.pathname.split('/').pop();
        if (token) {
          navigate(`/notes/shared/${token}`);
        } else {
          alert("Invalid shared note link.");
        }
      } catch (error) {
        alert("Invalid URL format.");
      }
    }
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Note App 📝</Link>
      <div className="flex items-center space-x-4">
        {token ? (
          <>
            {username && <span className="text-gray-300 font-medium">Hello, {username}!</span>}
            <button
              onClick={handleGetSharedNote}
              className="bg-purple-500 hover:bg-purple-600 px-3 py-1 rounded"
            >
              Get Note with Link
            </button>
            <Link to="/create-note" className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded">Create Note</Link>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded">Login</Link>
            <Link to="/register" className="bg-purple-500 hover:bg-purple-600 px-3 py-1 rounded">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;