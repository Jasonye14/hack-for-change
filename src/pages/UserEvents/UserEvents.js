import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserEvents.css';

// MUI
import { Tooltip, Icon, Card, CardContent, CardMedia, CardActions, CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EventsBar from '../../components/EventsBar/EventsBar';

// Firebase
import db from '../../utils/firebase';
import { onValue, ref } from "firebase/database";

// External Components
import BookingCard from '../../examples/Cards/BookingCard';
import MDTypography from '../../components/ExternalComponents/MDTypography';

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
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  // Action buttons for the BookingCard
  const actionButtons = (
    <>
      <Tooltip title="Refresh" placement="bottom">
        <MDTypography
          variant="body1"
          color="primary"
          lineHeight={1}
          sx={{ cursor: "pointer", mx: 3 }}
        >
          <Icon color="inherit">refresh</Icon>
        </MDTypography>
      </Tooltip>
      <Tooltip title="Edit" placement="bottom">
        <MDTypography variant="body1" color="info" lineHeight={1} sx={{ cursor: "pointer", mx: 3 }}>
          <Icon color="inherit">edit</Icon>
        </MDTypography>
      </Tooltip>
    </>
  );

  useEffect(() => {
    // load events from db
    const eventsReference = ref(db, 'events');
    onValue(eventsReference, snapshot => {
      setEvents(Object.entries(snapshot.val()));
    });
  }, []);

  return (
    <div className='events-wrapper'>
      <EventsBar></EventsBar>
      <div className='events-layout'>
        {/* {events.map(([eventID, event], index) =>
          EventCard(eventID, event, images[index%4], navigate)
        )} */}

        <BookingCard
          image={oceanCleanUp}
          title="Cozy 5 Stars Apartment"
          description='The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona.'
          price="$899/night"
          location="Barcelona, Spain"
          action={actionButtons}
        />

      </div>
    </div>
  );
};

export default Events;