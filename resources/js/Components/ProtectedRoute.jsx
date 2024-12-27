import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function ProtectedRoute() {
    const { user } = useContext(AppContext);
    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
}
