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

  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [videoJuegoSeleccionado, setVideoJuegoSeleccionado] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const { token } = useAuthContext();


  // const url = `http://localhost:8080/videojuegos/${id}`;
  const url = `${import.meta.env.VITE_API_URL}videojuegos/${id}`;


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
              <img className="img-caracteristicas" src={caracteristica.imagen} alt={caracteristica.nombre} />
            </div>
          ))}
        </div>
        <div>
          <Typography variant="h5" gutterBottom>
            Plataforma
          </Typography>
          <div>
            <img
              src={videoJuegoSeleccionado.categoria?.imagen}
              alt={videoJuegoSeleccionado.categoria?.nombre}
            />
            <p>{videoJuegoSeleccionado.categoria?.nombre}</p>
          </div>
        </div>
      </div>

    </Container>
  );
}

export default DetalleProducto;
