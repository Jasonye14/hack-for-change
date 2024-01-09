import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../pages/Login/AuthContext';

// database
import { child, get, ref } from "firebase/database";
import db from '../../utils/firebase';

function ProtectedRoute({ admin, children }) { // admin is a boolean that describes whether admin privileges are required to visit some route
    const { isLoggedIn, currUser, pending } = useAuth();
    const routeParams = useParams(); // Get parameters from dynamic route (:uid)
    
    if (pending) {
        console.log("Pending....");
        return <>Loading...</>;  // TODO: Add in a better Loading page
    }

    if (!isLoggedIn || !currUser) {
        console.log("No-one logged in...Redirecting to login...");
        return <Navigate to={'/login'}></Navigate>; // I feel like this should redirect to 404 too
    }

    // page is available to some user
    if (routeParams.uid && (currUser.uid !== routeParams.uid)) {
        console.log(`Authorization error: ${currUser.uid} does not have access to this page.`);
        return <Navigate to={'/404'}></Navigate>; // <---- Consider changing to another page ("you dont have access...")
    }

    // page is only available to admins
    if (admin) {
        // get user info from realtime database in currUser object
        const dbRef = ref(db, '/');
        get(child(dbRef, `users/${currUser.uid}`))
        .then(snapshot => {
            const dbData = snapshot.val();
            console.log(dbData);
            const isAdmin = dbData.admin;
            if (!isAdmin) {
                console.log(`Authorization error: ${currUser.uid} does not have access to this page.`);
                return <Navigate to={'/404'}></Navigate>; // <---- Consider changing to another page ("you dont have access...")
            }
        });
    }

    return children;

}

export default ProtectedRoute;
