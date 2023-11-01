import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../pages/login/AuthContext';

function ProtectedRoute({ admin, children }) { // admin is a boolean that describes whether admin privileges are required to visit some route
    const { isLoggedIn, currUser, pending } = useAuth();
    const routeParams = useParams(); // Get parameters from dynamic route (:uid)
    // console.log(routeParams);
    
    if (pending) {
        console.log("Pending....");
        return <>Loading...</>;  // TODO: Add in a better Loading page
    }

    if (!isLoggedIn || !currUser) {
        console.log("No-one logged in...Redirecting to login...");
        return <Navigate to={'/login'}></Navigate>;
    }

    if (currUser.uid !== routeParams.uid || (admin && !currUser.admin)) {
        // console.log(`Tried to go to: ${routeParams.uid}. Actual logged-in user: ${currUser.uid}`);
        console.log(`Authorization error: ${currUser.uid} does not have access to this page.`);
        console.log(currUser.admin);
        console.log(admin);
        return <Navigate to={'/404'}></Navigate>; // <---- Consider changing to another page ("you dont have access...")
    }

    return children;

}

export default ProtectedRoute;