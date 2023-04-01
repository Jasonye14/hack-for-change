import React from 'react';
import Carousel from 'react-material-ui-carousel';

// CSS
import './home.css';

// Assets
import sea_turtle from '../images/sea_turtle.jpg';
import turtle2 from '../images/turtle2.jpg';

//Material UI
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Typography, Box, BottomNavigation, Paper, Stack } from '@mui/material';


const Home = () => {
  return (
    <div>
      <Stack>
        <Carousel
          activeIndicatorIconButtonProps={{
            style: {
                color: 'grey' // 2
            }
          }}
          navButtonsAlwaysVisible
        >
          <Card>
            <CardMedia
              sx={{ height: 600 }}
              image={sea_turtle}
              title="sea_turtle"
            >
            </CardMedia>

          </Card>
          <Card>
            <CardMedia
              sx={{
                height: 600,
                margin: "auto"
              }}
              image={turtle2}
              title="sea_turtle"
            />
          </Card>
        </Carousel>
        
        <Container sx={{
          padding: 5
        }}>
          <Typography variant='h1'>
            Our Mission Statement
          </Typography>
          <Paper
            sx={{
              textAlign: 'center',
              height: 'fit-content',
              width: "90%",
              padding: '30px',
              lineHeight: '60px,'
            }}
            elevation={8}
          >
            <Typography variant="body1">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
              deserunt mollit anim id est laborum."
            </Typography>
          </Paper>
        </Container>

        <Container
          sx={{
            
          }}
        >
          <Box
            sx={{
              width: "40%",
              padding: "20px",
              backgroundColor: "#003C5F",
              borderRadius: "10px"
            }}
          >
            <List>
              <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Why does it matter?" />
              </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Container>
      


        <Box sx={{ width: "100%" }}>
          <BottomNavigation
            showLabels
          >
          </BottomNavigation>
      </Box>

      </Stack>



    </div>
  );
};

export default Home;