import React from "react";
import { useParams, useLocation } from "react-router-dom";

// Auth
import { useAuth } from "../login/AuthContext";

// Firebase
import db from "../../utils/firebase";
import { ref, onValue } from "firebase/database";

function EventPage() {
  const {isLoggedIn, currUser, pending } = useAuth();
  const { eventSlug } = useParams();
  const eventID = eventSlug.split('-').slice(-1)[0]

  const starCountRef = ref(db, `events/${eventID}`);
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
  });

  return (
    <></>
  );
};

export default EventPage;