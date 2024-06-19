import React, { useState, useEffect } from "react";
import { Container, Grid, Paper, Typography, Button, TextField, Modal } from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Volver from "../common/Volver";
import { useAuthContext } from "../context/AuthContext";
import LoginForm from "../routes/LoginForm"; // Importa tu componente de formulario de inicio de sesión
import "./detalleReserva.css";

function DetalleReserva() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [showRegisterModal, setShowRegisterModal] = useState(false); // Estado para controlar la visibilidad del modal de registro
  const [message, setMessage] = useState(""); // Estado para mostrar mensaje de reserva completada
  const { id } = useParams();
  const today = new Date().toISOString().split("T")[0];
  const location = useLocation();
  const navigate = useNavigate();
  
  const { token } = useAuthContext();

  useEffect(() => {
    const { videoJuegoSeleccionado, startDate: initialStartDate, endDate: initialEndDate } = location.state || {};

    if (!videoJuegoSeleccionado) {
      alert("No se encontraron los datos del videojuego.");
      navigate("/"); // Redirigir a la página principal si no hay datos
    } else {
      setStartDate(initialStartDate);
      setEndDate(initialEndDate);
    }

    // Verificar si hay token al cargar el componente
    if (!token) {
      setShowRegisterModal(true); // Mostrar el modal de registro si no hay token
    }
  }, [location.state, navigate, token]);

  const handleDateChange = async () => {
    try {
      const response = await axios.put(`/api/update-date/${id}`, { startDate, endDate });
      console.log("Fechas actualizadas:", response.data);
    } catch (error) {
      console.error("Error actualizando fechas:", error);
    }
  };

  const handleReserva = () => {
    if (!token) {
      setShowRegisterModal(true); // Mostrar el modal de registro si no hay token
      return;
    }

    // Lógica de reserva si hay token
    setMessage("Reserva realizada con éxito.");
  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false); // Función para cerrar el modal de registro
  };

  const handleShowLoginModal = () => {
    setShowRegisterModal(false); // Cerrar modal de registro
    setShowLoginModal(true); // Mostrar modal de inicio de sesión
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false); // Función para cerrar el modal de inicio de sesión
  };

  if (!location.state || !location.state.videoJuegoSeleccionado) {
    return null; // O renderiza un estado de carga, o un mensaje indicando que no hay datos
  }

  return (
    <Container>
      <Volver />
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: "16px", marginTop: "16px" }}>
            <Typography variant="h3" gutterBottom>
              {location.state.videoJuegoSeleccionado.nombre}
            </Typography>
            <img
              src={location.state.videoJuegoSeleccionado.imagenes[0]}
              alt={location.state.videoJuegoSeleccionado.nombre}
              className="imagen-centrada"
            />
            <Typography variant="h5" gutterBottom>
              Detalles del producto
            </Typography>
            <Typography className="mb-2" variant="body1">Fechas</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Fecha de inicio"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    min: today,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Fecha de fin"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    min: startDate || today,
                  }}
                  fullWidth
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
