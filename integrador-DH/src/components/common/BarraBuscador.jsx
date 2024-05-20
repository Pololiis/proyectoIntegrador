import "./buscador.css"

function BarraBuscador() {
  return (
    <div className="container buscador">
      <div className="row justify-content-center">
        <div className="col-sm-12">
          <div className="input-group mb-3 " >
            <input
              type="text"
              className="form-control"
              placeholder="Buscar..."
              aria-label="Buscar"
              aria-describedby="button-addon2"
            />
            <button
              className="btn btn-bd-primary"
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
