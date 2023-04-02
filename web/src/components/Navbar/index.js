import React from 'react';
import { 
    Nav,
    NavLink,
    Bars,
    NavMenu,
} from './NavbarElement';

// Material UI

//Assets

const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars/>
        <NavMenu>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/events'>Events</NavLink>
          <NavLink to='/login' style={{marginLeft: "auto", marginRight: "3rem",}}>Login</NavLink>
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