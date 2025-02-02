import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Typography, CircularProgress, Box} from "@mui/material";
import barkod from "../images/barkod.png"
import { getReservationByIdInfoAction } from "../store/Redux/ReservationStore/ReservationAction";
import "../styles/reservationDetail.css";

const ReservationDetail = () => {
  const { reservationId } = useParams(); 
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservationDetail = async () => {
      try { 
        const response = await getReservationByIdInfoAction(reservationId)();
        setReservation(response.data[0]);
      } catch (error) {
        console.error("Rezervasyon bilgisi alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservationDetail();
  }, [reservationId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!reservation) {
    return <Typography>Rezervasyon bilgisi bulunamadı.</Typography>;
  }

  const date = new Date(reservation.flight.departureDate);
  
  const gateClosingDate = new Date(date); 
  gateClosingDate.setMinutes(gateClosingDate.getMinutes() - 15); 
  const gateClosingTime = `${String(gateClosingDate.getHours()).padStart(2, "0")}:${String(
    gateClosingDate.getMinutes()
  ).padStart(2, "0")}`;
  
console.log("reservation",reservation);
const truncateText = (text, maxLength) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};
  return (
    <Box
      sx={{
        marginTop: "100px",
        padding: "20px",
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      <main className="ticket-system">
        <div className="receipts-wrapper"> 
          <div className="receipts">
            <div className="receipt">    
              <Typography variant="h5" component="div" >
                Müşteri Uçuş Bilgileri 
              </Typography>
              <Typography variant="h5" sx={{color:"#506bfd", fontWeight:"bold"}}>
                {reservation.flight.airline}
              </Typography>

              <div className="route">
                <Typography variant="h5" sx={{fontWeight:"bold"}}>
                  {reservation.flight.departureLocation}
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
                  {reservation.flight.arrivalLocation}
                </Typography>
              </div>

              <div className="details">
                <div className="item">
                  <span>Yolcu</span>
                  <h3>{reservation.customer.customerName}  {reservation.customer.customerSurname}</h3>
                </div>
                <div className="item">
                  <span>Telefon Numarası</span>
                  <h3>{reservation.customer.phone}</h3>
                </div>
                <div className="item">
                  <span>Email</span>
                  <h3>{truncateText(reservation.customer.email,14)}</h3>
                </div>
                <div className="item">
                  <span>Uçuş Kodu</span>
                  <h3>{reservation.flight.flightCode}</h3>
                </div>
                <div className="item">
                  <span>Gidiş Tarihi</span>
                  <h3> {date.toLocaleString().split(":").slice(0, 2).join(":")}</h3>
                </div>
                <div className="item">
                  <span>Kapı kapanış Saati</span>
                  <h3 style={{ textAlign: "center"}}>{gateClosingTime}</h3>
                </div>
                <div className="item">
                  <span>Bagaj</span>
                  <h3 >El Bagajı</h3>
                </div>
                <div className="item">
                  <span>Koltuk</span>
                  <h3>69P</h3>
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
                  <h2>{reservation.flight.flightCode}</h2>
                  <p>Talep Edildiğinde QR kodunu gösterebilirsin!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Box>
  );
};

export default ReservationDetail;