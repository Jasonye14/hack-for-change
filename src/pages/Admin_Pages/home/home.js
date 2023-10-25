import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, List, ListItem, ListItemText } from '@mui/material';
import { FaChartLine, FaPlus, FaUserCheck, FaCommentDots } from 'react-icons/fa';
import Menu from '../../../components/Admin_Components/Horizontal_Menu/MenuBar';
import UserTable from '../../../components/Admin_Components/UserTable/UserTable';
import './home.css';

const Home = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <Menu isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <Box component="main" sx={{ marginLeft: isDrawerOpen ? 240 : 0, transition: 'margin .3s' }}>
        <Box className="dashboard-container">
          {/* Overview Cards */}
          <Box className="overview-section">
            <Card className="overview-card">
              <CardContent>
                <FaUserCheck className="card-icon" />
                <Typography variant="h5">250</Typography>
                <Typography variant="subtitle1">Total Events</Typography>
              </CardContent>
            </Card>

            <Card className="overview-card">
              <CardContent>
                <FaPlus className="card-icon" />
                <Typography variant="h5">10</Typography>
                <Typography variant="subtitle1">Upcoming Events</Typography>
              </CardContent>
            </Card>

            <Card className="overview-card">
              <CardContent>
                <FaCommentDots className="card-icon" />
                <Typography variant="h5">50</Typography>
                <Typography variant="subtitle1">Recent Feedbacks</Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Charts Section */}
          <Box className="chart-section">
            {/* You can use a library like Recharts or Chart.js to render a chart here. */}
            <FaChartLine size="5em" />
            <Typography>Participants Over Time</Typography>
          </Box>

          {/* Recent Activity */}
          <Box className="activity-section">
            <Typography variant="h6">Recent Activity</Typography>
            <List>
              {/* This is a mockup; integrate with real data */}
              <ListItem><ListItemText primary="John added a new event." secondary="2 hours ago" /></ListItem>
              <ListItem><ListItemText primary="Feedback received from Jane." secondary="5 hours ago" /></ListItem>
              <ListItem><ListItemText primary="Mike updated event details." secondary="1 day ago" /></ListItem>
            </List>
          </Box>

          {/* Quick Actions */}
          <Box className="actions-section">
            <Typography variant="h6">Quick Actions</Typography>
            <Button variant="contained" color="primary" startIcon={<FaPlus />}>Add New Event</Button>
            {/* Add more buttons as needed */}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Home;