import * as React from 'react';
//image imports
import oceanCleanUp from "../images/events/OceanCleanup.jpeg"
import background from "../images/events/eventBackground.jpeg";
//MUI imports
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { display } from '@mui/system';

function createCard(imageSource, title, description, location, time) {
  return (
    <Card sx={{ minWidth: "32%", minHeight: "400px", maxHeight: "600px", position: "relative", marginRight: "10px", marginTop: "10px",}}>
      <CardMedia
        sx={{ height: 200 }}
        image={oceanCleanUp}
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
      <CardActions>
        <Button size="small">{location}</Button>
        <Button size="small">{time}</Button>
      </CardActions>
    </Card>
  );
}

const Events = () => {
  const TITLE = "Make an Impact Today";
  return (
    <div style={{backgroundImage: "url(" + background + ")", }}>
      <Typography variant="h3" sx={{paddingTop: "80px", paddingLeft: "35%"}}>{TITLE}</Typography>
      <div style={{ display: "flex", alignContent: "flex-start", minHeight: "100vh", padding: "20px 0px 0px 50px", flexWrap: "wrap"}}>
        {createCard(oceanCleanUp, "Ocean Cleanup", "Saving Ocean", "California", "11am March 13")}
        {createCard(background)}
        {createCard()}
      </div>
    </div>
  );
};

export default Events;