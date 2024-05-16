import "../styles/main.css";
import Slider from "./common/Slider";
import "../styles/main.css";
import BarraBuscador from "./common/BarraBuscador";
import { useEffect } from "react";
import axios from "axios";


function Main() {

  const url = 'http://localhost:8080/videojuegos'

  useEffect (() => {
    axios.get(url)
  .then(response => {
    // Manejar la respuesta del servidor
    console.log('Respuesta del servidor:', response.data);
  })
  .catch(error => {
    // Manejar errores
    console.error('Hubo un error al hacer la solicitud:', error);
  });
  }, [])


  return (
    <div className="container-main">
      <div className="bg-h1 flex">
        <div className="container-h1 flex">
          <h1>Bienvenido a</h1>
          <span className="glow text-outline">GameShare</span>
          <BarraBuscador />
        </div>
      </div>
      <div className="container-slider">
      <h2 className="subtitulo">Categorias</h2>
      <Slider />
      </div>
      <h2 className="subtitulo">Recomendados</h2>
      <Slider />
    </div>
  );
}

export default Main;
