import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar.component';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './protectedRoute';

import firebase from './firebase.js';

import Home from './Pages/Home/Home.pages';
import About from './Pages/AboutUs/About.pages';
import Login from './Pages/Login/Login.page';
import SignUp from './Pages/SignUp/signup.page';
import PasswordReset from './Pages/ForgotPassword/forgotpassword.page';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes (user sign-in/sign-out)
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user); // Update the user state when authentication state changes
    });

    // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);


  return (

      <Router>
      <Navbar user={user}/>
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/login" element={<Login/>} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/password-reset" element={<PasswordReset />} />
        {/* <ProtectedRoute exact path="/about" component={<About />} /> */}
        {/* <Route path="/courses" component={Navbar} /> */}
        {/* Add more routes for other pages */}
      </Routes>
    </Router>

  );
}

export default App;
