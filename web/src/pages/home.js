import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material'

// CSS
import './home.css';

// Assets
import sea_turtle from '../images/sea_turtle.jpg';
import turtle2 from '../images/turtle2.jpg';

//Material UI
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';


const Home = () => {
  return (
    <div>
      <Carousel
        activeIndicatorIconButtonProps={{
          style: {
              backgroundColor: 'blue' // 2
          }
        }}
        navButtonsAlwaysVisible
      >
        {/* <Card>
          <CardMedia
            sx={{ height: 200 }}
            img={sea_turtle}
            title="sea_turtle"
          >
          </CardMedia>

        </Card>
        <Card>
          <CardMedia
            sx={{ height: 200 }}
            img={sea_turtle}
            title="sea_turtle"
          />
        </Card> */}
        

        {/* <img className={"homeImage"} src={sea_turtle} alt=""></img>
        <img className={"homeImage"} src={turtle2} alt=""></img> */}
      </Carousel>

    </div>
  );
};

export default Home;