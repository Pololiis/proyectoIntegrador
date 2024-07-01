import React, { useState } from "react";
import "./listaPlataformas.css";
import CardPlataforma from "../common/CardPlataforma";
import AbmPlataforma from "./AbmPlataforma";

const ListaPlataformas = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="container-main">
      <div className="container-cards-section flex">
        <h2>Plataformas</h2>
        <button className="btn btn-primary add-platform-button" onClick={toggleForm}>
          {showForm ? "Cerrar Formulario" : "Agregar Plataforma"}
        </button>
        {showForm && <AbmPlataforma onClose={toggleForm} />}
        <div className="container-cards flex">
          <CardPlataforma />
        </div>
        
      </div>
    </div>
  );
};

export default ListaPlataformas;


