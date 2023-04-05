import React, { useEffect, useState } from 'react';

//Material UI
import { Button, Typography, Modal, TextField, Stack } from '@mui/material';

// Date-time input fields
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// database
import db from '../../utils/firebase';
import { onValue, push, ref, set } from "firebase/database";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  padding: 4,
  gap: "10px"
};

function NewEventForm({ uid }) {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [datetime, setDateTime] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTitleInput = (event) => {
    setTitle(event.target.value);
  }
  const handleDescInput = (event) => {
    setDesc(event.target.value);
  }
  const handleLocationInput = (event) => {
    setLocation(event.target.value);
  }

  const handleDateTimeInput = (event) => {
    console.log("Date:", event);
    if(event.$d !== 'Invalid Date') {
      setDateTime(event.$d);
    }
  }

  const handleSubmitForm = () => {
    setOpen(false);
    setTitle("");
    setDesc("");
    setLocation("");

    const newEvent = {
      title: title,
      desc: desc,
      host: uid,
      location: location,
      event_date: datetime.toISOString(),
      post_date: (new Date()).toISOString()
    }
    
    sessionStorage.setItem(count, JSON.stringify(newEvent));
    setCount(prev => prev+1);

    // const eventsRef = push(ref(db, "events"));
    // set(eventsRef, {
    //   title: title,
    //   desc: desc,
    //   host: uid,
    //   location: location,
    //   event_date: datetime.toISOString(),
    //   post_date: (new Date()).toISOString()
    // });

  }

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" size='large' sx={{backgroundColor: "whitesmoke !important", color: "black"}}>Create New Event</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
              Create A New Event
          </Typography>
          <TextField required onChange={e => handleTitleInput(e)} label="Title" variant='outlined' />
          <TextField required onChange={e => handleDescInput(e)} label="Description" multiline />
          <TextField required onChange={e => handleLocationInput(e)} label="Location" variant="outlined" />
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en'}>
            <DateTimePicker id="datePicker" required label="Date" onChange={(e) => handleDateTimeInput(e)}/>
          </LocalizationProvider>
          <Button variant='outlined' onClick={handleSubmitForm}>Add New Event</Button>
        </Stack>
      </Modal>
    </div>
  );
}

export default NewEventForm;