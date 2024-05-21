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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);

        setVideoJuegoSelecionado(response.data);
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
     <Volver/>
    <div className="flex justify-center aling-center container-general-detalle">
      <div className="container-detalle">
        <h1 className="m-0">{videoJuegoSeleccionado.nombre}</h1>
        <div className="container col-sm-12 mt-4">
          <p>{videoJuegoSeleccionado.descripcion}</p>
          <GaleriaImagenes images={videoJuegoSeleccionado.imagenes} />
        </div>
      </div>
    </div>
    </div>
  );
}

export default DetalleProducto;
