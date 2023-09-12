import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtnLink,
  UserFormContainer
} from './NavbarElement';

import { getAuth, signOut } from "firebase/auth";
import { useAuth } from '../../pages/login/AuthContext';

import NewEventForm from '../NewEventForm/NewEventForm.js';
import UserProfile from '../Users/UserDropdown/UserDropdown';
import { Box } from '@mui/material';
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
      <Bars />
      <NavMenu>
         <UserFormContainer> {/* here for styling purposes */}
          <UserProfile userProfile={currUser.uid} handleLogout={handleLogout} />
          <NewEventForm />
        </UserFormContainer>
        <NavLink to={`/users/${currUser.uid}`} id="events-link">Events</NavLink>
      </NavMenu>
    </Nav>
  );
};
export default EventNavbar;