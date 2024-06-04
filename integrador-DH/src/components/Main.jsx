
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

    fetchData();
  }, []);


  return (
    <div>

      <div className="bg-h1 flex">
        <div className="container-h1 flex">
          <h1>Bienvenido a</h1>
          <span className="glow text-outline">GameShare</span>


          <a href="#body">
            <button class="btn-father">
              <span class="circle" aria-hidden="true"></span>
              <span class="button-text">Comenzar!</span>
            </button>
          </a>
        </div>
      </div>

      <a name="body"></a>
      <div className="container-cards-section flex">
        <h2>Plataformas</h2>
        <CardPlataforma />
        <BarraBuscador />

        <section className="cards-recomendado">
          <h2>Recomendados</h2>
          <div className="container-cards   flex">
            {videoJuegos.slice(0, cantidad).map((videojuego) => (
              <CardJuego key={videojuego.id} videojuego={videojuego} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}


// Función de barajado
function shuffleArray(array) {
  const shuffledArray = array.slice(); // Crear una copia del array para no mutar el original
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default Main;
