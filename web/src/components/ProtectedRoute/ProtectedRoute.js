import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../pages/login/AuthContext';

function ProtectedRoute({ children }) {
    const { isLoggedIn, currUser, pending } = useAuth();
    const routeParams = useParams(); // Get parameters from dynamic route (:username)

    if (pending) {
        console.log("Pending....");
        return <>Loading...</>;  // TODO: Add in a better Loading page
    }

    if (!isLoggedIn || !currUser) {
        console.log("No-one logged in...Redirecting to login...");
        return <Navigate to={'/login'}></Navigate>;
    }

    if (currUser.eUsername !== routeParams.username) {
        console.log(`Tried to go to: ${routeParams.username}. Actual logged-in user: ${currUser.eUsername}`);
        return <Navigate to={'/404'}></Navigate>; // <---- Consider changing to another page ("you dont have access...")
    }
    else {
        return children
    }
}

export default ProtectedRoute