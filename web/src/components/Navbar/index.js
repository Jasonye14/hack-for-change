import React, {useEffect} from 'react';
import { 
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtnLink
} from './NavbarElement';

import NewEventForm from '../NewEventForm';

const Navbar = () => {

  useEffect(() => {
    
  });


  return (
    <>
      <Nav>
        <Bars/>
        <NavMenu>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/events'>Events</NavLink>
          <NewEventForm></NewEventForm>

          <NavLink to='/login' style={{marginLeft: "auto", marginRight: "3rem",}}>Login</NavLink>
          <NavBtnLink to='' style={{marginLeft: "auto", marginRight: "3rem",}}>Logout</NavBtnLink>

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
export default Navbar;