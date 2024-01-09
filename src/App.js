import './App.css';
import React from 'react';
import DefaultNavbar from './components/Navbar/DefaultNavbar';
import EventNavbar from './components/Navbar/EventNavbar';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home/home';
import UserEvents from './pages/UserEvents/UserEvents';
import UserLogin from './pages/Login/UserLogin';
import UserSignUp from './pages/Signup/UserSignup';
import UserSettings from './components/Users/UserSettings/UserSettings';
import UserProfiles from './components/Users/UserProfiles/UserProfiles';
import Events from './pages/Events/events';
import EventPage from './pages/EventPage/EventPage';
import FAQ from './pages/FAQ/faq';
import Community from './pages/Community/community';
import Volunteer from './pages/Volunteer/volunteer';
import Resources from './pages/Resources/resources';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NotFound from './pages/NotFound';
import { AuthProvider, useAuth } from './pages/Login/AuthContext';

// admin
import AdminDashboard from './pages/AdminPages/home/home';
import AdminMembers from './pages/AdminPages/members/members';
import AdminEvents from './pages/AdminPages/edit-events/edit-events';
import AdminAnnouncements from './pages/AdminPages/announcements/announcements';
import AdminAnalytics from './pages/AdminPages/analytics/analytics';
import AdminBilling from './pages/AdminPages/billing/billing'

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
  const { currUser, setCurrUser } = useAuth();
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
      <Route path="/users/:uid/profile" element={
        <ProtectedRoute>
          <UserProfiles user={currUser} />
        </ProtectedRoute>
      } />

      {/* admin routes */}
      <Route path="/admin"
        element={
          <Navigate
            to="/admin/dashboard"
            replace={true}
          />
        }
      />
      <Route path='/admin/dashboard' element={
        <ProtectedRoute admin >
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path='/admin/members' element={
        <ProtectedRoute admin >
          <AdminMembers />
        </ProtectedRoute>
      } />
      <Route path='/admin/edit-events' element={
        <ProtectedRoute admin >
          <AdminEvents />
        </ProtectedRoute>
      } />
      <Route path='/admin/announcements' element={
        <ProtectedRoute admin >
          <AdminAnnouncements />
        </ProtectedRoute>
      } />
      <Route path='/admin/analytics' element={
        <ProtectedRoute admin >
          <AdminAnalytics />
        </ProtectedRoute>
      } />
      <Route path='/admin/billing' element={
        <ProtectedRoute admin >
          <AdminBilling />
        </ProtectedRoute>
      } />
      <Route path='/admin/support' element={
        <ProtectedRoute admin >
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path='/admin/settings' element={
        <ProtectedRoute admin >
          <AdminDashboard />
        </ProtectedRoute>
      } />


      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function NavBarWrapper() {
  const location = useLocation();
  const { isLoggedIn, currUser, pending } = useAuth();

  if (location.pathname === '/admin' || /^\/admin\/.+/i.test(location.pathname)) { return null } // REPALCE AFTER ROLES ARE IMPLEMENTED IN DATABASE
  if (pending) {
    return null;
  }

  if (!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/signup') {
    console.log(`No one currently logged in. (App.js)`);
    return <DefaultNavbar />;
  }

  if (isLoggedIn && location.pathname !== '/login') {
    console.log(`${currUser.uid} is currently logged in. (App.js)`);
    return <EventNavbar />;

  }

  return null;
}

export default App;
