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
    // <div className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
        <span className="nav-word1">Officer</span> <span className="nav-word2">Gateway</span>
        </Link>
        {/* <ul className="navbar-menu">    */}
        {user ? (
          <ul className='navbar-menu'>     
          <li>
            <Link className='navbar-menu-link' to="/about">About Us</Link>
          </li>
          <li>
            <Link className='navbar-menu-link' to="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link className='navbar-menu-link' to="/events">Events</Link>
          </li>
          <li>
            <Link className='navbar-menu-link' to="/blogs">Blogs</Link>
          </li>
          <li>
            <button className='my-notes-button'><Link className='navbar-menu-link' to="/mynotes">My Notes</Link></button>
          </li>
            <li>
              <button className='logout-button' onClick={handleLogout}>Logout</button>
            </li>
            </ul>
          ) : (
            <ul className='navbar-menu'>
            <li>
              <Link to="/login">Login</Link>
            </li>
            </ul>
          )}
        {/* </ul> */}
      </div>
  );
};

export default Navbar;
