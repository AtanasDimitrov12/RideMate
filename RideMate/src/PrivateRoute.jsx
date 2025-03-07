import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, roles = [] }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  // Check if the user is authenticated
  if (!token || !user) {
    return <Navigate to="/register" replace />;
  }

  // Check if the user has the required role
  if (roles.length > 0 && !roles.some((role) => user.roles.includes(role))) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default PrivateRoute;
