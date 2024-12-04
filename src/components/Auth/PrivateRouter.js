import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        return true;
    } catch (err) {
        return false;
    }
};

const ProtectedRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
