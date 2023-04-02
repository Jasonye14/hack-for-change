import React, {useState} from 'react';

//Material UI
// import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { Stack } from '@mui/system';

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
    setTime(event.target.value);
  }
  const handleSubmitForm = () => {
    // ...do something
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
            <TextField required onChange={(e) => handleTimeInput(e)} label="Time" variant="outlined" />
            <Button variant='outlined' onClick={handleSubmitForm}>Add New Event</Button>
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
        </Stack>
        {/* <Box sx={style}>
        </Box> */}
      </Modal>
    </div>
  );
}

export default NewEventForm;