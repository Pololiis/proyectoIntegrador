import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./panel.css";
import ListaUsuarios from "./ListaUsuarios";
import ListaVideojuegos from "./ListaVideojuegos";
import ListaPlataformas from "./ListaPlataformas";
import { useAuthContext } from "../context/AuthContext"; 

const Panel = () => {
  const [componenteActivo, setComponenteActivo] = useState(null);
  const { updateToken } = useAuthContext(); // función para actualizar el token
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    updateToken(null);
    navigate("/");
  };

  const renderComponente = () => {
    switch (componenteActivo) {
      case "listaUsuarios":
        return <ListaUsuarios />;
      case "listaVideojuegos":
        return <ListaVideojuegos />;
      case "listaPlataformas":
        return <ListaPlataformas />;
      default:
        return (
          <h2 className="panel-titulo">
            Bienvenido al panel de administración
          </h2>
        );
    }
  };

  return (
    <div className="panel-container">
      <div className="sidebar">
        <h2 className="panel-titulo">PANEL DE ADMINISTRACIÓN</h2>
        <div className="button-row">
          <button
            className="btn btn-bd-primary"
            onClick={() => setComponenteActivo("listaUsuarios")}
          >
            Lista de Usuarios
          </button>
          <button
            className="btn btn-bd-primary"
            onClick={() => setComponenteActivo("listaVideojuegos")}
          >
            Lista de Videojuegos
          </button>
          <button
            className="btn btn-bd-primary"
            onClick={() => setComponenteActivo("listaPlataformas")}
          >
            Lista de Plataformas
          </button>
        </div>
      </div>
      <div className="componente-activo">
        {renderComponente()}
      </div>
    </div>
  );
};

export default Panel;


