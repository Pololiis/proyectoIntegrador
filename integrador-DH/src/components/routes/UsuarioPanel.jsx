import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Paper, Typography, TextField, Button } from "@mui/material";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./usuarioPanel.css";
import ListarReservas from "./ListarReservas";

function UsuarioPanel() {
const { token, updateToken } = useAuthContext();
const navigate = useNavigate();
const [usuario, setUsuario] = useState(null);

useEffect(() => {
if (token) {
    fetchUsuario();
} else {
    navigate("/");
}
}, [token, navigate]);

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

const handleUpdateUsuario = async () => {
try {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}usuarios/${usuario.id}`, usuario, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    });
    console.log("Usuario actualizado:", response.data);
} catch (error) {
    console.error("Error actualizando el usuario:", error);
}
};

const handleInputChange = (e) => {
const { name, value } = e.target;
setUsuario((prevUsuario) => ({
    ...prevUsuario,
    [name]: value,
}));
};

const handleLogout = () => {
localStorage.removeItem("token");
localStorage.removeItem("usuario");
updateToken(null);
navigate("/");
};

if (!usuario) {
return <Typography variant="h6">Cargando...</Typography>;
}

return (
<Container>
    <Grid container spacing={2} justifyContent="center" className="usuario-panel-container">
    <Grid item xs={12} md={6}>
        <Paper style={{ padding: "24px", marginTop: "16px", borderRadius: '8px' }}>
        <Typography variant="h5" gutterBottom>Datos del Usuario</Typography>
        <form noValidate autoComplete="off">
            <TextField
            label="Nombre"
            name="nombre"
            value={usuario.nombre}
            fullWidth
            margin="normal"
            onChange={handleInputChange}
            />
            <TextField
            label="Apellido"
            name="apellido"
            value={usuario.apellido}
            fullWidth
            margin="normal"
            onChange={handleInputChange}
            />
            <TextField
            label="Email"
            name="email"
            value={usuario.email}
            fullWidth
            margin="normal"
            onChange={handleInputChange}
            />
            <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "16px" }}
            onClick={handleUpdateUsuario}
            >
            Actualizar Datos
            </Button>
        </form>
        </Paper>
    </Grid>
    <Grid item xs={12}>
        <ListarReservas usuarioId={usuario.id} />
    </Grid>
    </Grid>
</Container>
);
}

export default UsuarioPanel;
