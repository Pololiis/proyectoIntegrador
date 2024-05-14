import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/index.css";
import "../styles/navbar.css";
import logo from "../assets/logo.png";

function NavBar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 991) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid ">
        <Link to="" className="navbar-brand eslogan" href="#">
          <img src={logo} alt="Logo" className="logo" /> ¡Juga más, paga menos!
        </Link>
        <button
          className="navbar-toggler borde"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse container-ul " id="navbarNav">
          <ul className="navbar-nav space-between">
            <li className="nav-item">
              <Link
                to="/"
                className="Link nav-link"
                aria-current="page"
                href="#"
              >
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="categorias" className="Link nav-link" href="#">
                Categorias
              </Link>
            </li>
            <li className="nav-item">
              <Link to="Carrito" className="Link nav-link" href="#">
                Carrito
              </Link>
            </li>
          </ul>
        </div>
        {isVisible && (
          <div className="container-buttons flex  space-between">
            <button className="button1 button-general">Iniciar Sesion</button>
            <button className="button1 button-general">Registrarse</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
