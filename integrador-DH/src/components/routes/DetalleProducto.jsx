import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, CircularProgress, Alert, Button, Modal, Box } from "@mui/material";
import { DateRange } from 'react-date-range';
import { addMonths } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Volver from "../common/Volver";
import GaleriaImagenes from "../common/GaleriaImagenes";
import { useAuthContext } from "../context/AuthContext";
import "./detalleProducto.css";
import LoginForm from "./LoginForm"
import CrearUsuario from "./crearUsuario"




function DetalleProducto() {
  const today = new Date();
  const [dateRange, setDateRange] = useState([
    {
      startDate: today,
      endDate: null,
      key: 'selection'
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [videoJuegoSeleccionado, setVideoJuegoSeleccionado] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuthContext();

  useEffect(() => {
    const fetchVideojuego = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/videojuegos/${id}`);
        setVideoJuegoSeleccionado(response.data);
      } catch (error) {
        setError("Error al cargar los detalles del videojuego.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideojuego();
  }, [id]);

  const handleReserva = () => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      setShowWarningModal(true);
    } else {
      navigate(`/detalleReserva/${id}`, { state: { videoJuegoSeleccionado, dateRange } });
    }
  };

  const handleCloseWarningModal = () => {
    setShowWarningModal(false);
  };

  const handleOpenLoginModal = () => {
    setShowWarningModal(false);
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleOpenRegisterModal = () => {
    setShowWarningModal(false);
    setShowRegisterModal(true);
  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="detalle-producto-container">
      <Volver />
      {videoJuegoSeleccionado && (
        <>
          <Typography variant="h4" gutterBottom>
            {videoJuegoSeleccionado.nombre}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {videoJuegoSeleccionado.descripcion}
          </Typography>
          <GaleriaImagenes imagenes={videoJuegoSeleccionado.imagenes} />
          <Typography variant="h5" gutterBottom>
            Selecciona la fecha de alquiler:
          </Typography>
          <DateRange
            editableDateInputs={true}
            onChange={item => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            months={2}
            direction="horizontal"
            minDate={today}
            maxDate={addMonths(today, 6)}
          />
          <Button variant="contained" color="primary" onClick={handleReserva}>
            Generar Reserva
          </Button>
        </>
      )}
      <Modal
        open={showWarningModal}
        onClose={handleCloseWarningModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="modal-box">
          <Typography id="modal-title" variant="h6" component="h2">
            Atención
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Debe estar logueado para realizar una reserva.
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={handleOpenLoginModal}>
              Iniciar Sesión
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleOpenRegisterModal}>
              Registrarse
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
        <Box className="modal-box">
          <Typography id="login-modal-title" variant="h6" component="h2">
            Iniciar Sesión
          </Typography>
          <LoginForm />
        </Box>
      </Modal>
      <Modal
        open={showRegisterModal}
        onClose={handleCloseRegisterModal}
        aria-labelledby="register-modal-title"
        aria-describedby="register-modal-description"
      >
        <Box className="modal-box">
          <Typography id="register-modal-title" variant="h6" component="h2">
            Registrarse
          </Typography>
          <CrearUsuario/>
        </Box>
      </Modal>
    </Container>
  );
}

export default DetalleProducto;
