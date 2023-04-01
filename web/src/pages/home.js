import React from 'react';

// CSS
import './home.css';

// Assets
import sea_turtle from '../images/sea_turtle.jpg';

//Material UI
import Container from '@mui/material/Container';

const Home = () => {
  return (
    <div>
      <img className={"homeImage"} src={sea_turtle} alt=""></img>
      
    </div>
  );
};

export default Home;