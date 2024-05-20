import "../styles/main.css";
import BarraBuscador from "./common/BarraBuscador";
import { useEffect, useState } from "react";
import axios from "axios";
import CardJuego from "./common/CardJuego";

function Main() {
  const url = `http://localhost:8080/videojuegos`;
  const [videoJuegos, setVideoJuegos] = useState([]);
  const [cantidad, setCantidad] = useState(10);

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
        </div>
      </div>
      <div className="container-cards-section flex">
        <BarraBuscador />
        <h2>Recomendados</h2>
        <div className="container-cards  flex ">
          {videoJuegos.slice(0, cantidad).map((videojuego) => (
            <CardJuego key={videojuego.id} videojuego={videojuego} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
