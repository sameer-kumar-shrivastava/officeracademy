import React, { useState } from 'react';
import firebase from '../../firebase';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      // Login successful, you can redirect the user to the desired page here.
      console.log("Login successful");
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

  const handlePasswordReset = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      alert('Password reset email sent. Please check your email inbox.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/password-reset"> <button>Forgot Password?</button> </Link>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;