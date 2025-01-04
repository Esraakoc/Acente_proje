import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Select,
  TextField,
  Typography,
  TablePagination,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert"; 
import { GetReservationByUserIdAction } from "../store/Redux/ReservationStore/ReservationAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const BookingHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [searchCustomer, setSearchCustomer] = useState(""); 
  const [statusFilter, setStatusFilter] = useState(""); 
  const [flightFilter, setFlightFilter] = useState(""); 
  const [sortField, setSortField] = useState(""); 
  const [sortOrder, setSortOrder] = useState("asc"); 
  const [anchorEl, setAnchorEl] = useState(null); 
  const [filterType, setFilterType] = useState(""); 
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(7); 

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await dispatch(GetReservationByUserIdAction());
        setReservations(response.data);
        setFilteredReservations(response.data);
      } catch (error) {
        console.error("Rezervasyon bilgisi alınırken hata oluştu:", error);
      }
    };
    fetchReservations();
  }, [dispatch]);

  useEffect(() => {
    let filtered = reservations;

    if (searchCustomer) {
      filtered = filtered.filter((reservation) =>
        `${reservation.customer.customerName} ${reservation.customer.customerSurname}`
          .toLowerCase()
          .includes(searchCustomer.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(
        (reservation) => reservation.status.toString() === statusFilter
      );
    }

    if (flightFilter) {
      filtered = filtered.filter((reservation) =>
        reservation.flight.flightCode
          .toLowerCase()
          .includes(flightFilter.toLowerCase())
      );
    }

    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        if (sortField === "totalAmount") {
          return sortOrder === "asc"
            ? a.totalAmount - b.totalAmount
            : b.totalAmount - a.totalAmount;
        } else if (sortField === "reservationDate") {
          return sortOrder === "asc"
            ? new Date(a.reservationDate) - new Date(b.reservationDate)
            : new Date(b.reservationDate) - new Date(a.reservationDate);
        }
        return 0;
      });
    }

    setFilteredReservations(filtered);
  }, [searchCustomer, statusFilter, flightFilter, sortField, sortOrder, reservations]);

  const handleMenuOpen = (event, type) => {
    setAnchorEl(event.currentTarget);
    setFilterType(type); 
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setFilterType("");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Yeni sayfa numarasını ayarla
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // Yeni satır sayısını ayarla
    setPage(0); // İlk sayfaya dön
  };

  return (
    <div style={{marginTop:"90px"}}>
      <h1>Rezervasyonlar</h1>

      <TableContainer component={Paper} sx={{width:"120%"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rezervasyon ID</TableCell>
              <TableCell>
                Müşteri
                <IconButton onClick={(e) => handleMenuOpen(e, "customer")}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && filterType === "customer"}
                  onClose={handleMenuClose}
                >
                  <MenuItem>
                    <TextField
                      label="Müşteri Ara"
                      variant="outlined"
                      size="small"
                      value={searchCustomer} 
                      onChange={(e) => setSearchCustomer(e.target.value)}
                      onBlur={() => {
                        if (!searchCustomer.trim()) {
                          setFilteredReservations(reservations);
                        }
                      }}
                    />
                  </MenuItem>
                </Menu>
              </TableCell>
              <TableCell>
                Uçak Kodu
                <IconButton onClick={(e) => handleMenuOpen(e, "flight")}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && filterType === "flight"}
                  onClose={handleMenuClose}
                >
                  <MenuItem>
                    <TextField
                      label="Uçak Kodu Ara"
                      variant="outlined"
                      size="small"
                      value={flightFilter} 
                      onChange={(e) => setFlightFilter(e.target.value)}
                      onBlur={() => {
                        if (!flightFilter.trim()) {
                          setFilteredReservations(reservations);
                        }
                      }}
                    />
                  </MenuItem>
                </Menu>
              </TableCell>
              <TableCell
                onClick={() => {
                  setSortField("reservationDate");
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}
                style={{ cursor: "pointer" }}
              >
                Gidiş Tarihi
              </TableCell>
              <TableCell
                onClick={() => {
                  setSortField("totalAmount");
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}
                style={{ cursor: "pointer" }}
              >
                Toplam Fiyat
              </TableCell>
              <TableCell>
                Durum
                <IconButton onClick={(e) => handleMenuOpen(e, "status")}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && filterType === "status"}
                  onClose={handleMenuClose}
                >
                  <MenuItem>
                    <Select
                      value={statusFilter} 
                      onChange={(e) => setStatusFilter(e.target.value)}
                      displayEmpty
                      style={{ width: "150px" }}
                    >
                      <MenuItem value="">Tümü</MenuItem>
                      <MenuItem value="2">Onaylandı</MenuItem>
                      <MenuItem value="1">Beklemede</MenuItem>
                      <MenuItem value="3">İptal Edildi</MenuItem>
                    </Select>
                  </MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {filteredReservations
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((reservation) => (
                <TableRow
                  key={reservation.reservationId}
                  onClick={() => navigate(`/reservation/${reservation.reservationId}`)}
                  sx={{cursor:"pointer"}}
                >
                  <TableCell>{reservation.reservationId}</TableCell>
                  <TableCell>
                    {reservation.customer.customerName}{" "}
                    {reservation.customer.customerSurname}
                  </TableCell>
                  <TableCell>{reservation.flight.flightCode}</TableCell>
                  <TableCell>
                    {new Date(reservation.flight.departureDate).toLocaleString()}
                  </TableCell>
                  <TableCell>{reservation.totalAmount} TL</TableCell>
                  <TableCell align="center">
                    <Typography
                      sx={{
                        borderRadius:"5px",
                        padding:"5px 10px",
                        textAlign:"center",
                        display:"inline-block",
                        color:"white",     
                        backgroundColor:
                          reservation.status === 1
                            ? "orange"
                            : reservation.status === 2
                            ? "green"
                            : "red",
                        fontSize:"0.875rem",
                      }}
                    >
                      {reservation.status === 1
                        ? "Beklemede"
                        : reservation.status === 2
                        ? "Onaylandı"
                        : "İptal Edildi"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[7, 14, 21]} 
          component="div"
          count={filteredReservations.length} 
          rowsPerPage={rowsPerPage} 
          page={page} 
          onPageChange={handleChangePage} 
          onRowsPerPageChange={handleChangeRowsPerPage} 
          labelRowsPerPage="Sayfa başına satır"
        />
      </TableContainer>
    </div>
  );
};

export default BookingHistory;