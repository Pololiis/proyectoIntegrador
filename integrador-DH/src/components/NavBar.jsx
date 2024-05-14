import { Link } from "react-router-dom";
import "../styles/index.css";
import "../styles/navbar.css";
import logo from "../assets/logo.png";

function NavBar() {
  return (
    <div className="flex space-between aling-center">
      <div className="container-logo flex aling-center">
        <Link to="/" className="Link">
          <img src={logo} alt="LOGO" />
        </Link>

        <p className="eslogan">¡Juega más, paga menos!</p>
      </div>
      <nav className="space-between flex">
          <Link to="/" className="Link">Inicio</Link>
        <Link to="carrito" className="Link">
          {" "}
          Carrito
        </Link>
        <Link to="categorias" className="Link">
          {" "}
          Categorias
        </Link>
      </nav>
      <div className="container-buttons flex  space-between">
        <button className="button1 button-general">Iniciar Sesion</button>
        <button className="button1 button-general">Registrarse</button>
      </div>
    </div>
  );
}

export default NavBar;
