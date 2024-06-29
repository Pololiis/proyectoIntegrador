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
  const [showCalendar, setShowCalendar] = useState(false);
  const { id } = useParams();
  const [videoJuegoSeleccionado, setVideoJuegoSeleccionado] = useState({});
  const navigate = useNavigate();
  const { token, handleShowLoginModal } = useAuthContext();

  const url = `http://localhost:8080/videojuegos/${id}`;

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

  const handleReserva = () => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      alert("Debe estar logueado para realizar una reserva.");
      handleShowLoginModal(true);
    } else {
      navigate(`/detalleReserva/${id}`, { state: {videoJuegoSeleccionado, dateRange } });
    }
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

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
                color="secondary"
                onClick={handleReserva}
                style={{ marginTop: "16px" }}
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
    </Container>
  );
}

export default DetalleProducto;


