import React, { useState, useEffect } from "react";
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton, ListItemSecondaryAction, Typography, Box } from '@mui/material';
import { FaPlus, FaTrash } from 'react-icons/fa';
import firebaseConfig from "../../../utils/firebase.config";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
import styled from "@emotion/styled";


import Menu from '../../../components/Admin_Components/Horizontal_Menu/MenuBar';
import UserTable from '../../../components/Admin_Components/UserTable/UserTable';


//styles for tags
const StyledContainer = styled(Container)`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledListItem = styled(ListItem)`
  margin-bottom: 10px;
  border-radius: 5px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
`;

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
  border: 0;
  border-radius: 3px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  color: white;
  height: 48px;
  padding: 0 30px;
  &:hover {
    background: linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%);
  }
`;

const StyledBox = styled(Box)`
  padding: 40px;
  background-color: #f8f9fa;
`;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function AdminEventsPage() {
  //menu bar and side menu bar logics must be in every admin page
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
      setIsDrawerOpen(!isDrawerOpen);
  };


  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    const eventsRef = ref(db, 'events'); 
    const unsubscribe = onValue(eventsRef, (snapshot) => {
      const fetchedEvents = [];
      snapshot.forEach((childSnapshot) => {
        fetchedEvents.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      setEvents(fetchedEvents);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      title: title,
      desc: desc
    };

    const eventsRef = ref(db, 'events'); 
    push(eventsRef, newEvent);

    setTitle('');
    setDesc('');
  };

  const handleDelete = (eventId) => {
    const eventRef = ref(db, `events/${eventId}`);
    remove(eventRef);
  };

  return (
    <div>
      <Menu isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />

      <StyledBox component="main">
        <StyledContainer>
          <StyledForm onSubmit={handleSubmit}>
            <TextField value={title} onChange={(e) => setTitle(e.target.value)} label="Event Title" fullWidth variant="outlined" size="medium" />
            <TextField value={desc} onChange={(e) => setDesc(e.target.value)} label="Event Description" fullWidth multiline rows={4} variant="outlined" size="medium" />
            <StyledButton type="submit" startIcon={<FaPlus />}>
              Add Event
            </StyledButton>
          </StyledForm>

          <List>
            {events.map((event) => (
              <StyledListItem key={event.id}>
                <ListItemText primary={event.title} secondary={event.desc} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(event.id)}>
                    <FaTrash />
                  </IconButton>
                </ListItemSecondaryAction>
              </StyledListItem>
            ))}
          </List>
        </StyledContainer>
      </StyledBox>
    </div>
  );
}

export default AdminEventsPage;
