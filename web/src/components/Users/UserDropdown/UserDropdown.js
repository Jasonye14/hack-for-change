import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import defaultAvatar from '../../../images/profile/dog.jpeg';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ userProfile, handleLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClick = (event) => {
    if (isMenuOpen) {
      handleClose();
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleMenuItemClick = (action) => {
    handleClose();

    switch(action) {
      case "profile":
        navigate(`/users/${userProfile}/profile`);
        break;
      case "settings":
        navigate(`/users/${userProfile}/settings`);
        break;
      case "logout":
        if (handleLogout) handleLogout();
        break;
      default:
        break;
    }
  };

  return (
    <Box 
      onClick={handleClick}
      sx={{
        right: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '0.5rem',
        borderRadius: '8px',
        '&:hover': {
          backgroundColor: 'action.hover'
        }
      }}
    >
      <Avatar 
        alt={userProfile.name || "User Avatar"} 
        src={userProfile.avatarURL || defaultAvatar}
        sx={{
          width: "2.7rem",
          height: "2.7rem",
          marginRight: '2rem',
        }}
      />
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleClose}
        PaperProps={{ elevation: 3 }}
      >
        <MenuItem onClick={() => handleMenuItemClick("profile")}>Profile</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("settings")}>Settings</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("logout")}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserProfile;
