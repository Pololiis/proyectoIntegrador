import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Volver from "../common/Volver";
import GaleriaImagenes from "../common/GaleriaImagenes";
import "./detalleProducto.css";

function DetalleProducto() {
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [videoJuegoSeleccionado, setVideoJuegoSeleccionado] = useState({});
  const navigate = useNavigate();

  // const url = `http://localhost:8080/videojuegos/${id}`;
  const url = `$import.meta.env.VITE_API_URL/videojuegos/${id}`;

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
    navigate(`/detalleReserva/${id}`, { state: { videoJuegoSeleccionado, startDate, endDate } });
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
            margin="normal"
            className="input-field"
          />
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
            margin="normal"
            className="input-field"
          />
          <Button variant="contained" color="primary" onClick={handleReserva}>
            Reservar
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
