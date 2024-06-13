import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./usuarioPanel.css";

const UsuarioPanel = () => {
const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("usuario"));
const [alquileres, setAlquileres] = useState([]);

useEffect(() => {
if (!user) {
    navigate("/"); // Redirigir al usuario a la página principal si no está autenticado
} else {
    // Fetch alquileres del usuario
    axios.get(`http://localhost:8080/alquileres/usuario/${user.id}`)
    .then(response => {
        setAlquileres(response.data);
    })
    .catch(error => {
        console.error("Error al obtener alquileres:", error);
    });
}
}, [user, navigate]);


const handleLogout = () => {
localStorage.removeItem("token");
localStorage.removeItem("usuario");
navigate("/");
};

const handleAlquiler = () => {
const nuevoAlquiler = {
    usuario: { id: user.id },
    videojuego: { id: 1 }, // Cambia esto según el videojuego seleccionado
    fechaReserva: new Date().toISOString().split('T')[0], // Fecha actual
    duracionAlquiler: 7 // Duración de ejemplo
};

axios.post("http://localhost:8080/alquileres", nuevoAlquiler)
    .then(response => {
    setAlquileres([...alquileres, response.data]);
    })
    .catch(error => {
    console.error("Error al crear alquiler:", error);
    });
};

const initials = user?.nombre
?.split(" ")
.map((name) => name[0])
.join("");

if (!user) {
return null; // Mostrar un mensaje de carga o redirigir a otra página
}

return (
<div className="usuario-panel">
    <div className="avatar-container">
    <div className="avatar">{initials}</div>
    <h2>{user?.nombre}</h2>
    </div>
    <button onClick={handleLogout} className="btn btn-logout">
    Cerrar Sesión
    </button>
    <button onClick={handleAlquiler} className="btn btn-alquiler">
    Hacer un Alquiler
    </button>
    <h3>Mis Alquileres</h3>
    <ul>
    {alquileres.map((alquiler) => (
        <li key={alquiler.idAlquiler}>
        {alquiler.videojuego.nombre} - {new Date(alquiler.fechaReserva).toLocaleDateString()} - {alquiler.duracionAlquiler} días
        </li>
    ))}
    </ul>
</div>
);
};

export default UsuarioPanel;

