import './App.css';
import React from 'react';
import NavBar from './components/Navbar';
// Pages
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home';
import Events from './pages/events';
import UserLogin from './pages/login/UserLogin';
// Firebase
import { db } from './utils/firebase';
import { onValue, ref } from "firebase/database";

function App() {
  return (
    <Router>
      <NavBarWrapper/>
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/events' element={<Events/>} />
        <Route path='/login' element={<UserLogin/>} />
      </Routes>
    </Router>
  );
}

function NavBarWrapper() {
  const location = useLocation();
  // Only render the NavBar component if the current route is not /login
  if (location.pathname === '/login') {
    return null;
  }
  return <NavBar />;
}

export default App;
