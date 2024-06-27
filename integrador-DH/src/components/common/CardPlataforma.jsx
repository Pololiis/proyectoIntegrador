import React, { useEffect, useState } from "react";
import axios from "axios";
import "./cardPlataforma.css";
import xboxLogo from "../../assets/xbox-logo.png";
import playstationLogo from "../../assets/playstation-logo.png";
import nintendoLogo from "../../assets/nintendo-logo.png";
import gamecubeLogo from "../../assets/gamecube-logo.png";

function CardPlataforma() {

  // const url1 = "http://localhost:8080/categorias";
  const url1 = `${import.meta.env.VITE_API_URL}categorias`;

  const plataformas = [
    { id: 1, nombre: "Xbox", imagen: xboxLogo },
    { id: 2, nombre: "PlayStation", imagen: playstationLogo },
    { id: 3, nombre: "Nintendo", imagen: nintendoLogo },
    { id: 4, nombre: "GameCube", imagen: gamecubeLogo },
  ];

  return (
    <div className="card-plataforma-container">''
      <div className="plataformas">
        {plataformas.map((plataforma) => (
          <div key={plataforma.id} className="plataforma">
            <img src={plataforma.imagen} alt={plataforma.nombre} className="plataforma-logo" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardPlataforma;