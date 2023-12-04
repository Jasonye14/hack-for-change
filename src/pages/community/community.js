import React from 'react';
import { Typography, Card, CardContent, CardMedia, Grid, Container, Paper, Avatar, List, ListItem, ListItemAvatar, ListItemText, Box } from '@mui/material';
import { MdEvent, MdForum, MdNaturePeople, MdLocalFlorist } from 'react-icons/md';
import './community.css';

const CommunityPage = () => {
    return (
        <div className="community-page">
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom>
                            <MdLocalFlorist /> Sustainability Highlights
                        </Typography>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            {/* Add some highlights or news related to sustainability here */}
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom>
                            <MdForum /> Active Discussions
                        </Typography>
                        <List>
                            {/* Map through active discussions here */}
                        </List>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom>
                            <MdNaturePeople /> Meet Community Members
                        </Typography>
                        <Grid container spacing={2}>
                            {/* Showcase community member profiles or featured members here */}
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom>
                            <MdEvent /> Upcoming Events
                        </Typography>
                        <Grid container spacing={2}>
                            {/* Information about upcoming sustainability events */}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default CommunityPage;
