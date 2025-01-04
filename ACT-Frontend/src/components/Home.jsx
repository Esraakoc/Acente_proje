import {Box, Card, CardContent, CardMedia, CircularProgress, IconButton, Stack, Typography} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import HotelIcon from "@mui/icons-material/Hotel";
import EventNoteIcon from "@mui/icons-material/EventNote";
import kampanya2 from "../images/kampanya2.png"; 
import kampanya3 from "../images/kampanya3.png";
import kampanya5 from "../images/kampanya5.png";
import kampanya6 from "../images/kampanya5.png";
import { GetReservationByUserIdAction } from "../store/Redux/ReservationStore/ReservationAction";
import {getCampaignInfoAction} from "../store/Redux/CampaignStore/CampaignAction";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { setSelectedCampaign } from "../store/Redux/CampaignStore/CampaignSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const campaignImages = [kampanya2, kampanya3, kampanya5, kampanya6];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === campaignImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? campaignImages.length - 1 : prevIndex - 1
    );
  };

  const [reservations, setReservations] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState({
    totalReservations: 0,
    totalPassengers: 0,
    lastReservationDate: "",
    totalAmount: 0,
  });

  const handleCampaignClick = (campaignId) => {
    const selectedCampaign = {
      campaignId,
      title: `Kampanya ${campaignId + 1}`,
      description: `Bu kampanya ${campaignId + 1}. açıklamasıdır.`,
    };
    dispatch(setSelectedCampaign(selectedCampaign));
    navigate(`/campaign/${campaignId}`);
  };
  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const response = await dispatch(GetReservationByUserIdAction());
        const reservationData = response.data;

        const currentMonth = new Date().getMonth() + 1; 
        const currentYear = new Date().getFullYear();

        const monthlyReservations = reservationData.filter((reservation) => {
          const reservationDate = new Date(reservation.reservationDate);
          return (
            reservationDate.getMonth() + 1 === currentMonth &&
            reservationDate.getFullYear() === currentYear
          );
        });

        const totalReservations = monthlyReservations.length;

        const uniqueCustomers = new Set(
          monthlyReservations.map((reservation) => reservation.customer?.customerId)
        );
        const totalPassengers = uniqueCustomers.size;

        const lastReservationDate = reservationData.length
          ? new Date(
              Math.max(
                ...reservationData.map((reservation) =>
                  new Date(reservation.reservationDate)
                )
              )
            ).toLocaleDateString("tr-TR")
          : "Yok";

        const totalAmount = monthlyReservations.reduce(
          (sum, reservation) => sum + reservation.totalAmount,
          0
        );

        setMonthlyStats({
          totalReservations,
          totalPassengers,
          lastReservationDate,
          totalAmount,
        });

        setReservations(reservationData);
      } catch (error) {
        console.error("Rezervasyon bilgisi alınırken hata oluştu:", error);
      } finally{
        setLoading(false);
      }
    };
   
    fetchReservations();

  }, [dispatch]);

  const stats = [
    { title: "Aylık Toplam Rezervasyonlar", value: monthlyStats.totalReservations },
    { title: "Aylık Toplam Yolcular", value: monthlyStats.totalPassengers },
    { title: "Son Rezervasyon Tarihi", value: monthlyStats.lastReservationDate },
    { title: "Aylık Toplam Miktar", value: `${monthlyStats.totalAmount} TL`  },
    { title: "Aylık Rezervasyon İptalleri", value: "1" },
  ];

  return (
    <Box sx={{ marginLeft: "220px", marginTop: "80px", paddingRight:"30px" }}>
      {
        loading ? (
          <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", height:"80vh"}} >
            <CircularProgress/>
          </Box>
        ) : (
          <>
          <Typography variant="h4" gutterBottom sx={{ marginBottom: "30px",display:"flex" }}>
            Ana Sayfa
          </Typography>
        <Stack spacing={5} direction={{ xs: "column", md: "row" }}>
          {stats.map((stat, index) => (
            <Card
              key={index}
              align="center"
              sx={{
                position: "relative",
                flex: 1,
                backgroundColor: "#F6F7FB",
                borderRadius: "15px",
              }}
            >
              <CardContent>
              <Typography sx={{display:"flex"}}>
                <EventNoteIcon
                  sx={{
                    color: "#506bfd",
                    fontSize: "30px",
                  }}
                />
                <div style={{display:"flex", flexDirection:"column", height: "100px", justifyContent:"space-between"}}>
                  <Typography variant="h7" sx={{ marginLeft: "10px" }}>
                    {stat.title}
                  </Typography>
                  <Typography variant="h5" color="primary" sx={{ color: "#506bfd" }}>
                    {stat.value}
                  </Typography>
                </div>
              </Typography>   

              </CardContent>
            </Card>
          ))}
        </Stack>
        <Stack
          spacing={10}
          direction={{ md: "row" }}
          sx={{ marginTop: "20px", display: "flex" }}
        >
          <Card
            onClick={() => navigate("/searchFlight")}
            sx={{
              height: "160px",
              paddingTop: "10px",
              backgroundColor: "#F6F7FB",
              borderRadius: "15px",
              cursor: "pointer",
            }}
          >
            <CardContent align="center">
              <Typography variant="h6">Uçak Biletleri</Typography>
              <AirplanemodeActiveIcon sx={{ width: "80px", height: "60px" }} />
              <Typography>100'den fazla havayolundan koltuk bulun</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              height: "160px",
              paddingTop: "10px",
              backgroundColor: "#F6F7FB",
              borderRadius: "15px",
            }}
          >
            <CardContent align="center">
              <Typography variant="h6">Otel</Typography>
              <HotelIcon sx={{ width: "80px", height: "60px" }} />
              <Typography>35,000'den fazla en iyi odalar</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              height: "190px",
              lineHeight: "1",
              backgroundColor: "#F6F7FB",
              borderRadius: "15px",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/campaigns");
            }}
          >
          </Card>
        </Stack>
        </>
        )}

        <Box sx={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center",  width: "100%" }}>
          <IconButton
            onClick={handlePrev}
            sx={{
              position: "relative",
              top: "7%",
              transform: "translateY(-50%)",
              backgroundColor: "white",
              color: "black",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)",color:"white" },
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <CardMedia
            component="img"
            image={campaignImages[currentIndex]}
            alt={`Kampanya ${currentIndex + 1}`}
            sx={{
              objectFit:"fill",
              width: "70%",
              height: "207px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              cursor:"pointer"
            }}
            onClick={()=>handleCampaignClick(currentIndex)}
          />
          <IconButton
            onClick={handleNext}
            sx={{
              position: "relative",
              top: "7%",
              color:"rgba(0, 0, 0, 0.7)",
              transform: "translateY(-50%)",
              backgroundColor: "white",
              color: "black",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" ,color:"white"},
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
    </Box>
  );
};

export default Home;