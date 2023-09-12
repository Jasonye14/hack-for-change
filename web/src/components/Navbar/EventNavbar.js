import React from 'react';
import { 
    Nav,
    Bars,
    NavMenu
} from './NavbarElement';

import { getAuth, signOut } from "firebase/auth";
import { useAuth } from '../../pages/login/AuthContext';

import NewEventForm from '../NewEventForm/NewEventForm.js';
import UserProfile from '../Users/UserDropdown/UserDropdown';
import { useNavigate } from 'react-router-dom';

const EventNavbar = () => {
  const { currUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
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
      <NavMenu style={{ flexDirection: 'row-reverse'}}>
        {/* <NavLink to='/'>Home</NavLink> */}
        <UserProfile userProfile={currUser.uid} handleLogout={handleLogout} />
        <NewEventForm></NewEventForm>
      </NavMenu>
    </Nav>
  );
};
export default EventNavbar;