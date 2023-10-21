import React, { useEffect } from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@mui/material';
import { FiHome, FiUser, FiSettings, FiLogOut, FiEdit, 
    FiBell, FiBarChart2, FiCreditCard, FiHelpCircle } from 'react-icons/fi';  // Using Feather icons
import { Link } from 'react-router-dom'; // <-- Import the Link component


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
                <Link to="/admin/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem button>
                        <ListItemIcon><FiHome /></ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </Link>
                <Link to="/admin/members" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem button>
                        <ListItemIcon><FiUser /></ListItemIcon>
                        <ListItemText primary="Members" />
                    </ListItem>
                </Link>
                <Link to="/admin/edit-events" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem button>
                        <ListItemIcon><FiEdit /></ListItemIcon>
                        <ListItemText primary="Edit Events" />
                    </ListItem>
                </Link>
                <Link to="/admin/announcements" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem button>
                        <ListItemIcon><FiBell /></ListItemIcon>
                        <ListItemText primary="Announcements" />
                    </ListItem>
                </Link>
                <Link to="/admin/analytics" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem button>
                        <ListItemIcon><FiBarChart2 /></ListItemIcon>
                        <ListItemText primary="Analytics" />
                    </ListItem>
                </Link>
                <Link to="/admin/billing" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem button>
                        <ListItemIcon><FiCreditCard /></ListItemIcon>
                        <ListItemText primary="Billing" />
                    </ListItem>
                </Link>
                <Link to="/admin/support" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem button>
                        <ListItemIcon><FiHelpCircle /></ListItemIcon>
                        <ListItemText primary="Support" />
                    </ListItem>
                </Link>
                <Link to="/admin/settings" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem button>
                        <ListItemIcon><FiSettings /></ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>
                </Link>
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
