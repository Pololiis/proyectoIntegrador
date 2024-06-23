import { Link } from "react-router-dom";
import "./cardJuego.css";

const CardJuego = ({ videojuego }) => {
  return (
    <article className="card">
      <img src={videojuego.imagenes[0]} alt={videojuego.nombre} className="card__img" />
      <div className="card__data">
        <h2 className="card__title">{videojuego.nombre}</h2>
        <span className="card__description">{videojuego.descripcion}</span>
        <Link to={`/detalleProducto/${videojuego.id}`} className="btn btn-primary btn-accion">Ver Más</Link>
      </div>
    </article>
  );
}

export default CardJuego;

