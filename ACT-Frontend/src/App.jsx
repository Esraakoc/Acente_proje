import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserByIdInfoAction, getUserInfoAction } from "./store/Redux/UserStore/UserAction";
import Login from "./components/Login";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar.jsx"
import Sidebar from "./components/Sidebar.jsx"
import SearchFlight from "./components/SearchFlight.jsx";
import Reservations from "./components/Reservations.jsx";
import Campaigns from "./components/Campaigns.jsx";
import FlightSearchResult from "./components/FlightSearchResult.jsx";
import CampaignDetail from "./components/CampaignDetail .jsx";
import CartPage from "./components/CartPage.jsx";
import PaymentPage from "./components/PaymentPage.jsx";
import SummaryPage from "./components/SummaryPage.jsx";

function App () {
  const dispatch = useDispatch();
  const location = useLocation();
  const isExcludedRoute = (pathname) => {
    const excludedPaths = ['/login'];
    return excludedPaths.includes(pathname);
  };
  const isLoginRoute = isExcludedRoute(location.pathname);


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
 
    <div className="app-container">
      {!isLoginRoute && <Navbar />}
      <div className="main-content">
        {!isLoginRoute && <Sidebar />}
        <div  className="content">
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
           <Route
              path="/searchFlight"
              element={
                <ProtectedRoute>
                  <SearchFlight />
                </ProtectedRoute>
              }
            />
             <Route
              path="/reservations"
              element={
                <ProtectedRoute>
                  <Reservations />
                </ProtectedRoute>
              }
            />
             <Route
              path="/campaigns"
              element={
                <ProtectedRoute>
                  <Campaigns />
                </ProtectedRoute>
              }
            />
              <Route
              path="/flight-results"
              element={
                <ProtectedRoute>
                  <FlightSearchResult />
                </ProtectedRoute>
              }
            />
              <Route
              path="/campaign/:id"
              element={
                <ProtectedRoute>
                  <CampaignDetail />
                </ProtectedRoute>
              }
            />
             <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
              <Route
              path="/summary/:reservationId"
              element={
                <ProtectedRoute>
                  <SummaryPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>

  );
};

export default App;