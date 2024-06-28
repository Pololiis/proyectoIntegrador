import React, { useState, useEffect } from "react";
import { Container, Grid, Paper, Typography, Button, Modal, Box } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Volver from "../common/Volver";
import { useAuthContext } from "../context/AuthContext";
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
  const [message, setMessage] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [comentario, setComentario] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuthContext();
  const url = `http://localhost:8080/alquiler`;

  const { videoJuegoSeleccionado, dateRange } = location.state || {};
  const initialStartDate = dateRange ? new Date(dateRange[0]?.startDate) : new Date();
  const initialEndDate = dateRange ? new Date(dateRange[0]?.endDate) : new Date();

  useEffect(() => {
    if (!videoJuegoSeleccionado) {
      alert("No se encontraron los datos del videojuego.");
      navigate("/");
      return;
    }

    setStartDate(initialStartDate);
    setEndDate(initialEndDate);

    if (token) {
      fetchUsuario();
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
          Authorization: `Bearer ${token}`
        }
      });
      setUsuario(response.data);
    } catch (error) {
      console.error("Error obteniendo el usuario:", error);
    }
  };

  const handleReserva = async (reservaData) => {
    try {
      await axios.post(`${url}/nuevo`, {
        fechaInicio: startDate.toISOString().split("T")[0],
        fechaFin: endDate.toISOString().split("T")[0],
        usuariosId: usuario.id,
        videojuegosId: videoJuegoSeleccionado.id,
        comentario: comentario,
        ...reservaData,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Reserva realizada con éxito.");
    } catch (error) {
      console.error("Error realizando la reserva:", error);
      setMessage("Error realizando la reserva.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    const reservaData = {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      juego: videoJuegoSeleccionado.nombre,
      duracionAlquiler: Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)),
    };
    handleReserva(reservaData);
    setShowConfirmModal(false);
  };

  return (
    <Container className="detalle-reserva-container">
      <Volver />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <div className="reserva-form-container">
            <h3>Formulario de Reserva</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre:</label>
                <input type="text" className="form-control" value={usuario?.nombre || ''} disabled />
              </div>
              <div className="form-group">
                <label>Apellido:</label>
                <input type="text" className="form-control" value={usuario?.apellido || ''} disabled />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" className="form-control" value={usuario?.email || ''} disabled />
              </div>
              <div className="form-group-fecha">
                <label>Fecha de Inicio:</label>
                <input type="text" className="form-control" value={startDate.toLocaleDateString()} disabled />
              </div>
              <div className="form-group-fecha">
                <label>Fecha de Finalización:</label>
                <input type="text" className="form-control" value={endDate.toLocaleDateString()} disabled />
              </div>
              <div className="form-group">
                <label>Comentario:</label>
                <textarea
                  className="form-control"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder="Escribe tu comentario aquí"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Confirmar Reserva</button>
            </form>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className="videojuego-card">
            <div className="videojuego-info">
              <img
                src={videoJuegoSeleccionado.imagenes[0]}
                alt={videoJuegoSeleccionado.nombre}
                className="videojuego-imagen"
              />
              <div className="videojuego-detalles">
                <Typography variant="h5" gutterBottom>
                  {videoJuegoSeleccionado.nombre}
                </Typography>
                <hr />
                <Typography sx={{ mt: 2 }}>
                  <strong>Plataforma:</strong> {videoJuegoSeleccionado.categoria?.nombre}
                </Typography>
                <img src={videoJuegoSeleccionado.categoria?.imagen} alt={videoJuegoSeleccionado.categoria?.nombre} style={{ width: '50px', height: '50px' }} />
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
      <Modal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="confirm-modal-title" variant="h6" component="h2">
            Confirmar Reserva
          </Typography>
          <Typography id="confirm-modal-description" sx={{ mt: 2 }}>
            ¿Deseas confirmar la reserva para el juego {videoJuegoSeleccionado.nombre}?
          </Typography>
          <hr />
          <Typography sx={{ mt: 2 }}>
            <strong>Fecha de Inicio:</strong> {startDate.toLocaleDateString()}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <strong>Fecha de Finalización:</strong> {endDate.toLocaleDateString()}
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={handleConfirm}>
              Confirmar
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => setShowConfirmModal(false)}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}

export default DetalleReserva;
