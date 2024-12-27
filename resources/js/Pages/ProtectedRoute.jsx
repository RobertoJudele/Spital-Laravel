import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AppContext);
    const navigate = useNavigate();

    if (!(user && user.name)) {
        {
            return navigate("/login");
        }
    }

    return children;
};

export default ProtectedRoute;
