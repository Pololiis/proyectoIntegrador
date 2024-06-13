import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/main.css";
import BarraBuscador from "./common/BarraBuscador";
import CardJuego from "./common/CardJuego";
import CardPlataforma from "./common/CardPlataforma";

function Main() {
  const url = `http://localhost:8080/videojuegos`;
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
    fetchData()
  }, []);

  return (
    <div>
      <div className="bg-h1 flex">
        <div className="container-h1 flex">
          <h1>Bienvenido a</h1>
          <span className="glow text-outline">GameShare</span>

        </div>
      </div>

      <div className="container-cards-section flex">
        <section className="cards-categoria">
          <h2>Plataformas</h2>

          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              <CardPlataforma />
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          <BarraBuscador />
        </section>
        <section className="cards-recomendado">
          <h2>Recomendados</h2>
          <article className="container-cards">
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

function shuffleArray(array) {
  const shuffledArray = array.slice(); // Crear una copia del array para no mutar el original
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
