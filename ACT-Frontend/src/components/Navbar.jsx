import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import HomeIcon from '@mui/icons-material/Home';
import Toolbar from '@mui/material/Toolbar'; 
import Button from '@mui/material/Button';
import flexIcon from "../images/FLEXBOOK.png"
import "../styles/navbar.css";
import AppsIcon from '@mui/icons-material/Apps';
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); 
  };

  const handleMenuClose = () => {
    setAnchorEl(null); 
  };

  const handleLogout = async (e)=>{
    e.preventDefault();
      localStorage.removeItem("userToken");
      navigate("/login");
  }

  return (
    <AppBar 
      position="fixed" 
      className="navbarDiv"
      sx={{
        width: '100%', 
        boxShadow: 'none', 
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
          <IconButton onClick={handleMenuClick} sx={{padding:0,color:"#506bfd"}}>
            <AccountCircleIcon  />
          </IconButton>
          <Typography sx={{color:"black", fontWeight:"bold"}}> {user?.firstName || null} {user?.lastName || null}</Typography>
        </div>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal:"right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal:"right",
          }}
          sx={{marginTop:"6px"}}
        >
          
          <MenuItem onClick={handleLogout} sx={{padding:"10px 25px",fontSize:"15px",fontWeight:"bold"}}><LogoutIcon  sx={{ color: '#506bfd'}} /> Çıkış Yap</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;