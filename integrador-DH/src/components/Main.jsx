import "../styles/main.css";
import Slider from "./common/Slider";
import "../styles/main.css";
import BarraBuscador from "./common/BarraBuscador";
import DetalleProducto from "./routes/DetalleProducto";

function Main() {
  return (
    <div className="container-main">
      <div className="bg-h1 flex">
        <div className="container-h1 flex">
          <h1>Bienvenido a</h1>
          <span className="glow text-outline">GameShare</span>
          <BarraBuscador />
        </div>
      </div>
      <h2>Categorias</h2>
      <Slider />
      <h2>Recomendados</h2>
      <Slider />

      <DetalleProducto />
    </div>
  );
}

export default Main;
