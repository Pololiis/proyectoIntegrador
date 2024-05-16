import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/index.css";
import "../styles/navbar.css";
import logo from "../assets/logo.png";

// function NavBar() {

//   return (
//     <nav className="navbar navbar-expand-lg ">
//       <div className="container-fluid ">
//         <Link to="" className="navbar-brand eslogan" href="#">
//           <img src={logo} alt="Logo" className="logo" /> ¡Juga más, paga menos!
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse container-ul " id="navbarNav">
//           <ul className="navbar-nav space-between">
//             <li className="nav-item">
//               <Link
//                 to="/"
//                 className="Link nav-link"
//                 aria-current="page"
//                 href="#"
//               >
//                 Inicio
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="categorias" className="Link nav-link" href="#">
//                 Categorias
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="Carrito" className="Link nav-link" href="#">
//                 Carrito
//               </Link>
//             </li>
//           </ul>

//           <div className="container-buttons flex  space-between">
//             <button className=" btn btn-primary ">Iniciar Sesion</button>
//             <button className=" btn btn-primary ">Registrarse</button>
//           </div>

//         </div>
//       </div>
//     </nav>
//   );

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container-fluid ">
        <Link to="/" className="navbar-brand eslogan">
          <img src={logo} alt="Logo" className="logo " /> ¡Juga más, paga menos!
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}>
          <ul className="navbar-nav  me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link" aria-current="page">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/categorias" className="nav-link">
                Categorías
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/carrito" className="nav-link">
                Carrito
              </Link>
            </li>
          </ul>
          <div className="d-flex container-buttons ">
            <button className="btn btn-bd-primary me-2">Iniciar Sesión</button>
            <button className="btn btn-bd-primary">Registrarse</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
