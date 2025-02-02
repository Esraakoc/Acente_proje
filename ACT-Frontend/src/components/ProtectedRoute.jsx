import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("userToken"); 
  const user = useSelector((state) => state.user.user); 

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children; 
};

export default ProtectedRoute;