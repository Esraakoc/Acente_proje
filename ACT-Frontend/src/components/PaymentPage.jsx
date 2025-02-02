import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton,
  Checkbox,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import barkod from "../images/barkod.png"
import "../styles/paymentPage.css";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useDispatch, useSelector } from "react-redux";
import { addToPaymentAction } from "../store/Redux/PaymentStore/PaymentAction";
import { addToReservationAction } from "../store/Redux/ReservationStore/ReservationAction";
import { useNavigate } from "react-router-dom";
const PaymentPage = () => {
  const navigate =useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    birthDate: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    creditCardNo: "",
    expiryDate: "",
    cvv: "",
  });

  const dispatch =useDispatch();
  const selectedFlight = useSelector((state) => state.cart.selectedFlight); 
  const [isCustomerInfoSubmitted, setIsCustomerInfoSubmitted] = useState(false);
  const [isPaymentInfoSubmitted, setIsPaymentInfoSubmitted] = useState(true);
  const [saveCard, setSaveCard] = useState(false);

  const handleCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handleCustomerSubmit = () => {
    setIsCustomerInfoSubmitted(true);
    setIsPaymentInfoSubmitted(false)
    setActiveStep(1);
  };

  const handlePaymentSubmit = () => {
    setIsPaymentInfoSubmitted(true);
    setActiveStep(2);
  };

  const handleEditCustomerInfo = () => {
    setIsCustomerInfoSubmitted(false);
    setIsPaymentInfoSubmitted(true);
    setActiveStep(0);
  };

  const handleEditPaymentInfo = () => {
    setIsPaymentInfoSubmitted(false);
    setIsCustomerInfoSubmitted(true);
    setActiveStep(1);
  };

  const steps = ["Müşteri Bilgisi", "Ödeme Bilgisi", "Ödeme İşlemi"];

  const handleComplete = async () => {
    try {
      const paymentData = {
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        phone: customerInfo.phone,
        creditCardNo: paymentInfo.creditCardNo,
        expiryDate: paymentInfo.expiryDate,
        cvv: paymentInfo.cvv,
        paymentAmount: selectedFlight.price, 
        userId: localStorage.getItem("userId"),
      };
  
      const paymentResponse = await dispatch(addToPaymentAction(paymentData));

      const paymentId = paymentResponse.data.payment.paymentId;
      const customerId = paymentResponse.data.payment.customerId; 
  
      const reservationData = {
        userId: localStorage.getItem("userId"),
        customerId: customerId,
        flightId: selectedFlight.flightId, 
        totalAmount: paymentData.paymentAmount,
        paymentId: paymentId,
      };
  
      const reservationResponse = await dispatch(addToReservationAction(reservationData));
     
      const reservationId = reservationResponse.data.cart.reservationId;
      console.log("reservationId",reservationId);
      navigate(`/summary/${reservationId}`);

      alert("Ödeme ve rezervasyon başarıyla tamamlandı!");
    } catch (error) {

      console.error("Hata:", error);
    } 
  };

  const cardStyle = {
    width: "500px",
    minHeight: "300px",
    padding: "20px",
    margin: "20px auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor:"#f6f7fb"
  };
  const cardFlightStyle = {
    width: "300px",
    minHeight: "200px",
    padding: "20px",
    margin: "130px auto 30px auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor:"#f6f7fb",
  };
  const calculateFlightDuration = (departureDate, arrivalDate) => {
    const departure = new Date(departureDate);
    const arrival = new Date(arrivalDate);
  
    const durationMs = arrival - departure; 
    const durationHours = Math.floor(durationMs / (1000 * 60 * 60)); 
    const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60)); 
    if(durationMinutes>0 && durationHours>0)
    { 
      return `${durationHours} saat ${durationMinutes} dakika`;
    }else if(durationMinutes>0 && durationHours<1){
      return ` ${durationMinutes} dakika`;
    }else{
      return `${durationHours} saat`;
    }
   
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", padding: "20px",marginTop:"60px" }}>
      <Box sx={{ flex: 3, marginRight: "20px" }}>
        <Typography variant="h4" gutterBottom sx={{display:"flex", justifyContent:"center"}}>
          Ödeme
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel sx={{width:"35vw"}}> 
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
        </Stepper>
        
        <Card sx={{ ...cardStyle }}>
          {!isCustomerInfoSubmitted  ? (
            <Box>
              <Typography variant="h6" gutterBottom sx={{fontWeight:"bold"}}>
                Müşteri Bilgileri
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Ad"
                    name="firstName"
                    value={customerInfo.firstName}
                    onChange={handleCustomerInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Soyad"
                    name="lastName"
                    value={customerInfo.lastName}
                    onChange={handleCustomerInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Telefon Numarası"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleCustomerInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleCustomerInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Adres"
                    name="address"
                    value={customerInfo.address}
                    onChange={handleCustomerInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Doğum Tarihi"
                    name="birthDate"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={customerInfo.birthDate}
                    onChange={handleCustomerInputChange}
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                sx={{ marginTop: "20px" ,  backgroundColor: '#506bfd'}}
                onClick={handleCustomerSubmit}
              >
                Kaydet
              </Button>
            </Box>
          ) : (
            <CardContent>
              
              <CardActions sx={{display:"flex", justifyContent:"space-between"}}><Typography variant="h6" sx={{fontWeight:"bold"}}>Müşteri Bilgileri</Typography>
                <IconButton onClick={handleEditCustomerInfo}>
                  <BorderColorIcon />
                </IconButton>
              </CardActions>
              <Typography sx={{display:"flex",justifyContent:"flex-start"}}><span style={{fontWeight:"bold"}}> Ad: </span>{customerInfo.firstName}</Typography>
              <Typography sx={{display:"flex",justifyContent:"flex-start"}}><span style={{fontWeight:"bold"}}>Soyad: </span>{customerInfo.lastName}</Typography>
              <Typography sx={{display:"flex",justifyContent:"flex-start"}}><span style={{fontWeight:"bold"}}>Telefon: </span>{customerInfo.phone}</Typography>
              <Typography sx={{display:"flex",justifyContent:"flex-start"}}><span style={{fontWeight:"bold"}}>Email: </span>{customerInfo.email}</Typography>
              <Typography sx={{display:"flex",justifyContent:"flex-start"}}><span style={{fontWeight:"bold"}}>Adres: </span>{customerInfo.address}</Typography>
              <Typography sx={{display:"flex",justifyContent:"flex-start"}}><span style={{fontWeight:"bold"}}>Doğum Tarihi: </span>{customerInfo.birthDate}</Typography>
             
            </CardContent>
          )}
        </Card>

        <Card sx={{ ...cardStyle }}>
          {!isPaymentInfoSubmitted ? (
            <Box>
              <Typography variant="h6" gutterBottom sx={{fontWeight:"bold"}}>
                Ödeme Bilgileri
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Kredi Kartı Numarası"
                    name="creditCardNo"
                    value={paymentInfo.creditCardNo}
                    onChange={handlePaymentInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Son Kullanma Tarihi (YYYY-MM)"
                    name="expiryDate"
                    value={paymentInfo.expiryDate}
                    onChange={handlePaymentInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="CVV"
                    name="cvv"
                    value={paymentInfo.cvv}
                    onChange={handlePaymentInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                      />
                    }
                    label="Kartı Kaydet"
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                sx={{ marginTop: "20px", backgroundColor: '#506bfd' }}
                onClick={handlePaymentSubmit}
              >
                Kaydet
              </Button>
            </Box>
          ) : (
            <CardContent>
              <CardActions sx={{display:"flex", justifyContent:"space-between"}}>
                  <Typography variant="h6" sx={{fontWeight:"bold"}}>Ödeme Bilgileri</Typography>
                <IconButton onClick={handleEditPaymentInfo}>
                  <BorderColorIcon />
                </IconButton>
              </CardActions>
            
              <Typography sx={{display:"flex",justifyContent:"flex-start"}}><span style={{fontWeight:"bold"}}>Kredi Kartı No: </span>
                 ** ** ** {paymentInfo.creditCardNo.slice(-4)}
              </Typography>
              <Typography sx={{display:"flex",justifyContent:"flex-start"}}><span style={{fontWeight:"bold"}}>Son Kullanma Tarihi: </span> {paymentInfo.expiryDate}</Typography>
              <Typography sx={{display:"flex",justifyContent:"flex-start"}}><span style={{fontWeight:"bold"}}>CVV: </span> *</Typography>
              
            </CardContent>
          )}
        </Card>
      </Box>




      <main className="ticket-system">
        <div className="receipts-wrapper"> 
          <div className="receipts-payment">
            <div className="receipt">    
              <Typography variant="h5" component="div" >
                Uçuş Bilgileri
              </Typography>
              <Typography variant="h5" sx={{color:"#506bfd", fontWeight:"bold"}}>
                {selectedFlight.airline}
              </Typography>

              <div className="route">
                <Typography variant="h5" sx={{fontWeight:"bold"}}>
                  {selectedFlight.departureLocation}
                </Typography>
                  <svg
                    className="plane-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 510 510"
                  >
                    <path
                      fill="#3f32e5"
                      d="M497.25 357v-51l-204-127.5V38.25C293.25 17.85 275.4 0 255 0s-38.25 17.85-38.25 38.25V178.5L12.75 306v51l204-63.75V433.5l-51 38.25V510L255 484.5l89.25 25.5v-38.25l-51-38.25V293.25l204 63.75z"
                    />
                  </svg>
                <Typography variant="h5" sx={{fontWeight:"bold"}}>
                  {selectedFlight.arrivalLocation}
                </Typography>
              </div>
              <h4 style={{textAlign:"center",margin:"0 0 20px 0"}}>{calculateFlightDuration(selectedFlight.departureDate, selectedFlight.arrivalDate)}</h4>
              <div className="details">
              <div className="item">
                <span>Tarih</span>
                <h3>
                  {new Date(selectedFlight.departureDate)
                    .toLocaleString("tr-TR", {
                      year: "numeric",
                      month: "long", 
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                </h3>
              </div>
                <div className="item">
                  <span>Uçuş Kodu</span>
                  <h3>{selectedFlight.flightCode}</h3>
                </div>`
                <div className="item">
                  <span>Bagaj</span>
                  <h3>El Bagajı</h3>
                </div>
                <div className="item">
                  <span>Koltuk</span>
                  <h3>69P</h3>
                </div>
                <div className="item">
                  <span>Fiyat</span>
                  <h3>{selectedFlight.price} TL</h3>
                </div>
              </div>
            </div>

            <div className="receipt qr-code">
              <svg
                className="qr"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 29.938 29.938"
              >
                <path d="M7.129..." />
              </svg>
              <div className="description">
                <img src={barkod}/>
                <div style={{display:"block"}}>
                  <h2>{selectedFlight.flightCode}</h2>
                  <p>Talep Edildiğinde QR kodunu gösterebilirsin!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
     
        <Button variant="contained" onClick={handleComplete} fullWidth sx={{backgroundColor:"black"}}>
          İşlemi Tamamla
        </Button>
      </main>
  
    </Box>
  );
};

export default PaymentPage;