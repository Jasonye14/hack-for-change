import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, List, ListItem, ListItemText } from '@mui/material';
import { FaPlus, FaUserCheck, FaCommentDots } from 'react-icons/fa';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Menu from '../../../components/Admin_Components/Horizontal_Menu/MenuBar';
import './home.css';

const Home = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Sample data for the chart
  const data = [
    { name: 'Jan', participants: 400 },
    { name: 'Feb', participants: 300 },
    { name: 'Mar', participants: 500 },
    { name: 'Apr', participants: 200 },
    { name: 'May', participants: 350 },
    { name: 'Jun', participants: 600 },
    { name: 'Jul', participants: 700 },
    { name: 'Aug', participants: 500 },
    { name: 'Sep', participants: 450 },
    { name: 'Oct', participants: 400 },
    { name: 'Nov', participants: 550 },
    { name: 'Dec', participants: 650 }
  ];

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
            <Typography variant="h6">Participants Over Time</Typography>
            <ResponsiveContainer width="95%" height={300}>
              <LineChart data={data}>
                <Line type="monotone" dataKey="participants" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
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