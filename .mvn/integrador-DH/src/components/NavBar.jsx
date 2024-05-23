import { Link } from "react-router-dom";
import "../styles/index.css"


function NavBar() {
  return (
    <div className="flex space-around">
      <div>
        <Link to="/">Logo</Link>
        <span>ESLOGAN</span>
      </div>
      <div>
       <Link to = "carrito"> Carrito</Link>
       <Link to = "categorias"> Categorias</Link>
      </div>
      <div>
        <button>Iniciar Sesion</button>
        <button>Registrarse</button>
      </div>
    </div>
  );
}

export default NavBar;
