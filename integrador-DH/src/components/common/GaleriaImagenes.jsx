import React, { useState } from "react";
import "./galeriaImagenes.css";

function GaleriaImagenes({ titulo, descripcion, imagenes }) {
  const [mostrarMas, setMostrarMas] = useState(false);

  const handleVerMasClick = () => {
    setMostrarMas(!mostrarMas);
  };

  // Create an array of 10 identical images
  const imagenesRepetidas = new Array(10).fill(imagenes[1]);

  return (
    <div className="container my-4">
      <div className="row">
        <div className="titulo-descripcion-detalle">
          <h2 className="mb-3">{titulo}</h2>
          <p className="mb-4">{descripcion}</p>
        </div>
        <div className="col-12 d-flex borde">
          <div>
          <img
            src={imagenes[0]}
            alt="imagen principal"
            className="img-fluid img-principal"
          />
          </div>
          <div className="container-img-secundaria-general borde">
            {imagenesRepetidas
              .slice(0, mostrarMas ? imagenesRepetidas.length : 4)
              .map((imagen, index) => (
                <div key={index} className="col-6 col-md-3 mb-4 container-img-secundaria">
                  <img
                    src={imagen}
                    alt={`Imagen ${index + 1}`}
                    className="img-fluid img-secundaria"
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="col-12 text-end mt-2">
          <button className="btn btn-bd-primary" onClick={handleVerMasClick}>
            {mostrarMas ? "Ver menos" : "Ver más"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default GaleriaImagenes;
