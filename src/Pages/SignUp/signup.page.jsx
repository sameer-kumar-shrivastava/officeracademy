// SignUp.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import './signup.styles.scss'

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Create a new user with email and password
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      <script>alert("Congratulations, You are regisered")</script>

      // Get the newly created user's unique ID (UID)
      const userId = userCredential.user.uid;

      await userCredential.user.updateProfile({
        displayName: name,
      });



      // // Store additional user information in Firestore
      // await firebase.firestore().collection('users').doc(userId).set({
      //   name: name,
      //   email: email,
      //   // Add more user details if needed
      // })
      //   .then(() => {
      //     console.log("Document successfully written!");
      //   })
      //   .catch((error) => {
      //     console.error("Error writing document: ", error);
      //   });
      

      // Signup successful, you can redirect the user to the desired page here.
    } catch (error) {
      console.error('Error signing up:', error);
      <script>
        alert("Error":error);
      </script>
    }
  };
  

  return (
    <div className="signup-container-page">
    <div className="signup-container">
      <h2>Sign Up</h2>
      <p>
        Already a member? <Link className='signin-link' to="/login">Sign in</Link>
      </p>
      <form onSubmit={handleSignup} className="signup-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="signup-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signup-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signup-input"
        />
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
      {error && <p className="signup-error">{error}</p>}
    </div>
    </div>
  );
};

export default SignUp;
