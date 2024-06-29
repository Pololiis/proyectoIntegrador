import React, { useState, useEffect } from "react";
import { Container, Grid, Paper, Typography, Button, Modal, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Volver from "../common/Volver";
import { useAuthContext } from "../context/AuthContext";
import LoginForm from "../routes/LoginForm";
import CrearUsuario from "../routes/crearUsuario";
import "./detalleReserva.css";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

function DetalleReserva() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [message, setMessage] = useState("");
  const [usuario, setUsuario] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { token, updateToken } = useAuthContext();
  const url = `${import.meta.env.VITE_API_URL}alquiler`;

  const { videoJuegoSeleccionado, startDate, endDate } = location.state || {};

  useEffect(() => {
    if (!videoJuegoSeleccionado) {
      alert("No se encontraron los datos del videojuego.");
      navigate("/");
      return;
    }

    if (token) {
      fetchUsuario();
    } else {
      setShowLoginModal(true);
    }
  }, [location.state, navigate, token]);

  const fetchUsuario = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}usuarios/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsuario(response.data);
    } catch (error) {
      console.error("Error obteniendo el usuario:", error);
    }
  };

  const handleReserva = async () => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    try {
      const response = await axios.post(
        `${url}/nuevo`,
        {
          usuariosId: usuario.id,
          videojuegosId: videoJuegoSeleccionado.id,
          fechaInicio: startDate,
          fechaFin: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Reserva realizada con éxito.");
      console.log("Reserva realizada:", response.data);
    } catch (error) {
      console.error("Error realizando la reserva:", error);
      setMessage("Error realizando la reserva.");
    }
  };

  if (!videoJuegoSeleccionado) {
    return <Typography variant="h6">Cargando...</Typography>;
  }

  const handleCloseRegisterModal = () => setShowRegisterModal(false);
  const handleShowLoginModal = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };
  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    updateToken(localStorage.getItem("token"));
    window.location.reload();
  };
  const handleShowRegisterModal = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  return (
    <Container>
      <Volver />
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} md={6}>
          {usuario ? (
            <Paper style={{ padding: "16px", marginTop: "16px", height: '60%' }}>
              <Typography variant="h5" gutterBottom>Datos del Usuario</Typography>
              <Typography variant="body1" style={{ fontSize: '1.2rem' }}><strong>Nombre:</strong> {usuario.nombre}</Typography>
              <Typography variant="body1" style={{ fontSize: '1.2rem' }}><strong>Apellido:</strong> {usuario.apellido}</Typography>
              <Typography variant="body1" style={{ fontSize: '1.2rem' }}><strong>Email:</strong> {usuario.email}</Typography>
              <Typography variant="h6" gutterBottom>Fechas de Reserva</Typography>
              <Typography variant="body1" style={{ fontSize: '1.2rem' }}><strong>Fecha de inicio:</strong> {startDate}</Typography>
              <Typography variant="body1" style={{ fontSize: '1.2rem' }}><strong>Fecha de fin:</strong> {endDate}</Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "16px" }}
                onClick={handleReserva}
              >
                Reservar
              </Button>
            </Paper>
          ) : (
            <Typography variant="h6">Cargando datos del usuario...</Typography>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: "16px", marginTop: "16px" }}>
            <Typography variant="h3" gutterBottom>
              {videoJuegoSeleccionado.nombre}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <img
                  src={videoJuegoSeleccionado.imagenes[0]}
                  alt={videoJuegoSeleccionado.nombre}
                  className="imagen-centrada"
                  style={{ width: "50%", borderRadius: "8px", display: 'block', margin: '0 auto' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" gutterBottom>
                  <strong>Género:</strong> {videoJuegoSeleccionado.genero}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Plataforma:</strong> {videoJuegoSeleccionado.categoria?.nombre}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Modal
        open={showRegisterModal}
        onClose={handleCloseRegisterModal}
        aria-labelledby="register-modal-title"
        aria-describedby="register-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="register-modal-title" variant="h6" gutterBottom>
            Por favor, inicie sesión para reservar
          </Typography>
          <Typography id="register-modal-description" variant="body1" gutterBottom>
            Necesitas estar registrado para poder realizar una reserva. Si ya tienes una cuenta, inicia
            sesión. De lo contrario, regístrate para continuar.
          </Typography>
          <Box mt={3} display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleShowLoginModal}>
              Iniciar Sesión
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={showLoginModal}
        onClose={handleCloseLoginModal}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="login-modal-title" variant="h6" gutterBottom>
            Formulario de Inicio de Sesión
          </Typography>
          <LoginForm onLoginSuccess={handleLoginSuccess} />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={handleShowRegisterModal}>
              Registrarse
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCloseLoginModal}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={showRegisterModal && !showLoginModal}
        onClose={handleCloseRegisterModal}
        aria-labelledby="register-form-modal-title"
        aria-describedby="register-form-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="register-form-modal-title" variant="h6" gutterBottom>
            Formulario de Registro
          </Typography>
          <CrearUsuario />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={handleShowLoginModal}>
              Iniciar Sesión
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCloseRegisterModal}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}

export default DetalleReserva;
