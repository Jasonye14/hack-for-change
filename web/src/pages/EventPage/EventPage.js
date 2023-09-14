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
import './EventPage.css';

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

  return (
    <Container className="event-page">
      {/* Event Image(s) */}
      <Card elevation={0} className="event-imgs">
        {/* Larger Image */}
        <CardMedia
          component="img"
          image={imageSource}
          alt="larger image"
          className="event-large-img"
        />
        {/* Smaller Image */}
        <CardMedia
          component="img"
          image={imageSource}
          alt="smaller image"
          className="event-small-img"
        />
      </Card>

      {/* Event Title */}
      <Typography variant="h2" gutterBottom>
        Awesome Event
      </Typography>

      {/* Event Description */}
      <Card elevation={0}>
        <CardContent>
          <Typography variant="body1" paragraph>
            This is an awesome event that you definitely should not miss! Come join us for a day full of fun and excitement.
          </Typography>
        </CardContent>
      </Card>

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
    </Container>
  );
};

export default EventPage;