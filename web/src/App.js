import './App.css';
import React from 'react';
import NavBar from './components/Navbar';
// Pages
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Events from './pages/events';
import UserLogin from './pages/login/UserLogin';
// Firebase
import { db } from './utils/firebase';
import { onValue, ref } from "firebase/database";

function App() {

  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/events' exact element={<Events/>} />
        <Route path='/login' exact element={<UserLogin/>} />
      </Routes>
    </Router>
  );
}

export default App;
