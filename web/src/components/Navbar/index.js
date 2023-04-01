import React from 'react';
import { 
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtnLink
} from './NavbarElement';

const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars/>
        <NavMenu>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/events'>Events</NavLink>
        </NavMenu>
      </Nav>
    </>
  );
}