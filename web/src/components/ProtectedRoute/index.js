import React from 'react';
import { Navigate } from 'react-router-dom';

// this.props.match.params.id

const ProtectedRoute = ({ user, children }) => {
    if (!user) {
        return <Navigate to='/NotFound' replace></Navigate>;
    }
};

export default ProtectedRoute;