import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button, TextField, Typography, Snackbar, Alert } from "@mui/material";
import "../styles/login.css";
import { loginUserAction } from "../store/Redux/UserStore/UserAction";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userInfo = { userId, password };

      // Login işlemi
      await dispatch(loginUserAction(userInfo));

      // Başarılı girişte ana sayfaya yönlendir
      navigate("/");
    } catch (error) {
      // Hata durumunda mesaj göster
      setSnackbarMessage("Login failed: " + error.message);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <div className="loginDiv">
      <div className="login-form-div">
        <form className="login-form" onSubmit={handleSubmit}>
          <Typography variant="h5">User Login</Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="User ID"
            name="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            className="login-form-btn"
            variant="contained"
            color="primary"
          >
            Sign in
          </Button>
        </form>
      </div>

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

export default Login;