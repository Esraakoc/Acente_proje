import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getReservationByIdInfoAction } from "../store/Redux/ReservationStore/ReservationAction";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import "../styles/summaryPage.css";
import barkod2 from "../images/barkod2.png";

const SummaryPage = () => {
    const { reservationId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [reservationDetails, setReservationDetails] = useState(null);
    const [isRed,setIsRed]=useState(false);
    useEffect(() => {

        const fetchReservationDetails = async () => {
            try {
                const response = await dispatch(getReservationByIdInfoAction(reservationId));
                console.log("reservationIdddd",reservationId);
                setReservationDetails(response.data[0]);
            } catch (error) {
                console.error("Rezervasyon detaylarını getirme hatası:", error);
            } 
        };
        fetchReservationDetails();
    }, [dispatch, reservationId]);
// useEffect(()=>{
//     if(reservationDetails?.flight?.airline === "THY"){
//         setIsRed(true);
//     }else{
//         setIsRed(false);
//     }
// },[reservationDetails])
   
    if (!reservationDetails) {
        return <div>Yükleniyor...</div>;
    }else{
        
    }
    const handleToHome = ()=>{
        navigate("/")
    };
    const formatDateTime = (dateString) => {
        const date = new Date(dateString); // ISO formatındaki tarihi Date objesine çevir
        const formattedDate = date.toLocaleDateString('tr-TR'); // Tarihi yerel biçimde formatla
        const formattedTime = date.toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit',
        }); // Saati saat:dakika biçiminde formatla
    
        return `Tarih: ${formattedDate}  Saat: ${formattedTime}` ;
    };
    
    console.log("reservationDetails",reservationDetails);
    return (
        <Box sx={{ padding: "20px", marginTop: "60px" }}>
            <Typography variant="h4" gutterBottom>
                Rezervasyon Özeti
            </Typography>



            <div className="box">
      <ul className="left">
        {Array(25)
          .fill(0)
          .map((_, index) => (
            <li key={index}></li>
          ))}
      </ul>

      <ul className="right">
        {Array(25)
          .fill(0)
          .map((_, index) => (
            <li key={index}></li>
          ))}
      </ul>

      <div className={isRed ? "ticketRed": "ticket"}>
        <span className="airline airlineslip">{reservationDetails.flight.airline}</span>
        <span className="boarding">Biniş Kartı</span>
        <div className="contentSummary">
            <div className="contentPlane">
                <p className="jfk">{reservationDetails.flight.departureLocation}</p>
                <p className="plane">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 500 500"
                    width="50"
                    height="50"
                    >
                    <g stroke="#222">
                        <line
                        fill="none"
                        strokeLinecap="round"
                        strokeWidth="30"
                        x1="300"
                        x2="55"
                        y1="390"
                        y2="390"
                        />
                        <path
                        d="M98 325c-9 10 10 16 25 6l311-156c24-17 35-25 42-50 2-15-46-11-78-7-15 1-34 10-42 16l-56 35 1-1-169-31c-14-3-24-5-37-1-10 5-18 10-27 18l122 72c4 3 5 7 1 9l-44 27-75-15c-10-2-18-4-28 0-8 4-14 9-20 15l74 63z"
                        fill="#222"
                        strokeLinejoin="round"
                        strokeWidth="10"
                        />
                    </g>
                    </svg>
                </p>
                <p className="sfo">{reservationDetails.flight.arrivalLocation}</p>
            </div>
          <div className="sub-content">
        
            <span className="name">
              Yolcu Adı Soyadı
              <br />
              <span>{reservationDetails.customer.customerName} {reservationDetails.customer.customerSurname}</span>
            </span>
            <span className="flight">
              Uçuş Kodu
              <br />
              <span>{reservationDetails.flight.flightCode}</span>
            </span>
            <span className="gate">
              Kapı
              <br />
              <span>11B</span>
            </span>
            <span className="seat">
              Koltuk
              <br />
              <span>45A</span>
            </span>
            <span className="boardingtime">
              Biniş Zamanı
              <br />
              <span> {new Date(reservationDetails.flight.departureDate)
                    .toLocaleString("tr-TR", {
                      year: "numeric",
                      month: "long", 
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}</span>
            </span>
          </div>
        </div>
        <div className="barcode"><img src={barkod2} /></div>
        <div className="barcode slip"><img src={barkod2} /></div>
      </div>
    </div>
    
            <Button  variant="contained" onClick={handleToHome} sx={{cursor:"pointer"}}>Ana sayfaya geç</Button>
        </Box>
    );
};

export default SummaryPage;