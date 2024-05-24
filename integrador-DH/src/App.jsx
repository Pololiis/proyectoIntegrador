import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/routes/Home";
import Carrito from "./components/routes/Carrito";
import Categorias from "./components/routes/Categorias";
import Agregador from "./components/routes/Agregador";
import DetalleProducto from "./components/routes/DetalleProducto";
import CrearUsuario from "./components/routes/crearUsuario";
import AbmPlataforma from "./components/routes/AbmPlataforma";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/carrito" element={<Carrito/>}/>
            <Route path="/categorias" element={<Categorias/>}/>
            <Route path="/administrador" element={<Agregador/>}/>
            <Route path="/plataforma" element={<AbmPlataforma/>}/>
            <Route path="/crearUsuario" element={<CrearUsuario/>}/>
            <Route path="/detalleProducto/:id" element={<DetalleProducto/>} />
            <Route path="*" element={<h1>404</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
