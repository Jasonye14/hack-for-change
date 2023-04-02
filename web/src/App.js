import './App.css';
import React, { useState } from 'react';
import NavBar from './components/Navbar';
// Pages
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home/home';
import Events from './pages/events';
import UserLogin from './pages/login/UserLogin';
import UserSignUp from './pages/signup/UserSignup';
import NotFound from './pages/NotFound';

function App(props) {

  // const handleClick = () => {
  //   props.addRoute(); // call the handleAddRoute function passed as a prop
  // };
  // const [dynamicRoute, setDynamicRoute] = useState('');

  // // function to add a new route dynamically
  // const handleAddRoute = () => {
  //   const newRoute = '/dynamic-route'; // set the new route path
  //   setDynamicRoute(newRoute); // update the state with the new route path
  // };
  
  //handles login
  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  // };

  return (
    <Router>
      <NavBarWrapper/>
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/events' element={<Events/>} />
        <Route path='/login' element={<UserLogin/>} />
        <Route path='/signup' element={<UserSignUp/>} />
        <Route path="/users/:username" element={<NotFound/>} />
      </Routes>
      
    </Router>
  );
}

function NavBarWrapper() {
  const location = useLocation();
  // Only render the NavBar component if the current route is not /login
  if (location.pathname === '/login' || location.pathname === '/signup' ) {
    return null;
  }
  return <NavBar />;
}

export default App;

