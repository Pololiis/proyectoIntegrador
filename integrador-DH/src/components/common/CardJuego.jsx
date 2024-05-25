import { Link } from "react-router-dom";
import "./cardJuego.css";


const CardJuego = ({ videojuego }) => {
  return (
    <div className="card mb-3">
      <img src={videojuego.imagenes} className="card-img-top" alt={videojuego.nombre} />
        <hr />
      <div className="card-body flex">
        <h5 className="card-title">{videojuego.nombre}</h5>
      </div>
        <Link to={`/detalleProducto/${videojuego.id}`} className="btn btn-bd-primary">
          Detalle
        </Link>
    </div>
  );
}


export default CardJuego;