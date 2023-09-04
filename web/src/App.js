import './App.css';
import React from 'react';
import NavBar from './components/Navbar';
import Navbar2 from './components/Navbar/index2';
// Pages
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home/home';
import UserEvents from './pages/UserEvents';
import UserLogin from './pages/login/UserLogin';
import UserSignUp from './pages/signup/UserSignup';
import Events from './pages/events/events';
import FAQ from './pages/faq/faq';
import Community from './pages/community/community';
import Volunteer from './pages/volunteer/volunteer';
import Resources from './pages/resources/resources';
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
          <Route path="/users/:username" element={<UserEvents />} />
        </>
      ) : (
        <>
          <Route path='/events' element={<Events />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/community' element={<Community />} />
          <Route path='/volunteer' element={<Volunteer />} />
          <Route path='/resources' element={<Resources />} />
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
