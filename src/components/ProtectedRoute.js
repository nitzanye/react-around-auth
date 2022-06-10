import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, loggedIn, ...props}) => {
    return (
        <Route {...props}>
            {loggedIn ? children : <Navigate to="/signin" />}
        </Route>
    );
}



export default ProtectedRoute;