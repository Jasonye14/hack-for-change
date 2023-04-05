import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

// Firebase
import { getAuth, onAuthStateChanged } from "firebase/auth";


// this.props.match.params.id

const ProtectedRoute = ({ children }) => {
  const { username } = useParams();
  const [returnVal, setReturnVal] = useState(<div></div>);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, fbUser => {
      if (fbUser) { // if user is signed in
        const email = fbUser.email;
        console.log(email);
        const eUsername = email.replace(/\..+/g, '').replace('@', '');
        if (eUsername === username) {
          setReturnVal(children);
        }
        else {
          window.location.href = '/NotFound';
        }
      } else {
        console.log("auth was null...");
        window.location.href = '/NotFound';
        // setReturnVal(<Navigate to='/NotFound' replace></Navigate>);
      }
    });
  }, []);

  return returnVal;
};

export default ProtectedRoute;