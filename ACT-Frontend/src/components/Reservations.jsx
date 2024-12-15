import React, { useState } from "react";
import { Box, Typography, TextField, Button, Card, CardContent, CardMedia, Stack, Select, MenuItem, Checkbox, FormControlLabel } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import changeIcon from "../images/changeIcon.png";
const Reservations = () => {
  const [tripType, setTripType] = useState("oneWay");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [directFlight, setDirectFlight] = useState(false);
  const domesticTickets = [
    { title: "İstanbul - Ankara", date: "10 Kasım 2024", price: "567 TRY" },
    { title: "İstanbul - Ankara", date: "20 Kasım 2024", price: "567 TRY" },
    { title: "İstanbul - Dalaman", date: "30 Kasım 2024", price: "567 TRY" },
  ];

  const internationalTickets = [
    { title: "Barselona - Milano", date: "25 Aralık 2024", price: "567 TRY" },
    { title: "Antalya - Atina", date: "20 Kasım 2024", price: "567 TRY" },
    { title: "Üsküp - İstanbul", date: "5 Aralık 2024", price: "567 TRY" },
  ];
  const campaigns = [
    {
      title: "AjJet'ten Kıbrıs'a 838 TL'den Başlayan Fiyatlar!",
      image: "kampanya1.png",
    },
    {
      title: "Salzburg Uçuşlarında 250 TL İndirim!",
      image: "kampanya2.png",
    },
    {
      title: "Kuzey Amerika ve Kanada'yı Keşfet!",
      image: "kampanya3.png",
    },
    {
      title: "airBaltic Uçuşlarında Fırsat!",
      image: "kampanya4.png",
    },
  ];

  const handleSearch = () => {
    console.log({ tripType, from, to, departureDate, returnDate, passengers, directFlight });
  };

  return (
    <Box p={10} sx={{marginLeft:"80px"}}>
      {/* Uçak Bileti Ara */}
      <Box mb={4} p={3} border="1px solid #ddd" borderRadius={2} bgcolor="#fff">
        <Typography variant="h5" gutterBottom>
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
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            fullWidth
          />
          <img src={changeIcon} style={{width:"40px", height:"30px",marginTop:"10px"}}/>
          <TextField
            label="Nereye"
            value={to}
            onChange={(e) => setTo(e.target.value)}
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

      {/* Kampanyalar */}
      <Typography variant="h5" gutterBottom>
        Kampanyalar
      </Typography>
      <Stack direction="row" spacing={2} mt={2} overflow="auto">
        {campaigns.map((campaign, index) => (
          <Card key={index} sx={{ minWidth: 250 }}>
            <CardMedia
              component="img"
              alt={campaign.title}
              height="140"
              image={campaign.image}
            />
            <CardContent>
              <Typography gutterBottom variant="h6">
                {campaign.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Box sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Yurt İçi En Ucuz Uçak Biletleri
          </Typography>
          {domesticTickets.map((ticket, index) => (
            <Card key={index} sx={{ marginBottom: "10px" }}>
              <CardContent>
                <Typography variant="body1">{ticket.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {ticket.date}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  {ticket.price}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Yurt Dışı En Ucuz Biletler */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Yurt Dışı En Ucuz Uçak Biletleri
          </Typography>
          {internationalTickets.map((ticket, index) => (
            <Card key={index} sx={{ marginBottom: "10px" }}>
              <CardContent>
                <Typography variant="body1">{ticket.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {ticket.date}
                </Typography>
                <Typography variant="body2" color="text.primary">
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

export default Reservations;