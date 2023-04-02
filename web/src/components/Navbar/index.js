import React, {useEffect} from 'react';
import { 
    Nav,
    NavLink,
    Bars,
    NavMenu,
} from './NavbarElement';


const Navbar = () => {

  useEffect(() => {

  });


  return (
    <>
      <Nav>
        <Bars/>
        <NavMenu>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/login' style={{marginLeft: "auto", marginRight: "3rem",}}>Login</NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
export default Navbar;