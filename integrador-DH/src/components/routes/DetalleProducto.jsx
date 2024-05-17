import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

function DetalleProducto() {
  const {nombre} = useParams();
  
  console.log("esta es la id", nombre);
  const url = `http://localhost:8080/videojuegos${nombre}`;
  const [videoJuegoSeleccionado, setVideoJuegoSelecionado] = useState({});



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);

        setVideoJuegoSelecionado(response.data);
      
        console.log("Datos del video juego:", videoJuegoSeleccionado);
      } catch (error) {
        console.error("Hubo un error al hacer la solicitud:", error);
      }
    };

    fetchData();
  }, [nombre]);

  console.log( "este es el video juego",videoJuegoSeleccionado);
  return (
    <div>

      <h1>{videoJuegoSeleccionado.nombre}</h1>
  
    </div>
  );
  
}

export default DetalleProducto;
