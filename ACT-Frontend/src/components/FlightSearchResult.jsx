import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Slider,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { getFlightSearchAction } from "../store/Redux/FlightStore/FlightAction";
import { useDispatch } from "react-redux";

const FlightSearchResult = () => {
  const location = useLocation();
  const { departureLocation, arrivalLocation, departureDate } = location.state || {};

  const dispatch = useDispatch();
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [error, setError] = useState("");

  // Filtreler için state
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [priceRange, setPriceRange] = useState([1000, 5000]);
  const [departureTimeRange, setDepartureTimeRange] = useState([0, 24]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await dispatch(
          getFlightSearchAction(departureLocation, arrivalLocation, departureDate)
        );
        setFlights(response.data);
        setFilteredFlights(response.data); // Başlangıçta tüm veriler
      } catch (err) {
        setError("Uygun uçuş bulunamadı.");
      }
    };

    if (departureLocation && arrivalLocation && departureDate) {
      fetchFlights();
    }
  }, [departureLocation, arrivalLocation, departureDate, dispatch]);

  // Havayolu filtresi
  const handleAirlineFilter = (airline) => {
    setSelectedAirlines((prev) =>
      prev.includes(airline) ? prev.filter((a) => a !== airline) : [...prev, airline]
    );
  };

  // Filtreleme işlemi
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

  return (
    <Box sx={{ display: "flex", marginTop: "64px" }}>
      {/* Filtre Bölümü */}
      <Box sx={{ width: "20%", padding: 2, borderRight: "1px solid #ddd" }}>
        <Typography variant="h6" gutterBottom>
          Filtreler
        </Typography>

        {/* Havayolu Filtreleme */}
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

        {/* Fiyat Filtreleme */}
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

        {/* Kalkış Saati Filtreleme */}
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
<div>
     <Box sx={{ flex: 1, padding: 2 }}>
        {/* Nereden - Nereye - Tarih Bölümü */}
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
        </Box>   {/* Uçuş Kartları Bölümü */}
      <Box sx={{ flex: 1, padding: 2 }}>
        <Typography variant="h5" gutterBottom>
          Arama Sonuçları
        </Typography>
        {error && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {filteredFlights.map((flight) => (
            <Card key={flight.flightId} sx={{ width: "100%", padding: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  {flight.departureLocation} → {flight.arrivalLocation}
                </Typography>
                <Typography>Havayolu: {flight.airline}</Typography>
                <Typography>Fiyat: {flight.price} TRY</Typography>
                <Typography>
                  Kalkış: {new Date(flight.departureDate).toLocaleString()}
                </Typography>
                <Typography>
                  Varış: {new Date(flight.arrivalDate).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
</div>
     

        
   
    </Box>
  );
};

export default FlightSearchResult;