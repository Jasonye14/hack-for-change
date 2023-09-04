import React, { useState, useEffect } from 'react';
import { 
    Nav,
    NavLink,
    Bars,
    NavMenu,
} from './NavbarElement';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    // You can add any side effects or cleanup logic here if required.
  }, []);

  return (
    <nav aria-label="Main Navigation">
      <Nav>
        <Bars onClick={toggleMobileMenu} aria-label="Toggle mobile menu"/>
        <NavMenu isOpen={isMobileMenuOpen}>
          <NavLink to='/' aria-label="Home">Home</NavLink>
          <NavLink to='/events' aria-label="Events">Events</NavLink>
          <NavLink to='/community' aria-label="Community">Community</NavLink>
          {/* <NavLink to='/donations' aria-label="Donations">Donate</NavLink> */}
          <NavLink to='/volunteer' aria-label="Volunteer">Volunteer</NavLink>
          <NavLink to='/resources' aria-label="Resources">Resources</NavLink>
          <NavLink to='/faq' aria-label="FAQ">FAQ</NavLink>
          <NavLink 
            to='/login' 
            style={{marginLeft: "auto", marginRight: "3rem"}}
            aria-label="Login"
            onMouseEnter={(e) => e.target.style.opacity = 0.7}
            onMouseLeave={(e) => e.target.style.opacity = 1}
          >
            Login
          </NavLink>
        </NavMenu>
      </Nav>
    </nav>
  );
};

export default Navbar;
