import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar.component';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
// import ProtectedRoute from './protectedRoute';

import firebase from './firebase.js';

import Home from './Pages/Home/Home.pages';
import About from './Pages/AboutUs/About.pages';
import Login from './Pages/Login/Login.page';
import SignUp from './Pages/SignUp/signup.page';
import PasswordReset from './Pages/ForgotPassword/forgotpassword.page';
import MyNotes from './Pages/MyNotes/MyNotes.page';
import Blogs from './Pages/Blogs/Blogs.page';
import BlogForm from './Pages/Blogs/AddBlogs.page';
import NoticeBoardList from './Pages/Events/Events.pages';
import AddNotice from './Pages/Events/AddEvents';
import PdfUpload from './Pages/MyNotes/AddMyNotes';
import SingleBlog from './Pages/Blogs/SingleBlog.page';
import PastEvents from './Pages/Events/PastEvents.pages';
import FacultyPage from './Pages/AboutUs/Faculty.pages';
import YouTubeVideosPage from './Pages/Yoututbe Videos/ytvideos.pages';
import CoursePage from './Pages/Courses/Courses.pages';

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
    <div className='App'>    
      <AuthProvider>
      <Router>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/password-reset" element={<PasswordReset />} />
          <Route exact path="/courses" element={<CoursePage />} />
          <Route exact path="/mynotes" element={<MyNotes />} />
          <Route exact path="/blogs" element={<Blogs />} />
          <Route exact path="/addblogs" element={<BlogForm />} />
          <Route exact path="/events" element={<NoticeBoardList/>} />
          <Route exact path='/past-events' element={<PastEvents/>} />
          <Route exact path="/addevents" element={<AddNotice/>} />
          <Route exact path="/addmynotes" element={<PdfUpload />} />
          <Route path="/blog/:id" element={<SingleBlog/>} />
          <Route path="/faculty" element={<FacultyPage/>} />
          <Route path="/youtube-videos" element={<YouTubeVideosPage/>} />

          {/* <ProtectedRoute exact path="/about" component={<About />} /> */}
          {/* <Route path="/courses" component={Navbar} /> */}
          {/* Add more routes for other pages */}
        </Routes>
      </Router>
    </AuthProvider>
    </div>


  );
}

export default App;
