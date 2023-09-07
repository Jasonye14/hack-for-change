import React from 'react';
import { 
    Nav,
    Bars,
    NavMenu,
    NavBtnLink
} from './NavbarElement';
import { useNavigate } from 'react-router-dom';

import { getAuth, signOut } from "firebase/auth";

import NewEventForm from '../NewEventForm/NewEventForm.js';

function EventNavbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    document.cookie = 'loggedin=false'; // store auth state as cookie

    const auth = getAuth();
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      console.log(error.message);
    });
  }

  return (
    <Nav>
      <Bars/>
      <NavMenu>
        <NewEventForm></NewEventForm>
        <NavBtnLink style={{marginLeft: "auto", marginRight: "3rem"}} onClick={handleLogout}>Logout</NavBtnLink>

        {/* <Avatar
          alt="Remy Sharp"
          src={blank_prof}
          sx={{ width: "2.7rem", height: "85%"}}
        /> */}
      </NavMenu>
    </Nav>
  );
};
export default EventNavbar;