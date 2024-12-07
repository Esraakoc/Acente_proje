import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserInfoAction } from "./store/Redux/UserStore/UserAction";
import Login from "./components/Login";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (token) {
      // Kullanıcı bilgilerini al ve Redux'a kaydet
      dispatch(getUserInfoAction()).catch(() => {
        localStorage.removeItem("userToken"); // Hata durumunda token'ı temizle
      });
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Giriş Sayfası */}
        <Route path="/login" element={<Login />} />

        {/* Korumalı Rotalar */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
};

export default App;