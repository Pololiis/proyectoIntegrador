import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, CircularProgress, Alert, Button } from "@mui/material";
import { DateRange } from 'react-date-range';
import { addMonths } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Volver from "../common/Volver";
import GaleriaImagenes from "../common/GaleriaImagenes";
import { useAuthContext } from "../context/AuthContext";
import "./detalleProducto.css";

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
  const [showModal, setShowModal] = useState(false);
  const [videoJuegoSeleccionado, setVideoJuegoSeleccionado] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, handleShowLoginModal } = useAuthContext(); // Asegúrate de que handleShowLoginModal está definido

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
      alert("Debe estar logueado para realizar una reserva.");
      handleShowLoginModal(true);  // Llamada para mostrar el popup de inicio de sesión
    } else {
      navigate(`/detalleReserva/${id}`, { state: { videoJuegoSeleccionado, dateRange } });
    }
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
          <GaleriaImagenes imagenes={videoJuegoSeleccionado.imagenes} />
          <Typography variant="body1" gutterBottom>
            {videoJuegoSeleccionado.descripcion}
          </Typography>
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
    </Container>
  );
}

export default DetalleProducto;
