import React from 'react';
import { Navigate } from 'react-router-dom';
import { ACCESS_TOKEN } from '../constants';

const ProtectedRoute = ({ isLogin, children }) => {
    if (ACCESS_TOKEN() == null && !isLogin) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;
