import {useState} from 'react';
import './EventNavBar.css';
import { 
    StickyNav,
    NavLink,
    Bars,
    NavMenu,
    NavBtnLink,
} from './NavbarElement';
import { FaBell } from 'react-icons/fa';

import { getAuth, signOut } from "firebase/auth";
import { useAuth } from '../../pages/login/AuthContext';

import NewEventForm from '../NewEventForm/NewEventForm.js'; // this wikll be moved into admin menu bar
import UserProfile from '../Users/UserDropdown/UserDropdown';
import { Box } from '@mui/material';

const EventNavbar = () => {
  const { currUser } = useAuth();
  const handleLogout = () => {
    document.cookie = 'loggedin=false'; // store auth state as cookie


    const auth = getAuth();
    signOut(auth).then(() => {
      window.location.href = '/';
    }).catch((error) => {
      console.log("");
    });
  }


  const [showAlerts, setShowAlerts] = useState(false);

  const alerts = [
    'Alert 1: Something happened',
    'Alert 2: Another event occurred',
    'Alert 3: Check this out'
  ];

  return (
    <StickyNav>
      <Bars />
      <NavMenu style={{ flexDirection: 'row-reverse', justifyContent: 'space-between',}}>
        {/* <NavLink to='/'>Home</NavLink> */}
        <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center'}}>
          <UserProfile userProfile={currUser.uid} handleLogout={handleLogout} />
          <button className="AlertIconBtn" onClick={() => setShowAlerts(!showAlerts)}>
              <FaBell id="outlined-icon"/>
          </button>

          {showAlerts && (
            <div className="alerts">
              {alerts.map((alert, index) => (
                <div key={index} className="alert">
                  {alert}
                </div>
              ))}
            </div>
          )}
        </div>

        <NavLink to={`/users/${currUser.uid}`} id="events-link">Events</NavLink>
      </NavMenu>
    </StickyNav>
  );
};
export default EventNavbar;