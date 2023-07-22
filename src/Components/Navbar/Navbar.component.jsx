// Navbar.js
import React from 'react';
import './Navbar.styles.scss';

import { Link } from 'react-router-dom'; // If you are using React Router for navigation


const Navbar = () => {
  const isLoggedIn = false; // Replace this with your authentication state

  const handleLogout = () => {
    // Implement your logout logic here
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-logo">
          Officer Academy
        </Link>
        <ul className="navbar-menu">
        
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/mynotes">My Notes</Link>
          </li>
          {isLoggedIn ? (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
