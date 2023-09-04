import './App.css';
import React, { useState } from 'react';
import NavBar from './components/Navbar';
import Navbar2 from './components/Navbar/index2';
// Pages
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home/home';
import Events from './pages/events';
import UserLogin from './pages/login/UserLogin';
import UserSignUp from './pages/signup/UserSignup';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
// import NotFound from './pages/NotFound';

function App(props) {
  // useEffect(() => {
  //   document.cookie = 'loggedin=false'; // store auth state as cookie
  // })

  const [user, setUser] = useState(null)

  return (
    <Router>
      <NavBarWrapper/>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/login' element={<UserLogin setUser={setUser}/>} />
        <Route path='/signup' element={<UserSignUp />} />
        <Route path="/events"
          element={
            <ProtectedRoute user={user}>
              <Events />
            </ProtectedRoute>
          }
        />
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

