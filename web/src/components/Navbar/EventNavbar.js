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

const EventNavbar = () => {
  const { currUser } = useAuth();
  const handleLogout = () => {
    document.cookie = 'loggedin=false'; // store auth state as cookie

    const auth = getAuth();
    signOut(auth).then(() => {
      window.location.href = '/';
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <Nav>
      <Bars/>
      <NavMenu style={{ flexDirection: 'row-reverse'}}>
        {/* <NavLink to='/'>Home</NavLink> */}
        <UserProfile userProfile={currUser.uid} handleLogout={handleLogout} />
        <NewEventForm></NewEventForm>
      </NavMenu>
    </Nav>
  );
};
export default EventNavbar;