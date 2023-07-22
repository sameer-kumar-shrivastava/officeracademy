// src/components/PasswordReset.js
import React, { useState } from 'react';
import firebase from '../../firebase';

const PasswordReset = () => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      alert('Password reset email sent. Please check your email inbox.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      alert('Error sending password reset email:', error);
    }
  };

  return (
    <div>
      <h2>Password Reset</h2>
      <form onSubmit={handlePasswordReset}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default PasswordReset;
