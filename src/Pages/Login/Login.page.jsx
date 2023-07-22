import React, { useState } from 'react';
import firebase from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import './Login.styles.scss';
import GoogleLogo from './googlelogo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      // Login successful, you can redirect the user to the desired page here.
      console.log("Login successful");
      navigate('/');
      <script>
        function myFunction() {
          alert("You are logged in")
        }
      </script>
    } catch (error) {
      setError(error.message);
      console.error('Error logging in:', error);

    }
  };

  const handleGoogleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // The user is signed in with Google successfully.
        // You can access the user's data through result.user, e.g.:
        // const user = result.user;
        navigate('/');
      })
      .catch((error) => {
        // Handle errors that might occur during the sign-in process.
        console.error('Google sign-in error:', error);
      });
  };

  return (
    <div className="login-container-page">
    <div className="login-container">
      <h2>Login</h2>
      <p>
        Don't have an account? <Link className="signup-link" to="/signup">Sign up</Link>
      </p>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <button className="forgot-button">
        <Link to="/password-reset" className="forgot-link">
          Forgot Password?
        </Link>
      </button>
      <button onClick={handleGoogleLogin} className="google-button">
        <img src={GoogleLogo} alt="Google" className="google-icon" />
        Login with Google
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
    </div>
  );
};

export default Login;