import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import GaleriaImagenes from "../common/GaleriaImagenes";
import Volver from "../common/Volver";
import "./detalleProducto.css";


function DetalleProducto() {
  const { id } = useParams();

  console.log("esta es la id", id);
  const url = `http://localhost:8080/videojuegos/${id}`;
  const [videoJuegoSeleccionado, setVideoJuegoSelecionado] = useState({});

  const [caracteristica, setCaracteristicas] = useState([]);
  const [cantidad, setCantidad] = useState(6);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const responseCaracteristicas = await axios.get(
          `http://localhost:8080/caracteristicas/listar`
        );
        const shuffledData = shuffleArray(responseCaracteristicas.data);
        setVideoJuegoSelecionado(response.data);
        setCaracteristicas(shuffledData);
      } catch (error) {
        console.error("Hubo un error al hacer la solicitud:", error);
      }
    };

    fetchData();
  }, [id]);


  if (!videoJuegoSeleccionado.nombre) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid">
      <Volver />
      <div className="flex justify-center aling-center container-general-detalle">
        <div className="container-detalle">
          <GaleriaImagenes
            titulo={videoJuegoSeleccionado.nombre}
            descripcion={videoJuegoSeleccionado.descripcion}
            imagenes={videoJuegoSeleccionado.imagenes}
          />
          <div >
            <h3 className="h3-caracteristicas">Caracteristicas</h3>
          <div className="container-caracteristicas">
            {caracteristica.slice(0 , cantidad).map((caracteristica, index) => (
              <div className="caract" key={index}>
                <h5>{caracteristica.nombre}</h5>
                <img
                  className="img-caracteristicas"
                  src={caracteristica.imagen}
                  alt=""
                />
              </div>
              
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  function shuffleArray(array) {
    const shuffledArray = array.slice(); // Crear una copia del array para no mutar el original
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }
}

export default DetalleProducto;
