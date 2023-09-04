import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

// database
import db from '../../utils/firebase';
import { onValue, push, ref, set } from "firebase/database";

function ProtectedRoute({ user, redirectPath = '/login', children }) {
    if (!user) {
        return <Navigate to={redirectPath} replace></Navigate>
    }

    return children
}

export default ProtectedRoute