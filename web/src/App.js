import './App.css';
import React, { useState, useEffect } from 'react';
import NavBar from './components/Navbar';
import Navbar2 from './components/Navbar/UserNav';
// Pages
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Events from './pages/events/Events';
import UserLogin from './pages/login/UserLogin';
import UserSignUp from './pages/signup/UserSignup';
import NotFound from './pages/not-found/NotFound';

// Special Components
import ProtectedRoute from './components/ProtectedRoute';

// Database
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (user) { // if user is signed in
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <Router>
      <NavBarWrapper />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignUp />} />
        <Route path="/users/:username"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />
        <Route path="/NotFound" element={<NotFound />} />
        <Route path="*" element={<Navigate to='/NotFound' replace></Navigate>} />  
      </Routes>
      
    </Router>
  );
}

function NavBarWrapper() {
  const location = useLocation();
  // Only render the NavBar component if the current route is not /login
  if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/NotFound') {
    return null;
  }

  if(location.pathname !== '/'){
    return <Navbar2/>;
  }
  return <NavBar />;
}

export default App;

