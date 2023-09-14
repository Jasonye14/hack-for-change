import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserEvents.css';

// MUI
import { Card, CardContent, CardMedia, CardActions, CardActionArea } from '@mui/material';
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
const images = [oceanCleanUp, riverCleanUp, forestCleanup, cityCleanUp];

function EventCard (eventID, event, imageSource, navigate) {
  const { host, title, desc, location, event_date, post_date } = event; // Fields stored in Firebase
  let theDate = new Date(event_date);
  let readableTime = theDate.toDateString();

  const redirectToEventPage = (e) => {
    e.preventDefault();
    navigate(`/events/${eventID}`,
      {state: {eventID: eventID, imageSource: imageSource, ...event}}
    );
  }

  return (
    <Card key={eventID} className='event-card'>
      <CardActionArea onClick={e => redirectToEventPage(e)} >
        <CardMedia
          className='event-card-media'
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
          {/* <CardActions sx={{flexDirection: "column"}}>
            <Button size="small"><Typography>Location: </Typography>{location}</Button>
            <Button size="small"><Typography>Time: </Typography>{readableTime}</Button>
          </CardActions> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // load events from db
    const eventsReference = ref(db, 'events');
    onValue(eventsReference, snapshot => {
      setEvents(Object.entries(snapshot.val()));
    });
  }, []);

  return (
    <div className='events-layout'>
      {events.map(([eventID, event], index) =>
        EventCard(eventID, event, images[index%4], navigate)
      )}
    </div>
  );
};

export default Events;