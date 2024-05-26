import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/main.css";
import BarraBuscador from "./common/BarraBuscador";
import CardJuego from "./common/CardJuego";
import SliderInfinito from "./common/SliderInfinito";

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
    <div className="container-main">
      <div className="bg-h1 flex">
        <div className="container-h1 flex">
          <h1>Bienvenido a</h1>
          <span className="glow text-outline">GameShare</span>
        </div>
      </div>
      <div className="container-cards-section flex">
        <BarraBuscador />
        <h2>Categorias</h2>
        <SliderInfinito/>
        <h2>Recomendados</h2>
        <div className="container-cards borde flex">
          {videoJuegos.slice(0, cantidad).map((videojuego) => (
            <CardJuego key={videojuego.id} videojuego={videojuego} />
          ))}
        </div>
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
