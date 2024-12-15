import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Update user state when component mounts or when the token changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token");
      }
    } else {
      setUser(null);
    }
  }, []); // This effect will run only once when the component mounts

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId')
    setUser(null); // Reset user state on logout
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-lg font-semibold">Travel Packages</Link>
      <div>
        {!user ? (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            {user.role === 'admin' && <Link to="/admin" className="mr-4">Admin Dashboard</Link>}
            {user.role === 'user' && <Link to="/user" className="mr-4">My Dashboard</Link>}
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
