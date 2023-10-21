import React from "react";
import { useParams, useLocation } from "react-router-dom";
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import {
  StyledEventPage, EventImgs,
  EventLargeImg, EventSmallImg,
  EventDetailsWrapper, EventTitle,
  EventIconWrapper, EventDesc
} from './EventPageComponents';

// Pages/Components
import LoadingPage from "../LoadingPage/LoadingPage";
import Comments from "../../components/Comments/Comments";

// Auth
import { useAuth } from "../login/AuthContext";

// Firebase
import db from "../../utils/firebase";
import { ref, onValue } from "firebase/database";


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
    return <LoadingPage />
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
        <EventIconWrapper>
          <CalendarMonthTwoToneIcon fontSize="large" />
          <EventDesc>{formatDate(event_date)}</EventDesc>
        </EventIconWrapper>
      </EventDetailsWrapper>

      <Comments eventID={eventID}/>
    </StyledEventPage>
  );
};

export default EventPage;