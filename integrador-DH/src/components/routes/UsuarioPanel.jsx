import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./usuarioPanel.css"; 
const UsuarioPanel = () => {
const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("user"));

useEffect(() => {
if (!user) {
    navigate("/"); // Redirigir al usuario a la página principal si no está autenticado
}
}, [user, navigate]);

if (!user) {
return null; // Mostrar un mensaje de carga o redirigir a otra página
}

const initials = user?.nombre
?.split(" ")
.map((name) => name[0])
.join("");

const handleLogout = () => {
localStorage.removeItem("token");
localStorage.removeItem("user");
navigate("/");
};

return (
<div className="usuario-panel">
    <div className="avatar-container">
    <div className="avatar">{initials}</div>
    <h2>{user?.nombre}</h2>
    </div>
    <button onClick={handleLogout} className="btn btn-logout">
    Cerrar Sesión
    </button>
    {/* Aquí agregar más contenido relacionado con las reservas del usuario */}
</div>
);
};

export default UsuarioPanel;

