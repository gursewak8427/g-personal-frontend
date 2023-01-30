import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from "react-router-dom"
import { getToken } from '../helper/auth';

const ProtectedRoute = ({ token, role, children }) => {
    let location = useLocation();
    if (!token && role == "admin") {
        return <Navigate to="/admin/login" state={{ from: location }} replace />
    } else if (!token && role == "agent") {
        return <Navigate to="/agent/login" state={{ from: location }} replace />
    } else if (!token && role == "student") {
        return <Navigate to="/student/login" state={{ from: location }} replace />
    }
    return children
};

export default ProtectedRoute;