// SignUp.js
import React, { useState } from 'react';
import firebase from '../../firebase';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      // Sign-up successful, you can redirect the user or perform other actions.
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
         <h2>Sign Up</h2>
         <form onSubmit={handleSignup}>
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
