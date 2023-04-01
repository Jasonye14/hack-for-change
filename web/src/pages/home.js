import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';

// CSS
import './home.css';

// Assets
import sea_turtle from '../images/sea_turtle.jpg';
import turtle2 from '../images/turtle2.jpg';
import seal_trapped_plastic from '../images/seal_entangled_in_plastic_netting.jpg';

//Material UI
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { Typography, Box, BottomNavigation, Paper, Stack, BottomNavigationAction, CardContent } from '@mui/material';


const edu_content = ['The Effect of Plastic on Marine Life', 'Effects on Land and Forest Life', 'Impact on Human Health'];
const content = {
  0: `Plastics pollution has a direct and deadly effect on marine life. Such effects include:\n\
    1. Entanglement: Marine animals like sea turtles, whales, and dolphins can become entangled in plastic debris, which can cause injury or even death.\n\
    2. Ingestion: Marine animals often mistake plastic debris for food and ingest it, which can lead to blockages in their digestive systems, causing injury, and even death.\n\
    3. Chemical contamination: Plastic debris can release harmful chemicals into the ocean, which can contaminate the water and affect the health of marine animals.\n\
    4. Habitat destruction: Plastic pollution can damage marine habitats, such as coral reefs and seagrass beds, which provide essential habitat for a diverse range of marine species.\n\
    5. Bioaccumulation: Toxic chemicals that are released from plastics can accumulate in the tissues of marine animals over time, potentially leading to health problems and even death.\n\
    6. Altered behavior: Plastic pollution can alter the behavior of marine animals, affecting their feeding patterns, migration, and reproductive success.`,

  1:`Trash litter and plastic pollution also have various harmful effects on animals on land and in forests, including:\n
  1. Ingestion: Animals may mistake litter and plastic debris for food and ingest it, which can cause blockages in their digestive systems, leading to injury or even death.\n
  2. Entanglement: Animals can become entangled in plastic debris or litter, which can lead to injury, amputation of limbs, or even death.\n
  3. Habitat destruction: Trash litter and plastic pollution can damage habitats such as forests, meadows, and wetlands, which are essential for many animal species.\n
  4. Chemical contamination: The chemicals in plastic and litter can leach into the soil, affecting the health of animals and plants that depend on it.\n
  5. Altered behavior: Trash litter and plastic pollution can alter the behavior of animals, affecting their feeding patterns, migration, and reproduction.\n
  6. Disease transmission: Trash litter and plastic pollution can create breeding grounds for disease-carrying insects, which can affect the health of animals in the area.\n
  7. Threats to wildlife populations: Trash litter and plastic pollution can negatively impact wildlife populations, leading to a decline in species diversity and overall ecosystem health.`,

  2:`Trash and plastic pollution can have various negative impacts on human health and happiness, including:\n
  1. Air pollution: Burning of trash releases harmful toxins into the air, which can cause respiratory problems like asthma, bronchitis, and lung cancer.\n
  2. Water pollution: Plastic pollution can contaminate drinking water sources, leading to health problems like gastrointestinal diseases and cancer.\n
  3. Soil pollution: Landfills and garbage dumps can contaminate the soil with toxic chemicals, which can lead to health problems for people living nearby.\n
  4. Aesthetic pollution: Trash and plastic pollution can detract from the beauty of natural areas, reducing the enjoyment of outdoor activities and negatively impacting human happiness.\n
  5. Economic impact: Trash and plastic pollution can negatively impact tourism and recreation industries, leading to a loss of jobs and revenue.\n
  6. Social impact: Trash and plastic pollution can have a negative impact on the social well-being of communities, leading to social unrest and discontent.\n
  7. Food chain contamination: Plastic debris can enter the food chain through contaminated water and soil, potentially leading to health problems for those who consume contaminated food.\n
  Overall, trash and plastic pollution can negatively impact human health and happiness in various ways, making it important to take action to reduce pollution and protect our environment.`
}



const Home = () => {
  const [contentState, setContent] = useState("");
  const handleContentClick = (index) => {
    setContent(content[index]);
  }

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
                  <ListItem key={type}>
                    <ListItemButton sx={{backgroundColor: "#004c79"}} onClick={() => handleContentClick(index)}>
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
                {contentState.split('\n').map(str => (<p>{str}</p>))}
              </Typography>
            </Paper>
          </Box>
        </Container>
        

        <Card variant='square'
          sx={{
            boxShadow: "3px 10px black",
          }}
        >
          <CardMedia
            sx={{
              height: 600,
              width: "100%",
              marginTop: '2rem',
            }}
            image={seal_trapped_plastic}
            title="seal trapped in rope"
          />
        </Card>
      


        <Box sx={{ width: "100%" }}>
          <BottomNavigation showLabels>
            <BottomNavigationAction label="Cleanr" />
            <BottomNavigationAction label="@2023 Hack for Change" />
          </BottomNavigation>
        </Box>
      </Stack>
    </div>
  );
};

export default Home;