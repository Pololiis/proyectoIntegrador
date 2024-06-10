import "./buscador.css";
import CardJuego from "./CardJuego";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function BarraBuscador() {
  const url = `http://localhost:8080/videojuegos`;
  const [videoJuegos, setVideoJuegos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setBusqueda(searchTerm);

    if (searchTerm.length > 0) {
      const suggestions = videoJuegos.filter((videojuego) =>
        videojuego.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    const filtered = videoJuegos.filter((videojuego) =>
      videojuego.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    setFilteredData(filtered);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setVideoJuegos(response.data);
      } catch (error) {
        console.error("Hubo un error al hacer la solicitud:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container buscador">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-6 col-lg-6 position-relative">
            <h2>Busqueda:</h2>
          <div className="input-group mb-2 buscador-pequeno">
            <input
              onChange={handleSearch}
              type="text"
              className="form-control buscador-input"
              placeholder="Buscar..."
              aria-label="Buscar"
              aria-describedby="button-addon2"
              value={busqueda}
            />
            <button
              onClick={handleSubmit}
              className="btn btn-buscador btn-bd-primary"
              type="button"
              id="button-addon2"
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
          {showSuggestions && (
            <ul className="list-group  position-absolute w-100">
              {filteredSuggestions.map((videojuego) => (
                <li
                  key={videojuego.id}
                  className="list-group-item  list-group-item-action"
                  onClick={() => {
                    setBusqueda(videojuego.nombre);
                    setShowSuggestions(false);
                  }}
                >
                  {videojuego.nombre}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <section className="cards-recomendado">
        {isSubmiting ? (
          <div className="container-cards flex">
            {filteredData.map((videojuego) => (
              <CardJuego key={videojuego.id} videojuego={videojuego} />
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default BarraBuscador;
