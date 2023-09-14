import React, { useState, useEffect } from 'react';
import { 
    StickyNav,
    NavLink,
    Bars,
    NavMenu,
} from './NavbarElement';

const DefaultNavbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    // You can add any side effects or cleanup logic here if required.
  }, []);

  return (
    <nav aria-label="Main Navigation">
      <StickyNav>
        <Bars onClick={toggleMobileMenu} aria-label="Toggle mobile menu"/>
        <NavMenu isOpen={isMobileMenuOpen}>
          <NavLink to='/' aria-label="Home">Home</NavLink>
          <NavLink to='/events' target="_blank" aria-label="Events">Events</NavLink>
          <NavLink to='/community' target="_blank" aria-label="Community">Community</NavLink>
          {/* <NavLink to='/donations' aria-label="Donations">Donate</NavLink> */}
          <NavLink to='/volunteer' target="_blank" aria-label="Volunteer">Volunteer</NavLink>
          <NavLink to='/resources' target="_blank" aria-label="Resources">Resources</NavLink>
          <NavLink to='/faq' target="_blank" aria-label="FAQ">FAQ</NavLink>
          <NavLink 
            to='/login' 
            target="_blank"
            style={{marginLeft: "auto", marginRight: "3rem"}}
            aria-label="Login"
            onMouseEnter={(e) => e.target.style.opacity = 0.7}
            onMouseLeave={(e) => e.target.style.opacity = 1}
          >
            Login
          </NavLink>
        </NavMenu>
      </StickyNav>
    </nav>
  );
};

export default DefaultNavbar;
