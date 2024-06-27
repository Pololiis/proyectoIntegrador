import React, { useState } from "react";
import "./panel.css"; // Asegúrate de crear y enlazar este archivo de estilos

import ListaUsuarios from "./ListaUsuarios";
import ListaVideojuegos from "./ListaVideojuegos";
import AbmPlataforma from "./AbmPlataforma";
import ListaPlataformas from "./ListaPlataformas";

const Panel = () => {
  const [componenteActivo, setComponenteActivo] = useState(null);

  const renderComponente = () => {
    switch (componenteActivo) {
      case "plataforma":
        return <AbmPlataforma />;
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
            onClick={() => setComponenteActivo("plataforma")}
          >
            Agregar Plataforma
          </button>
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

