

import { Link } from "react-router-dom";

const CardJuego = ({ videojuego }) => {
  return (
    <div>
      <div>
        <img src={videojuego.imagenes} alt={videojuego.nombre} />
        <Link to={`/detalleProducto/${videojuego.nombre}`}>
          <p>Ver más</p>
        </Link>
      </div>
    </div>
  );
};

export default CardJuego;
