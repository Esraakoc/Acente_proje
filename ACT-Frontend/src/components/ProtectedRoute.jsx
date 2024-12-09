import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("userToken"); // LocalStorage'dan token kontrolü
  const user = useSelector((state) => state.user.user); // Redux'tan kullanıcı bilgisi

  if (!token) {
    // Token veya kullanıcı bilgisi yoksa login'e yönlendir
    return <Navigate to="/login" />;
  }

  return children; // Token ve kullanıcı bilgisi varsa içeriği render et
};

export default ProtectedRoute;