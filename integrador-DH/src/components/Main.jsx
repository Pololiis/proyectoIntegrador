

import "../styles/main.css";
import BarraBuscador from "./common/BarraBuscador";
import { useEffect, useState } from "react";
import axios from "axios";
import CardJuego from "./common/CardJuego";

function Main() {
  const url = `http://localhost:8080/videojuegos`;
  const [videoJuegos, setVideoJuegos] = useState([]);

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

  console.log(videoJuegos);
  return (
    <div className="container-main">
      <div className="bg-h1 flex">
        <div className="container-h1 flex">
          <h1>Bienvenido a</h1>
          <span className="glow text-outline">GameShare</span>
          <BarraBuscador />
        </div>
      </div>
      <div className="container-cards">
        <h2 className="subtitulo">Recomendados</h2>
        {videoJuegos.map((videojuego) => (
          <CardJuego key={videojuego.nombre} videojuego={videojuego} />
        ))}
      </div>
    </div>
  );
}

export default Main;
