import React, {useState} from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import { FaUsers, FaCalendarCheck, FaThumbsUp, FaClipboardCheck, FaHandshake, FaCalendarPlus } from 'react-icons/fa';
import './analytics.css';
import Menu from '../../../components/Admin_Components/Horizontal_Menu/MenuBar';


function AdminAnalytics() {
    //menu bar and side menu bar logics must be in every admin page
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <div>
            <Menu isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />

            <Container>
                <Box my={4}>
                    <Typography variant="h4" gutterBottom align="center">
                        Volunteer Analytics Dashboard
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {[
                        { icon: FaUsers, title: 'Total Volunteers', number: '2,300' },
                        { icon: FaCalendarCheck, title: 'Active Volunteering Events', number: '15' },
                        { icon: FaClipboardCheck, title: 'Completed Events', number: '45' },
                        { icon: FaHandshake, title: 'Volunteer Attendance', number: '87%' },
                        { icon: FaThumbsUp, title: 'Volunteer Satisfaction', number: '92%' },
                        { icon: FaCalendarPlus, title: 'Open Opportunities', number: '10' }
                    ].map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Paper elevation={3} className="analytics-card">
                                <Box className="icon-container">
                                    <item.icon className="analytics-icon" />
                                </Box>
                                <Typography variant="h6">{item.title}</Typography>
                                <Typography variant="h4">{item.number}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}

export default AdminAnalytics;
