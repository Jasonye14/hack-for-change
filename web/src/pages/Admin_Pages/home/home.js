import React, { useState } from 'react';
import { Box } from '@mui/material';
import Menu from '../../../components/Admin_Components/Horizontal_Menu/MenuBar';
import UserTable from '../../../components/Admin_Components/UserTable/UserTable';

const Home = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
      setIsDrawerOpen(!isDrawerOpen);
    };
    
    return (
        <div>
      <Menu isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <Box component="main" sx={{ marginLeft: isDrawerOpen ? 240 : 0, transition: 'margin .3s' }}>
        <div style={{ marginTop: '20px', marginLeft: '20px' }}>
          App Content
        </div>
      </Box>
    </div>
    );
};

export default Home;