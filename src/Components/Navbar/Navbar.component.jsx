// Navbar.js
import React,{useContext} from 'react';
import './Navbar.styles.scss';
import { AuthContext } from '../../AuthContext';
import firebase from '../../firebase';
import { useNavigate } from "react-router-dom";

import { Link } from 'react-router-dom'; // If you are using React Router for navigation


const Navbar = () => {
  // const isLoggedIn = false; // Replace this with your authentication state
  const user = useContext(AuthContext);
  const history = useNavigate();
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Update the authentication status in the context to null (user is logged out)
        authContext.setUser(null);
        // Redirect to the login page (or any other desired page)
        history.push('/login');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-logo">
          Logo
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
          {user ? (
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
