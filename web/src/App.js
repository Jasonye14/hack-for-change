import './App.css';
import React from 'react';
import NavBar from './components/Navbar';
import Navbar2 from './components/Navbar/index2';
// Pages
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home/home';
import Events from './pages/events';
import UserLogin from './pages/login/UserLogin';
import UserSignUp from './pages/signup/UserSignup';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NotFound from './pages/NotFound';
import { AuthProvider, useAuth } from './pages/login/AuthContext';

function App(props) {
  return (
    <AuthProvider>
      <Router>
        <NavBarWrapper />
        <RoutesContent />
      </Router>
    </AuthProvider>
  );
}

function RoutesContent() {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      { isLoggedIn ? (
        <>
          <Route path="/users/:username" element={<Events />} />
        </>
      ) : (
        <>
          <Route path='/login' element={<UserLogin />} />
          <Route path='/signup' element={<UserSignUp />} />
          <Route path="*" element={<NotFound />} />
        </>
      )}
    </Routes>
  );
}

function NavBarWrapper() {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  if(!isLoggedIn && location.pathname === '/'){
    return <NavBar />;
  }

  if(isLoggedIn) {
    return <Navbar2 />;
  }

  return null;
}

export default App;
