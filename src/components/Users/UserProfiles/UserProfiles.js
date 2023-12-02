import React, { useState } from 'react';
import './UserProfiles.css';

// database
import db from '../../../utils/firebase';
import { ref, update } from 'firebase/database';
import { Button } from '@mui/material';

function UserProfiles({ user }) {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        city: '',
        education: '',
        occupation: '',
        affiliatedOrganization: ''
    });

    const [message, setMessage] = useState(''); // Feedback message

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple front-end validation for email and phone number
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const phonePattern = /^[0-9]{10}$/; // Very basic phone number validation

        if (!emailPattern.test(userData.email)) {
            setMessage('Please enter a valid email city.');
            return;
        }

        if (!phonePattern.test(userData.phoneNumber)) {
            setMessage('Please enter a valid 10-digit phone number.');
            return;
        }

        const userReference = ref(db, `/users/${user.uid}`);
        update(userReference, userData);

        console.log("User Data Saved:", userData);
        setMessage('User Data Saved Successfully!'); // Successful feedback

    };

    return (
        <div className="settings-container">
            <h1>Personal Information</h1>

            {message && <p className="feedback">{message}</p>}

            <form onSubmit={handleSubmit}>
                <Button
                    variant="contained"
                    component="label"
                >
                    Change Profile Picture
                    <input
                        type="file"
                        hidden
                    />
                </Button>

                <div className="input-wrapper">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="input-wrapper">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="input-wrapper">
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="input-wrapper">
                    <label htmlFor="phoneNumber">Phone Number *</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="input-wrapper">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={userData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="input-wrapper">
                    <label htmlFor="affiliatedOrganization">Affiliated Organization *</label>
                    <input
                        type="text"
                        id="affiliatedOrganization"
                        name="affiliatedOrganization"
                        value={userData.affiliatedOrganization}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="input-wrapper">
                    <label htmlFor="occupation">Occupation</label>
                    <input
                        type="text"
                        id="occupation"
                        name="occupation"
                        value={userData.occupation}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-wrapper">
                    <label htmlFor="city">City</label>
                    <input
                        id="city"
                        name="city"
                        value={userData.city}
                        onChange={handleInputChange}
                    />
                </div>

                <button className="save-button" type="submit">Save</button>
            </form>
        </div>
    );
}

export default UserProfiles;
