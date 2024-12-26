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
  const selectedFlight = useSelector((state) => state.cart.selectedFlight); // Redux
  const [isCustomerInfoSubmitted, setIsCustomerInfoSubmitted] = useState(false);
  const [isPaymentInfoSubmitted, setIsPaymentInfoSubmitted] = useState(true);
  const [isEditingCustomerInfo, setIsEditingCustomerInfo] = useState(false);
  const [isEditingPaymentInfo, setIsEditingPaymentInfo] = useState(false);
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
      // Öncelikle ödeme bilgilerini hazırlayın ve gönderin
      const paymentData = {
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        phone: customerInfo.phone,
        creditCardNo: paymentInfo.creditCardNo,
        expiryDate: paymentInfo.expiryDate,
        cvv: paymentInfo.cvv,
        paymentAmount: selectedFlight.price, // Fiyat TL işareti ile geliyorsa kaldır
        userId: localStorage.getItem("userId"),
      };
  
      const paymentResponse = await dispatch(addToPaymentAction(paymentData));
  
      // Ödeme başarılı olursa reservation bilgilerini hazırlayın
      const paymentId = paymentResponse.data.payment.paymentId; // Payment ID'yi response'dan alın
      const customerId = paymentResponse.data.payment.customerId; // Customer ID'yi response'dan alın
  
      const reservationData = {
        userId: localStorage.getItem("userId"),
        customerId: customerId,
        flightId: selectedFlight.flightId, // Redux'tan gelen seçili uçuş bilgisi
        totalAmount: paymentData.paymentAmount,
        paymentId: paymentId,
      };
  
      // Rezervasyon isteğini gönderin
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

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", padding: "20px",marginTop:"60px" }}>
      {/* Sol Taraf: Müşteri ve Ödeme Bilgileri */}
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
        {/* Müşteri Bilgileri */}
        
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
              
              <CardActions sx={{display:"flex", justifyContent:"space-between"}}><Typography variant="h6">Müşteri Bilgileri</Typography>
                <IconButton onClick={handleEditCustomerInfo}>
                  <BorderColorIcon />
                </IconButton>
              </CardActions>
              <Typography>Ad: {customerInfo.firstName}</Typography>
              <Typography>Soyad: {customerInfo.lastName}</Typography>
              <Typography>Telefon: {customerInfo.phone}</Typography>
              <Typography>Email: {customerInfo.email}</Typography>
              <Typography>Adres: {customerInfo.address}</Typography>
              <Typography>Doğum Tarihi: {customerInfo.birthDate}</Typography>
             
            </CardContent>
          )}
        </Card>

        {/* Ödeme Bilgileri */}
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
                  <Typography variant="h6">Ödeme Bilgileri</Typography>
                <IconButton onClick={handleEditPaymentInfo}>
                  <BorderColorIcon />
                </IconButton>
              </CardActions>
            
              <Typography>
                Kredi Kartı No: ** ** ** {paymentInfo.creditCardNo.slice(-4)}
              </Typography>
              <Typography>Son Kullanma Tarihi: {paymentInfo.expiryDate}</Typography>
              <Typography>CVV: *</Typography>
              
            </CardContent>
          )}
        </Card>

       
      </Box>


      {/* Sağ Taraf: Uçuş Bilgileri */}
      <Box sx={{ flex: 1 }}>
        {selectedFlight ? (
          <Card sx={{ ...cardFlightStyle }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Uçuş Bilgileri
              </Typography>
              <Typography><strong>Nereden: </strong>{selectedFlight.departureLocation}</Typography>
              <Typography><strong>Nereye: </strong>{selectedFlight.arrivalLocation}</Typography>
              <Typography><strong>Tarih: </strong> {selectedFlight.departureDate}</Typography>
              <Typography><strong>Uçuş No: </strong>{selectedFlight.flightCode}</Typography>
              <hr/>
              <Typography><strong>Fiyat: </strong>{selectedFlight.price} TL</Typography>
            </CardContent>
          </Card>
        ) : (
          <Typography>Uçuş bilgisi seçilmedi...</Typography>
        )}

        {/* İşlemi Tamamla */}
        <Button variant="contained" onClick={handleComplete} fullWidth sx={{backgroundColor:"black"}}>
          İşlemi Tamamla
        </Button>
      </Box>
  
    </Box>
  );
};

export default PaymentPage;