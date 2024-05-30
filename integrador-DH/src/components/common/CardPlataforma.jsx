import React from "react";
import axios from "axios";
import "./cardPlataforma.css"
import { useEffect, useState } from "react";

function CardPlataforma() {
  const url1 = "http://localhost:8080/categorias";

  const [plataformas, setPlataformas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url1);
        setPlataformas(response.data);
      } catch (error) {
        console.error("Hubo un error al hacer la solicitud:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className=" d-flex container container-plataformas space-between aling-center">
      {plataformas.map((plataforma) => {
        return (
          <div key={plataforma.id} className=" d-flex contenido-plataforma card">
            <img src={plataforma.imagen} alt={plataforma.nombre} />
            <h4>{plataforma.nombre}</h4>
          </div>
        );
      })}
    </div>
  );
}

export default CardPlataforma;
