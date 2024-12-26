import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getReservationByIdInfoAction } from "../store/Redux/ReservationStore/ReservationAction";
import { Box, Typography, Card, CardContent } from "@mui/material";

const SummaryPage = () => {
    const { reservationId } = useParams();
    const dispatch = useDispatch();
    const [reservationDetails, setReservationDetails] = useState(null);

    useEffect(() => {

        const fetchReservationDetails = async () => {
            try {
                debugger;
                const response = await dispatch(getReservationByIdInfoAction(reservationId));
                console.log("reservationIdddd",reservationId);
                setReservationDetails(response.data);
            } catch (error) {
                console.error("Rezervasyon detaylarını getirme hatası:", error);
            }
        };
        fetchReservationDetails();
    }, [dispatch, reservationId]);

    if (!reservationDetails) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <Box sx={{ padding: "20px", marginTop: "60px" }}>
            <Typography variant="h4" gutterBottom>
                Rezervasyon Özeti
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                {/* Müşteri Bilgileri */}
                <Card sx={{ flex: 1 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Müşteri Bilgileri
                        </Typography>
                        <Typography>Ad: {reservationDetails.user.firstName}</Typography>
                        <Typography>Soyad: {reservationDetails.user.lastName}</Typography>
                        <Typography>Email: {reservationDetails.user.email}</Typography>
                        <Typography>Telefon: {reservationDetails.user.phone}</Typography>
                    </CardContent>
                </Card>

                {/* Uçuş Bilgileri */}
                <Card sx={{ flex: 1 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Uçuş Bilgileri
                        </Typography>
                        <Typography>Nereden: {reservationDetails.flight.departureLocation}</Typography>
                        <Typography>Nereye: {reservationDetails.flight.arrivalLocation}</Typography>
                        <Typography>Tarih: {reservationDetails.flight.departureDate}</Typography>
                        <Typography>Uçuş Kodu: {reservationDetails.flight.flightCode}</Typography>
                        <Typography>Fiyat: {reservationDetails.totalAmount} TL</Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default SummaryPage;