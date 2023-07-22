// src/components/ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { useNavigate  , Route, Navigate } from 'react-router-dom';
import firebase from './firebase';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [user, setUser] = useState(null);
  // const navigate = useNavigate(); // Get the navigate function from the hook


  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
