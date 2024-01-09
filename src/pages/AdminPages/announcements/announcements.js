import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, List, ListItem, ListItemText, TextField, IconButton, ListItemSecondaryAction, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import Menu from '../../../components/AdminComponents/Horizontal_Menu/MenuBar';
import './announcements.css';
import mockAnnouncements from './mock';  //to be replaced by firebase databse


function AdminAnnouncements() {

    //menu bar and side menu bar logics must be in every admin page
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const [announcements, setAnnouncements] = useState(mockAnnouncements); // Mock data; integrate with real data
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const handleSubmit = (e) => { //firebase logic for submit
        e.preventDefault();
        // Logic to add new announcement goes here
    };

    const handleEdit = (announcement) => { //firebase logic for edit
        setEditAnnouncement(announcement);
        setOpen(true);
    };

    const handleDelete = (id) => { //firebase logic for delete
        setAnnouncements(prevAnnouncements => prevAnnouncements.filter(announcement => announcement.id !== id));
    };

    const handleClose = () => { //frontend only
        setOpen(false);
        setEditAnnouncement(null);
    };

    const handleSave = () => {
        const updatedAnnouncements = announcements.map(announcement =>
            announcement.id === editAnnouncement.id ? editAnnouncement : announcement
        );
        setAnnouncements(updatedAnnouncements);
        handleClose();
    };


    //edit and delete logics
    const [open, setOpen] = useState(false);
    const [editAnnouncement, setEditAnnouncement] = useState(null);



    return (
        <div>
            <Menu isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
            <Box className="announcements-container">

                {/* Create Announcement */}
                <Card className="announcement-card">
                    <CardContent>
                        <Typography variant="h6">Create Announcement</Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField value={title} onChange={(e) => setTitle(e.target.value)} label="Announcement Title" fullWidth className="announcement-input" />
                            <TextField value={desc} onChange={(e) => setDesc(e.target.value)} label="Announcement Content" fullWidth multiline rows={4} className="announcement-input" />
                            <Button type="submit" variant="contained" color="primary" startIcon={<FaPlus />}>Post Announcement</Button>
                        </form>
                    </CardContent>
                </Card>

                {/* List of Announcements */}
                <Card className="announcement-list-card">
                    <CardContent>
                        <Typography variant="h6">Previous Announcements</Typography>
                        <List>
                            {announcements.map((announcement) => (
                                <ListItem key={announcement.id}>
                                    <ListItemText primary={announcement.title} secondary={announcement.desc} />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(announcement)}>
                                            <FaEdit />  {/* You'll also need to import FaEdit from 'react-icons/fa' */}
                                        </IconButton>

                                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(announcement.id)}>
                                            <FaTrash />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ marginBottom: '0.5em' }}>Edit Announcement</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Title"
                        fullWidth
                        value={editAnnouncement?.title || ''}
                        onChange={(e) => setEditAnnouncement(prev => ({ ...prev, title: e.target.value }))}
                        sx={{ marginY: '0.5em' }} 
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        value={editAnnouncement?.desc || ''}
                        onChange={(e) => setEditAnnouncement(prev => ({ ...prev, desc: e.target.value }))}
                        sx={{ marginY: '0.5em' }} 
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}

export default AdminAnnouncements;
