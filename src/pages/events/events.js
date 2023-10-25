import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Grid } from '@mui/material';
import './events.css';

const eventCategories = [
    { title: 'Cleanup', description: 'Participate in our cleanups to make the environment better!' },
    { title: 'Tree Plantation', description: 'Join us to plant trees and make the world greener!' },
    { title: 'Wildlife Conservation', description: 'Be a part of our efforts to conserve wildlife habitats.' },
    // ... add more categories
];

function EventCard({ title, description }) {
  return (
    <Card style={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small" color="primary" startIcon={<EcoIcon />}>
            Join Now
        </Button> */}
      </CardActions>
    </Card>
  );
}

function Events() {
  return (
    <div className="events-container">
      <h1>Events Page</h1>
      <p>Welcome to the events page. Here you can view and manage your events.</p>
      <Grid container spacing={4}>
        {eventCategories.map((event, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <EventCard title={event.title} description={event.description} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Events;
