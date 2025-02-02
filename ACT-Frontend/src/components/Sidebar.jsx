import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import HotelIcon from '@mui/icons-material/Hotel';
import "../styles/sidebar.css";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const handleClickFlight=()=>{
    navigate("/searchFlight");
  }
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        marginTop: '64px', 
        height: 'calc(100% - 64px)', 
        '& .MuiDrawer-paper': {
          marginTop: '65px', 
          height: 'calc(100% - 64px)', 
          boxSizing: 'border-box', 
        },
      }}
    >
      <List> 
        <ListItem button sx={{marginTop:"50px", marginBottom:"10px", cursor:"pointer"}}>
          <ListItemIcon>
            <AirplanemodeActiveIcon />
          </ListItemIcon>
          <ListItemText primary="Uçak Biletleri" onClick={handleClickFlight}/>
        </ListItem>
        <ListItem button sx={{cursor:"pointer"}}>
          <ListItemIcon>
            <HotelIcon />
          </ListItemIcon>
          <ListItemText primary="Otel" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;