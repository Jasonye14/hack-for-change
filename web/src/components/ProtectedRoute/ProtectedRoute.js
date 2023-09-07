import React from 'react';
import { redirect, useParams } from 'react-router-dom';
import { useAuth } from '../../pages/login/AuthContext';

function ProtectedRoute({ children }) {
    const { isLoggedIn, currUser, pending } = useAuth();
    const routeParams = useParams(); // Get parameters from dynamic route (:username)

    if (pending) {
        console.log("Pending....");
        return <>Loading...</>;  // Add in a better Loading page
    }

    if (!isLoggedIn || !currUser) {
        console.log("No-one logged in...Redirecting to login...");
        return redirect("/login");
    }

    if (currUser.eUsername !== routeParams.username) {
        console.log(`Tried to go to: ${routeParams.username}. Actual login uid: ${currUser.eUsername}`);
        return redirect("/login"); // <---- Consider changing to another page ("you dont have access...")
    }
    else {
        return children
    }
}

export default ProtectedRoute