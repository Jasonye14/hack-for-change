import React from 'react';
import { 
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtnLink
} from './NavbarElement';

import { getAuth, signOut } from "firebase/auth";

import NewEventForm from '../NewEventForm/NewEventForm.js';
import UserProfile from '../UserProfile/UserProfile';
import UserDropdown from '../UserProfile/ProfileDropdown';

const EventNavbar = () => {
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
    <>
      <Nav>
        <Bars/>
        <NavMenu style={{ flexDirection: 'row-reverse'}}>
          {/* <NavLink to='/'>Home</NavLink> */}
          <UserProfile handleLogout={handleLogout} />
          <NewEventForm></NewEventForm>
        </NavMenu>
      </Nav>
    </>
  );
};
export default EventNavbar;