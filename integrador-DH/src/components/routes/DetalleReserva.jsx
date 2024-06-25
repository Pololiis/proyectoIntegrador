import React, { useState, useEffect } from "react";
import { Container, Grid, Paper, Typography, Button, Modal, Box } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Volver from "../common/Volver";
import { useAuthContext } from "../context/AuthContext";
import LoginForm from "../routes/LoginForm";
import CrearUsuario from "../routes/crearUsuario";
import "./detalleReserva.css";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

function DetalleReserva() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reservas, setReservas] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [message, setMessage] = useState("");
  const [usuario, setUsuario] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { token, updateToken } = useAuthContext();
  const url = `http://localhost:8080/alquiler`;

  const { videoJuegoSeleccionado, startDate: initialStartDate, endDate: initialEndDate } = location.state || {};

  useEffect(() => {
    if (!videoJuegoSeleccionado) {
      alert("No se encontraron los datos del videojuego.");
      navigate("/");
      return;
    }

    setStartDate(new Date(initialStartDate));
    setEndDate(new Date(initialEndDate));

    if (token) {
      fetchUsuario();
    } else {
      setShowLoginModal(true);
    }

    fetchReservas();
  }, [location.state, navigate, token]);

  const fetchReservas = async () => {
    try {
      const response = await axios.get(`${url}`);
      setReservas(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error obteniendo las reservas:", error);
      setReservas([]);
    }
  };

  const fetchUsuario = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/usuarios/me`, {                     
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsuario(response.data);
      console.log(usuario);
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
        const response = await axios.post(`${url}/nuevo`, {
            fechaInicio: startDate.toISOString().split("T")[0],
            fechaFin: endDate.toISOString().split("T")[0],
            usuariosId:  usuario.id , // Asegúrate de pasar solo el id del usuario existente
            videojuegosId: videoJuegoSeleccionado.id
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

const handleDateChange = async () => {
    try {
        const response = await axios.put(`${url}/${id}`, {
            fechaInicio: startDate.toISOString().split("T")[0],
            fechaFin: endDate.toISOString().split("T")[0],
            usuariosId: usuario.id , // Asegúrate de pasar solo el id del usuario existente
            videojuegosId: videoJuegoSeleccionado.id
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Fechas actualizadas:", response.data);
        setMessage("Fechas actualizadas con éxito.");
    } catch (error) {
        console.error("Error actualizando fechas:", error);
        setMessage("Error actualizando fechas.");
    }
};

  const tileDisabled = ({ date, view }) => {
    if (view === 'month' && Array.isArray(reservas)) {
      return reservas.some(reserva => {
        const reservaInicio = new Date(reserva.fechaInicio);
        const reservaFin = new Date(reserva.fechaFin);
        return date >= reservaInicio && date <= reservaFin;
      });
    }
    return false;
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
    updateToken(localStorage.getItem('token'));
    window.location.reload();
  };
  const handleShowRegisterModal = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  return (
    <Container>
      <Volver />
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper style={{ padding: "16px", marginTop: "16px" }}>
            <Typography variant="h3" gutterBottom>
              {videoJuegoSeleccionado.nombre}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <img
                  src={videoJuegoSeleccionado.imagenes[0]}
                  alt={videoJuegoSeleccionado.nombre}
                  className="imagen-centrada"
                />
              </Grid>
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
                  src={videoJuegoSeleccionado.categoria?.imagen}
                  alt={videoJuegoSeleccionado.categoria?.nombre}
                  style={{ width: "50%", borderRadius: "8px" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  {videoJuegoSeleccionado.categoria?.nombre}
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
        <Box sx={modalStyle}>
          <Typography id="register-modal-title" variant="h6" gutterBottom>
            Por favor, inicie sesión para reservar
          </Typography>
          <Typography id="register-modal-description" variant="body1" gutterBottom>
            Necesitas estar registrado para poder realizar una reserva. Si ya tienes una cuenta, inicia sesión. De lo contrario, regístrate para continuar.
          </Typography>
          <Box mt={3} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleShowLoginModal}
            >
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleShowRegisterModal}
            >
              Registrarse
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseLoginModal}
            >
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleShowLoginModal}
            >
              Iniciar Sesión
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseRegisterModal}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}

export default DetalleReserva;
