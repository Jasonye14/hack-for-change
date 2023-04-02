import React, { useState } from 'react';

//Material UI
// import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import dayjs from 'dayjs';

// database
import db from '../../utils/firebase';
import { onValue, ref, set } from "firebase/database";

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

function NewEventForm() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
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
  const handleTimeInput = (event) => {
    console.log(event);
    if(event.$d != 'Invalid Date') {
      setTime(event.$d);
    }
  }
  const handleDateInput = (event) => {
    console.log(event);
    console.log(event);
    if(event.$d != 'Invalid Date') {
      setDate(event.$d);
    }
  }
  const handleSubmitForm = () => {
    // let time = document.getElementById("datePicker")
    // add new event to db
    const eventsReference = ref(db, 'events');
    set(eventsReference, {
      title: title,
      desc: desc,
      host: "logged in",
      location: location,
      event_date: "",
      post_date: ""
    });
  }

  return (
    <div>
      <Button onClick={handleOpen}>Create New Event</Button>
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
            <TextField required onChange={(e) => handleTitleInput(e)} label="Title" variant='outlined' />
            <TextField required onChange={(e) => handleDescInput(e)} label="Description" multiline />
            <TextField required onChange={(e) => handleLocationInput(e)} label="Location" variant="outlined" />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en'}>
              <DatePicker id="datePicker" required label="Date" onChange={(e) => handleDateInput(e)}/>
              <TimeField id="timeField" required label="Time" onChange={(e) => handleTimeInput(e)}/>
            </LocalizationProvider>
            <Button variant='outlined' onClick={handleSubmitForm}>Add New Event</Button>
        </Stack>
      </Modal>
    </div>
  );
}

export default NewEventForm;