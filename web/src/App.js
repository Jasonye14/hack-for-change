import './App.css';
import React from 'react';
import DefaultNavbar from './components/Navbar/DefaultNavbar';
import EventNavbar from './components/Navbar/EventNavbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home/home';
import UserEvents from './pages/UserEvents';
import UserLogin from './pages/login/UserLogin';
import UserSignUp from './pages/signup/UserSignup';
import UserSettings from './components/Users/UserSettings/UserSettings';
import UserProfiles from './components/Users/UserProfiles/UserProfiles';
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
  const {currUser, setCurrUser} = useAuth();
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/events' element={<Events />} />
      <Route path='/faq' element={<FAQ />} />
      <Route path='/community' element={<Community />} />
      <Route path='/volunteer' element={<Volunteer />} />
      <Route path='/resources' element={<Resources />} />
      <Route path='/login' element={<UserLogin user={currUser} setUser={setCurrUser} />} />
      <Route path='/signup' element={<UserSignUp />} />
      <Route path="/users/:username" element={
        <ProtectedRoute>
          <UserEvents />
        </ProtectedRoute>
      } />
      <Route path="/users/:username/settings" element={
        <ProtectedRoute>
          <UserSettings />
        </ProtectedRoute>
      } />
      <Route path="/users/:username/profile" element={
        <ProtectedRoute>
          <UserProfiles user={currUser} />
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function NavBarWrapper() {
  const location = useLocation();
  const { isLoggedIn, currUser, pending } = useAuth();

  if (pending) {
    return null;
  }

  if(!isLoggedIn && location.pathname !== '/login') {
    console.log(`No one currently logged in. (App.js)`);
    return <DefaultNavbar />;
  }

  if(isLoggedIn && location.pathname !== '/login') {
    console.log(`${currUser.eUsername} is currently logged in. (App.js)`);
    return <EventNavbar username={currUser.eUsername}/>;
  }

  return null;
}

export default App;
