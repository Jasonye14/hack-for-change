import React, { useState } from 'react';

// Assets
import turtle1 from '../../images/home/turtle1.jpg';
import turtle2 from '../../images/home/turtle2.jpg';
import { edu_content, content } from './eduContent';

// Material UI
import { Card, CardMedia, CardContent } from '@mui/material';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Typography, Container, Box, BottomNavigation, Paper, Stack, BottomNavigationAction } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Home = () => {
  const [contentState, setContent] = useState(content[0]);
  const handleContentClick = (index) => {
    setContent(content[index]);
  }

  return (
    <div>
      <Stack>
        <Carousel
          activeIndicatorIconButtonProps={{style: {color: 'grey'}}}
          indicatorIconButtonProps={{style: {zIndex: 51}}}
          navButtonsAlwaysVisible
        >
          <Card>
            <CardMedia
              sx={{ height: 600 }}
              image={turtle1}
              title="sea_turtle"
            />
          </Card>
          <Card>
            <CardMedia
              sx={{ height: 600 }}
              image={turtle2}
              title="sea_turtle"
            />
          </Card>
        </Carousel>

        <Card
          sx={{
            position: "absolute",
            top: "380px",
            zIndex: "50",
            backgroundColor: "transparent",
            boxShadow:"none"
          }}
        >
          <CardContent>
            <Typography variant='h1' sx={{fontSize:"15rem", color:"white"}}>
              Cleanr
            </Typography>
          </CardContent>
        </Card>
        
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
            <Typography variant="body1" sx={{whiteSpace: "pre-line"}}>
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
            padding: 0,
            margin: 0,
            maxWidth: "100% !important",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly"
          }}
        >
          <Box
            sx={{
              width: "40%",
              padding: "20px",
              paddingBottom: "200px",
              backgroundColor: "#003C5F",
              color: "white",
              boxShadow: "3",
              // borderRadius: "10px"
            }}
          >
            <Typography variant='h4'>
              Why should we care?
            </Typography>
            <List>
              {edu_content.map((type, index) => {
                return (
                  <ListItem key={index}>
                    <ListItemButton key={index} sx={{backgroundColor: "#004c79"}} onClick={() => handleContentClick(index)}>
                      <ListItemText primary={type} />
                      <ListItemIcon sx={{color: "white"}}>
                        <ArrowForwardIosIcon></ArrowForwardIosIcon>
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box
            sx={{
              width: "40%",
              padding: "20px",
              backgroundColor: "whitesmoke",
              color: "white"
            }}
          >
            <Paper sx={{backgroundColor:  "hsla(0, 0%, 0%, 0)"}} elevation={0}>
              <Typography variant="body1">
                {contentState.split('\n').map(str => (<span>{str}<br></br></span>))}
              </Typography>
            </Paper>
          </Box>
        </Container>

        <Box sx={{ width: "100%" }}>
          <BottomNavigation sx={{justifyContent:"center", alignItems:"center"}} showLabels>
            <BottomNavigationAction sx={{minWidth:"min-content", flexGrow:0}} label="Cleanr" />
            <BottomNavigationAction sx={{minWidth:"max-content", flexGrow:0}} label="@2023 Hack for Change" />
          </BottomNavigation>
        </Box>
      </Stack>
    </div>
  );
};

export default Home;