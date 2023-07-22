
import './App.css';
import Navbar from './Components/Navbar/Navbar.component';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home/Home.pages';
import About from './Pages/AboutUs/About.pages';
import Login from './Pages/Login/Login.page';
import SignUp from './Pages/SignUp/signup.page';

function App() {
  return (

      <Router>
      <Navbar />
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/login" element={<Login/>} />
        <Route exact path="/signup" element={<SignUp />} />
        {/* <Route path="/courses" component={Navbar} /> */}
        {/* Add more routes for other pages */}
      </Routes>
    </Router>

  );
}

export default App;
