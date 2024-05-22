import React from "react";
import "./galeriaImagenes.css";

function GaleriaImagenes({ titulo, descripcion, imagenes }) {
  return (
    <div className="container my-4">
      <div className="row">
        <div className="titulo-descripcion-detalle ">
          <h2 className="mb-3">{titulo}</h2>
          <p className="mb-4">{descripcion}</p>
        </div>
        <div className="col-12 d-flex">
          <div className="col-md-12  d-flex align-items-center  mb-4 mb-md-0">
            <img
              src={imagenes[0]}
              alt="Imagen Principal"
              className="img-fluid img-principal"
            />

            {imagenes.slice(1, 5).map((imagen, index) => (
              <div>
                <div
                  key={index}
                  className="col-6 container-img-secundaria  my-4"
                >
                  <img
                    src={imagen}
                    alt={`Imagen ${index + 1}`}
                    className="img-fluid img-secundaria"
                  />
                  <img
                    src={imagen}
                    alt={`Imagen ${index + 1}`}
                    className="img-fluid img-secundaria"
                  />
                  <img
                    src={imagen}
                    alt={`Imagen ${index + 1}`}
                    className="img-fluid img-secundaria"
                  />
                  <img
                    src={imagen}
                    alt={`Imagen ${index + 1}`}
                    className="img-fluid img-secundaria"
                  />
                </div>
                <div className="col-md-6">
                  <div className="text-end mt-2">
                    <button className="btn btn-bd-primary">Ver más</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GaleriaImagenes;
