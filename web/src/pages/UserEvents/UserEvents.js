import React, { useEffect, useState } from 'react';
import './UserEvents.css';

// MUI
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Firebase
import db from '../../utils/firebase';
import { onValue, ref } from "firebase/database";

// Images
import oceanCleanUp from "../../images/events/OceanCleanup.jpeg";
import riverCleanUp from "../../images/events/RiverCleanup.jpeg";
import forestCleanup from "../../images/events/forestCleanup.png";
import cityCleanUp from "../../images/events/CityCleanup.png";
import background from "../../images/events/eventBackground.jpeg";
const images = [oceanCleanUp, riverCleanUp, forestCleanup, cityCleanUp];

const exComments = {0: 'Hello', 1: 'Howdy'}

function EventCard (key, imageSource, event) {
  // Info from Firebase
  const { host, title, desc, location, event_date, post_date } = event;
  let theDate = new Date(event_date);
  let readableTime = theDate.toDateString();
  return (
    <Card key={key} className='event-card'>
      <CardMedia
        sx={{ height: 200 }}
        image={imageSource}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
      </CardContent>
      <CardActions sx={{flexDirection: "column"}}>
        <Button size="small"><Typography>Location: </Typography>{location}</Button>
        <Button size="small"><Typography>Time: </Typography>{readableTime}</Button>
      </CardActions>
    </Card>
  );
}

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // load events from db
    const eventsReference = ref(db, 'events');
    onValue(eventsReference, snapshot => {
      const data = snapshot.val();
      setEvents(Object.values(data));
    });
  }, []);

  return (
    <div className='events-layout'>
      {events.map((event, index) =>
        EventCard(index, images[index%4], event)
      )}
    </div>
  );
};

export default Events;