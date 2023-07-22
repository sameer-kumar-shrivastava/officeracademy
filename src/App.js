
import './App.css';
import Navbar from './Components/Navbar/Navbar.component';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home.pages';

function App() {
  return (

      <Router>
      <Navbar />
      <Routes>
        <Route path="/"  component={<Home/>} />
        {/* <Route path="/courses" component={Navbar} /> */}
        {/* Add more routes for other pages */}
      </Routes>
    </Router>

  );
}

export default App;
