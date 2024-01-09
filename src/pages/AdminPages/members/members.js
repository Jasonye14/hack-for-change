import React, { useState } from 'react';
import { Box } from '@mui/material';
import Menu from '../../../components/AdminComponents/Horizontal_Menu/MenuBar';
import UserTable from '../../../components/AdminComponents/UserTable/UserTable'

const Members = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
      setIsDrawerOpen(!isDrawerOpen);
    };
    
    return (
        <div>
      <Menu isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <Box component="main" sx={{ marginLeft: isDrawerOpen ? 240 : 0, transition: 'margin .3s' }}>
        <UserTable/>
      </Box>
    </div>
    );
};

export default Members;