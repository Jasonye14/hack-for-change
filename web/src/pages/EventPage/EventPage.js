import React from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import {
  StyledEventPage,
  EventImgs,
  EventLargeImg,
  EventSmallImg,
  EventDetailsWrapper,
  EventTitle,
  EventSpecWrapper,
  EventDesc
} from './EventPageComponents';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';

// Auth
import { useAuth } from "../login/AuthContext";

// Firebase
import db from "../../utils/firebase";
import { ref, onValue } from "firebase/database";

const comments = [
  { id: 1, name: "John", text: "Great event!" },
  { id: 2, name: "Jane", text: "Can't wait for this!" },
];

function EventPage() {
  const { eventSlug } = useParams();
  const routeLocation = useLocation();
  const { isLoggedIn, currUser, pending } = useAuth();
  const { eventID, imageSource, host, title, desc, location, event_date, post_date } = routeLocation.state;

  const formatDate = (ISODateString) => {
    const date = new Date(ISODateString);
    const date_options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const time_options = { hour: 'numeric', minute: 'numeric'}
    return `${date.toLocaleDateString(undefined, date_options)} ${date.toLocaleTimeString(undefined, time_options)}`;
  };

  if (pending) {
    return <>Loading...</> // Add better loading page
  }

  return (
    <StyledEventPage>
      {/* Event Image(s) */}
      <EventImgs>
        {/* Larger Image */}
        <EventLargeImg
          component="img"
          image={imageSource}
          alt="larger image"
        />
        {/* Smaller Image */}
        <EventSmallImg
          component="img"
          image={imageSource}
          alt="smaller image"
        />
      </EventImgs>


      <EventDetailsWrapper>
        {/* Event Title */}
        <EventTitle variant="h2">
          {title}
        </EventTitle>

        {/* Event Description */}
        {/* <EventTitle variant="h4">About</EventTitle> */}
        <EventDesc variant="body1" paragraph>
          {desc}
        </EventDesc>

        <EventTitle variant="h4">Date and Time</EventTitle>
        <EventSpecWrapper>
          <CalendarMonthTwoToneIcon fontSize="large" />
          <EventDesc>{formatDate(event_date)}</EventDesc>
        </EventSpecWrapper>

        {/* Comments */}
        <Typography variant="h4" gutterBottom>
          Comments
        </Typography>
        {comments.map((comment) => (
          <Paper elevation={3} style={{ padding: "16px", marginBottom: "16px" }} key={comment.id}>
            <Typography variant="h6" gutterBottom>
              {comment.name}
            </Typography>
            <Typography variant="body2" paragraph>
              {comment.text}
            </Typography>
          </Paper>
        ))}

        {/* Comment Input */}
        <TextField
          variant="outlined"
          fullWidth
          label="Add a comment"
          multiline
          rows={3}
          style={{ marginBottom: "16px" }}
        />
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </EventDetailsWrapper>
    </StyledEventPage>
  );
};

export default EventPage;