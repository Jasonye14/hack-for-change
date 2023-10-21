import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import SideMenuBar from '../Side_Menu/SideMenuBar';
import { FiBell, FiMenu, FiX } from 'react-icons/fi';  // Using Feather icons

function MenuBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AppBar position="static">
      <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
          {isOpen ? <FiX /> : <FiMenu />}
        </IconButton>
        <Typography variant="h6" style={{flexGrow: 1}}>
          Admin Console
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <FiBell />
          </Badge>
        </IconButton>
      </Toolbar>
      <SideMenuBar isOpen={isOpen} toggleDrawer={toggleDrawer} />
    </AppBar>
  );
}

export default MenuBar;
