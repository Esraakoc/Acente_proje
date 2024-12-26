import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Button, Card } from "@mui/material";
import pegasusImg from "../images/pegasusIcon.png";
import thyImg from "../images/thyIcon.png";
import { clearCart, setFlightInfo } from "../store/Redux/CartStore/CartSlice";
import { deleteCartAction, deleteUserCartAction, getCartIdInfoAction } from "../store/Redux/CartStore/CartAction";
import ticketBackImg from "../images/ticket-backImg.jpg";
import ticketPlane from "../images/ticket-plane.png";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [cartInfo, setCartInfo] = useState([]); // Birden fazla cart bilgisi için array olarak başlat

  const handleClearCart = async(cartId) => {
    await dispatch(deleteCartAction(cartId));
    await fetchData();
  };
  const handleAllClearCart = async() => {
    await dispatch(deleteUserCartAction());
    await fetchData();
  };
  const handleToPayment = async (flight) =>{
    dispatch(setFlightInfo(flight));
    navigate("/payment");
  }
  const fetchData = async () => {
    try {
      const response = await dispatch(getCartIdInfoAction(userId));
      console.log("Cart Info:", response.data);
      setCartInfo(response.data); // API'den dönen tüm cart bilgilerini state'e set et
    } catch (error) {
      console.error("Veriler alınırken hata oluştu:", error);
    }
  };
  
  useEffect(() => {
    fetchData(); // İlk yüklemede verileri getir
  }, []);
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ayları 0'dan başlatır, bu yüzden +1 eklenir
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return (
  <Box sx={{ padding: "20px", marginTop: "64px" }}>
    <Box sx={{display:"flex",justifyContent:"space-between"}}>
      <Typography variant="h4" gutterBottom>
        Sepet
      </Typography>
      <Button
          variant="contained"
          color="error"
          sx={{ fontSize: "x-small", width: "20%", height: "33px",marginTop:"10px"}}
          onClick={() => handleAllClearCart()}
        >
          Sepeti Temizle
      </Button>
    </Box>
    
      <Box sx={{ marginTop: "20px" }}>
        {cartInfo.length > 0 ? (
          cartInfo.map((item, index) => {
            const departureTime = new Date(item.flight.departureDate);
            const arrivalTime = new Date(item.flight.arrivalDate);
            const durationInMinutes = Math.floor(
              (arrivalTime - departureTime) / (1000 * 60)
            );
            const hours = Math.floor(durationInMinutes / 60);
            const minutes = durationInMinutes % 60;

            return (
              <Card
                key={index}
                sx={{
                  backgroundImage: `linear-gradient(
                    rgba(255, 255, 255, 0.85), 
                    rgba(255, 255, 255, 0.85)
                  ), url(${ticketBackImg})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  marginBottom: 3,
                  padding: 2,
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  backgroundColor: "#f5f5f5",
                  width: "600px",
                  mx: "auto",
                  overflow: "hidden",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Arial",
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#003366",
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                  }}
                >
                  {item.flight.airline}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Arial",
                    fontSize: "14px",
                    color: "#555",
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                  }}
                >
                  Biniş Kartı
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "50px",
                    padding: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "36px",
                      fontWeight: "bold",
                      fontFamily: "Arial",
                      color: "#222",
                    }}
                  >
                    {item.flight.from}
                  </Typography>
                 
                  <Typography
                    sx={{
                      fontSize: "36px",
                      fontWeight: "bold",
                      fontFamily: "Arial",
                      color: "#222",
                    }}
                  >
                    {item.flight.to}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "#999",
                        fontFamily: "Arial Narrow",
                      }}
                    >
                      UÇUŞ KODU
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "#000000",
                      }}
                    >
                      {item.flight.flightCode}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "#999",
                        fontFamily: "Arial Narrow",
                      }}
                    >
                      KALKIŞ
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "#000000",
                      }}
                    >
                      {item.flight.departureLocation}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "#000000",
                      }}
                    >
                      {formatDateTime(item.flight.departureDate)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "#999",
                        fontFamily: "Arial Narrow",
                      }}
                    >
                      VARIŞ
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "#000000",
                      }}
                    >
                      {item.flight.arrivalLocation}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "#000000",
                      }}
                    >
                      {formatDateTime(item.flight.arrivalDate)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "#999",
                        fontFamily: "Arial Narrow",
                      }}
                    >
                      FİYAT
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "#000000",
                      }}
                    >
                      {item.flight.price} TL
                    </Typography>
                  </Box>
                </Box>

                <Button
                  variant="contained"
                 
                  sx={{ marginTop: "10px", alignSelf:"flex-end",fontSize:"11px",backgroundColor:"#506bfd"}}
                  onClick={() => handleClearCart(item.cartId)}
                >
                  Sil
                </Button>
                 <Button
        variant="contained"
        sx={{  float: "right",backgroundColor:"#506bfd" }}
        onClick={()=>handleToPayment(item.flight)}
      >
        Ödeme İşlemine Geç
      </Button>
              </Card>
            );
          })
        ) : (
          <Typography>Sepet boş...</Typography>
        )}
      </Box>
      
     
    
    </Box>
  );
};



export default CartPage;