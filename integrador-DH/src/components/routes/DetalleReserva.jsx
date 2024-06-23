import React, { useState, useEffect } from "react";
import { Container, Grid, Paper, Typography, Button, Modal } from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Volver from "../common/Volver";
import { useAuthContext } from "../context/AuthContext";
import LoginForm from "../routes/LoginForm";
import "./detalleReserva.css";

function DetalleReserva() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reservas, setReservas] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuthContext();

  useEffect(() => {
    const { videoJuegoSeleccionado, startDate: initialStartDate, endDate: initialEndDate } = location.state || {};

    if (!videoJuegoSeleccionado) {
      alert("No se encontraron los datos del videojuego.");
      navigate("/");
    } else {
      setStartDate(new Date(initialStartDate));
      setEndDate(new Date(initialEndDate));
    }

    if (!token) {
      setShowRegisterModal(true);
    }

    fetchReservas();
  }, [location.state, navigate, token]);

  const fetchReservas = async () => {
    try {
      const response = await axios.get(`/alquileres`);
      setReservas(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error obteniendo las reservas:", error);
      setReservas([]);
    }
  };

  const handleDateChange = async () => {
    try {
      const response = await axios.put(`/alquileres/${id}`, { 
        fechaReserva: startDate.toISOString().split("T")[0], 
        duracionAlquiler: calculateDuration(startDate, endDate) 
      });
      console.log("Fechas actualizadas:", response.data);
    } catch (error) {
      console.error("Error actualizando fechas:", error);
    }
  };

  const handleReserva = async () => {
    if (!token) {
      setShowRegisterModal(true);
      return;
    }

    try {
      const response = await axios.post('/alquileres', {
        fechaReserva: startDate.toISOString().split("T")[0],
        duracionAlquiler: calculateDuration(startDate, endDate),
        usuario: { id: 1 },
        videojuego: { id }
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Reserva realizada con éxito.");
      console.log("Reserva realizada:", response.data);
    } catch (error) {
      console.error("Error realizando la reserva:", error);
      setMessage("Error realizando la reserva.");
    }
  };

  const calculateDuration = (start, end) => {
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
  };

  const handleShowLoginModal = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const tileDisabled = ({ date, view }) => {
    if (view === 'month' && Array.isArray(reservas)) {
      return reservas.some(reserva => {
        const reservaInicio = new Date(reserva.fechaReserva);
        const reservaFin = new Date(reservaInicio);
        reservaFin.setDate(reservaFin.getDate() + reserva.duracionAlquiler);
        return date >= reservaInicio && date <= reservaFin;
      });
    }
    return false;
  };

  if (!location.state || !location.state.videoJuegoSeleccionado) {
    return <Typography variant="h6">Cargando...</Typography>;
  }

  return (
    <Container>
      <Volver />
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper style={{ padding: "16px", marginTop: "16px" }}>
            <Typography variant="h3" gutterBottom>
              {location.state.videoJuegoSeleccionado.nombre}
            </Typography>
            <Grid container spacing={2}>
              {/* Sección de imagen y nombre */}
              <Grid item xs={12} md={6}>
                <img
                  src={location.state.videoJuegoSeleccionado.imagenes[0]}
                  alt={location.state.videoJuegoSeleccionado.nombre}
                  className="imagen-centrada"
                />
              </Grid>

              {/* Sección de calendario y fechas */}
              <Grid item xs={12} md={6}>
                <Typography className="mb-2" variant="body1">Fechas</Typography>
                <Calendar
                  onChange={([start, end]) => {
                    setStartDate(start);
                    setEndDate(end);
                  }}
                  selectRange
                  value={[startDate, endDate]}
                  tileDisabled={tileDisabled}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "16px" }}
              onClick={handleDateChange}
            >
              Actualizar Fechas
            </Button>
            <Typography variant="h6" gutterBottom style={{ marginTop: "16px" }}>
              Plataforma
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <img
                  src={location.state.videoJuegoSeleccionado.categoria?.imagen}
                  alt={location.state.videoJuegoSeleccionado.categoria?.nombre}
                  style={{ width: "50%", borderRadius: "8px" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  {location.state.videoJuegoSeleccionado.categoria?.nombre}
                </Typography>
              </Grid>
            </Grid>
            <Button
              className="boton-reserva"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "16px" }}
              onClick={handleReserva}
            >
              Continuar
            </Button>
            {message && (
              <Typography variant="h6" color="success" gutterBottom style={{ marginTop: "16px" }}>
                {message}
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Modal
        open={showRegisterModal}
        onClose={handleCloseRegisterModal}
        aria-labelledby="register-modal-title"
        aria-describedby="register-modal-description"
      >
        <div className="modal-content">
          <Typography id="register-modal-title" variant="h6" gutterBottom>
            ¿Deseas registrarte?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleShowLoginModal}
          >
            Registrarse
          </Button>
        </div>
      </Modal>

      <Modal
        open={showLoginModal}
        onClose={handleCloseLoginModal}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
      >
        <div className="modal-content">
          <LoginForm onClose={handleCloseLoginModal} />
        </div>
      </Modal>
    </Container>
  );
}

export default DetalleReserva;
