import * as React from 'react';
//image imports
import oceanCleanUp from "../images/events/OceanCleanup.jpeg"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { display } from '@mui/system';

function createCard() {
  return (
    <Card sx={{ maxWidth: "33%", position: "relative", margin: "65px 0 0 0", }}>
      <CardMedia
        sx={{ height: 200 }}
        image={oceanCleanUp}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

const Events = () => {
  return (
    <div style={{display: "flex", justifyContent: "space-between", padding: "20px 20px", }}>
    {createCard()}
    {createCard()}
    {createCard()}
  </div>
  );
};

export default Events;