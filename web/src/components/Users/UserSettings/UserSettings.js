import React, { useState } from 'react';
import './UserSettings.css';

// db
import { ref, set } from "firebase/database";
import db from '../../../utils/firebase';

function UserSettings({ user }) {
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

        // Validate passwords
        if (settingsData.newPassword !== settingsData.confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        console.log("Settings Saved:", settingsData);
        setMessage('Settings Saved Successfully!');

        // Handle saving logic here
        const userReference = ref(db, `users/${user.eUsername}`);
        set(userReference, settingsData);

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
