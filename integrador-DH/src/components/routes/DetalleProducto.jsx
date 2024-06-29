import { useParams, useNavigate, useLocation } from "react-router-dom";
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
import LoginForm from "../routes/LoginForm";
import CrearUsuario from "../routes/crearUsuario";
import "./detalleProducto.css";

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
  const [showCalendar, setShowCalendar] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { id } = useParams();
  const [videoJuegoSeleccionado, setVideoJuegoSeleccionado] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { token, updateToken, setShowLoginModal: setGlobalShowLoginModal } = useAuthContext();

  const url = `${import.meta.env.VITE_API_URL}videojuegos/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setVideoJuegoSeleccionado(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Hubo un error al hacer la solicitud:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleReserva = () => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      alert("Debe estar logueado para realizar una reserva.");
      setShowLoginModal(true);
    } else {
      navigate(`/detalleReserva/${id}`, { state: { videoJuegoSeleccionado, startDate: dateRange[0].startDate, endDate: dateRange[0].endDate } });
    }
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    updateToken(localStorage.getItem("token"));
    window.location.reload();
  };
  const handleCloseRegisterModal = () => setShowRegisterModal(false);
  const handleShowLoginModal = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };
  const handleShowRegisterModal = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  if (loading) {
    return (
      <Container className="loading-container">
        <CircularProgress />
        <Typography variant="h6">Cargando...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">Hubo un error al cargar los datos.</Alert>
      </Container>
    );
  }

  return (
    <Container className="detalle-producto-container">
      <Volver />
      <Typography variant="h4" gutterBottom>
        {videoJuegoSeleccionado.nombre}
      </Typography>
      <GaleriaImagenes
        plataforma={videoJuegoSeleccionado.categoria?.nombre}
        titulo={videoJuegoSeleccionado.nombre}
        descripcion={videoJuegoSeleccionado.descripcion}
        imagenes={videoJuegoSeleccionado.imagenes}
      />
      <div className="form-group-container">
        <div className="form-group">
          <Button
            variant="contained"
            color="primary"
            onClick={toggleCalendar}
            className="btn-reserva"
          >
            Reservar
          </Button>
          {showCalendar && (
            <div>
              <Typography className="mb-2" variant="body1">Fechas</Typography>
              <DateRange
                onChange={item => setDateRange([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={dateRange}
                direction="horizontal"
                minDate={today}
                maxDate={addMonths(today, 2)}
              />
              <Button
                variant="contained"
                style={{ 
                  backgroundColor: '#F97316', 
                  color: 'white',
                  marginTop: "16px",
                  ':hover': {
                    backgroundColor: '#f97316',
                  }
                }}
                onClick={handleReserva}
              >
                Generar Reserva
              </Button>

            </div>
          )}
        </div>
      </div>
      <div className="caracteristicas-seccion">
        <Typography variant="h5" gutterBottom>
          Características
        </Typography>
        <div className="caracteristicas-container">
          {videoJuegoSeleccionado.caracteristicas?.map((caracteristica, index) => (
            <div className="caracteristica" key={index}>
              <Typography variant="subtitle1">{caracteristica.nombre}</Typography>
              <img
                className="img-caracteristicas"
                src={caracteristica.imagen}
                alt={caracteristica.nombre}
              />
            </div>
          ))}
        </div>
        <div>
          <Typography variant="h5" gutterBottom>
            Plataforma
          </Typography>
          <div>
            <img src={videoJuegoSeleccionado.categoria?.imagen} alt={videoJuegoSeleccionado.categoria?.nombre} />
            <p>{videoJuegoSeleccionado.categoria?.nombre}</p>
          </div>
        </div>
      </div>

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

export default DetalleProducto;
