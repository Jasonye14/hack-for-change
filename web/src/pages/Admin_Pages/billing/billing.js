import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Grid, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { FaCreditCard, FaCheckCircle, FaExclamationCircle, FaArrowUp, FaDollarSign } from 'react-icons/fa';
import './billing.css';
import Menu from '../../../components/Admin_Components/Horizontal_Menu/MenuBar';


function AdminBilling() {
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
                        Manage Subscription
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {/* Subscription Details */}
                    <Grid item xs={12} md={8}>
                        <Paper elevation={3} className="billing-card">
                            <Typography variant="h5" gutterBottom>
                                Subscription Details
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemIcon><FaCheckCircle color="green" /></ListItemIcon>
                                    <ListItemText primary="Current Plan: Premium" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><FaDollarSign color="#3f51b5" /></ListItemIcon>
                                    <ListItemText primary="Billing Amount: $99/month" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><FaCreditCard color="#3f51b5" /></ListItemIcon>
                                    <ListItemText primary="Payment Method: **** **** **** 1234" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><FaExclamationCircle color="#f39c12" /></ListItemIcon>
                                    <ListItemText primary="Next Billing Date: 30th Oct 2023" />
                                </ListItem>
                            </List>
                            <Button variant="contained" color="primary" className="upgrade-btn">
                                <FaArrowUp /> Upgrade Plan
                            </Button>
                        </Paper>
                    </Grid>

                    {/* Update Payment Method */}
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} className="billing-card">
                            <Typography variant="h6" gutterBottom>
                                Update Payment Method
                            </Typography>
                            <Button variant="outlined" color="primary" fullWidth>
                                Change Credit Card
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default AdminBilling;
