import React from 'react';
import { Navigate } from 'react-router-dom';

// this.props.match.params.id

const ProtectedRoute = ({ uID, children }) => {
    if (uID === "") {
        return <Navigate to='/NotFound' replace></Navigate>;
    }
    else {
        return (
           {children}
        );
    }
};

export default ProtectedRoute;