import React, { useContext, useState, useEffect } from 'react';
import './Navbar.styles.scss';
import { AuthContext } from '../../AuthContext';
import firebase from '../../firebase';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom'; // If you are using React Router for navigation

const Navbar = () => {
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [scrolled, setScrolled] = useState(false);

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Update the authentication status in the context to null (user is logged out)
        // Redirect to the login page (or any other desired page)
        navigate('/login');
        authContext.setUser(null);
        
       
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="navbar-logo">
        <span className="nav-word1">Officer</span> <span className="nav-word2">Gateway</span>
      </Link>
      {user ? (
        <ul className="navbar-menu">
          <li>
            <Link className="navbar-menu-link" to="/about">
              About Us
            </Link>
          </li>
          <li>
            <Link className="navbar-menu-link" to="/courses">
              Courses
            </Link>
          </li>
          <li>
            <Link className="navbar-menu-link" to="/events">
              Events
            </Link>
          </li>
          <li>
            <Link className="navbar-menu-link" to="/blogs">
              Youtube Videos 
            </Link>
          </li>
          <li>
            <Link className="navbar-menu-link" to="/blogs">
              Blogs
            </Link>
          </li>
          <li>
            <button className="my-notes-button">
              <Link className="navbar-menu-link" to="/mynotes">
                My Notes
              </Link>
            </button>
          </li>
          <li>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      ) : (
        <ul className="navbar-menu">
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
