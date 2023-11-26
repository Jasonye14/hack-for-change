import './App.css';
import React from 'react';
import DefaultNavbar from './components/Navbar/DefaultNavbar';
import EventNavbar from './components/Navbar/EventNavbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home/home';
import UserEvents from './pages/UserEvents/UserEvents';
import UserLogin from './pages/login/UserLogin';
import UserSignUp from './pages/signup/UserSignup';
import UserSettings from './components/Users/UserSettings/UserSettings';
import UserProfiles from './components/Users/UserProfiles/UserProfiles';
import UserAccount from './components/Users/UserAccount/UserAccount';
import Events from './pages/events/events';
import EventPage from './pages/EventPage/EventPage';
import FAQ from './pages/faq/faq';
import Community from './pages/community/community';
import Volunteer from './pages/volunteer/volunteer';
import Resources from './pages/resources/resources';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NotFound from './pages/NotFound';
import { AuthProvider, useAuth } from './pages/login/AuthContext';

// admin
import AdminDashboard from './pages/Admin_Pages/home/home';
import AdminMembers from './pages/Admin_Pages/members/members';
import AdminEvents from './pages/Admin_Pages/edit-events/edit-events';
import AdminAnnouncements from './pages/Admin_Pages/announcements/announcements';
import AdminAnalytics from './pages/Admin_Pages/analytics/analytics';
import AdminBilling from './pages/Admin_Pages/billing/billing'

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
      <Route path='/events/:eventSlug' element={<EventPage />} />
      <Route path="/users/:uid" element={
        <ProtectedRoute>
          <UserEvents />
        </ProtectedRoute>
      } />
      <Route path="/users/:uid/settings" element={
        <ProtectedRoute>
          <UserSettings user={currUser} />
        </ProtectedRoute>
      } />
      <Route path="/users/:uid/profiles" element={
        <ProtectedRoute>
          <UserProfiles user={currUser} />
        </ProtectedRoute>} />
      <Route path="/users/:uid/account" element={
        <ProtectedRoute>
          <UserAccount user={currUser} />
        </ProtectedRoute>
      } />

      {/* admin routes */}
      <Route path='/admin/dashboard' element={<AdminDashboard />} />
      <Route path='/admin/members' element={<AdminMembers />} />
      <Route path='/admin/edit-events' element={<AdminEvents />} />
      <Route path='/admin/announcements' element={<AdminAnnouncements />} />
      <Route path='/admin/analytics' element={<AdminAnalytics />} />
      <Route path='/admin/billing' element={<AdminBilling />} />
      <Route path='/admin/support' element={<AdminDashboard />} />
      <Route path='/admin/settings' element={<AdminDashboard />} />
      

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function NavBarWrapper() {
  const location = useLocation();
  const { isLoggedIn, currUser, pending } = useAuth();

  if (location.pathname === '/admin' || /^\/admin\/.+/i.test(location.pathname)) {return null } // REPALCE AFTER ROLES ARE IMPLEMENTED IN DATABASE
  if (pending) {
    return null;
  }

  if(!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/signup' ) {
    console.log(`No one currently logged in. (App.js)`);
    return <DefaultNavbar />;
  }

  if(isLoggedIn && location.pathname !== '/login') {
    console.log(`${currUser.uid} is currently logged in. (App.js)`);
    return <EventNavbar />;
;
  }

  return null;
}

export default App;
