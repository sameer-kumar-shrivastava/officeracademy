// SignUp.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';

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
    <div>
      <h2>Sign Up</h2>
      <p>
        Already a member? <Link to="/login">Sign in</Link>
      </p>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="submit">Sign Up</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignUp;
