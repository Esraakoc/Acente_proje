import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  getUserInfoAction } from "./store/Redux/UserStore/UserAction";
import Login from "./components/Login";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar.jsx"
import Sidebar from "./components/Sidebar.jsx"
import SearchFlight from "./components/SearchFlight.jsx";
import Campaigns from "./components/Campaigns.jsx";
import FlightSearchResult from "./components/FlightSearchResult.jsx";
import CampaignDetail from "./components/CampaignDetail .jsx";
import CartPage from "./components/CartPage.jsx";
import PaymentPage from "./components/PaymentPage.jsx";
import SummaryPage from "./components/SummaryPage.jsx";
import BookingHistory from "./components/BookingHistory.jsx";
import ReservationDetail from "./components/ReservationDetail.jsx";

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

      dispatch(getUserInfoAction()).catch(() => {
        localStorage.removeItem("userToken"); 
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
            <Route path="/login" element={<Login />} />
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
              path="/reservations"
              element={
                <ProtectedRoute>
                  <BookingHistory />
                </ProtectedRoute>
              }
            />
             <Route
              path="/reservation/:reservationId"
              element={
                <ProtectedRoute>
                  <ReservationDetail />
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