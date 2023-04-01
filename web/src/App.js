import './App.css';
import React from 'react';
import NavBar from './components/Navbar';
// Pages
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Events from './pages/events';
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
      </Routes>
    </Router>
  );
}

export default App;
