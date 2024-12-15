import React from "react";
import AppBar from '@mui/material/AppBar';
import HomeIcon from '@mui/icons-material/Home';
import Toolbar from '@mui/material/Toolbar'; 
import Button from '@mui/material/Button';
import flexIcon from "../images/FLEXBOOK.png"
import "../styles/navbar.css";
import AppsIcon from '@mui/icons-material/Apps';
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
function Navbar() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const handleLogout = async (e)=>{
    e.preventDefault();
      localStorage.removeItem("userToken");
      navigate("/login");
  }

  return (
    <AppBar 
      position="fixed" // Navbar'ı sabit üst kısma yerleştir
      className="navbarDiv"
      sx={{
        width: '100%', // Genişliği sayfa genişliği kadar yap
        boxShadow: 'none', // BoxShadow'u kaldır
      }}
    >
      <Toolbar style={{ display: "flex", gap: "5vw" }}>
        <img
          className="imgIcon"
          alt="icon"
          src={flexIcon}
        />
        <div style={{ display: "flex", gap: "2vw" }}>
          <Button className="homeRzIcon" onClick={()=>navigate("/")}>
            <HomeIcon sx={{ color: '#506bfd', fontSize: '22px' }} /> Ana sayfa
          </Button>
          <Button className="homeRzIcon" onClick={()=>navigate("/reservations")}>
            <AppsIcon sx={{ color: '#506bfd', fontSize: '22px' }} /> Rezervasyonlar
          </Button>
        </div>
        <div style={{color:"#506bfd", position:"absolute", right:"12vw",display:"flex", gap:"10px"}}>
          <AccountCircleIcon  />
          <Typography sx={{color:"black", fontWeight:"bold"}}> {user?.firstName || null} {user?.lastName || null}</Typography>
        </div>
        
        <Button
        sx={{ backgroundColor: '#506bfd',position:"absolute", right:"30px"}} onClick={handleLogout} 
        variant="contained"
        >Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;