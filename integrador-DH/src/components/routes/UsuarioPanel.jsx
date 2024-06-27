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
 // axios.get(`http://localhost:8080/alquileres/usuario/${user.id}`)
    axios.get(`${import.meta.env.VITE_API_URL}alquileres/usuario/${user.id}`)
    .then((response) => {
 

        setAlquileres(response.data);
    })
    .catch((error) => {
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
    fechaReserva: new Date().toISOString().split("T")[0], // Fecha actual
    duracionAlquiler: 7, // Duración de ejemplo
};

axios
    .post("http://localhost:8080/alquileres", nuevoAlquiler)
    .then((response) => {
    setAlquileres([...alquileres, response.data]);
    })
    .catch((error) => {
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
    <h2 className="user-name">{user?.nombre}</h2>
    </div>
    <h3 className="section-title">Mis Alquileres</h3>
    <div className="table-container">
    <table className="alquileres-table">
        <thead>
        <tr>
            <th>ID</th>
            <th>Videojuego</th>
            <th>Fecha Alquiler</th>
        </tr>
        </thead>
        <tbody>
        {alquileres.map((alquiler) => (
            <tr key={alquiler.idAlquiler}>
            <td>{alquiler.idAlquiler}</td>
            <td>{alquiler.videojuego.nombre}</td>
            <td>{new Date(alquiler.fechaReserva).toLocaleDateString()}</td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
</div>
);
};

export default UsuarioPanel;