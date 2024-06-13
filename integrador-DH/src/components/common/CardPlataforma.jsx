import React, { useEffect, useState } from "react";
import axios from "axios";
import "./cardPlataforma.css";

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

  const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };

  const chunkedPlataformas = chunkArray(plataformas, 2);
  

  return (
    <>
      {chunkedPlataformas.map((chunk, index) => (
        <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
          <div className="d-flex justify-content-center">
            {chunk.map((plataforma) => (
              <div key={plataforma.id} className="col-md-4">
                <div className="card plataforma-card">
                  <img src={plataforma.imagen} alt={plataforma.nombre} />
                  <div className="card-body">
                    <h4 className="card-title">{plataforma.nombre}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default CardPlataforma;

