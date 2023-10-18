import React, {useEffect} from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { FiHome, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';  // Using Feather icons

function SideMenuBar({ isOpen, toggleDrawer }) {
    useEffect(() => {
        // Function to handle click outside of drawer
        const handleClickOutside = (e) => {
          const drawerEl = document.querySelector('.MuiDrawer-root');
          if (drawerEl && !drawerEl.contains(e.target) && isOpen) {
            toggleDrawer();
          }
        };
    
        // Attach the click event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Detach the event listener on component unmount
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [isOpen, toggleDrawer]);

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isOpen}
    >
      <List>
        <ListItem button>
          <ListItemIcon><FiHome /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><FiUser /></ListItemIcon>
          <ListItemText primary="Employees" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><FiSettings /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon><FiLogOut /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default SideMenuBar;
