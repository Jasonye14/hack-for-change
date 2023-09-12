import React from 'react';
import { 
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtnLink
} from './NavbarElement';

import { getAuth, signOut } from "firebase/auth";
import { useAuth } from '../../pages/login/AuthContext';

import NewEventForm from '../NewEventForm/NewEventForm.js';
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

  return (
    <Nav>
      <Bars/>
      <NavMenu style={{ flexDirection: 'row-reverse', justifyContent: 'space-between',}}>
        {/* <NavLink to='/'>Home</NavLink> */}
        <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center'}}>
          <UserProfile userProfile={currUser.uid} handleLogout={handleLogout} />
          <NewEventForm></NewEventForm>
        </div>

        <NavLink to={`/users/${currUser.uid}`} id="events-link">Events</NavLink>
        
      </NavMenu>
    </Nav>
  );
};
export default EventNavbar;