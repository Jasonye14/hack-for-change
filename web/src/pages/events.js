/* eslint-disable */
import React, { useEffect, useState } from 'react';
//image imports
import oceanCleanUp from "../images/events/OceanCleanup.jpeg";
import riverCleanUp from "../images/events/RiverCleanup.jpeg";
import forestCleanup from "../images/events/forestCleanup.png";
import cityCleanUp from "../images/events/CityCleanup.png";
import background from "../images/events/eventBackground.jpeg";
//MUI imports
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// database
import db from './../utils/firebase';
import { onValue, ref } from "firebase/database";

const images = [oceanCleanUp, riverCleanUp, forestCleanup, cityCleanUp];

function createCard(key, imageSource, host, title, description, location, event_time, post_time) {
  let theDate = new Date(event_time);
  // let localDate = theDate.toLocaleDateString(), localTime = theDate.toLocaleTimeString()
  let readableTime = theDate.toDateString();
  return (
    <Card key={key} sx={{ width: "32%", maxWidth: "32%", minHeight: "400px", maxHeight: "600px", position: "relative", marginRight: "10px", marginTop: "10px",}}>
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
          {description}
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

    // check if logged in via cookies
    

  }, []);

  return (
    <div style={{ display: "flex", alignContent: "flex-start", minHeight: "100vh", padding: "80px 0px 0px 50px", flexWrap: "wrap", backgroundImage: "url(" + background + ")"}}>
      {/* {createCard(oceanCleanUp, "Host", "Ocean Cleanup", "Saving Ocean", "California", "11am March 13", "Post date")}
      {createCard(background)}
      {createCard()} */}
      {events.map((e, index) => createCard(index, images[index%4], e.host, e.title, e.desc, e.location, e.event_date, e.post_date))}
    </div>
  );
};

export default Events;