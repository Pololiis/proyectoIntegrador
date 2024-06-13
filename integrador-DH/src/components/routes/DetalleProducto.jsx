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
        console.log(response.data);
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
      <Volver />
      <div className="flex justify-center aling-center container-general-detalle">
        <div className="container-detalle">
          <GaleriaImagenes
             plataforma={videoJuegoSeleccionado.categoria.nombre}
            titulo={videoJuegoSeleccionado.nombre}
            descripcion={videoJuegoSeleccionado.descripcion}
            imagenes={videoJuegoSeleccionado.imagenes}
          />

          <div className="caractGaleria">
            <h3 className="h3-caracteristicas">Caracteristicas</h3>
            <div className="container-caracteristicas">
              {videoJuegoSeleccionado.caracteristicas.map(
                (caracteristica, index) => (
                  <div className="caract" key={index}>
                    <h5>{caracteristica.nombre}</h5>
                    <img
                      className="img-caracteristicas"
                      src={caracteristica.imagen}
                      alt=""
                    />
                  </div>
                )
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default DetalleProducto;
