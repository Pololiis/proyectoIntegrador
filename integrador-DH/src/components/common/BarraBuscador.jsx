
import "./buscador.css";

import React from 'react';


function BarraBuscador() {
  return (
    <div className="container buscador">
      <div className="row justify-content-center">

        <div className="col-sm-12 col-md-6 col-lg-4">
          <div className="input-group mb-2 buscador-pequeno">
            <input
              type="text"
              className="form-control buscador-input"
              placeholder="Buscar..."
              aria-label="Buscar"
              aria-describedby="button-addon2"
            />
            <button
              className="btn btn-buscador btn-bd-primary"
              type="button"
              id="button-addon2"
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BarraBuscador;

