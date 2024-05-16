import { useEffect, useState } from "react";
import axios from "axios";

function DetalleProducto() {
  const url = "http://localhost:8080/videojuegos";
  const [videoJuegos, setVideoJuegos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);

        setVideoJuegos(response.data);

        // Aquí puedes usar la variable videojuegos
        console.log("Datos de los videojuegos:", videoJuegos);
      } catch (error) {
        console.error("Hubo un error al hacer la solicitud:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Detalle de producto</h1>
      {videoJuegos.map(videoJuegos =>(
        <div key={videoJuegos.id}>
          <img src={videoJuegos.imagen} alt={videoJuegos.nombre} />
          <h2>{videoJuegos.nombre}</h2>
          <p>{videoJuegos.descripcion}</p>
        </div>
      ))}
    </div>
  );
  
}

export default DetalleProducto;
