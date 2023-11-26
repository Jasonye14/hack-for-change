import React, { useState } from 'react';
import './UserAccount.css';
import { Link } from 'react-router-dom';

import db from '../../../utils/firebase';
import { ref, update } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword, updatePassword } from 'firebase/auth';

function UserAccount({ user }) {
    // boolean that describes if user was logged in via google or not
    // i.e such accounts shouldn't have the option to change their password
    const googleAccount = user.providerData[0].providerId === "google";

    //const userReference = ref(db, `/users/${user.uid}`);
  const {
    firstName,
    lastName,
    displayName,
    email,
    phoneNumber,
    dateOfBirth,
    address,
    education,
    occupation,
    affiliatedOrganization,
  } = user;
  console.log(user.userReference);

  return (
        <div className="profile-container">
          <div className="header">
            <h1>Profile</h1>
          </div>
          <div className="info-container">
            <div className="user-info">
              <h2>{displayName}</h2>
              <p>Email: {email}</p>
            <p>Phone Number: {phoneNumber}</p>
            <p>Date of Birth: {dateOfBirth}</p>
            <p>Address: {address}</p>
            <p>Education: {education}</p>
            <p>Occupation: {occupation}</p>
            <p>Affiliated Organization: {affiliatedOrganization}</p>

      
       
      </div>
    </div>
    <Link to={`/users/${user.uid}/profiles`}>
        <button className="edit-profile-button">Edit Profile</button>
        </Link>
    </div>

  );
}

export default UserAccount;