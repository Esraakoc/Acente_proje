import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Slider,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { getFlightSearchAction } from "../store/Redux/FlightStore/FlightAction";
import { useDispatch } from "react-redux";
import pegasusImg from "../images/pegasusIcon.png";
import thyImg from "../images/thyIcon.png";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { addCartList } from "../store/Redux/CartStore/CartSlice";
import { addToCartAction } from "../store/Redux/CartStore/CartAction";
const FlightSearchResult = () => {
  const location = useLocation();
  const { departureLocation, arrivalLocation, departureDate } = location.state || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [error, setError] = useState("");

  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [priceRange, setPriceRange] = useState([1000, 5000]);
  const [departureTimeRange, setDepartureTimeRange] = useState([0, 24]);
  const [sortedFlights, setSortedFlights] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    if (sortConfig.key) {
      const sorted = [...flights].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
      setSortedFlights(sorted);
    } else {
      setSortedFlights(flights);
    }
  }, [flights, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };


  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await dispatch(
          getFlightSearchAction(departureLocation, arrivalLocation, departureDate)
        );
        setFlights(response.data);
        setFilteredFlights(response.data); 
      } catch (err) {
        setError("Uygun uçuş bulunamadı.");
      }
    };

    if (departureLocation && arrivalLocation && departureDate) {
      fetchFlights();
    }
  }, [departureLocation, arrivalLocation, departureDate, dispatch]);

  const handleAirlineFilter = (airline) => {
    setSelectedAirlines((prev) =>
      prev.includes(airline) ? prev.filter((a) => a !== airline) : [...prev, airline]
    );
  };

  useEffect(() => {
    const filtered = flights.filter((flight) => {
      const flightPrice = flight.price;
      const flightHour = new Date(flight.departureDate).getHours();

      return (
        (selectedAirlines.length === 0 || selectedAirlines.includes(flight.airline)) &&
        flightPrice >= priceRange[0] &&
        flightPrice <= priceRange[1] &&
        flightHour >= departureTimeRange[0] &&
        flightHour <= departureTimeRange[1]
      );
    });

    setFilteredFlights(filtered);
  }, [selectedAirlines, priceRange, departureTimeRange, flights]);

  const handleAddToCart = async (flight) => {
    const cartData = {
      UserId: localStorage.getItem("userId"), 
      FlightId: flight.flightId, 
      Quantity: 1 
    };
    try {
      await dispatch(addToCartAction(cartData)); 
      navigate("/cart"); 
    } catch (error) {
      console.error("Sepete ekleme hatası:", error);
    }
  };
  return (
    <Box sx={{ display: "flex", marginTop: "64px" }}>
      <Box sx={{ width: "20%", padding: 2, border: "1px solid #d7d7d7", borderRadius: "15px",}}>
        <Typography variant="h6" gutterBottom>
          Filtre
        </Typography>
        <hr/>
        <Box>
          <Typography variant="subtitle1">Havayolları</Typography>
          <FormControlLabel
            control={<Checkbox onChange={() => handleAirlineFilter("Pegasus")} />}
            label="Pegasus"
          />
          <FormControlLabel
            control={<Checkbox onChange={() => handleAirlineFilter("THY")} />}
            label="THY"
          />
          <FormControlLabel
            control={<Checkbox onChange={() => handleAirlineFilter("AnadoluJet")} />}
            label="AnadoluJet"
          />
        </Box>
        <hr/>
        <Box>
          <Typography variant="subtitle1">Fiyat Aralığı</Typography>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={500}
            max={10000}
          />
        </Box>
        <hr/>
        <Box>
          <Typography variant="subtitle1">Kalkış Saati</Typography>
          <Slider
            value={departureTimeRange}
            onChange={(e, newValue) => setDepartureTimeRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={24}
          />
        </Box>
      </Box>
<Box sx={{width:"100%"}}>
      <Box sx={{ flex: 1, padding: 2 }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            marginBottom: 2,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextField label="Nereden" value={departureLocation} fullWidth />
          <TextField label="Nereye" value={arrivalLocation} fullWidth />
          <TextField
            label="Gidiş Tarihi"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={departureDate}
            fullWidth
          />
          <Button variant="contained">Ara</Button>
        </Box>
      </Box>  
      <Box sx={{ flex: 1, padding: 2 }}>
        <Typography variant="h5" gutterBottom>
          Arama Sonuçları
        </Typography>
        {error && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "16px",
            backgroundColor: "#f5f5f5",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          <Typography
            onClick={() => handleSort("airline")}
            sx={{ flex: 1, textAlign: "left", cursor: "pointer", display:" flex" }}
          >
            Havayolu <span ><SwapVertIcon/></span>
          </Typography>
          <Typography
            onClick={() => handleSort("departureDate")}
            sx={{ flex: 1, textAlign: "center", cursor: "pointer", display:" flex" ,justifyContent: "center",}}
          >
            Kalkış <span ><SwapVertIcon/></span>
          </Typography>
          <Typography
            onClick={() => handleSort("departureDate")}
            sx={{ flex: 1, textAlign: "center", display:" flex",paddingLeft:"25px",cursor: "pointer", }}
          >
            Süre <span ><SwapVertIcon/></span>
          </Typography>
          <Typography
            onClick={() => handleSort("arrivalDate")}
            sx={{ flex: 1, textAlign: "center", cursor: "pointer", display:" flex" }}
          >
            Varış <span ><SwapVertIcon/></span>
          </Typography>
          <Typography
            onClick={() => handleSort("price")}
            sx={{ flex: 1, textAlign: "right", cursor: "pointer", display:" flex" }}
          >
            Fiyat (1 kişi)<span ><SwapVertIcon/></span>
          </Typography>
        </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: "16px", }}>
        {sortedFlights.map((flight) => {
          const departureTime = new Date(flight.departureDate);
          const arrivalTime = new Date(flight.arrivalDate);
          const durationInMinutes = Math.floor((arrivalTime - departureTime) / (1000 * 60)); 
          const hours = Math.floor(durationInMinutes / 60); 
          const minutes = durationInMinutes % 60; 

          return (
            <Card
              key={flight.flightId}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 2,
                borderTopRightRadius:"20px",
                borderTopLeftRadius:"20px",
                border: "1px solid #d7d7d7",
              }}
            >
              <Box sx={{ flex: 1, alignItems: "center",marginLeft:"10px" }}>
                <img
                  src={flight.airline === "Pegasus" ? pegasusImg : thyImg}
                  alt={flight.airline}
                  style={{ width: "40px", height: "35px", objectFit: "contain" }}
                />
                <Typography sx={{fontSize:"15px"}} >
                  {flight.airline}
                </Typography>
              </Box>

    
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <Typography>
                  {departureTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </Typography>
              </Box>


              <Box sx={{ flex: 1, textAlign: "center" }}>
                <Typography>
                  {hours}sa {minutes}dk
                </Typography>
              </Box>

       
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <Typography>
                  {arrivalTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </Typography>
              </Box>

          
              <Box sx={{ flex: 1, textAlign: "right" }}>
                <Typography >
                  {flight.price} TL
                </Typography>   
              </Box>
              <Button variant="contained" color="primary" sx={{ marginLeft: "16px",fontSize:"small" }} onClick={()=>handleAddToCart(flight)}>
                  Seç
              </Button>
            </Card>
          );
        })}
      </Box>
      </Box>
</Box>
 
    </Box>
  );
};

export default FlightSearchResult;