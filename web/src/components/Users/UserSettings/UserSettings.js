import React, { useState } from 'react';
import './UserSettings.css';

import db from '../../../utils/firebase';
import { ref, update } from 'firebase/database';
import { getAuth, updatePassword } from 'firebase/auth';

function UserSettings({ user }) {
    // boolean that describes if user was logged in via google or not
    // i.e such accounts shouldn't have the option to change their password
    const googleAccount = user.providerData[0].providerId === "google";

    const [settingsData, setSettingsData] = useState({
        notifications: false,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        privateProfile: false
    });

    const [message, setMessage] = useState(''); // Feedback message

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (e.target.type === 'checkbox') {
            setSettingsData(prevData => ({ ...prevData, [name]: e.target.checked }));
        } else {
            setSettingsData(prevData => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // update notifications field
        const userReference = ref(db, `/users/${user.uid}`);
        update(userReference, {
            notifications: settingsData.notifications
        });

        // ensure all fields are filled
        if (!settingsData.currentPassword ||!settingsData.newPassword || !settingsData.confirmPassword) {
            setMessage('Please enter all fields');
        }

        // Validate passwords
        if (settingsData.newPassword !== settingsData.confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        const auth = getAuth();
        const userAuth = auth.currentUser;

        // TODO: ensure current password field is correct

        // update password for this user
        updatePassword(userAuth, settingsData.newPassword).then(() => {
            console.log("Settings Saved:", settingsData);
            setMessage('Settings Saved Successfully!');
        }).catch((error) => {
            console.log(error.message);
        });

    };

    return (
        <div className="settings-container">
            <h1>Settings</h1>

            {message && <p className="feedback">{message}</p>}

            <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <label htmlFor="notifications">Receive Notifications</label>
                    <label className="switch">
                        <input 
                            type="checkbox"
                            id="notifications"
                            name="notifications"
                            checked={settingsData.notifications}
                            onChange={handleInputChange}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>

                <div className="input-wrapper">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input 
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        disabled={googleAccount}
                        value={settingsData.currentPassword}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-wrapper">
                    <label htmlFor="newPassword">New Password</label>
                    <input 
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        disabled={googleAccount}
                        value={settingsData.newPassword}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-wrapper">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input 
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        disabled={googleAccount}
                        value={settingsData.confirmPassword}
                        onChange={handleInputChange}
                    />
                </div>

                <button className="save-button" type="submit">Save</button>
            </form>
        </div>
    );
}

export default UserSettings;
