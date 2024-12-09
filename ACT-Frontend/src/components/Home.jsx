import { Alert, Button, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUserAction } from "../store/Redux/UserStore/UserAction";

const Home = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const token = localStorage.getItem("userToken");
  useEffect(() => {
    if (!token) {
      navigate("/login"); // Giriş yapılmadıysa login sayfasına yönlendir
    }
  }, [user, navigate]);

  const handleLogout = async (e)=>{
    e.preventDefault();
    try {
      // Logout işlemi
      await dispatch(logoutUserAction());
      navigate("/login");
    } catch (error) {
      // Hata durumunda mesaj göster
      setSnackbarMessage("Logout failed: " + error.message);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  }
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Button color="primary" onClick={handleLogout} variant="contained">Logout</Button>
      <h1>Welcome, {user?.firstName || "User"}!</h1>
      <p>Here is your personalized dashboard content.</p>


      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </div>
  );
};

export default Home;