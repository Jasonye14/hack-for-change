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

const Navbar2 = () => {
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
        <NavMenu>
          {/* <NavLink to='/'>Home</NavLink> */}
          <NewEventForm></NewEventForm>
          <NavBtnLink style={{marginLeft: "auto", marginRight: "3rem",}} onClick={handleLogout}>Logout</NavBtnLink>
          <UserProfile></UserProfile>

          {/* <Avatar
            alt="Remy Sharp"
            src={blank_prof}
            sx={{ width: "2.7rem", height: "85%"}}
          /> */}
        </NavMenu>
      </Nav>
    </>
  );
};
export default Navbar2;