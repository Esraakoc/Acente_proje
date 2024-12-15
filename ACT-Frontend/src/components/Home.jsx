import { Alert, Box, Card, CardContent, Snackbar, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserByIdInfoAction } from "../store/Redux/UserStore/UserAction";
import "../styles/home.css";
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import HotelIcon from '@mui/icons-material/Hotel';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { getCampaignIdInfoAction, getCampaignInfoAction } from "../store/Redux/CampaignStore/CampaignAction";
import kampanya2 from "../images/kampanya2.png";
const Home = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const stats = [
    { title: "Aylık Toplam Rezervasyonlar", value: "5" },
    { title: "Aylık Toplam Yolcular", value: "5" },
    { title: "Son Rezervasyon Tarihi", value: "10.10.2024" },
    { title: "Aylık Toplam Miktar", value: "25,000 TL" },
    { title: "Aylık Rezervasyon İptalleri", value: "1" },
  ];

  useEffect(() => {
  
    const fetchData = async () => {
      const token = localStorage.getItem("userToken");
      const storedUserId = localStorage.getItem("userId");

      if (!token) {
        console.log("Token bulunamadı, login sayfasına yönlendiriliyor.");
        navigate("/login");
        return;
      }
      
      try {
        // Eğer kullanıcı bilgisi Redux state'te yoksa, API'den al
        if (!user && storedUserId ) {
          await dispatch(getUserByIdInfoAction(storedUserId));
        
        } 
      } catch (error) {
        console.error("Kullanıcı bilgisi alınırken hata:", error);
        navigate("/login"); // Hata durumunda login sayfasına yönlendir
      }
    };

    fetchData();
  }, [dispatch, navigate]);
  useEffect(() => {
  
    const fetchData = async () => {
      const storedUserId = localStorage.getItem("userId");
    
      try {
         await dispatch(getCampaignInfoAction());
        const getCampaign = await dispatch(getCampaignIdInfoAction(2));
      
        // Eğer kullanıcı bilgisi Redux state'te yoksa, API'den al
          await dispatch(getUserByIdInfoAction(storedUserId));
      } catch (error) {
        console.error("Kullanıcı bilgisi alınırken hata:", error);
        navigate("/login"); // Hata durumunda login sayfasına yönlendir
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ marginLeft: "220px", marginTop:"70px"}}>
      <Typography variant="h4" gutterBottom  sx={{ marginBottom:"70px"}}>
        Ana Sayfa
      </Typography>
      <Stack spacing={5} direction={{ xs: "column", md: "row" }}>
        {stats.map((stat, index) => (
          <Card key={index} align="center" sx={{position:"relative", flex: 1, backgroundColor:"#F6F7FB",borderRadius:"15px" }}>
            <CardContent>
              <div style={{display:"flex"}}>
                <Typography> <EventNoteIcon sx={{color:"#506bfd", marginTop:"1vw",fontSize:"30px",position:"absolute"}}/></Typography>
                <Typography variant="h7" sx={{ marginLeft:"10px"}}>  {stat.title}</Typography>
              </div>
              
              <Typography variant="h5" color="primary" sx={{color: '#506bfd'}} >
                {stat.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
      {/* Alt Kısım */}
      <Stack spacing={10} direction={{ md: "row" }} sx={{ marginTop: "20px",display:"flex" }}>
        <Card onClick={()=>navigate("/searchFlight")} sx={{ height:"180px",paddingTop:"10px" , backgroundColor:"#F6F7FB",borderRadius:"15px",cursor:"pointer"}}>
          <CardContent align="center" >
            <Typography variant="h6">Uçak Biletleri</Typography>
            <AirplanemodeActiveIcon sx={{width:"80px", height:"60px"}}/>
            <Typography>100'den fazla havayolundan koltuk bulun</Typography>
          </CardContent>
        </Card>
        <Card sx={{ height:"180px" ,paddingTop:"10px", backgroundColor:"#F6F7FB",borderRadius:"15px"}}>
          <CardContent align="center" >
            <Typography variant="h6">Otel</Typography>
            <HotelIcon sx={{width:"80px", height:"60px"}}/>
            <Typography >35,000'den fazla en iyi odalar</Typography>
          </CardContent>
        </Card>
        <Card sx={{ height:"190px",lineHeight: "1" , backgroundColor:"#F6F7FB",borderRadius:"15px",cursor:"pointer"}} onClick={()=>{navigate("/campaigns")}}>
          <CardContent>
            <Typography variant="h6">Güncel Kampanyalar</Typography>
            <img
              src={kampanya2}
              alt="Kampanya"
              style={{ width: "17vw", borderRadius: "8px",  }}
            />
          </CardContent>
        </Card>
      </Stack>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  
  );
};

export default Home;