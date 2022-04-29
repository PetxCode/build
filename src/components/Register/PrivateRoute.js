import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	const { currentUser } = useContext(AuthContext);

	return currentUser ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
