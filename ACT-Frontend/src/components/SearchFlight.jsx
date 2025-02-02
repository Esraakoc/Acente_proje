import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Card, CardContent, CardMedia, Stack, Select, MenuItem, Checkbox, FormControlLabel } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import changeIcon from "../images/changeIcon.png";
import {  getFlightInfoAction } from "../store/Redux/FlightStore/FlightAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import mainImg from "../images/flightMainImg.png";
import { getCampaignInfoAction } from "../store/Redux/CampaignStore/CampaignAction";
import kampanya2 from "../images/kampanya2.png";
import kampanya3 from "../images/kampanya3.png";
import kampanya5 from "../images/kampanya5.png";
import kampanya6 from "../images/kampanya6.png";
import pegasusImg from "../images/pegasusIcon.png";
import thyImg from "../images/thyIcon.png";
import { setSelectedCampaign } from "../store/Redux/CampaignStore/CampaignSlice";

const SearchFlight = () => {
  const dispatch =useDispatch();
  const navigate = useNavigate();
  const [tripType, setTripType] = useState("oneWay");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [getFlight, setGetFlight] = useState([]);
  const [departureLocation, setDepartureLocation] = useState("");
  const [arrivalLocation, setArrivalLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [domesticTickets, setDomesticTickets] = useState([]);
  const [internationalTickets, setInternationalTickets] = useState([]);
  const campaigns = useSelector((state) => state.campaign.campaigns);
  
  const campaignImages =[kampanya2, kampanya3];
  campaignImages[2]=kampanya2;
  campaignImages[3]=kampanya3;
  campaignImages[5]=kampanya5;
  campaignImages[6]=kampanya6;

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getFlightInfoAction());
        setGetFlight(response.data); 

       await dispatch(getCampaignInfoAction());
      

        const domesticFlights = response.data.filter(flight => flight.flightCode.startsWith("LYL"));
        const internationalFlights = response.data.filter(flight => flight.flightCode.startsWith("ABR"));  
        const sortedDomesticFlights = domesticFlights.sort((a, b) => a.price - b.price).slice(0, 3);
        const sortedInternationalFlights = internationalFlights.sort((a, b) => a.price - b.price).slice(0, 3);

        setDomesticTickets(
          sortedDomesticFlights.map(flight => ({
            title: `${flight.departureLocation} - ${flight.arrivalLocation}`,
            date: flight.departureDate.split("T")[0],
            price: `${flight.price} TL`,
            airline: flight.airline,
            icon: flight.airline === "THY" ? thyImg : flight.airline === "Pegasus" ? pegasusImg : null,
          }))
        );
        setInternationalTickets(
          sortedInternationalFlights.map(flight => ({
            title: `${flight.departureLocation} - ${flight.arrivalLocation}`,
            date: flight.departureDate.split("T")[0],
            price: `${flight.price} TL`,
            airline: flight.airline,
            icon: flight.airline === "THY" ? thyImg : flight.airline === "Pegasus" ? pegasusImg : null,
          }))
        );
      } catch (error) {
        console.error("Kampanya verileri alınırken hata oluştu:", error);
      }
    };

    fetchData();
  }, []);

  const getImagePath = (campaignId) => {
    return campaignImages[campaignId] || kampanya2;
  };

  const handleSearch = () => {
    navigate("/flight-results", {
      state: {
        departureLocation,
        arrivalLocation,
        departureDate,
      },
    });
  };

  const handleCardClick =(campaign)=>{
    dispatch(setSelectedCampaign(campaign));
    navigate(`/campaign/${campaign.campaignId}`);
  }
  return (
    <Box p={10} sx={{marginLeft:"80px",padding:"39px 0px 0px 80px"}}>
   <div style={{marginBottom:"2vw"}}>

   <img src={mainImg} 
    alt="arka plan"
    style={{
    width:"100%",
    zIndex:"1",
   }}/>
      <Box mb={4} p={5} border="1px solid #ddd" borderRadius={3} bgcolor="#fff" sx={{position:"absolute",top:"10vw",left:"24vw", zIndex:"2"}}>
        <Typography  variant="h5" gutterBottom >
          Uçak Bileti Ara
        </Typography>
        <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
          <FormControlLabel
            control={<Checkbox checked={tripType === "roundTrip"} onChange={() => setTripType("roundTrip")} />}
            label="Gidiş-Dönüş"
          />
          <FormControlLabel
            control={<Checkbox checked={tripType === "oneWay"} onChange={() => setTripType("oneWay")} />}
            label="Tek Yön"
          />
        </Stack>
        <Stack spacing={2} direction={{ xs: "column", sm: "row" }} mt={2}>
        <TextField
          label="Nereden"
          value={departureLocation}
          onChange={(e) => setDepartureLocation(e.target.value)}
          fullWidth
        />
          <img src={changeIcon} style={{width:"40px", height:"30px",marginTop:"10px"}}/>
        <TextField
          label="Nereye"
          value={arrivalLocation}
          onChange={(e) => setArrivalLocation(e.target.value)}
          fullWidth
        />
        <TextField
          label="Gidiş Tarihi"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          fullWidth
        />
          {tripType === "roundTrip" && (
            <TextField
              label="Dönüş Tarihi"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              fullWidth
            />
          )}
       
          <Select
            label="Yolcu Sayısı"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            fullWidth
          >
            {[...Array(10).keys()].map((n) => (
              <MenuItem key={n + 1} value={n + 1}>
                {n + 1} Yolcu
              </MenuItem>
            ))}
          </Select>
           <Button variant="contained"  onClick={handleSearch}  sx={{ flexDirection:"column", backgroundColor:"#506bfd",height:"50px"}}>
          <SearchIcon/>
        </Button>
        </Stack>
       
      </Box>
    </div>
      
      <Typography variant="h5" gutterBottom sx={{fontWeight:"bold",marginLeft:"5%"}}>
        Kampanyalar
      </Typography>
      <Stack direction="row" spacing={2} mt={2} sx={{gap:"2vw", marginBottom:"2vw", margin: "0 5%",justifyContent:"space-between",}}>
        {campaigns.slice(0,4).map((campaign, index) => (
          <Card key={index}  sx={{ minWidth: 250,width:"15vw", paddingBottom:"1vw" , borderRadius:"20px" ,cursor:"pointer", "&:hover": {
            transform: "scale(1.01)",
            boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
          },}} 
          onClick={() => handleCardClick(campaign)}
          >
            <CardMedia
                component="img"
                height="140"
                image={getImagePath(campaign.campaignId)}
                alt={campaign.title}
              />
            <CardContent>
              <Typography gutterBottom variant="h7">
                {campaign.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Box sx={{ display: "flex", flexDirection: "row", marginLeft: "5%", }}>
        <Box sx={{ flex: 1  }}>
          <Typography variant="h6" gutterBottom sx={{margin:"revert"}}>
            Yurt İçi En Ucuz Uçak Biletleri
          </Typography>
          {domesticTickets.map((ticket, index) => (
            <Card key={index} sx={{ marginBottom: "10px", width:"70%" , borderRadius:"10px",cursor:"pointer", "&:hover": {
              transform: "scale(1.01)",
              boxShadow: "0 8px 10px rgba(0,0,0,0.2)",
            }, }}>
             <CardContent sx={{ display: "flex", alignItems: "center", gap: "2vw" }}>
             {ticket.icon && <img src={ticket.icon} alt={`${ticket.airline} logo`} style={{ width: "40px", height: "30px" }} />}
                <Typography>{ticket.title}</Typography>
                <Typography color="text.secondary">
                  {ticket.date}
                </Typography>
                <Typography color="text.primary">
                  {ticket.price}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom sx={{margin:"revert"}}>
            Yurt Dışı En Ucuz Uçak Biletleri
          </Typography>
          {internationalTickets.map((ticket, index) => (
            <Card key={index} sx={{ marginBottom: "10px", width:"70%", borderRadius:"10px",cursor:"pointer", "&:hover": {
              transform: "scale(1.01)",
              boxShadow: "0 8px 10px rgba(0,0,0,0.2)",
            }, }}>
              <CardContent sx={{ display: "flex", alignItems: "center", gap: "2vw" }}>
              {ticket.icon && <img src={ticket.icon} alt={`${ticket.airline} logo`} style={{ width: "40px", height: "30px" }} />}
                <Typography >{ticket.title}</Typography>
                <Typography  color="text.secondary">
                  {ticket.date}
                </Typography>
                <Typography  color="text.primary">
                  {ticket.price}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchFlight;