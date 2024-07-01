import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/main.css";
import BarraBuscador from "./common/BarraBuscador";
import CardJuego from "./common/CardJuego";
import CardPlataforma from "./common/CardPlataforma";

function Main() {
  //const url = `http://localhost:8080/videojuegos`;
  const url = `${import.meta.env.VITE_API_URL}videojuegos`;

  const [videoJuegos, setVideoJuegos] = useState([]);
  const [cantidad, setCantidad] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const shuffledData = shuffleArray(response.data);
        setVideoJuegos(shuffledData);
      } catch (error) {
        console.error("Hubo un error al hacer la solicitud:", error);
      }
    };
    fetchData();
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div>

      <div className="main-container">
        <section className="plataformas-section">
          <h2 className="plataforma-title">Plataformas</h2>
          <CardPlataforma />
        </section>
        <section className="cards-categoria">

          <BarraBuscador />
        </section>
        <section className="cards-recomendado">
          <h2 className="recomendados-title">Recomendados</h2>
          <article className="card__container">
            {videoJuegos.slice(0, cantidad).map((videojuego) => (
              <CardJuego key={videojuego.id} videojuego={videojuego} />
            ))}
          </article>
        </section>
      </div>
    </div>
  );
}

export default Main;


