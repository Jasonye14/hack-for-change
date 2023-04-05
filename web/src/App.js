import './App.css';
import React, { useState, useEffect } from 'react';
import NavBar from './components/Navbar';
import Navbar2 from './components/Navbar/UserNav';
// Pages
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home/Home';
import Events from './pages/events/Events';
import UserLogin from './pages/login/UserLogin';
import UserSignUp from './pages/signup/UserSignup';
// import NotFound from './pages/not-found/NotFound';

// Special Components
import ProtectedRoute from './components/ProtectedRoute';

// Database
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import NotFound from './pages/ not-found/NotFound';

function App(props) {
  const [uID, setUID] = useState("");

  useEffect(() => {
    document.cookie = 'loggedin=false'; // store auth state as cookie
  })

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (user) { // if user is signed in
        setUID(user.uid);
      } else {
        window.location.href = "/NotFound";
      }
    });
  }, []);

  return (
    <Router>
      <NavBarWrapper/>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignUp />} />
        <Route path="/users/:username"
          element={
            <ProtectedRoute uID={uID}>
              <Events/>
            </ProtectedRoute>
          }
        />
        <Route path="/NotFound" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
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
  if(location.pathname !== '/'){
    return <Navbar2/>;
  }
  return <NavBar />;
}

export default App;

