import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Button, Snackbar, Alert, Card, CardContent } from "@mui/material";
import airplaneIcon from "../images/airplane.png";
import ticketIcon from "../images/ticket-flight.png";
import travelIcon from "../images/travel-bag.png";
import "../styles/login.css";
import { getUserByIdInfoAction, loginUserAction } from "../store/Redux/UserStore/UserAction";

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

      await dispatch(getUserByIdInfoAction(userId));
     
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
    <div className="login-body">
        <div className="login-container">
      <div className="login-card">
        <Card  className="login-CardContent" style={{position:"relative"}}>
          <CardContent >
            <Typography variant="h5" align="center" gutterBottom>
              Kullanıcı Girişi
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Kullanıcı Adı"
                variant="outlined"
                margin="normal"
                required
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              <TextField
                fullWidth
                label="Şifre"
                type="password"
                variant="outlined"
                margin="normal"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Typography variant="body2"  className="forgot-password">
                <a href="/password-reset-request">Şifremi Unuttum</a>
              </Typography>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                className="login-button"
              >
                Giriş Yap
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <img src={airplaneIcon} alt="Airplane" className="planeicon-image" />
      <div className="login-icons">
        <img src={ticketIcon} alt="Ticket" className="icon-image" />
        <img src={travelIcon} alt="Travel Bag" className="icon-image" />
      </div>


      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </div>
    </div>
  
  );
};

export default Login;